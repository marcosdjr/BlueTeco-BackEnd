import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards, } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from '@prisma/client';
import { MenuDto } from './dto/menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Criar um item do menu',
  })
  @ApiBearerAuth()
  create(
    @Body() createMenuDto: CreateMenuDto,
  ): Promise<Menu> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar os itens disponíveis no menu',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findMany(): Promise<MenuDto[]> {
    return this.menuService.findMany();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar um item do menu pelo seu ID.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUnique(@Param('id') menuId: number): Promise<Menu> {
    return this.menuService.findUnique(menuId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Atualizar o item pelo id.',
  })
  @ApiBearerAuth()
  update(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Deletar o item do menu',
  })
  @ApiBearerAuth()
  delete(@Param('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }


}
