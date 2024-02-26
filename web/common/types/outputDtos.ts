export enum ResponseStatus {
  SUCCESS = "SUCCESS",
}

export type BlockOutputDTO = {
  id: string;
  startTime: Date;
  endTime: Date;
  notes: string | null;
  rating: number | null;
  creatingUserId: string;
  bookingUserId: string | null;
  creatingUserNumber: string;
  bookingUserNumber: string | null;
};

export type PrivateBlockOutputDto = {
  id: string;
  startTime: Date;
  endTime: Date;
};
