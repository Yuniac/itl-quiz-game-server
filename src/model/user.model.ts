import mongoose, { Schema, Types } from 'mongoose';

export interface User extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  email?: string;
  picture?: string;
  admin?: boolean;
}

const UserSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 26,
    },
    email: {
      required: false,
      type: String,
      unique: true,
    },
    picture: {
      required: false,
      type: String,
    },
    admin: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true, getters: true } },
);

export const UserModel = mongoose.model<User>('user', UserSchema);
