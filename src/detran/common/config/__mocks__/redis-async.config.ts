const Redis = require('redis-mock');

export class RedisAsync {
    readonly client: any;
    constructor() {
        this.client = Redis.createClient();
    }
}
