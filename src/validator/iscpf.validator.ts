import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isValidCPF } from './validatecpf.validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return isValidCPF(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a cpf`;
        },
      },
    });
  };
}
