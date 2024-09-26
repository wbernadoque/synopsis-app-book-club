import {
  createRouter,
  createWebHistory,
  onBeforeRouteUpdate,
} from "vue-router";
import Home from "./components/recomendacoes/Home.vue";
import ResultadoPage from "./components/pages/ResultadoPage";
import PageNotFound from "./components/pages/PageNotFound";
import LandingA from "./components/pages/LandingA";
import LandingB from "./components/pages/LandingB";
import Faq from "./components/pages/Faq";
import Review from "./components/pages/Review";
import BookReview from "./components/pages/BookReview";
import Contato from "./components/pages/Contato";
import VerTudo from "./components/pages/VerTudo";
import LGPD from "./components/pages/LGPD";

const routes = [
  {
    path: "/",
    name: "Synopsis",
    component: Home,
  },
  {
    path: "/resenhas",
    name: "Review",
    component: Review,
  },
  {
    path: "/livro",
    name: "BookReview",
    component: BookReview,
    props: (route) => ({
      query: {
        q: route.query.q,
      },
    }),
  },
  {
    path: "/escolha-seu-livro",
    name: "Escolha seu livro",
    component: LandingA,
  },
  {
    path: "/assistente-de-leitura",
    name: "Vermelho, Branco e Sangue Azul",
    component: LandingB,
  },
  {
    path: "/search",
    name: "search",
    component: ResultadoPage,
    props: (route) => ({
      query: {
        q: route.query.q,
        id: route.query.id,
      },
    }),
  },
  {
    path: "/more",
    name: "more",
    component: VerTudo,
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq,
  },
  {
    path: "/lgpd",
    name: "LGPD",
    component: LGPD,
  },
  {
    path: "/contato",
    name: "Contato",
    component: Contato,
    props: (route) => ({
      query: route.query.q,
    }),
  },
  {
    path: "/:patchMatch(.*)*",
    component: PageNotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: routes,
});
