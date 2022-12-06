import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../helpers/util";

const httpLink = createHttpLink({
  uri: "https://wasteless-orchestrator.up.railway.app/",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getToken();
  console.log(token, "DARI CONFIG APOLLLOOOO");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  // uri: "https://wasteless-orchestrator.up.railway.app/",
  link: authLink.concat(httpLink),
  // uri: "https://24d6-139-228-111-125.ap.ngrok.io/",
  cache: new InMemoryCache(),
});

export default client;
