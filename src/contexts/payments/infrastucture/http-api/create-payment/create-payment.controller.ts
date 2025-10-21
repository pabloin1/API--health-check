import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../../application/create-payment-use-case/createPaymentUseCase';
import { CreatePaymentHttpDto } from './create-payment.http.dto';
import { PaymentInterface } from 'src/contexts/payments/domain/payment.entity';

@Controller('payments')
export class CreatePaymentController {

    constructor(private readonly createPaymentUseCase :CreatePaymentUseCase){}

    
    @Post()
    async run(@Body() createPaymentHttpDto: CreatePaymentHttpDto):Promise<{payment: PaymentInterface}>{
        return await this.createPaymentUseCase.execute(createPaymentHttpDto)
    }
    
}