import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://wasteless-orchestrator.up.railway.app/",
  cache: new InMemoryCache(),
});

export default client;
