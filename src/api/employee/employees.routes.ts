import { Router } from 'express';
import * as EmployeeHandlers from './employees.handlers';
import { Employee } from './employees.model';
import { validateRequest } from '../../middlewares';
import { ParamsWithId } from '../../interfaces/ParamWithId';

const router = Router();

router.get('/', EmployeeHandlers.findAll);
router.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  EmployeeHandlers.findOne,
);
router.post(
  '/',
  validateRequest({ body: Employee }),
  EmployeeHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({ params: ParamsWithId, body: Employee }),
  EmployeeHandlers.updateOne,
);

router.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  EmployeeHandlers.deleteOne,
);

export default router;
