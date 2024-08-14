import mongoose, { Schema, Types } from 'mongoose';

export interface Card extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  score: number;
}

const CardSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    score: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true, getters: true } },
);

export const CardModel = mongoose.model<Card>('card', CardSchema);
