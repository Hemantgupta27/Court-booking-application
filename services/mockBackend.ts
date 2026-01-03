import { TimeSlot, Booking, ApiResponse } from '../types';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

/**
 * BACKEND SERVICE
 * Connects to the Node.js Express API.
 */
class BackendService {

  /**
   * GET /api/slots
   * Fetches slots for a specific court and date
   */
  public async getSlots(courtId: string, date: string): Promise<ApiResponse<TimeSlot[]>> {
    try {
      const response = await fetch(`${API_URL}/slots?courtId=${courtId}&date=${date}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching slots:", error);
      return { success: false, error: "Failed to connect to server", data: [] };
    }
  }

  /**
   * POST /api/bookings
   * Creates a new booking
   */
  public async createBooking(payload: Omit<Booking, 'id' | 'createdAt'>): Promise<ApiResponse<Booking>> {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating booking:", error);
      return { success: false, error: "Failed to create booking" };
    }
  }

  /**
   * GET /api/my-bookings
   */
  public async getMyBookings(email: string): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await fetch(`${API_URL}/my-bookings?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching my bookings:", error);
      return { success: false, error: "Failed to fetch bookings", data: [] };
    }
  }

  /**
   * DELETE /api/bookings/:id
   */
  public async cancelBooking(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      return { success: false, error: "Failed to cancel booking" };
    }
  }
}

export const backend = new BackendService();
