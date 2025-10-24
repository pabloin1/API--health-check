import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator"

export class CreatePaymentHttpDto {

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    amount!: number


    @IsUUID()
    @IsNotEmpty()
    customerId!: string
}