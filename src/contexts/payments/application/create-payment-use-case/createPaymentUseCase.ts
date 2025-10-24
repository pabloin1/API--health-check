import { Payment, PaymentInterface } from './../../domain/payment.entity';
import { PaymentRepository } from "../../domain/payment.repository";
import { CreatePaymentDto } from "./create-payment.dto";
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePaymentUseCase{
    constructor(private readonly paymentRepository: PaymentRepository){}

    async execute(createPaymentDto: CreatePaymentDto):Promise<{payment: PaymentInterface}>{
        const payment = Payment.create(createPaymentDto)

        await this.paymentRepository.create(payment)

        return {
            payment: payment.toValue()
        }
    }
}