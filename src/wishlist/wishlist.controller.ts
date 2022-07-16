import { Get, Post, Controller, Body, UseGuards, Request, HttpException, HttpStatus, Param, UseFilters } from '@nestjs/common';
import { WishListService } from './wishlist.service';
import { wishList as WishListModel, wishList } from '@prisma/client';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WishListDTO } from './DTO/wishlist.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('wishList')
@Controller('wishList')
export class WishListController {

    constructor(
        private readonly wishListService: WishListService,
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
                    wishes: {
                        type: "string"
                    },
                    place:{
                        type: "string"
                    },
                    userId: {
                        type: "number"
                    }
                }
            }
        }
    })
    @UseFilters(HttpExceptionFilter)
    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getWishList(@Request() req): Promise<WishListModel[]> {
        let request = await this.wishListService.WishLists({ where: { userId: req.user.id }})
        if (request == null) {
            throw new HttpException("no wishlists", HttpStatus.I_AM_A_TEAPOT)
        }
        return request
    }

    @ApiCreatedResponse({
        description: 'Success created wish', schema: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                },
                wishes: {
                    type: "string"
                },
                place:{
                    type: "string"
                },
                userId: {
                    type: "number"
                }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addWishList(
        @Body() wishListData: WishListDTO,
        @Request() req,
    ): Promise<WishListModel> {
        return await this.wishListService.createWishList({ ...wishListData, user: { connect: { id: Number(req.user.id) } } });
    }


    @ApiInternalServerErrorResponse({description: "server error"})
    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateWishList(
        @Body() wishListData: WishListDTO,
        @Request() req
    ): Promise<wishList | null> {
        return await this.wishListService.updateWishList({
            where: {
                place: wishListData.place
            },
            data: {
                wishes: wishListData.wishes,
                place: wishListData.place,
                user: { connect: { id: Number(req.user.id) } }
            }
        })
    }
}