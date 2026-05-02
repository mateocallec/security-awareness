import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsEmail,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  badusb_sub: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' || value === null ? undefined : value))
  email?: string;

  @IsString()
  @IsNotEmpty()
  location_found: string;

  @IsInt()
  @Min(0)
  @Max(4)
  insertion_reason: number;

  @IsInt()
  @Min(0)
  @Max(4)
  comfort_rating: number;

  @IsBoolean()
  malicious: boolean;
}
