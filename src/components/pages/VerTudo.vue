<template>
  <div class="grid grid-cols-12 gap-5">
    <section class="flex flex-col pb-11 col-start-4 col-span-6 mt-7">
      <div class="flex justify-center">
        <div class="max-w-2xl w-full">
          <Autocomplete2
            v-model:modelValue="autoCompleteSelectedOption"
            v-model:selected="bookSelected"
            @update:selected="refreshPage"
          />
        </div>
      </div>
    </section>

    <section class="col-start-2 col-span-10">
      <div class="col-start-1 col-span-10 grid grid-cols-10 gap-5">
        <div
          class="flex flex-col space-y-2 w-full pb-9 col-start-1 col-span-10"
        >
          <div>
            <SpanComp spanClass="medGray">
              Início >
            </SpanComp>
            <SpanComp spanClass="semiBlack">
              Semana mundial do livro
            </SpanComp>
          </div>
        </div>

        <div class="col-start-1 col-span-10">
          
          <Title
            class="text-left tracking-wide mb-11"
            titleType="h1"
            titleClass="LargeXl2Semi"
            content="Semana mundial do Livro"
          />
          <div class="grid grid-cols-10 gap-5 flex items-stretch">
            <div
              v-for="(item, index) in recommendationsResult"
              :key="index"
              class="col-span-2"
            >
              <BasicCard :bookInfo="item" :author="false" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Autocomplete2 from "../tiny/Autocomplete2.vue";
import BasicCard from "../book-cards/BasicCard.vue";
import NavButton from "../tiny/newComponents/NavButton"
import Title from "../tiny/newComponents/Title"
import Text from "../tiny/newComponents/Text"
import SpanComp from "../tiny/newComponents/SpanComp"

import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { api_caller } from "../../http-common";

