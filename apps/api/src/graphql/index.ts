import { loadFilesSync } from '@graphql-tools/load-files';
import formResolver from './forms/resolvers';

export const typeDefs = loadFilesSync('src/graphql/**/*.graphql');

export const resolvers = [formResolver];