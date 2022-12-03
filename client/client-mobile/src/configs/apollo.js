import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://p3-challenge-2-production-c611.up.railway.app/",
  cache: new InMemoryCache(),
});

export default client;
