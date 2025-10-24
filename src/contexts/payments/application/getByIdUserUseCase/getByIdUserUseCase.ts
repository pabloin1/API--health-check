import { Payment, PaymentInterface } from "../../domain/payment.entity";
import { PaymentRepository } from "../../domain/payment.repository";
import { PaymentNotFoundException } from "../../domain/payment-not-found.exception";
import { GetByIdUserUseCaseDtoInterface } from "./getbyIdUseCase.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class GetByIdUserUseCase {

    constructor(private readonly paymentRepository: PaymentRepository){}

    async execute(getByIdUserUseCaseDtoInterface:GetByIdUserUseCaseDtoInterface): Promise<{payment: PaymentInterface}> {
        const payment = await this.paymentRepository.getById(getByIdUserUseCaseDtoInterface.id)

       if(!payment) throw new PaymentNotFoundException(getByIdUserUseCaseDtoInterface.id)
       

        return {payment: payment.toValue()}
    }
}
