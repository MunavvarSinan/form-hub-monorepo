"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const URL = process.env.GRAPHQL_HOST ?
    `https://${process.env.GRAPHQL_HOST}/graphql`
    : "http://localhost:8000/graphql"
const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ApolloProvider client={client}>
            <div className="p-10 mt-10">
                {children}
            </div>
        </ApolloProvider>
    )
}