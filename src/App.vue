<template>
  <div>
    <div id="body" class="min-h-screen">
      <div id="navbar " class="">
        <NavBar id="top" />
      </div>
      <main class="">
        <router-view></router-view>
      </main>

      <toast
        v-if="show"
        v-on:false="show = false"
        class="fixed bottom-0 left-0 z-30 toast duration-500"
      />
    </div>

    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/tiny/Footer.vue";
import VueCookies from "vue-cookies";
import Toast from "./components/tiny/Toast.vue";

export default {
  components: { NavBar, Footer, Toast },
  props: ["query"],
  name: "App",
  data() {
    return {
      show: true,
    };
  },

  created() {},
  watch: {
    $route(to, from) {
      if (to.query.q !== undefined && this.$route.path !== "/livro") {
        document.title = "Indicações para " + to.query.q + " | Synopsis";
        document.getElementsByTagName("meta")["description"].content =
          "Encontre indicação de livros similares a " +
          to.query.q +
          " no Synopsis. Encontre sua próxima leitura agora";
      } else {
        if (to.name == "Synopsis") {
          document.title = "Synopsis | Pesquise e receba indicacoes de livros";
        } else {
          document.title = "Descubra novas leituras | " + to.name;
        }
        document.getElementsByTagName("meta")["description"].content =
          "Encontre indicação de livros de romance, ficção científica, clássicos e para jovens. Sua próxima leitura está aqui";
      }

      if (to.fullPath == "/lgpd") {
        this.show = false;
      } else {
        if (VueCookies.get("acceptCookie") == null) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    },
  },
};
</script>

<style>
body {
  background: #fbfbfb;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

::-webkit-scrollbar {
  width: 12px;
  height: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  -webkit-border-radius: 6px;
  background-color: #fbfbfb;
  border-radius: 6px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px;
  border-radius: 8px;
  background: #424242;
  border: 3px solid #fbfbfb;
}
</style>
