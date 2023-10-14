import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(user: any, requestDto: UpdatePasswordDto) {
    this.usersService.updatePasssword(user.email, requestDto.newPassword);
    return this.login(user);
  }
}
