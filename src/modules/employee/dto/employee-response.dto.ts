import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class EmployeeResponseDto {
  @IsString()
  id: number;

  @IsString()
  name: string;

  @IsString()
  position_id: number;

  @IsString()
  position_name: string;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsString()
  updatedAt?: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ValidateNested({ each: true })
  @Type(() => EmployeeResponseDto)
  @IsOptional()
  children?: EmployeeResponseDto[] = [];
}
