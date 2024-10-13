import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: DatabaseService;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    salary: '0-1000',
  };
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      salary: '0-1000',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '1234567890',
      salary: '0-1000',
    },
  ];

  const mockDatabaseService = {
    user: {
      create: jest.fn().mockResolvedValue(mockUser),
      findMany: jest.fn().mockResolvedValue(mockUsers),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      update: jest
        .fn()
        .mockResolvedValue({ ...mockUser, name: 'John Updated' }),
      delete: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: Prisma.UserCreateInput = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        salary: '0-1000',
      };

      const result = await service.create(createUserDto);
      expect(result).toEqual(mockUser);
      expect(databaseService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockUsers);
      expect(databaseService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const updateUserDto: Prisma.UserUpdateInput = { name: 'John Updated' };

      const result = await service.update(1, updateUserDto);
      expect(result.name).toEqual('John Updated');
      expect(databaseService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete the user', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockUser);
      expect(databaseService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
