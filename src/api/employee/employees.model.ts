/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as z from 'zod';

import { db } from '../../db';
import { WithId } from 'mongodb';

export const Employee = z.object({
  fullname: z.string().min(4),
  age: z.number(),
  dob: z.string(),
  address: z.string().min(5),
  email: z.string(),
  phone: z.number().min(10),
});

export type Employee = z.infer<typeof Employee>;
export type EmployeeWithId = WithId<Employee>;
export const Employees = db.collection<Employee>('employees');
