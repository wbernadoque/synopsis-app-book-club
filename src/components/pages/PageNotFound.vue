<template>
  <div class="grid lg:grid-cols-12 grid-cols-5 gap-x-5 px-5 lg:px-0">
    <div class="lg:col-start-4 col-start-1 lg:col-span-6 col-span-5">
      <div class="w-full">
        <Autocomplete2
          v-model:selected="bookSelected"
          v-model:modelValue="autoCompleteSelectedOption"
          @update:selected="searchRecomendations"
        />
      </div>
    </div>
    <div
      class="lg:col-start-4 col-start-1 col-span-5 lg:col-span-6 mb-4 mt-13"
      id="book-not-found"
    >
      
      <Title
        class="text-center mb-5 "
        titleType="h1"
        titleClass="xl5Semi"
        content="Ops! Página não encontrada"
      />
     <div class="lg:text-1xl text-center">
      <SpanComp>Parece que a página que você tentou acessar não existe ou foi removida. Você pode tentar novamente ou voltar para a </SpanComp>
      <SpanComp
        @click="goToHome"
        spanClass="mainSemi"
      > página inicial.</SpanComp>
     </div>
    </div>
    <img
      class="lg:col-start-4 col-start-1 lg:col-span-6 col-span-5"
      src="../../assets/tiny/404-Error-pana-1.svg"
      alt=""
    />

    <Button
      @click="goBack"
      class="lg:col-start-6 col-start-2 col-span-3 lg:col-span-2 flex justify-center items-center lg:mb-13 mb-4 mt-3"
      buttonType="roundedPurpleNotFound"
      buttonTitle="voltar"
    />
  </div>
</template>

<script>
import Autocomplete2 from "../tiny/Autocomplete2.vue";
import Text from "../tiny/newComponents/Text"
import Title from "../tiny/newComponents/Title"
import NavButton from "../tiny/newComponents/NavButton"
import Button from "../tiny/newComponents/Button"
import SpanComp from "../tiny/newComponents/SpanComp"

export default {
  name: "ResultadoPage",
  components: {
    Autocomplete2,
    Text,
    Title,
    NavButton,
    Button,
    SpanComp
  },
  data() {
    return {
      autoCompleteSelectedOption: "",
      bookSelected: null,
    };
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goToHome() {
      this.$router.push("/");
    },
    searchRecomendations() {
      this.$router.push({
        name: "search",
        query: {
          q: this.autoCompleteSelectedOption,
          capa: this.bookSelected.url_capa,
        },
      });
    },
  },
};
</script>

<style></style>
