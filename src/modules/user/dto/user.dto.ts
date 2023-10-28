import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';
export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  //   @MinLength(3, { message: 'Vui lòng điền hon 3 so ' })
  role: number;
}
