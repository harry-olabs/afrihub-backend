import { PickType } from '@nestjs/mapped-types';
import { SignUpAuthDto } from './signup-auth.dto';

export class LoginAuthDto extends PickType(SignUpAuthDto, [
  'email',
  'password',
] as const) {}
