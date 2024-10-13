import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(['0-1000', '1000-2000', '2000-3000', '3000-4000', '4000+'], {
    message: 'Salary range required',
  })
  @IsNotEmpty()
  salary: '0-1000' | '1000-2000' | '2000-3000' | '3000-4000' | '4000+';
}
