<template>
  <nav class="grid lg:grid-cols-12 grid-cols-5 gap-5 px-3 pb-4">
    <div
      class="flex w-full justify-between text-main-action col-span-2 lg:col-span-2 col-start-1 lg:col-start-2"
    >
      <div class=" ">
        <router-link to="/" class="pointer">
          <a>
            <img
              src="../assets/logos/logo.svg"
              class="w-28 lg:w-40 mt-2"
              alt=""
            />
          </a>
        </router-link>
      </div>
    </div>
    <div
      class="lg:flex hidden lg:col-start-8 lg:col-span-4 col-span-3 items-center justify-end"
    >
      
      <NavButton
        v-if="$route.path === '/'"
        class="pr-3"
        buttonType="navbar"
        buttonTitle="assistente de leitura"
        @click="$router.push('/assistente-de-leitura')"
      />
      <NavButton
        v-else
        class="pr-3"
        buttonType="navbar"
        buttonTitle="início"
        @click="$router.push('/')"
      />
      <NavButton
        buttonType="navbar"
        buttonTitle="resenhas"
        @click="$router.push('/resenhas')"
      />
    </div>
    
    <img
      @click="showMenu"
      class="lg:hidden col-start-5 self-center place-self-end"
      src="../assets/tiny/menu.svg"
    />
    <Menu
      v-on:showMenu="showMenu"
      class="fixed lg:hidden top-0 duration-500 ease-in-out -right-full z-50 "
      id="menu"
    />
  </nav>
</template>
<script>
import Menu from "../components/tiny/Menu.vue";
import NavButton from "../components/tiny/newComponents/NavButton";

export default {
  name: "NavBar",
  components: {
    Menu,
    NavButton,
  },
  data() {
    return {};
  },
  methods: {
    showMenu() {
      const menu = document.getElementById("menu");
      menu.classList.toggle("-right-3");
      menu.classList.toggle("-right-full");
    },
  },
  mounted() {
    // console.log(this.$route.path);
  },
};
</script>

<style scoped></style>
