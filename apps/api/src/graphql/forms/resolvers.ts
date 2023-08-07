import GraphQLJSON from 'graphql-type-json';
import { GraphQLDate } from 'graphql-iso-date';
import db from '../../modules/db';
import { times } from 'lodash'
import { enqueue } from '../../modules/queue';


const formResolver = {
    JSON: GraphQLJSON,
    DateTime: GraphQLDate,

    Query: {
        submissions: () => {
            return db.submission.findMany({ orderBy: { submittedAt: 'desc' } });
        }
    },
    Mutation: {
        queueSubmissionGeneration: async (_: any, { count }: { count: number }) => {
            await Promise.all( // we have used Promise.all execute all promises in parallel
                times(count ?? 1).map(async () => {
                    await enqueue('generateSubmission')
                })
            )
            return true;
        }
    }
};

export default formResolver;