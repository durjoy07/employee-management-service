import { BadRequestException, ValidationPipe } from "@nestjs/common";

export const validationPipe = new ValidationPipe({
    transform: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(err => ({
        property: err.property,
        constraints: err.constraints,
      }));
      return new BadRequestException(formattedErrors);
    },
  })