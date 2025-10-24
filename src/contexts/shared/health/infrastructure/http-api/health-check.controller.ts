import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { HealthCheckService } from '../../application/health-check.service';

@Controller('health')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async check(@Res() res: Response) {
    const healthCheck = await this.healthCheckService.checkHealth();

    const statusCode = this.getHttpStatusCode(healthCheck.status);

    return res.status(statusCode).json(healthCheck);
  }

  @Get('live')
  async liveness() {
    // Liveness probe - verifica si la app está viva
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  async readiness(@Res() res: Response) {
    // Readiness probe - verifica si puede recibir tráfico
    const healthCheck = await this.healthCheckService.checkHealth();
    const statusCode = this.getHttpStatusCode(healthCheck.status);

    return res.status(statusCode).json({
      status: healthCheck.status,
      timestamp: healthCheck.timestamp,
    });
  }

  private getHttpStatusCode(status: 'ok' | 'degraded' | 'error'): number {
    switch (status) {
      case 'ok':
        return HttpStatus.OK;
      case 'degraded':
        return HttpStatus.OK; // Aún funcional
      case 'error':
        return HttpStatus.SERVICE_UNAVAILABLE;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}