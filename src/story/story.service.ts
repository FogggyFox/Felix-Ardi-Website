import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { story, Prisma } from '@prisma/client';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async Story(
    storyWhereUniqueInput: Prisma.storyWhereUniqueInput,
  ): Promise<story | null> {
    return this.prisma.story.findUnique({
      where: storyWhereUniqueInput,
    });
  }

  async Stories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.storyWhereUniqueInput;
    where?: Prisma.storyWhereInput;
    orderBy?: Prisma.storyOrderByWithRelationInput;
  }): Promise<story[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.story.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createStory(data: Prisma.storyCreateInput): Promise<story> {
    return this.prisma.story.create({
      data,
    });
  }

  async updateStory(params: {
    where: Prisma.storyWhereUniqueInput;
    data: Prisma.storyUpdateInput;
  }): Promise<story> {
    const { where, data } = params;
    return this.prisma.story.update({
      data,
      where,
    });
  }

  async deleteStory(where: Prisma.storyWhereUniqueInput): Promise<story> {
    return this.prisma.story.delete({
      where,
    });
  }
}