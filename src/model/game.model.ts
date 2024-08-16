import { UserModel } from './user.model';
import mongoose, { Schema, Types } from 'mongoose';

export interface Game extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  date: Date;
  active: boolean;
  participants: Types.ObjectId[];
}

const GameSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: 3,
      maxlength: 26,
    },
    date: {
      required: true,
      type: Date,
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
    },
    participants: {
      required: true,
      type: [Schema.Types.ObjectId],
    },
  },
  { timestamps: true, toJSON: { virtuals: true, getters: true } },
);

GameSchema.index(
  { active: 1 },
  { unique: true, partialFilterExpression: { active: true } },
);

GameSchema.virtual('participants', {
  ref: UserModel.modelName,
  localField: 'participants',
  foreignField: '_id',
});

export const GameModel = mongoose.model<Game>('game', GameSchema);
