import { Module } from '@nestjs/common';
import { PaymentModule } from './contexts/payments/infrastucture/payment.module';
import { SharedModule } from './contexts/shared/shared.module';

@Module({
  imports: [
    SharedModule,  // ← Agregar esta línea
    PaymentModule
  ]
})
export class AppModule {}