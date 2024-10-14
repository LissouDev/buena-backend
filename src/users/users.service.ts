import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { mockUser, mockUsers } from './mockData/mockData';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async findAll() {
    // TODO uncomment to use the database
    // return this.databaseService.user.findMany();
    return mockUsers;
  }

  async findOne(id: number) {
    // TODO uncomment to use the database
    // return this.databaseService.user.findUnique({ where: { id } });
    return mockUser;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
