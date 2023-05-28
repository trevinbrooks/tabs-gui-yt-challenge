import { EventEmitter } from "./event-emitter";

export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}

export interface QueueEventMap<T> {
    add: T;
    remove: T;
    empty: undefined;
}

export class Queue<T> implements IQueue<T> {
    public events = new EventEmitter<QueueEventMap<T>>();
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) { }

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
        this.events.emit("add", item);
    }

    dequeue(): T | undefined {
        const remove = this.storage.shift();
        this.events.emit("remove", remove);
        if (this.size() === 0) this.events.emit("empty", undefined);
        return remove;
    }

    size(): number {
        return this.storage.length;
    }

    get empty(): boolean {
        return this.size() === 0;
    }
}