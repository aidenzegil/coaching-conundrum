export type Block = {
  id: string;
  startTime: Date;
  endTime: Date;
  createdUserId: string;
  rating: number | null;
  notes: string | null;
  bookingUserId: string | null;
};
