import { Injectable } from "@nestjs/common";
import { PaymentInterface, Payment } from "../../domain/payment.entity";
import { PaymentRepository } from "../../domain/payment.repository";

Injectable()
export class InMemoryPaymentRepository extends PaymentRepository {

    private payments: PaymentInterface[] = [];

    async create(Payment: Payment):Promise<void>{
        this.payments.push(Payment.toValue())
    }

    async getById(id: string): Promise<Payment | null> {
        const payment = this.payments.find(payment=>payment.id===id)
        return payment ? new Payment(payment) : null
    }
}