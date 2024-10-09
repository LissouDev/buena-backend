import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsMobilePhone,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsMobilePhone()
  phone: string;

  @IsEnum(['0-1000', '1000-2000', '2000-3000', '3000-4000', '4000+'], {
    message: 'Salary range required',
  })
  salary: '0-1000' | '1000-2000' | '2000-3000' | '3000-4000' | '4000+';
}
