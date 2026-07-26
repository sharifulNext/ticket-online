import mongoose, { Schema } from 'mongoose';

export interface ICoupon {
  _id?: string;
  code: string;
  discountPercent: number;
  maxDiscount: number;
  validUntil: string;
  isActive: boolean;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true },
    maxDiscount: { type: Number, required: true },
    validUntil: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CouponModel = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
