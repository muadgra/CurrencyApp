import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreatePartDto } from 'src/schemas/parts/parts.service';
import { ObjectSchema } from 'joi';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class ValidationPipe implements PipeTransform<any>{
  constructor() {}

  async transform(value: any, metadata: ArgumentMetadata) {
    
    console.log("works1");
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
        return value;
      }
      const object = plainToInstance(metadata.metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
      }
      console.log(value);
      console.log("works2");
      return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}