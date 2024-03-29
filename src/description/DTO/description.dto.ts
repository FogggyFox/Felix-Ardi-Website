import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from 'class-validator';

export class DescriptionDTO {

    @ApiProperty()
    @IsNotEmpty()
    readonly description: string
}