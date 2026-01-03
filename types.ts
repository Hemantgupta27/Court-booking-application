
export type SportType = 'Football' | 'Cricket' | 'Badminton' | 'Tennis';

export interface Court {
  id: string;
  name: string;
  type: SportType;
  pricePerHour: number;
  imageUrl: string;
  rating: number;
  location: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  isBooked: boolean;
  courtId: string;
  date: string;      // YYYY-MM-DD
}

export interface Booking {
  id: string;
  courtId: string;
  slotId: string;
  date: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
