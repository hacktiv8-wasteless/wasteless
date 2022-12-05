import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://wasteless-orchestrator.up.railway.app/",
  uri: "https://24d6-139-228-111-125.ap.ngrok.io/",
  cache: new InMemoryCache(),
});

export default client;
