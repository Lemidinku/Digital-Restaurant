import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from 'src/schemas/Meal.schema';
import { Model } from 'mongoose';

@Injectable()
export class MealsService {
  constructor(@InjectModel(Meal.name) private MealModel: Model<Meal>) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const lastMeal = await this.MealModel.findOne().sort({ id: -1 }).exec();
    const nextId = lastMeal ? +lastMeal.id + 1 : 1;

    const createdMeal = new this.MealModel({
      ...createMealDto,
      id: nextId,
    });
    return createdMeal.save();
  }

  async update(
    id: number,
    updateMealDto: UpdateMealDto,
    options?: any,
  ): Promise<Meal | null> {
    try {
      return await this.MealModel.findOneAndUpdate(
        { id: id },
        updateMealDto,
        options,
      );
    } catch (error) {
      throw new Error(`Error updating user with id ${id}: ${error.message}`);
    }
  }

  findAll() {
    return this.MealModel.find();
  }

  findOne(id: number) {
    return this.MealModel.findOne({ id: id });
  }

  remove(id: number) {
    return this.MealModel.deleteOne({ id: id });
  }
}
