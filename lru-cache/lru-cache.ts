/*
    LRU cache is a kind of cache that removes the least used value. Every time a new input is set,
    the mechanism has to delete the oldest value in list to keep its length at a maximum value.
    Normally, LRU caches are implemented using Double-Linked-Lists or Hash Maps.
    This implementation uses the Javascript Hash Map to manage the values.
*/

/**
 * maxItems: The length of the cache. When it's reached, the first position of hash map will be deleted.
 * T: A generic to represent the structure of the values. Can be a simples and builtin JS value or a user defined structure.
 */
export class LRUCache<T> {
    private cache: Map<string, T>;
    private maxItems: number;

    constructor(maxItems: number = 20) {
        this.cache = new Map<string, T>();
        this.maxItems = maxItems;
    }

    /* Every time a value is read, it's put again in top of the cache to represent it's the most recent read. */
    public get(key: string): T | undefined {
        const hasKey = this.cache.has(key);

        if (!hasKey) return;

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value!);

        return value;
    }

    /* If the maxItems is reached, delete the oldest registry. */
    public set(key: string, value: T): boolean {
        this.cache.set(key, value);

        if (this.maxItems < this.cache.size) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        return true;
    }

    public length(): number {
        return this.cache.size;
    }
}
