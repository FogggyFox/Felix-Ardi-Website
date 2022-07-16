import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { description, Prisma } from '@prisma/client';

@Injectable()
export class DescriptionService {
  constructor(private prisma: PrismaService) {}

  async Description(
    descriptionWhereUniqueInput: Prisma.descriptionWhereUniqueInput,
  ): Promise<description | null> {
    return this.prisma.description.findUnique({
      where: descriptionWhereUniqueInput,
    });
  }

  async Descriptions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.descriptionWhereUniqueInput;
    where?: Prisma.descriptionWhereInput;
    orderBy?: Prisma.descriptionOrderByWithRelationInput;
  }): Promise<description[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.description.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDescription(data: Prisma.descriptionCreateInput): Promise<description> {
    return this.prisma.description.create({
      data,
    });
  }

  async updateDescription(params: {
    where: Prisma.descriptionWhereUniqueInput;
    data: Prisma.descriptionUpdateInput;
  }): Promise<description> {
    const { where, data } = params;
    return this.prisma.description.update({
      data,
      where,
    });
  }

  async deleteDescription(where: Prisma.descriptionWhereUniqueInput): Promise<description> {
    return this.prisma.description.delete({
      where,
    });
  }
}