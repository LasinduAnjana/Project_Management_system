import {
  Controller,
  Request,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.usersService.create(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('reset-password')
  @HttpCode(200)
  async passwordReset(@Request() req: any) {
    return this.authService.resetPassword(req.user, req.Body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-details')
  async getUserDetails(@Request() req: any) {
    return req.user;
  }
}
