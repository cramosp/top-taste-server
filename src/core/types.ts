import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  payload?: {
    _id: string;
  };
}
