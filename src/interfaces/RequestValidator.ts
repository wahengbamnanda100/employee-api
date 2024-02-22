import { AnyZodObject } from 'zod';

export default interface RequestValidator {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}
