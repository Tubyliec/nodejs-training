import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
  },
  {
    timestamps: true,
  },
);

export const User = model('User', UserSchema);