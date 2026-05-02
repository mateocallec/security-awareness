import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBadusbDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  drop_location?: string;
}
