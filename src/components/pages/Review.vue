<template>
  <div class="grid lg:grid-cols-12 grid-cols-5 lg:gap-5 px-3 pb-4">
 
    <SpanComp class="lg:col-start-2 lg:col-span-11 col-span-5 text-secondary inline-flex">
      <NavButton @click="$router.push('/')" class="cursor-pointer" buttonTitle="Início >&nbsp;" />
      <NavButton buttonType="mainSemi" buttonTitle=" Resenhas" />
    </SpanComp>
    <Title
      titleType="h1"
      titleClass="homeLargeTitle"
      content="Sabe o que nossa equipe anda lendo?"
      class="lg:col-start-4 lg:col-span-7 col-start-1 col-span-5 text-center lg:mt-0 mt-5"
    />

    <Text
      content="Venha acompanhar nossas resenhas e indicações"
      class="lg:col-start-4 lg:col-span-7 col-start-1 col-span-5 text-center"
    />
    <section
      v-if="reviewBookList.length > 0"
      class="lg:col-start-2 lg:col-span-10 col-start-1 col-span-5 grid lg:grid-cols-10 grid-cols-2 gap-5 items-stretch mt-4"
    >
      <div
        v-for="(item, index) in reviewBookList"
        :key="index"
        class="grid col-span-1 lg:col-span-2 relative"
      >
        <basic-card
          :bookInfo="item"
          :book="index"
          :author="false"
          v-on:true="redirect(item)"
          class="col-span-2"
        />
      </div>
    </section>

    <Anima
      v-if="loading"
      class="lg:col-start-6 lg:col-span-3 col-span-5 place-self-center"
    />

    
    <BackToTop 
        class=" lg:mt-0 col-start-4 col-span-2 lg:col-start-10 lg:justify-center justify-center align-center lg:col-span-3  "
        @click="scrollToSection" />  
  </div>
</template>

<script>
import BasicCard from "../book-cards/BasicCard.vue";
import scroll from "../../scrollToSection";
import { api_caller } from "../../http-common";
import Anima from "../tiny/Anima.vue";
import Text from "../tiny/newComponents/Text";
import Title from "../tiny/newComponents/Title";
import BackToTop from "../tiny/newComponents/BackToTop";
import NavButton from "../tiny/newComponents/NavButton";
import SpanComp from "../tiny/newComponents/SpanComp";
export default {
  components: { BasicCard, Anima, Text, Title, BackToTop, NavButton, SpanComp },
  name: "Review",
  data() {
    return {
      reviewBookList: [],
      loading: true,
    };
  },
  methods: {
    redirect(item) {
      this.$router.push({
        path: "livro",
        query: {
          q: item.id_edicao,
        },
      });
    },
    scrollToSection() {
      scroll();
    },
  },
  mounted() {
    try {
      api_caller({
        method: "get",
        url: "/resenhas",
      }).then(({ data }) => {
        this.loading = false;
        this.reviewBookList = data.body;
      });
    } catch (er) {
      this.loading = false;
    }
  },
};
</script>

<style></style>
