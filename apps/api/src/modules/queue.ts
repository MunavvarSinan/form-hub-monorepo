import { Queue, Worker } from 'bullmq';
import ModGenerate from './generate';

const QUEUE_NAME = 'default';

if(!process.env.REDIS_HOST) console.warn('REDIS_HOST not found! please check your env variables')
const connection  = {
    host : process.env.REDIS_HOST
}
export const queue = new Queue(QUEUE_NAME, { connection});

const worker = new Worker(QUEUE_NAME, async (job) => {
    if (job.name === 'generateSubmission') {
       const submission = ModGenerate.submission();
       console.log({submission})
    }
}, { connection});

type JobType = 'generateSubmission';

export const enqueue = ( job: JobType, data?: any ) => {
    queue.add(job, data);
}