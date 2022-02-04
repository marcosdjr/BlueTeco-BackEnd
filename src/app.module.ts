import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { UsersModule } from './users/users.module';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, MenuModule, TableModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
