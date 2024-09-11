export class TimeBasedCache<T> {
    private cache: Map<string, { value: T; timestamp: number }>;
    private maxAge: number;

    constructor(maxAge: number = 60000) { // maxAge in milliseconds, default is 60 seconds
        this.cache = new Map<string, { value: T; timestamp: number }>();
        this.maxAge = maxAge;
    }

    /* Every time a value is read, check if it's expired. */
    public get(key: string): T | undefined {
        const entry = this.cache.get(key);

        if (!entry) return;

        const currentTime = Date.now();
        if (currentTime - entry.timestamp > this.maxAge) {
            this.cache.delete(key);
            return; // Return undefined if the entry is expired
        }

        // put it again in top of cache with renewed timestamp
        this.cache.delete(key);
        this.cache.set(key, { value: entry.value, timestamp: currentTime });

        return entry.value;
    }

    /* Add a new entry or update the timestamp if it already exists. */
    public set(key: string, value: T): boolean {
        const currentTime = Date.now();
        this.cache.set(key, { value, timestamp: currentTime });

        // Clean up expired entries when setting a new value
        this.cleanup();

        return true;
    }

    /* Removes expired entries from the cache. */
    private cleanup(): void {
        const currentTime = Date.now();

        for (const [key, entry] of this.cache.entries()) {
            if (currentTime - entry.timestamp > this.maxAge) {
                this.cache.delete(key);
            }
        }
    }

    public length(): number {
        return this.cache.size;
    }
}
