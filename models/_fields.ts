import { Types } from 'mongoose';

export const idField = {
  type: Types.ObjectId,
  required: true,
  unique: true,
};
