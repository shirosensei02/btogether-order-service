import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OrderService } from '../Service/order.service';

@Controller('group-buy')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('join-or-create')
  async joinOrCreateGroupBuy(
    @Body() payload: { userId: string; providerId: string },
  ) {
    try {
      const { userId, providerId } = payload;
      return this.orderService.joinOrCreateGroupBuy(userId, providerId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
