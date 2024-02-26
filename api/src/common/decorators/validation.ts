/* eslint-disable @typescript-eslint/naming-convention */
import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

type Params = {
  optional?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ApplyDecorator = <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol | undefined,
  descriptor?: TypedPropertyDescriptor<Y> | undefined,
) => void;

export function IsApiEmail(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsEmail(),
    ApiProperty({
      description: "An email address",
      example: "aiden@gmail.com",
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiEnum<T extends object>(
  params: Params & { enum: T },
): ApplyDecorator {
  const required = !params.optional;
  const example = Object.values(params.enum)[0];
  return applyDecorators(
    IsEnum(params.enum),
    ApiProperty({
      description: "An enum value",
      example,
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiInteger(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsInt(),
    ApiProperty({
      description: "An integer",
      example: 54,
      required,
      type: Number,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiLimit(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsInt(),
    ApiProperty({
      description:
        "An integer that indicates the number of results to return per page",
      example: 50,
      required,
      type: Number,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiPage(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsInt(),
    ApiProperty({
      description:
        "An integer that indicates the page offset of results to return",
      example: 2,
      required,
      type: Number,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiString(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsString(),
    ApiProperty({
      description: "A non-empty string",
      example: "some string",
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}

export function IsApiUrl(params?: Params): ApplyDecorator {
  const required = !params?.optional;
  return applyDecorators(
    IsUrl(),
    ApiProperty({
      description: "A valid URL",
      example: "www.thing.com",
      required,
      type: String,
    }),
    required ? IsNotEmpty() : IsOptional(),
  );
}
