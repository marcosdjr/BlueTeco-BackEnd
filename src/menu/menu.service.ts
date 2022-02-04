import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateMenuDto } from './dto/create-menu.dto';
  import { PrismaService } from 'src/prisma.service';
  import { Menu } from '@prisma/client';
  import { MenuDto } from './dto/menu.dto';
  import { UpdateMenuDto } from './dto/update-menu.dto';
  
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class MenuService {
    constructor(private prismaService: PrismaService) {}
  
    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
      const menuItemExists = await this.prismaService.menu.findUnique({
        where: { item: createMenuDto.item },
      });
  
      if (menuItemExists) {
        throw new ConflictException('Item já cadastrado');
      }
    
      const createdMenu = await this.prismaService.menu.create({
        data: {
          ...createMenuDto,
        },
      });
  
      return createdMenu;
    }
  
    async findMany(): Promise<MenuDto[]> {
      const completeMenu = await this.prismaService.menu.findMany({
        select: {
          id: true,
          item: true,
          price: true,
          description: true,
          imageUrl: true,
        },
      });
      return completeMenu;
    }
  
    async findUnique(id: number): Promise<Menu> {
      const itemFinded = await this.prismaService.menu.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!itemFinded) {
        throw new NotFoundException('Item não encontrado no menu.');
      }
  
      return itemFinded;
    }
  
    async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
      const itemFinded = await this.prismaService.menu.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!itemFinded) {
        throw new NotFoundException('Item não encontrado no menu.');
      }
  
      if (updateMenuDto.item) {
        const itemExists = await this.prismaService.menu.findUnique({
          where: {
            item: updateMenuDto.item,
          },
        });
  
        if (itemExists) {
          throw new ConflictException('Item já cadastrado!');
        }
      }
  
      const updatedMenu = await this.prismaService.menu.update({
        where: { id: Number(id) },
        data: {
          item: updateMenuDto.item,
          price: updateMenuDto.price,
          description: updateMenuDto.description,
          imageUrl: updateMenuDto.imageUrl,
        },
      });
   
      return updatedMenu;
    }
  
    async delete(id: number) {
      const menuFinded = await this.prismaService.menu.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!menuFinded) {
        throw new NotFoundException('Item não encontrado.');
      }
  
      const orderedMenus = await this.prismaService.table.findMany({
        select: {
          menus: {
            where: { id: Number(id) },
          },
        },
      });

      orderedMenus.map((obj) => {
        if (obj.menus.length > 0) {
          throw new ConflictException(
            'Item consta em mesa aberta, não é possível excluí-lo no momento.',
          );
        }
      });


      const deletedMenu = await this.prismaService.menu.delete({
        where: {
          id: Number(id),
        },
      });
 
      return deletedMenu;
    }
  }
  