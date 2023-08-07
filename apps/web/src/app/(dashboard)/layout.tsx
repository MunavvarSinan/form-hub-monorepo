"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
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