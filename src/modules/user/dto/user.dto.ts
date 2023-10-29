import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';
export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
