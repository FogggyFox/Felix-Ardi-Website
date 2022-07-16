import { Get, Post, Controller, Body, UseGuards } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { description as descriptionModel } from '@prisma/client';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DescriptionDTO } from './DTO/description.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Descriptions')
@Controller('descriptions')
export class DescriptionController {

    constructor(
        private readonly descriptionService: DescriptionService
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
                    description: {
                        type: "string"
                    },
                    userId: {
                        type: "number"
                    }
                }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getdescriptions(): Promise<descriptionModel[]> {
        return await this.descriptionService.Descriptions({ where: { userId: 1 } });
    }

    @ApiCreatedResponse({ description: 'Success created description'})
    @ApiBadRequestResponse({description: "description is not fulfilled"})
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async adddescription(
        @Body() descriptionData: DescriptionDTO
    ): Promise<descriptionModel> {
        return await this.descriptionService.createDescription({ ...descriptionData, user: { connect: { id: 1 } } });
    }

}