/* eslint-disable */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Give username' })
  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty({ description: 'Give password' })
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export interface LoginResponse {
  access_token: string | null;
}
