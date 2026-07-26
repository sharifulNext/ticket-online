import mongoose, { Schema } from 'mongoose';

export interface IReview {
  _id?: string;
  id: string;
  ticketId: string;
  userId?: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    id: { type: String, required: true, unique: true },
    ticketId: { type: String, required: true },
    userId: { type: String },
    userName: { type: String, required: true },
    userAvatar: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
