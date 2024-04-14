import { Response } from 'express';

interface CRUDResponse<T> {
  status: boolean;
  severity: string;
  data: T | T[];
  message: string;
}

export const sendCRUDResponse = <T>(
  res: Response,
  status: boolean,
  data: T | T[] = [],
  message: string = '',
  severity: string = '',
) => {
  const response: CRUDResponse<T> = {
    status,
    severity,
    data,
    message,
  };
  res.json(response);
};
