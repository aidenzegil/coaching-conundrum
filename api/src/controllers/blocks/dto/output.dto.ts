import { Block } from "domain/block/models/block";
import type { User } from "domain/user/models/user";

export class BlockOutputDTO {
  id: string;
  startTime: Date;
  endTime: Date;
  notes: string | null;
  rating: number | null;
  creatingUserId: string;
  bookingUserId: string | null;
  creatingUserNumber: string;
  bookingUserNumber: string | null;

  constructor(block: Block, creatingUser: User, bookingUser?: User) {
    this.id = block.id;
    this.startTime = block.startTime;
    this.endTime = block.endTime;
    this.notes = block.notes;
    this.rating = block.rating;
    this.creatingUserId = block.createdUserId;
    this.bookingUserId = block.bookingUserId;
    this.creatingUserNumber = creatingUser.phoneNumber;
    this.bookingUserNumber = bookingUser?.phoneNumber || null;
  }
}

export class PrivateBlockOutputDto {
  id: string;
  startTime: Date;
  endTime: Date;

  constructor(block: Block) {
    this.id = block.id;
    this.startTime = block.startTime;
    this.endTime = block.endTime;
  }
}
