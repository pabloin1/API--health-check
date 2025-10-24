import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { GetByIdUserUseCase } from 'src/contexts/payments/application/getByIdUserUseCase/getByIdUserUseCase';
import { PaymentInterface } from 'src/contexts/payments/domain/payment.entity';
import { GetByIdUserControllerDto } from './getByIdUser.controller.dto';
import { PaymentNotFoundException } from 'src/contexts/payments/domain/payment-not-found.exception';

@Controller('payments')
export class GetByIdPaymentController {
  constructor(private readonly getByIdUserUseCase: GetByIdUserUseCase) {}

  @Get(':id')
  async run(
    @Param() params: GetByIdUserControllerDto,
  ): Promise<{ payment: PaymentInterface }> {
    try {
      return await this.getByIdUserUseCase.execute({
        id: params.id,
      });
    } catch (error) {
      if (error instanceof PaymentNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
