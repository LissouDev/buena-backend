import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
// import { DatabaseService } from '../database/database.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call UsersService.create when create is called', async () => {
    const createUserDto = {
      name: 'Nelson Mandela',
      email: 'nelson@mandela.com',
      phone: '1234567890',
      salary: '0-1000',
      id: uuidv4(),
      createdAt: new Date(),
    };
    const spyCreate = jest.spyOn(mockUsersService, 'create');
    controller.create(createUserDto);

    await controller.create(createUserDto);
    expect(spyCreate).toHaveBeenCalledWith(createUserDto);
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });
});
