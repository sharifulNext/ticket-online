import { Ticket, Review, Booking, User, Coupon, AdminStats } from '../types';

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TS-FL-101',
    title: 'SkySphere Airways: New York to Paris Non-Stop',
    category: 'flight',
    origin: 'New York (JFK)',
    destination: 'Paris (CDG)',
    date: '2026-08-15',
    time: '19:45 PM',
    arrivalTime: '08:30 AM (+1d)',
    duration: '6h 45m',
    operator: 'SkySphere Express',
    operatorLogo: '✈️',
    price: 649,
    originalPrice: 799,
    currency: '$',
    rating: 4.9,
    reviewCount: 238,
    images: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540339832862-47459980783b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience ultra-luxury long-haul flying with premium reclining leather seats, gourmet inflight dining, complimentary Wi-Fi, and 4K seatback entertainment.',
    amenities: ['In-flight Wi-Fi', 'Gourmet Meals', '4K TV Screens', 'Reclining Seats', '30kg Baggage', 'USB Charging'],
    location: 'Charles de Gaulle Airport, France',
    featured: true,
    popular: true,
    seatLayout: {
      rows: 8,
      cols: 6,
      aisles: [3],
      bookedSeats: ['A1', 'A2', 'C4', 'D5', 'E2', 'F6'],
      vipSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
      vipPriceExtra: 150
    }
  },
  {
    id: 'TS-TR-202',
    title: 'EuroStar Bullet Rail: London to Amsterdam Express',
    category: 'train',
    origin: 'London (St Pancras)',
    destination: 'Amsterdam (Central)',
    date: '2026-08-18',
    time: '08:15 AM',
    arrivalTime: '13:10 PM',
    duration: '3h 55m',
    operator: 'EuroSphere Rail',
    operatorLogo: '🚆',
    price: 129,
    originalPrice: 160,
    currency: '$',
    rating: 4.8,
    reviewCount: 184,
    images: [
      'https://images.unsplash.com/photo-1515165562839-53888479499c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Scenic high-speed railway crossing through the Channel Tunnel directly connecting downtown London with historic canals of Amsterdam.',
    amenities: ['Panorama Windows', 'At-Seat Dining', 'Free High-Speed Wi-Fi', 'Power Sockets', 'Quiet Zone'],
    location: 'Central Station, Amsterdam, Netherlands',
    featured: true,
    popular: true,
    seatLayout: {
      rows: 10,
      cols: 4,
      aisles: [2],
      bookedSeats: ['A1', 'B2', 'C3', 'D4', 'E1'],
      vipSeats: ['A1', 'A2', 'B1', 'B2'],
      vipPriceExtra: 45
    }
  },
  {
    id: 'TS-CC-303',
    title: 'Coldplay: Music of the Spheres World Tour Live in Tokyo',
    category: 'concert',
    destination: 'Tokyo Dome, Japan',
    date: '2026-09-02',
    time: '19:00 PM',
    operator: 'Sphere Live Entertainment',
    operatorLogo: '🎸',
    price: 199,
    originalPrice: 250,
    currency: '$',
    rating: 5.0,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immerse yourself in a breathtaking stadium experience featuring kinetic wristbands, lasers, fireworks, and iconic anthems in Tokyo Dome.',
    amenities: ['LED Wristband', 'VIP Lounge Pass', 'Commemorative Poster', 'Fast-Track Gate Entry'],
    location: 'Tokyo Dome, Bunkyo City, Tokyo',
    venue: 'Main Arena',
    featured: true,
    popular: true,
    seatLayout: {
      rows: 12,
      cols: 8,
      aisles: [4],
      bookedSeats: ['A1', 'A2', 'A3', 'B4', 'B5', 'C1', 'D8'],
      vipSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
      vipPriceExtra: 120
    }
  },
  {
    id: 'TS-BS-404',
    title: 'GreenLine Luxury Sleeper: Singapore to Kuala Lumpur',
    category: 'bus',
    origin: 'Singapore (Beach Rd)',
    destination: 'Kuala Lumpur (TBS)',
    date: '2026-08-20',
    time: '23:30 PM',
    arrivalTime: '05:00 AM (+1d)',
    duration: '5h 30m',
    operator: 'GreenLine Luxury Coach',
    operatorLogo: '🚌',
    price: 45,
    originalPrice: 60,
    currency: '$',
    rating: 4.7,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Overnight premier double-decker bus equipped with full leather massage seats, personal privacy curtains, USB ports, and onboard restroom.',
    amenities: ['Leather Massage Seat', 'Privacy Curtains', 'USB Charging', 'Onboard Toilet', 'Personal TV Screen'],
    location: 'TBS Terminal, Kuala Lumpur, Malaysia',
    featured: false,
    popular: true,
    seatLayout: {
      rows: 8,
      cols: 3,
      aisles: [2],
      bookedSeats: ['A1', 'C3', 'D2'],
      vipSeats: ['A1', 'A2', 'A3'],
      vipPriceExtra: 20
    }
  },
  {
    id: 'TS-EV-505',
    title: 'Global Tech Innovation Summit 2026',
    category: 'event',
    destination: 'San Francisco, CA',
    date: '2026-09-10',
    time: '09:00 AM',
    operator: 'Silicon Sphere Events',
    operatorLogo: '⚡',
    price: 299,
    originalPrice: 350,
    currency: '$',
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Join top global AI founders, venture capitalists, and engineers for keynote talks, networking, and live product debuts.',
    amenities: ['Networking App Access', 'Buffet Lunch & Coffee', 'Recorded Sessions Pass', 'Swag Box'],
    location: 'Moscone Center, San Francisco, USA',
    venue: 'Hall B Main Stage',
    featured: true,
    popular: false,
    seatLayout: {
      rows: 10,
      cols: 6,
      aisles: [3],
      bookedSeats: ['A1', 'A2', 'B3', 'C4'],
      vipSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
      vipPriceExtra: 100
    }
  },
  {
    id: 'TS-MV-606',
    title: 'IMAX 3D Special Premiere: Avatar 3 Early Access',
    category: 'movie',
    destination: 'Los Angeles (TCL Chinese Theatre)',
    date: '2026-08-25',
    time: '20:15 PM',
    operator: 'Sphere Cinema 4K',
    operatorLogo: '🎬',
    price: 28,
    originalPrice: 35,
    currency: '$',
    rating: 4.8,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Exclusive early preview in laser 70mm IMAX 3D with Dolby Atmos spatial surround sound and luxury electric recliners.',
    amenities: ['Laser 3D Glasses', 'Popcorn & Soda Combo', 'Electric Recliners', '4K Laser Projection'],
    location: 'TCL Chinese Theatre, Hollywood, CA',
    venue: 'Auditorium 1 (IMAX)',
    featured: false,
    popular: true,
    seatLayout: {
      rows: 7,
      cols: 8,
      aisles: [4],
      bookedSeats: ['D4', 'D5', 'E4', 'E5', 'F1'],
      vipSeats: ['D3', 'D4', 'D5', 'D6'],
      vipPriceExtra: 10
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    ticketId: 'TS-FL-101',
    userName: 'Alexander Wright',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-07-10',
    comment: 'Flawless flight! The interactive seat map on TicketSphere allowed me to pick seat A1 with extra legroom. In-flight meals were top tier.',
    verified: true
  },
  {
    id: 'rev-2',
    ticketId: 'TS-FL-101',
    userName: 'Sophia Chen',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-07-02',
    comment: 'Extremely fast booking experience. Downloaded the digital QR ticket straight to my phone and scanned at the gate with zero friction.',
    verified: true
  },
  {
    id: 'rev-3',
    ticketId: 'TS-CC-303',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2026-06-28',
    comment: 'The concert of a lifetime! TicketSphere secured my VIP wristband pass easily. Best UI for ticket booking I have ever used.',
    verified: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'SPHERE10', discountPercent: 10, maxDiscount: 50, validUntil: '2026-12-31' },
  { code: 'VIP20', discountPercent: 20, maxDiscount: 100, validUntil: '2026-12-31' },
  { code: 'SUMMER25', discountPercent: 25, maxDiscount: 150, validUntil: '2026-12-31' }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Shariful Islam',
    email: 'user@ticketsphere.com',
    role: 'user',
    phone: '+1 415 890 2341',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    wishlist: ['TS-FL-101', 'TS-CC-303'],
    createdAt: '2026-01-15'
  },
  {
    id: 'usr-admin',
    name: 'TicketSphere Admin',
    email: 'admin@ticketsphere.com',
    role: 'admin',
    phone: '+1 800 555 0199',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    wishlist: [],
    createdAt: '2025-11-01'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'TS-893201',
    ticketId: 'TS-FL-101',
    ticket: INITIAL_TICKETS[0],
    userId: 'usr-1',
    userEmail: 'user@ticketsphere.com',
    passengerName: 'Shariful Islam',
    passengerPhone: '+1 415 890 2341',
    seats: ['A1', 'A2'],
    totalAmount: 1448,
    discountAmount: 150,
    couponCode: 'VIP20',
    bookingDate: '2026-07-20T14:30:00Z',
    status: 'confirmed',
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    qrCodeDataUrl: ''
  },
  {
    id: 'TS-714092',
    ticketId: 'TS-CC-303',
    ticket: INITIAL_TICKETS[2],
    userId: 'usr-1',
    userEmail: 'user@ticketsphere.com',
    passengerName: 'Shariful Islam',
    passengerPhone: '+1 415 890 2341',
    seats: ['B4'],
    totalAmount: 199,
    discountAmount: 0,
    bookingDate: '2026-07-22T09:15:00Z',
    status: 'confirmed',
    paymentMethod: 'sslcommerz',
    paymentStatus: 'paid',
    qrCodeDataUrl: ''
  }
];
