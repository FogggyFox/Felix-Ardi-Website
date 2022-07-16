import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { wishList, Prisma } from '@prisma/client';

@Injectable()
export class WishListService {
  constructor(private prisma: PrismaService) {}

  async WishList(
    wishListWhereUniqueInput: Prisma.wishListWhereUniqueInput,
  ): Promise<wishList | null> {
    return this.prisma.wishList.findUnique({
      where: wishListWhereUniqueInput,
    });
  }

  async WishLists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.wishListWhereUniqueInput;
    where?: Prisma.wishListWhereInput;
    orderBy?: Prisma.wishListOrderByWithRelationInput;
  }): Promise<wishList[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wishList.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWishList(data: Prisma.wishListCreateInput): Promise<wishList> {
    return this.prisma.wishList.create({
      data,
    });
  }

  async updateWishList(params: {
    where: Prisma.wishListWhereUniqueInput;
    data: Prisma.wishListUpdateInput;
  }): Promise<wishList> {
    const { where, data } = params;
    return this.prisma.wishList.update({
      data,
      where,
    });
  }

  async deleteWishList(where: Prisma.wishListWhereUniqueInput): Promise<wishList> {
    return this.prisma.wishList.delete({
      where,
    });
  }
}