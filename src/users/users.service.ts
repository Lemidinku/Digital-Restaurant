import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const lastUser = await this.UserModel.findOne().sort({ id: -1 }).exec();
    const nextId = lastUser ? +lastUser.id + 1 : 1;

    const createdUser = new this.UserModel({
      ...createUserDto,
      id: nextId,
    });
    return createdUser.save();
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    options?: any,
  ): Promise<User | null> {
    try {
      return await this.UserModel.findOneAndUpdate(
        { id: id },
        updateUserDto,
        options,
      );
    } catch (error) {
      throw new Error(`Error updating user with id ${id}: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.UserModel.findOne({ id: id });
    } catch (error) {
      throw new Error(`Error finding user with id ${id}: ${error.message}`);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      // Remove user logic here
      return `This action removes a #${id} user`;
    } catch (error) {
      throw new Error(`Error removing user with id ${id}: ${error.message}`);
    }
  }
}
