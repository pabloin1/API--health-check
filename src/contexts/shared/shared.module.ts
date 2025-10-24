import { Module } from '@nestjs/common';
import { HealthCheckController } from './health/infrastructure/http-api/health-check.controller';
import { HealthCheckService } from './health/application/health-check.service';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
  exports: [HealthCheckService],
})
export class SharedModule {}