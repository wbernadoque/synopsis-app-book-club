<template>
  <div class="grid lg:grid-cols-12 grid-cols-5  px-3 pb-4">
      
    <span class="inline-flex lg:col-start-2 lg:col-span-11 col-span-5 text-secondary">
      <NavButton @click="$router.push('/')" class="cursor-pointer" buttonTitle="Início >&nbsp;" />
      <NavButton @click="$router.push('/resenhas')" class="cursor-pointer" buttonTitle=" Resenhas >&nbsp;" />
      <NavButton v-if="bookReview" buttonType="mainSemi" :buttonTitle="bookReview.titulo" />
    </span>

    <section
      v-show="bookReview"
      class="lg:col-start-2 lg:col-span-10 col-start-1 col-span-5 grid lg:grid-cols-10 grid-cols-4 items-stretch mt-4"
    >
      <BasicCard
        v-if="bookReview"
        :bookInfo="bookReview"
        class="lg:col-span-2 hidden lg:block"
      />
      
      <img
        v-if="bookReview"
        :src="bookReview.url_capa"
        alt=""
        class="rounded-2xl mb-8 w-48 shadow-cover block lg:hidden col-span-4 place-self-center"
      />
      <div
        class="flex flex-col items-center lg:block lg:col-span-8 lg:col-start-3 col-span-4 lg:ml-9 relative lg:border border-selection rounded-3xl lg:pt-4 lg:pb-11 lg:px-9 "
      >
        <img
          class="lg:absolute block -left-4.5 top-3 w-9 h-9 mb-2"
          src="../../assets/logos/logo-rounded.svg"
        />
        
        <Title 
          v-if="bookReview"
          titleType="h3"
          titleClass="SmallBase"
          :content="bookReview.autor_resenha"
        />
        
        
        <Title 
          v-if="bookReview"
          class="mt-3 mb-2"
          titleType="h2"
          titleClass="baseExtraLarge"
          :content="bookReview.titulo_resenha"
        />

        <div v-if="bookReview" class="flex mb-5">
          <div v-for="star in [1, 2, 3, 4, 5]" :key="star" class="mr-1">
            <img
              v-if="star <= bookReview.nota"
              src="../../assets/tiny/star-fill.svg"
              class="w-1.5"
            />
            <img v-else src="../../assets/tiny/star.svg" class="w-1.5" />
          </div>
        </div>
        <span
          class="whitespace-pre-line text-base font-normal leading-10"
          ref="review"
        >
        </span>
      </div>

    </section>
    <Anima v-if="loading" class="col-span-5 lg:col-span-12 place-self-center" />
    <div
      class="flex flex-col-reverse lg:flex-row items-end lg:justify-end justify-center lg:col-start-10 col-start-4 col-span-3 lg:mt-0 mt-10"
    >
      <BackToTop @click="scrollToSection" />
    </div>
  </div>
</template>

<script>
import BasicCard from "../book-cards/BasicCard.vue";
import scroll from "../../scrollToSection";
import { api_caller } from "../../http-common";
import Anima from "../tiny/Anima.vue";
import BackToTop from "../tiny/newComponents/BackToTop";
import Title from "../tiny/newComponents/Title";
import Text from "../tiny/newComponents/Text";
import NavButton from "../tiny/newComponents/NavButton";


export default {
  name: "BookReview",
  components: {
    BasicCard,
    Anima,
    BackToTop,
    Title,
    Text,
    NavButton,
  },
  data() {
    return {
      showModal: false,
      bookReview: null,
      loading: true,
    };
  },
  methods: {
    scrollToSection() {
      scroll();
    },
  },
  mounted() {
    api_caller({
      method: "get",
      url: `/resenhas/${this.$route.query.q}`,
    }).then(({ data }) => {
      this.loading = false;
      const review = data.body[0].resenha;
      this.$refs.review.innerHTML = review;
      this.bookReview = data.body[0];
    });
  },
};
</script>

<style></style>
