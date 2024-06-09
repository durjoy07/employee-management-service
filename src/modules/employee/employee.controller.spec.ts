import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeResponseDto } from './dto/employee-response.dto';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getAllEmployee: jest.fn(),
          },
        },
      ],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  describe('getAllEmployee', () => {
    it('should return an array of employees', async () => {
      const employeeId = 1;
      const result: EmployeeResponseDto[] = [
        {
          id: 2,
          name: 'Jane Smith',
          position_name: 'dev',
          position_id: 3,
          children: [
            {
              id: 4,
              name: 'Jane',
              position_name: 'dev',
              position_id: 5,
              children: [],
            },
          ],
        },
        {
          id: 3,
          name: 'Alice Johnson',
          position_name: 'dev',
          position_id: 5,
          children: [],
        },
      ];

      jest.spyOn(employeeService, 'getAllEmployee').mockResolvedValue(result);

      expect(await employeeController.getAllEmployee(employeeId)).toBe(result);
      expect(employeeService.getAllEmployee).toHaveBeenCalledWith(employeeId);
    });

    it('should handle exceptions', async () => {
      const employeeId = 1;
      const error = new Error('Test error');

      jest.spyOn(employeeService, 'getAllEmployee').mockRejectedValue(error);

      await expect(
        employeeController.getAllEmployee(employeeId)
      ).rejects.toThrow('Test error');
      expect(employeeService.getAllEmployee).toHaveBeenCalledWith(employeeId);
    });
  });
});
