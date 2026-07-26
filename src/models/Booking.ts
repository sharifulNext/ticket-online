import mongoose, { Schema } from 'mongoose';

export interface IBooking {
  _id?: string;
  id: string; // Custom booking ID e.g. TS-829103
  ticketId: string;
  ticket: any; // Embedded full ticket details snapshot
  userId: string;
  userEmail: string;
  passengerName: string;
  passengerPhone: string;
  seats: string[];
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  bookingDate: Date | string;
  status: 'confirmed' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  qrCodeDataUrl?: string;
}

const BookingSchema = new Schema<IBooking>(
  {
    id: { type: String, required: true, unique: true },
    ticketId: { type: String, required: true },
    ticket: { type: Schema.Types.Mixed, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    passengerName: { type: String, required: true },
    passengerPhone: { type: String, default: '' },
    seats: { type: [String], required: true },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String },
    bookingDate: { type: Schema.Types.Mixed, default: Date.now },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    paymentMethod: { type: String, default: 'stripe' },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
    qrCodeDataUrl: { type: String },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
