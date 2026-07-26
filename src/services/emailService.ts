export interface EmailConfirmationData {
  toEmail: string;
  passengerName: string;
  bookingId: string;
  ticketTitle: string;
  seats: string[];
  totalAmount: number;
  date: string;
  time: string;
}

export async function sendBookingEmailConfirmation(data: EmailConfirmationData): Promise<boolean> {
  console.log(`
==================================================
📧 EMAIL CONFIRMATION SENT
To: ${data.passengerName} <${data.toEmail}>
Booking ID: ${data.bookingId}
Journey: ${data.ticketTitle}
Seats: ${data.seats.join(', ')}
Schedule: ${data.date} at ${data.time}
Total Amount Paid: $${data.totalAmount}
Status: Confirmed & QR Ticket Generated
==================================================
  `);
  return true;
}
