export interface HealthCheckResult {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  checks: HealthChecks;
}

export interface HealthChecks {
  database?: CheckStatus;
  memory?: CheckStatus;
  disk?: CheckStatus;
}

export interface CheckStatus {
  status: 'healthy' | 'unhealthy';
  message?: string;
  responseTime?: number;
}