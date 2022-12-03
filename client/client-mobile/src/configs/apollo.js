import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://5b0f-118-136-185-211.ap.ngrok.io/",
  cache: new InMemoryCache(),
});

export default client;
