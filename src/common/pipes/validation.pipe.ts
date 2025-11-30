import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};

export const GlobalValidationPipe = new ValidationPipe(VALIDATION_PIPE_OPTIONS);
