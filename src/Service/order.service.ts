import { Injectable } from '@nestjs/common';
import { GroupBuy } from '../Entity/group-buy.entity';

@Injectable()
export class OrderService {
  private groupBuys: GroupBuy[] = [];

  // Find an active group buy for a provider
  private findActiveGroupBuy(providerId: string): GroupBuy | undefined {
    return this.groupBuys.find((gb) => gb.providerId === providerId);
  }

  // Create a new group buy
  private createGroupBuy(providerId: string): GroupBuy {
    const newGroupBuy: GroupBuy = {
      id: (this.groupBuys.length + 1).toString(), // Generate a random ID
      providerId,
      participants: [],
    };
    this.groupBuys.push(newGroupBuy);
    return newGroupBuy;
  }

  // Handle joining or creating a group buy
  joinOrCreateGroupBuy(userId: string, providerId: string): GroupBuy {
    // Check if an active group exists for the provider
    let groupBuy = this.findActiveGroupBuy(providerId);

    if (!groupBuy) {
      // No active group exists, create a new one
      groupBuy = this.createGroupBuy(providerId);
    }

    // Add the user to the group buy
    if (groupBuy.participants.includes(userId)) {
      throw new Error('User already joined this group buy');
    }

    groupBuy.participants.push(userId);
    return groupBuy;
  }
}
