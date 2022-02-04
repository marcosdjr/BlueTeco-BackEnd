import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards, } from '@nestjs/common';
import { TableService } from './table.service';
import { Table, User } from '@prisma/client';
import { TableDto } from './dto/table.dto';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { UpdateMenusTableDto } from './dto/update-menu.dto';
import { UpdateUsersTableDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Criar uma mesa.',
  })
  @ApiBearerAuth()
  create(
    @Body() createTableDto: CreateTableDto, @LoggedUser() user: User,
  ): Promise<Table> {
    return this.tableService.create(createTableDto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar as mesas abertas',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findMany(): Promise<TableDto[]> {
    return this.tableService.findMany();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listar uma mesa pelo seu ID.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUnique(@Param('id') tableId: number): Promise<Table> {
    return this.tableService.findUnique(tableId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Atualizar valor total da mesa.',
  })
  @ApiBearerAuth()
  update(
    @Param('id') id: number,
    @Body() updateTableDto: UpdateTableDto,
  ): Promise<Table> {
    return this.tableService.updateTotal(id, updateTableDto);
  }


  @Patch('menus/:id')
  @ApiOperation({ summary: 'Altera os itens inseridos numa mesa.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  updateItens(
    @Param('id') id: number,
    @Body() updateMenusTableDto: UpdateMenusTableDto,
  ): Promise<Table> {
    return this.tableService.updateMenus(id, updateMenusTableDto);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Altera os usuários de uma mesa.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  updateUsers(
    @Param('id') id: number,
    @Body() updateUsersTableDto: UpdateUsersTableDto,
  ): Promise<Table> {
    return this.tableService.updateUsers(id, updateUsersTableDto);
  }



  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Deletar a mesa',
  })
  @ApiBearerAuth()
  delete(@Param('id') id: number): Promise<Table>  {
    return this.tableService.delete(id);
  }


}
