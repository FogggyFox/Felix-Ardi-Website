import { Get, Post, Controller, Body, Request, UseGuards } from '@nestjs/common';
import { StoryService } from './story.service';
import { story as storyModel } from '@prisma/client';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoryDTO } from './DTO/story.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('stories')
@Controller('Stories')
export class StoryController {

    constructor(
        private readonly storyService: StoryService
    ) { }

    @ApiOkResponse({
        schema: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    name: {
                        type: "string"
                    },
                    date: {
                        type: "string"
                    },
                    genre: {
                        type: "string"
                    },
                    state: {
                        type: "string"
                    },
                    link: {
                        type: "string | null"
                    },
                }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getStories(@Request() req): Promise<storyModel[]> {
        return await this.storyService.Stories({ where: { userId: req.user.id } });
    }

    @ApiCreatedResponse({ description: 'Success created story'})
    @ApiBadRequestResponse({description: "story is not fulfilled"})
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addStory(
        @Body() storyData: StoryDTO,
        @Request() req
    ): Promise<storyModel> {
        return await this.storyService.createStory({ ...storyData, user: { connect: { id: req.user.id } } });
    }

}