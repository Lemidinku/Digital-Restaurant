import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/schemas/Order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const lastOrder = await this.OrderModel.findOne().sort({ id: -1 }).exec();
    const nextId = lastOrder ? +lastOrder.id + 1 : 1;
    try {
      const createdOrder = new this.OrderModel({
        ...createOrderDto,
        id: nextId,
      });
      return createdOrder.save();
    } catch (error) {
      throw new Error(`Error updating user with id: ${error.message}`);
    }
  }

  async filter(id: object) {
    try {
      const orders = await this.OrderModel.find(id)
        .sort({ updatedAt: -1 })
        .exec();
      return orders;
    } catch (error) {
      throw new Error(`Error finding orders: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const orders = await this.OrderModel.find()
        .sort({ updatedAt: -1 })
        .exec();
      return orders;
    } catch (error) {
      throw new Error(`Error finding orders: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.OrderModel.findOne({ id }).exec();
    } catch (error) {
      throw new Error(`Error finding order with id ${id}: ${error.message}`);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const updatedOrder = await this.OrderModel.findOneAndUpdate(
        { id },
        updateOrderDto,
        { new: true },
      );
      return updatedOrder;
    } catch (error) {
      throw new Error(`Error updating order with id ${id}: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.OrderModel.findOneAndDelete({ id }).exec();
    } catch (error) {
      throw new Error(`Error deleting order with id ${id}: ${error.message}`);
    }
  }
}
