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
export declare class Queue<T> implements IQueue<T> {
    private capacity;
    events: EventEmitter<QueueEventMap<T>>;
    private storage;
    constructor(capacity?: number);
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
    get empty(): boolean;
}
