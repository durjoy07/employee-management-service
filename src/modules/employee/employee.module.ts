import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entity/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), CacheModule.register({isGlobal: true})],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
