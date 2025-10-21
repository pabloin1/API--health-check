import { Module } from '@nestjs/common';
import { PaymentModule } from './contexts/payments/infrastucture/payment.module';

@Module({
  imports: [PaymentModule]
})
export class AppModule {}
