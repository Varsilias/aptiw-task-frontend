import { createApp, h } from "vue";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";

const accessToken = localStorage.getItem("access_token");

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APP_GRAPHQL_URL,
  headers: {
    Authorization: "Bearer " + accessToken,
  },
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});

const app = createApp({
  setup() {
    provideApolloClient(apolloClient);
  },

  render: () => h(App),
});

app.use(router);
app.use(PrimeVue);

app.mount("#app");
