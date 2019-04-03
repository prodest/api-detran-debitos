import * as apicache from 'apicache';

const redis = require('redis-mock');
const RedisHost: string = process.env.REDIS_HOST || '127.0.0.1';
const RedisPort: number = parseInt(process.env.REDIS_PORT) || 6379;

export class RedisConfig {
  constructor(
    readonly host: string = RedisHost,
    readonly port: number = RedisPort,
    readonly client = redis.createClient(port, host),
    readonly cacheWithRedis = apicache.options({ redisClient: client })
      .middleware,
  ) {}
}
