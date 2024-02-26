import { IsApiInteger, IsApiString } from "#common/decorators/validation";
import { IsDateString, IsOptional } from "class-validator";

// This file is for Puts and Posts to user controller
export class BookBlockInputDto {
  @IsApiString()
  userId!: string;
  @IsApiString()
  blockId!: string;
}

export class CreateBlockInputDto {
  @IsApiString()
  userId!: string;
  @IsDateString()
  startTime!: Date;
  @IsDateString()
  endTime!: Date;
}

export class UpdateBlockInputDto {
  @IsApiString()
  blockId!: string;

  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsDateString()
  @IsOptional()
  endTime?: Date;

  @IsApiInteger()
  @IsOptional()
  rating?: number;

  @IsApiString()
  @IsOptional()
  notes?: string;
}
