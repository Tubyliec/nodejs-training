import { model, Schema } from 'mongoose';

export const RoleSchema = new Schema(
  {
    value: { type: String, unique: true, default: 'User' },
  },
  { timestamps: true },
);

export const Role = model('Role', RoleSchema);