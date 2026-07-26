import mongoose, { Schema } from 'mongoose';

export interface IPayment {
  _id?: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  stripePaymentIntentId?: string;
  createdAt?: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    bookingId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: '$' },
    status: {
      type: String,
      enum: ['succeeded', 'pending', 'failed', 'refunded'],
      default: 'succeeded',
    },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, required: true },
    stripePaymentIntentId: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
