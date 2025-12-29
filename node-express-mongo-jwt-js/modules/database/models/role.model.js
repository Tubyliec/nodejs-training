import { model, Schema } from 'mongoose';

const RoleSchema = new Schema(
  {
    value: { type: String, unique: true, default: 'User' },
  },
  { timestamps: true },
);

export const RoleModel = model('Role', RoleSchema);