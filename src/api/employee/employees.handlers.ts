import { Response, Request, NextFunction } from 'express';
import { Employee, EmployeeWithId, Employees } from './employees.model';
import { ZodError } from 'zod';
import { ParamsWithId } from '../../interfaces/ParamWithId';
import { ObjectId } from 'mongodb';

export async function findAll(
  req: Request,
  res: Response<EmployeeWithId[]>,
  next: NextFunction,
) {
  try {
    const result = await Employees.find();
    const employees = await result.toArray();
    res.json(employees);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, {}, Employee>,
  res: Response<EmployeeWithId>,
  next: NextFunction,
) {
  try {
    const inserResult = await Employees.insertOne(req.body);
    if (!inserResult.acknowledged) throw new Error('Error inserting employee');
    res.status(200);
    res.json({
      _id: inserResult.insertedId,
      ...req.body,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422);
    }
    next(err);
  }
}

export async function findOne(
  req: Request<ParamsWithId, EmployeeWithId, {}>,
  res: Response<EmployeeWithId>,
  next: NextFunction,
) {
  try {
    const result = await Employees.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Employee with id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, EmployeeWithId, Employee>,
  res: Response<EmployeeWithId>,
  next: NextFunction,
) {
  try {
    const result = await Employees.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      },
    );
    if (!result) {
      res.status(404);
      throw new Error(`Employee with id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    const result = await Employees.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Employee with id "${req.params.id}" not found`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
