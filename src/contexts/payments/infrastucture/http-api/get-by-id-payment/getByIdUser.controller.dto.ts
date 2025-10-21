import { IsNotEmpty, IsString } from "class-validator";

export class GetByIdUserControllerDto{

    @IsNotEmpty()
    @IsString()
    id: string
}