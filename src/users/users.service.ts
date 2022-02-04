import { 
    ConflictException,
    Injectable,
    NotFoundException, 
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userEmailExists) {
      throw new ConflictException('Email já cadastrado no sistema, tente outro.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    delete createdUser.password;

    return createdUser;
  }

  async findMany(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        birthDate: true,
        role: true,
      },
    });
    return users;
  }

  async findUnique(userId: number): Promise<User> {
    const userFinded = await this.prismaService.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!userFinded) {
      throw new NotFoundException('Usuário não existe.');
    }

    delete userFinded.password;

    return userFinded;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userFinded = await this.prismaService.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!userFinded) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (updateUserDto.email) {
      const emailExists = await this.prismaService.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (emailExists) {
        throw new ConflictException('Email já cadastrado no sistema, insira outro.');
      }
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        email: updateUserDto.email,
        firstName: updateUserDto.firstName,
        role: updateUserDto.role,
      },
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async delete(userId: number): Promise<User> {
    const userFinded = await this.prismaService.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!userFinded) {
      throw new NotFoundException('Usuário não encontrado, tente novamente.');
    }

    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: Number(userId),
      },
    });

    delete deletedUser.password;

    return deletedUser;
  }
}
