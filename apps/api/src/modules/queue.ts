import { Queue, Worker } from 'bullmq';
import ModGenerate from './generate';
import Redis from 'ioredis';

const QUEUE_NAME = 'default';

if (!process.env.REDIS_URL) console.warn('REDIS_URL not found! please check your env variables');
const redisClient = new Redis(process.env.REDIS_URL as string);

export const queue = new Queue(QUEUE_NAME, { connection: redisClient });

const worker = new Worker(QUEUE_NAME, async (job) => {
    if (job.name === 'generateSubmission') {
        const submission = ModGenerate.submission();
        console.log({ submission });
    }
}, { connection: redisClient });

type JobType = 'generateSubmission';

export const enqueue = (job: JobType, data?: any) => {
    queue.add(job, data);
};
