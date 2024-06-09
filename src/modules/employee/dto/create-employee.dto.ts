import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'The name of the employee' })
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({ description: 'The position id of the employee' })
  @IsNumber()
  @IsNotEmpty({ message: 'position id is required' })
  position_id: number;

  @ApiProperty({ description: 'The position name of the employee' })
  @IsString()
  @IsNotEmpty({ message: 'position name is required' })
  position_name: string;
}
