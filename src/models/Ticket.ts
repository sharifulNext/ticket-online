import mongoose, { Schema } from 'mongoose';

export interface ITicket {
  _id?: string;
  id: string; // Custom ticket ID e.g. TS-FL-101
  title: string;
  category: 'flight' | 'train' | 'bus' | 'concert' | 'event' | 'movie';
  origin?: string;
  destination: string;
  operator: string;
  price: number;
  currency: string;
  date: string;
  time: string;
  arrivalTime?: string;
  location?: string;
  duration?: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  description: string;
  amenities: string[];
  images: string[];
  seatLayout: {
    rows: number;
    cols: number;
    bookedSeats: string[];
    vipSeats?: string[];
    vipPriceExtra?: number;
  };
}

const TicketSchema = new Schema<ITicket>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['flight', 'train', 'bus', 'concert', 'event', 'movie'],
      required: true,
    },
    origin: { type: String },
    destination: { type: String, required: true },
    operator: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: '$' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    arrivalTime: { type: String },
    location: { type: String },
    duration: { type: String },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    description: { type: String, default: '' },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    seatLayout: {
      rows: { type: Number, required: true, default: 6 },
      cols: { type: Number, required: true, default: 4 },
      bookedSeats: { type: [String], default: [] },
      vipSeats: { type: [String], default: [] },
      vipPriceExtra: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const TicketModel = mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);
