import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from '../../entity/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeResponseDto } from './dto/employee-response.dto';
@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }
    
    @Get('auth/by-id/:id')
    @UseGuards(JwtAuthGuard)
    async getEmployee(@Param('id') id: number): Promise<EmployeeResponseDto[]> {
        return this.employeeService.getAllEmployee(id)
    }

    @Get('by-id/:id')
    async getAllEmployee(@Param('id') id: number): Promise<EmployeeResponseDto[]> {
        return this.employeeService.getAllEmployee(id);
    }

    @Post()
    async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeeService.create(createEmployeeDto);
    }
}
