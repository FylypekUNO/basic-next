import { Schema, model, models, InferSchemaType } from 'mongoose';
import { idField } from './_fields';
import { permissionsList } from '@/lib/permissions';

const userSchema = new Schema({
  _id: idField,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  permissions: {
    type: [String],
    enum: permissionsList,
    default: [],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export type UserType = InferSchemaType<typeof userSchema>;

export const User = models.User || model<UserType>('User', userSchema);
