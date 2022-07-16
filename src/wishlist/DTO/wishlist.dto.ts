import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from 'class-validator';

export class WishListDTO {
    @ApiProperty()
    @IsNotEmpty()
    readonly wishes: string

    @ApiProperty()
    @IsNotEmpty()
    readonly place: string
}