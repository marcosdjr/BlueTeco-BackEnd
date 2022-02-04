import { 
    Body,
    Controller,
    Delete,
    Get,
    Param, 
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({
      summary: 'Criar usuário',
    })
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.create(createUserDto);
    }
  
    @Get()
    @ApiOperation({
      summary: 'Lista de usuários cadastrados',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    readAll(): Promise<UserDto[]> {
      return this.usersService.findMany();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Listar o usuário pelo ID especificado',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    readOne(@Param('id') userId: number): Promise<User> {
      return this.usersService.findUnique(userId);
    }
  
    @Patch()
    @UseGuards(AuthGuard())
    @ApiOperation({
      summary: 'Atualiza o usuário logado/autenticado',
    })
    @ApiBearerAuth()
    update(
      @LoggedUser() user: User,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.usersService.update(user.id, updateUserDto);
    }
  
    @Delete()
    @UseGuards(AuthGuard())
    @ApiOperation({
      summary: 'Deleção do usuário logado/autenticado',
    })
    @ApiBearerAuth()
    delete(@LoggedUser() user: User) {
      return this.usersService.delete(user.id);
    }



}
