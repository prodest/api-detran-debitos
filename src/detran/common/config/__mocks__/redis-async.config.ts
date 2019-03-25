const Redis = require('redis-mock');

const RedisHost: string = process.env.REDIS_HOST || '127.0.0.1';
const RedisPort: number = parseInt(process.env.REDIS_PORT) || 6379;

export class RedisAsync {
    readonly client: any;
    constructor() {
        this.client = Redis.createClient();
    }
}
