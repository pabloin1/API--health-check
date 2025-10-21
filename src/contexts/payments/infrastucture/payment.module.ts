import { Module } from '@nestjs/common';
import { CreatePaymentController } from './http-api/create-payment/create-payment.controller';
import { CreatePaymentUseCase } from '../application/create-payment-use-case/createPaymentUseCase';
import { InMemoryPaymentRepository } from './repositories/in-memory.payment.repository';
import { PaymentRepository } from '../domain/payment.repository';
import { GetByIdUserUseCase } from '../application/getByIdUserUseCase/getByIdUserUseCase';
import { GetByIdPaymentController } from './http-api/get-by-id-payment/getByIdUser.controller';

@Module({
  controllers: [CreatePaymentController, GetByIdPaymentController],
  providers: [
    CreatePaymentUseCase,
    GetByIdUserUseCase,
    InMemoryPaymentRepository,
    { provide: PaymentRepository, useExisting: InMemoryPaymentRepository },
  ],
  exports: [CreatePaymentUseCase],
})
export class PaymentModule {}
