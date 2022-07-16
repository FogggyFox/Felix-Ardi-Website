import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from 'class-validator';

export class StoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    readonly date: string

    @ApiProperty()
    @IsNotEmpty()
    readonly genre: string

    @ApiProperty()
    @IsNotEmpty()
    readonly state: string

    @ApiProperty()
    readonly link: string | null
}