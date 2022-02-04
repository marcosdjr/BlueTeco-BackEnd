import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { LoggedUser } from './logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Perfil logado',
  })
  @ApiBearerAuth()
  me(@LoggedUser() user: User) {
    return user;
  }

  @Post()
  @ApiOperation({
    summary: 'Fazer login no App',
  })
  login(@Body() loginInputDto: LoginInputDto): Promise<LoginResponseDto> {
    return this.authService.login(loginInputDto);
  }

}
