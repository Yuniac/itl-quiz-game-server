import mongoose, { Schema, Types } from 'mongoose';


export interface User extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  email?: string;
  hash?: string;
  emailVerified?: boolean;
  picture?: string;
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
    hash: {
      required: false,
      type: String,
      select: false,
      index: true,
    },
    emailVerified: {
      required: true,
      type: Boolean,
    },
    picture: {
      required: false,
      type: String,
    }

  },
  { timestamps: true, toJSON: { virtuals: true, getters: true } },
);

export const UserModel = mongoose.model<User>('user', UserSchema);
