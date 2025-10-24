import { Injectable } from '@nestjs/common';
import { HealthCheckResult, CheckStatus } from '../domain/health-check.interface';

@Injectable()
export class HealthCheckService {
  private readonly startTime: number = Date.now();

  async checkHealth(): Promise<HealthCheckResult> {
    const checks = await this.performChecks();
    const overallStatus = this.determineOverallStatus(checks);

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: this.getUptimeInSeconds(),
      checks,
    };
  }

  private async performChecks() {
    const [database, memory] = await Promise.all([
      this.checkDatabase(),
      this.checkMemory(),
    ]);

    return {
      database,
      memory,
    };
  }

  private async checkDatabase(): Promise<CheckStatus> {
    const startTime = Date.now();
    
    try {
      // Simula un health check de base de datos
      // En producción, aquí harías una query simple como SELECT 1
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const responseTime = Date.now() - startTime;

      return {
        status: 'healthy',
        message: 'Database connection is active',
        responseTime,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error instanceof Error ? error.message : 'Database check failed',
        responseTime: Date.now() - startTime,
      };
    }
  }

  private async checkMemory(): Promise<CheckStatus> {
    try {
      const usage = process.memoryUsage();
      const usedMemoryMB = Math.round(usage.heapUsed / 1024 / 1024);
      const totalMemoryMB = Math.round(usage.heapTotal / 1024 / 1024);
      const percentageUsed = (usedMemoryMB / totalMemoryMB) * 100;

      const isHealthy = percentageUsed < 90;

      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        message: `Memory usage: ${usedMemoryMB}MB / ${totalMemoryMB}MB (${percentageUsed.toFixed(1)}%)`,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Failed to check memory',
      };
    }
  }

  private determineOverallStatus(checks: any): 'ok' | 'degraded' | 'error' {
    const statuses = Object.values(checks).map((check: any) => check.status);

    if (statuses.every(status => status === 'healthy')) {
      return 'ok';
    }

    if (statuses.some(status => status === 'unhealthy')) {
      return 'error';
    }

    return 'degraded';
  }

  private getUptimeInSeconds(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}