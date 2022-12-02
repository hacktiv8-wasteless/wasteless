import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://b8ff-139-228-111-125.ap.ngrok.io/",
  cache: new InMemoryCache(),
});

export default client;
