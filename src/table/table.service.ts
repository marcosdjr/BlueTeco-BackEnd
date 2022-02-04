import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateTableDto } from './dto/create-table.dto';
  import { PrismaService } from 'src/prisma.service';
  import { Table, User } from '@prisma/client';
  import { TableDto } from './dto/table.dto';
  import { UpdateTableDto } from './dto/update-table.dto';
  import { UpdateMenusTableDto } from './dto/update-menu.dto';
  import { UpdateUsersTableDto } from './dto/update-user.dto';
  
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class TableService {
    constructor(private prismaService: PrismaService) {}
  
    async create( createTableDto: CreateTableDto, userId: number): Promise<Table> {

      const tableExists = await this.prismaService.table.findUnique({
        where: { number: createTableDto.number,},
      });
  
      if (tableExists) {
        throw new ConflictException('Mesa já cadastrada.');
      }
    
      const createdTable = await this.prismaService.table.create({
        data: {
          number: createTableDto.number,
          total: createTableDto.total,
            users: {
              connect: {
              id: userId,
            },
          },
        },
        include: {
          menus: true,
          users: true,
        },
      });
  
      return createdTable;
    }
  
    async findMany(): Promise<TableDto[]> {
      const completeTable = await this.prismaService.table.findMany({
        select: {
          id: true,
          number: true,
          total: true,
          users: true,
          menus: true,
        },
      });
      return completeTable;
    }
  
    async findUnique(tableId: number): Promise<Table> {
      const itemFinded = await this.prismaService.table.findUnique({
        where: {
          id: Number(tableId),
        },
      });
  
      if (!itemFinded) {
        throw new NotFoundException('Mesa não encontrada.');
      }
  
      return itemFinded;
    }
  
    async updateMenus(id: number, updateMenusTableDto: UpdateMenusTableDto): Promise<Table> {
      const { disconnectItem, menuId, } = updateMenusTableDto;
    
      const numberFinded = await this.prismaService.table.findFirst({
        where: {
          id: Number(id),
        },
      });
      

  
      if (!numberFinded) {
        throw new NotFoundException('Mesa não encontrada.');
      }
  
      if (disconnectItem === true) {
        return await this.prismaService.table.update({
          where: {
            id: Number(id),
          },
          data: {
            menus: {
              disconnect: {
                id: menuId,
              },
            },
          },
          include: {
            menus: true,
            users: true,
          },
        });
      }

      return await this.prismaService.table.update({
        where: {
          id: Number(id),
        },
        data: {
          menus: {
            connect: {
              id: menuId,
            },
          },
        },
        include: {
          menus: true,
          users: true,
        },
      }); 
    }
  


    async updateUsers(id: number, updateUsersTableDto: UpdateUsersTableDto): Promise<Table> {
      const { disconnectUser, userId, } = updateUsersTableDto;
    
      const numberFinded = await this.prismaService.table.findFirst({
        where: {
          id: Number(id),
        },
      });
      
  
      if (!numberFinded) {
        throw new NotFoundException('Mesa não encontrada.');
      }
  
      // if (updateMenusTableDto.number) {
      //   const itemExists = await this.prismaService.table.findFirst({
      //     where: {
      //       number: updateTableDto.number,
      //     },
      //   });
  
      //   if (itemExists) {
      //     throw new ConflictException('Mesa já cadastrada!');
      //   }
      // }
      if (disconnectUser === true) {
        return await this.prismaService.table.update({
          where: {
            id: Number(id),
          },
          data: {
            users: {
              disconnect: {
                id: userId,
              },
            },
          },
          include: {
            menus: true,
            users: true,
          },
        });
      }
  
      return await this.prismaService.table.update({
        where: {
          id: Number(id),
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          menus: true,
          users: true,
        },
      });
    }



    async updateTotal(id: number, updateTableDto: UpdateTableDto): Promise<Table>  {
    const orderedItems = await this.prismaService.table.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        menus: {
          select: {
            price: true,
          },
        },
        // total: true,
      },
    });
    
 
    const total = await this.prismaService.table.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        total: true,
      },
    });
    console.log(total);

    const priceList: number[] = [];

    orderedItems.menus.map((i: any) => priceList.push(i.menus.price));

    const totalPrice = Number((priceList.reduce((a, b) => a + b, 0)).toFixed(2));

    return await this.prismaService.table.update({
      where: {
        id: Number(id),
      },
      data: {
        total: totalPrice,
      },
    });
  }

















    async delete(tableId: number) {
      const tableFinded = await this.prismaService.table.findUnique({
        where: {
          id: Number(tableId),
        },
      });
  
      if (!tableFinded) {
        throw new NotFoundException('Mesa não encontrada.');
      }
  
      const deletedTable = await this.prismaService.table.delete({
        where: {
          id: Number(tableId),
        },
      });
 
      return deletedTable;
    }
  }
  






















  // async updateMenus(id: number, updateMenusTableDto: UpdateMenusTableDto): Promise<Table> {
  //   const numberFinded = await this.prismaService.table.findFirst({
  //     where: {
  //       id: Number(id),
  //     },
  //   });
    

  //   if (!numberFinded) {
  //     throw new NotFoundException('Mesa não encontrada.');
  //   }

  //   if (updateMenusTableDto.number) {
  //     const itemExists = await this.prismaService.table.findFirst({
  //       where: {
  //         number: updateTableDto.number,
  //       },
  //     });

  //     if (itemExists) {
  //       throw new ConflictException('Mesa já cadastrada!');
  //     }
  //   }

  //   const updatedTable = await this.prismaService.table.update({
  //     where: { id: Number(id) },
  //     data: {
  //       number: updateTableDto.number,
  //       total: updateTableDto.total,
  //       menus: {
  //         connect: {
  //           id: updateTableDto.menuId, 
  //         },
  //       },
  //       users: {
  //         connect: {
  //           id: updateTableDto.userId,
  //         },
  //       },
  //     },
  //   });
 
  //   return updatedTable;
  // }