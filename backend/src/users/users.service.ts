import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const hash = await bcrypt.hash(registerDto.password, saltOrRounds);

    const user: User = {
      firstname: registerDto.firstname,
      lastname: registerDto.lastname,
      username: registerDto.username,
      email: registerDto.email,
      roles: registerDto.roles,
      password: hash,
    };
    const createdUser = await this.userModel.create(registerDto);
    return createdUser;
  }

  async updatePasssword(email: any, newPassword: string): Promise<User | null> {
    const hash = await bcrypt.hash(newPassword, saltOrRounds);

    return this.userModel
      .findOneAndUpdate({ email: email }, { password: hash })
      .exec();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
