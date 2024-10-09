export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  salary: '0-1000' | '1000-2000' | '2000-3000' | '3000-4000' | '4000+';
}
