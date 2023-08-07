import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:8000/graphql',
    documents: 'src/**/*.{ts,tsx}',
    generates: {
        'src/generated/': {
            plugins: [],
            preset: 'client'
        },
    },
}

export default config