import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../db/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmployeeModule } from '../employee/employee.module';
import { CustomLoggerService } from 'src/config/logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    EmployeeModule
  ],
  providers: [
    CustomLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomLoggerService,
    }
  ],
  exports: [CustomLoggerService]
})
export class AppModule {}
