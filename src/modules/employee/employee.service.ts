import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from '../../entity/employee.entity';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { CustomLoggerService } from 'src/config/logger.service';

@Injectable()
export class EmployeeService {
    private readonly logger: CustomLoggerService
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,

        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getAllEmployee(id: number): Promise<EmployeeResponseDto[]> {
        try {
            const cachedKey = `employee_${id}`
            const cachedData = await this.cacheManager.get<EmployeeResponseDto[]>(cachedKey);
            if (cachedData) return cachedData;
            
            // find the positionId of given id
            const employee = await this.employeeRepository.findOne({ where: { id, isDeleted: false } });
            if (!employee) throw new InternalServerErrorException('No data found with given id');

            // fetch all employee where positionId is greater than the input positionId
            const allEmployees = await this.employeeRepository.createQueryBuilder('employee')
                .where("employee.position_id > :position_id", { position_id: employee.position_id })
                .orderBy("employee.position_id", "ASC")
                .getMany();

            // build child employees
            const employeeMap = new Map<number, any>();
            allEmployees.forEach(employee => employeeMap.set(employee.id, { ...employee, children: [] }));

            const result = allEmployees.map(employee => {
                const children = allEmployees
                    .filter(childrenMembers => childrenMembers.position_id > employee.position_id)
                    .map(childrenMembers => ({
                        ...childrenMembers,
                        children: buildChildrenStructure(childrenMembers, allEmployees)
                    }));
                return { ...employee, children };
            });

            function buildChildrenStructure(children, employees) {
                return employees
                    .filter(childEmployees => childEmployees.position_id > children.position_id)
                    .map(childEmployees => ({
                        ...childEmployees,
                        children: buildChildrenStructure(childEmployees, employees)
                    }));
            }

            //set cache
            await this.cacheManager.set(cachedKey, result, 60000 );
            return result;
        } catch (error) {
            this.logger.error('Failed to fetch employee', error.stack);
            throw new InternalServerErrorException('Failed to fetch employee');
        }
    }

    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        try {
            const employee = this.employeeRepository.create(createEmployeeDto);
            this.logger.debug('Employee created for: ')
            return await this.employeeRepository.save(employee);
        } catch (error) {
            this.logger.error('Failed to create employee', error.stack);
            throw new InternalServerErrorException('Failed to create employee');
        }
    }
}