export default {
  props: ["query"],
  components: {
    Autocomplete2,
    BasicCard,
    Splide,
    SplideSlide,
    NavButton,
    Text,
    Title,
    SpanComp,
  },
  name: "VerTudo",
  author: "",
  data() {
    return {
      autoCompleteSelectedOption: null,
      suggestedBookList: null,
      loading: false,
      bookSelected: "",
      two: null,
      recommendationsResult: [
        {
          isbn: "9786556910017",
          title: "O alienista",
          author: "Machado de Assis",
          descricao:
            "Conto ou novela? Realismo ou alegoria? Razão ou insensatez? Em O alienista, de Machado de Assis, obra-prima da prosa brasileira, um médico estudioso do juízo humano inaugura um hospício em Itaguaí, a infame Casa Verde, “bastilha da razão humana”. Após internar compulsoriamente quase todos os cidadãos da pacata cidade, o médico decide, por fim, liberá-los e internar-se a si mesmo.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788555911088.jpg",
          editora: "Editora Cobogó",
        },
        {
          isbn: "9788555911026",
          title: "A chave do amor e outras histórias piauienses",
          author: "Assis Brasil",
          descricao:
            "O escritor resolveu reunir, em um só volume, todas as suas histórias que se passam – ou a partir de – no seu Estado natal. Exceção, é claro, de sua Tetralogia piauiense, um monobloco estético que destaca os romances, Beira rio beira vida, A filha do meio quilo, O salto do cavalo cobridor e Pacamão. Poucos dos textos do conjunto, agora dado a público, têm apenas referencias regionais, embora o ser piauiense esteja de corpo inteiro – e tudo naquele apelo de Tolstoi, que disse, entre outras coisas, que a literatura quanto mais regional, mais universal sintetizando tal idéia no aforismo de significação tão profunda: retrata a tua província que serás universal.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788531210204.jpg",
          editora: "Editora Cobogó",
        },
        {
          isbn: "9786556910017",
          title: "O alienista",
          author: "Machado de Assis",
          descricao:
            "Conto ou novela? Realismo ou alegoria? Razão ou insensatez? Em O alienista, de Machado de Assis, obra-prima da prosa brasileira, um médico estudioso do juízo humano inaugura um hospício em Itaguaí, a infame Casa Verde, “bastilha da razão humana”. Após internar compulsoriamente quase todos os cidadãos da pacata cidade, o médico decide, por fim, liberá-los e internar-se a si mesmo.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788555911088.jpg",
          editora: "Editora Cobogó",
        },
        {
          isbn: "9788555911026",
          title: "A chave do amor e outras histórias piauienses",
          author: "Assis Brasil",
          descricao:
            "O escritor resolveu reunir, em um só volume, todas as suas histórias que se passam – ou a partir de – no seu Estado natal. Exceção, é claro, de sua Tetralogia piauiense, um monobloco estético que destaca os romances, Beira rio beira vida, A filha do meio quilo, O salto do cavalo cobridor e Pacamão. Poucos dos textos do conjunto, agora dado a público, têm apenas referencias regionais, embora o ser piauiense esteja de corpo inteiro – e tudo naquele apelo de Tolstoi, que disse, entre outras coisas, que a literatura quanto mais regional, mais universal sintetizando tal idéia no aforismo de significação tão profunda: retrata a tua província que serás universal.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788531210204.jpg",
          editora: "Editora Cobogó",
        },
        {
          isbn: "9788555910975",
          title: "O delicioso jardim do vizinho",
          author: "Caetano de Almeida",
          descricao:
            "O delicioso jardim do vizinho é o primeiro livro monográfico do artista plástico paulista Caetano de Almeida. Através de mais de 200 trabalhos e de um abrangente ensaio do crítico e curador Paulo Herkenhoff, a publicação apresenta sua trajetória de quase três décadas de produção artística, marcada pela pluralidade de temas e técnicas e pelas apropriações e remontagens de imagens clássicas. Dividido em capítulos que compõem um retrato da produção do artista, o livro é organizado a partir do olhar de Herkenhoff, cuja densa coletânea de textos norteia a dinâmica da monografia. Assim, são perpassadas as diferentes – e díspares – fases da trajetória do pintor, como a da exposição Bestiário (1992), com obras de diferentes formatos e estilos centradas em bichos; a série Lusco Fusco (1993), na qual são investigadas as diferenças da luz em condições adversas de percepção, e a série Ares, iniciada em 2005, na qual o pintor utiliza-se da poluição de São Paulo, obtida em um ateliê situado num apartamento de primeiro andar na altura do trânsito intenso do Minhocão, como pigmento para suas telas.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788560965953.jpg",
          editora: "Editora Cobogó",
        },
        {
          isbn: "9788555910975",
          title: "O delicioso jardim do vizinho",
          author: "Caetano de Almeida",
          descricao:
            "O delicioso jardim do vizinho é o primeiro livro monográfico do artista plástico paulista Caetano de Almeida. Através de mais de 200 trabalhos e de um abrangente ensaio do crítico e curador Paulo Herkenhoff, a publicação apresenta sua trajetória de quase três décadas de produção artística, marcada pela pluralidade de temas e técnicas e pelas apropriações e remontagens de imagens clássicas. Dividido em capítulos que compõem um retrato da produção do artista, o livro é organizado a partir do olhar de Herkenhoff, cuja densa coletânea de textos norteia a dinâmica da monografia. Assim, são perpassadas as diferentes – e díspares – fases da trajetória do pintor, como a da exposição Bestiário (1992), com obras de diferentes formatos e estilos centradas em bichos; a série Lusco Fusco (1993), na qual são investigadas as diferenças da luz em condições adversas de percepção, e a série Ares, iniciada em 2005, na qual o pintor utiliza-se da poluição de São Paulo, obtida em um ateliê situado num apartamento de primeiro andar na altura do trânsito intenso do Minhocão, como pigmento para suas telas.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788560965953.jpg",
          editora: "Editora Cobogó",
        },
        {
          isbn: "9788555910976",
          title: "O delicioso jardim do vizinho",
          author: "Caetano de Almeida",
          descricao:
            "O delicioso jardim do vizinho é o primeiro livro monográfico do artista plástico paulista Caetano de Almeida. Através de mais de 200 trabalhos e de um abrangente ensaio do crítico e curador Paulo Herkenhoff, a publicação apresenta sua trajetória de quase três décadas de produção artística, marcada pela pluralidade de temas e técnicas e pelas apropriações e remontagens de imagens clássicas. Dividido em capítulos que compõem um retrato da produção do artista, o livro é organizado a partir do olhar de Herkenhoff, cuja densa coletânea de textos norteia a dinâmica da monografia. Assim, são perpassadas as diferentes – e díspares – fases da trajetória do pintor, como a da exposição Bestiário (1992), com obras de diferentes formatos e estilos centradas em bichos; a série Lusco Fusco (1993), na qual são investigadas as diferenças da luz em condições adversas de percepção, e a série Ares, iniciada em 2005, na qual o pintor utiliza-se da poluição de São Paulo, obtida em um ateliê situado num apartamento de primeiro andar na altura do trânsito intenso do Minhocão, como pigmento para suas telas.",
          cover:
            "https://s3-sa-east-1.amazonaws.com/fl.mercadoeditorial.org/uploads/book/first_cover/350_9788560965953.jpg",
          editora: "Editora Cobogó",
        },
      ],
    };
  },
  methods: {
    options2: {
      autoplay: false,
      rewind: true,
      width: "85vw",
      arrows: true,
      gap: "1rem",
      perPage: 5,
      pagination: false,
      arrowPath:
        "M0.33 18.1299L2.1 19.8999L12 9.9999L2.1 0.0999031L0.33 1.8699L8.46 9.9999L0.33 18.1299Z",
    },
    refreshPage() {},
  },
  watch: {},
  created() {},
};
</script>

<style></style>
