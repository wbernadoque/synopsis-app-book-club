<template>
  <div id="top" class="overflow-hidden">
    <div class="lg:mb-26 mb-5">
      <div
        class="grid lg:grid-cols-12 grid-cols-5 gap-5 px-5 animation-show-right"
      >
        <div
          class="col-span-5 lg:col-span-6 col-start-1 lg:col-start-2 flex justify-center flex-col"
        >
          <Title
            titleType="h2"
            titleClass="homeLargeTitle"
            content="Não sabe o que ler?"
            class="flex flex-col w-full space-y-2 mb-2"
          />
          <Title
            titleType="h2"
            titleClass="homeLargeTitle"
            content="Nós ajudamos."
            class="flex flex-col w-full space-y-2 mb-3"
          />

          <div class="flex flex-col w-full md:max-w-3xl text-gray-800">

            <Title
              titleType="h3"
              titleClass="homeInfoText"
              content="Use nossa busca e nós indicaremos livros parecidos com sua
              pesquisa."
            />
          </div>

          <div class="w-full mt-5 z-10" id="search">
            <Autocomplete2
              v-model:selected="bookSelected"
              v-model:modelValue="autoCompleteSelectedOption"
              @update:selected="searchRecomendations"
            />
          </div>
        </div>

        <!-- imagem -->
        <div class="lg:col-end-12 lg:col-span-4 hidden lg:grid">
          <img src="../../assets/big/HeroSection.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- Recomendados -->
    <section
      class=" grid lg:grid-cols-12 grid-cols-5 gap-5 z-0 mb-3 lg:mb-10 highlights"
    >
      
      <Title
        titleType="h2"
        titleClass="homeSubtitle"
        content="Indicações de livros do Synopsis"
        class=" mb-1 col-start-1 lg:col-start-2 lg:col-span-10 col-span-5 mx-5 lg:mx-0"
      />

      <splide
        v-if="loadingHighlight"
        :options="options"
        class="col-span-12 gap-5 hidden lg:block "
      >
        <splide-slide v-for="(item, index) in highlight" :key="index">
          <Highlight
            :bookInfo="item"
            @click="insertBookModal(item), (show = !show)"
            class="cursor-pointer"
          />
          
        </splide-slide>
      </splide>
      <splide
        v-else
        :options="optionsLoading"
        class="col-start-6 col-span-3 hidden lg:block"
      >
        <anima />
      </splide>

      <splide
        v-if="loadingHighlight"
        @splide:visible="imVisible"
        :options="options1"
        class="col-span-5 gap-5 block lg:hidden"
      >
        <splide-slide v-for="(item, index) in highlight" :key="index">
          <Highlight
            :bookInfo="item"
            @click="insertBookModal(item), (show = !show)"
            class="cursor-pointer"
          />
        </splide-slide>
      </splide>
      <splide
        v-else
        :options="optionsLoading"
        class="col-span-5 gap-5 lg:hidden flex justify-center"
      >
        <anima />
      </splide>
      
    </section>
    <section class="px-5 block lg:hidden mb-7">
    
      <div class="grid grid-cols-5 gap-x-5 animation">
        
        <Title
          class="w-full pt-2 col-start-1 col-span-5 animation"
          titleType="h3"
          titleClass="baseBold"
          :content="slideIndex.titulo"
        />
        
        <Title
          class="w-full col-start-1 col-span-5 mt-1 animation"
          titleType="h4"
          titleClass="smMedGray"
          :content="slideIndex.autor"
        />
        
        <Text
          class="line-clamp col-span-5 mt-2 animation"
          textClass="smGray"
          :content="slideIndex.sinopse"
        />
        <div
          class="pt-4 inline-flex items-baseline space-x-2 col-start-4 col-span-2 justify-end"
        >
          <a class="hidden lg:visible flex items-center">
            
            <span class="text-sm font-semibold mr-1">Saiba mais</span>
            <span class="">
              <svg
                width="16"
                height="8"
                viewBox="0 0 16 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="black" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- Campanha -->
    <section
      class="grid lg:grid-cols-12 grid-cols-5 gap-5 z-0 lg:mt-0 mt-40 mb-3 lg:mb-10 campaigns"
    >
      
      <Title
        v-if="loadingCampaign"
        class="mb-1 col-start-1 lg:col-start-2 lg:col-span-10 col-span-5 mx-5 lg:mx-0"
        titleType="h1"
        titleClass="homeSubtitle"
        :content="campaignDescription"
      />
      <splide
        v-if="loadingCampaign"
        :options="options4"
        class="col-span-5 lg:col-span-10 lg:col-start-2 gap-5 hidden lg:block"
      >
        <splide-slide v-for="(item, index) in campaign.edicoes" :key="index">
          <BasicCard
            :bookInfo="item"
            :book="index"
            :author="false"
            v-on:true="insertBookModal(item), (show = !show)"
          />
        </splide-slide>
      </splide>
      <splide
        v-else
        :options="optionsLoading"
        class="col-start-6 col-span-3 hidden lg:block  items-center"
      >
        <anima />
        <!-- <semipolar-spinner
          :animation-duration="1500"
          :size="204"
          :color="'#9A3A88'"
        /> -->
      </splide>

      <splide
        v-if="loadingCampaign"
        :options="options5"
        class="col-span-5 gap-5 lg:hidden block"
      >
        <splide-slide v-for="(item, index) in campaign.edicoes" :key="index">
          <BasicCard
            :bookInfo="item"
            :book="index"
            :author="false"
            v-on:true="insertBookModal(item), (show = !show)"
          />
        </splide-slide>
      </splide>
      <splide
        v-else
        :options="optionsLoading"
        class="col-span-5 lg:hidden flex justify-center"
      >
        <anima />
        
      </splide>

    <!-- voltar ao topo -->
    </section>
    <div class="grid grid-cols-5 lg:grid-col-12 gap-5 px-5 lg:my-7 my-4">
      <BackToTop
        class="items-center lg:col-start-10 col-start-4 col-span-3 cursor-pointer lg:mt-0 mt-10"
        @click="scrollToSection" 
      />
    </div>

    <!-- modal - em desenvolvimento -->
    <modal-book
      :bookInfo="book"
      v-if="show"
      v-on:false="closeModal"
      class="fixed z-30 top-0 left-0 w-screen h-screen"
    />
    <banner-landing
      v-if="showBanner"
      v-on:false="hideModal"
      class="fixed z-30 top-0 left-0 w-screen h-screen"
    />
  </div>
</template>

<script>
import NavBar from "../NavBar.vue";
import Footer from "../tiny/Footer.vue";
import Autocomplete2 from "../tiny/Autocomplete2.vue";
import Highlight from "../book-cards/Highlight.vue";
import BasicCard from "../book-cards/BasicCard.vue";
import { api_caller } from "../../http-common";

import { Splide, SplideSlide } from "@splidejs/vue-splide";
import ModalBook from "../book-cards/ModalBook.vue";
import { SemipolarSpinner } from "epic-spinners";
import scroll from "../../scrollToSection";
import Anima from "../tiny/Anima.vue";
import BannerLanding from "../tiny/BannerLanding.vue";
import VueCookies from "vue-cookies";
import Text from "../tiny/newComponents/Text";
import Title from "../tiny/newComponents/Title";
import BackToTop from "../tiny/newComponents/BackToTop";

export default {
  components: {
    Autocomplete2,
    NavBar,
    Footer,
    Highlight,
    BasicCard,
    Splide,
    SplideSlide,
    ModalBook,
    SemipolarSpinner,
    Anima,
    BannerLanding,
    Text,
    Title,
    BackToTop,
  },
  props: ["query"],
  name: "Home",

  data() {
    return {
      book: "",
      slideIndex: {},
      show: false,

      showBanner: true,
      autoCompleteSelectedOption: "",
      bookSelected: null,
      searchTerm: null,
      suggestedBookList: [],
      autoCompleteBookList: [],
      bookCampaignList: [],
      categoryOrder: ["topHit", "books"],
      highlight: null,
      loadingHighlight: false,
      loadingCampaign: false,
      campaign: null,
      campaignDescription: "",

      options5: {
        type: "slide",
        autoplay: true,
        rewind: false,
        focus: "center",
        lazyLoad: false,
        arrows: false,
        gap: "3rem",
        perPage: 2,
        pagination: false,
        width: "100%",
        start: 1,
      },
      options4: {
        type: "slide",
        autoplay: true,
        rewind: false,
        lazyLoad: false,
        arrows: true,
        gap: "2rem",
        perPage: 5,
        pagination: false,
        width: "100%",
        arrowPath:
          "M0.33 18.1299L2.1 19.8999L12 9.9999L2.1 0.0999031L0.33 1.8699L8.46 9.9999L0.33 18.1299Z",
      },
      options3: {
        type: "slide",
        autoplay: false,
        rewind: false,
        lazyLoad: false,
        arrows: false,
        gap: "2rem",
        perPage: 3,
        pagination: false,
        arrowPath:
          "M0.33 18.1299L2.1 19.8999L12 9.9999L2.1 0.0999031L0.33 1.8699L8.46 9.9999L0.33 18.1299Z",
      },
      options2: {
        type: "slide",
        autoplay: false,
        rewind: false,
        lazyLoad: false,
        arrows: true,
        gap: "1rem",
        perPage: 5,
        pagination: false,
        arrowPath:
          "M0.33 18.1299L2.1 19.8999L12 9.9999L2.1 0.0999031L0.33 1.8699L8.46 9.9999L0.33 18.1299Z",
      },
      options1: {
        type: "slide",
        focus: "center",
        trimSpace: true,
        pagination: true,
        rewind: true,
        arrows: false,
        cover: true,
        width: "100%",
        gap: "20px",
        start: 2,
        perPage: 2,
        autoplay: true,
        pauseOnFocus: true,
      },
      options: {
        type: "slide",
        focus: "center",
        clones: 1,
        trimSpace: true,
        rewind: true,
        arrows: true,
        cover: true,
        width: "100%",
        heigth: "100%",
        gap: "32px",
        start: 2,
        perPage: 3,
        autoplay: true,
        pauseOnFocus: true,
        fixedWidth: "581px",
        fixedHeight: "350px",
      },
      optionsLoading: {
        trimSpace: true,
        arrows: false,
        perPage: 0,
        autoplay: true,
      },
    };
  },

  methods: {
    hideModal() {
      this.showBanner = false;
      localStorage.setItem("hide-banner", false);
    },
    campaignName() {
      api_caller({
        method: "get",
        url: "/campanhas",
      })
        .then((response) => {
          this.bookCampaign(response.data.body[0].slug);
        })
        .catch((er) => {
          this.loadingCampaign = false;
        });
    },
    bookCampaign(name) {
      api_caller({
        method: "get",
        url: `/campanhas/${name}`,
      })
        .then((response) => {
          this.campaignDescription = response.data.body.campanha.nome;
          this.campaign = response.data.body;
          this.loadingCampaign = true;
        })
        .catch((er) => {
          this.loadingCampaign = false;
        });
    },
    highlights() {
      api_caller({
        method: "get",
        url: "/destaques",
      })
        .then((response) => {
          this.highlight = response.data.body;
          this.loadingHighlight = true;
        })
        .catch((er) => {
          this.loadingHighlight = false;
        });
    },
    imVisible(slide) {
      this.slideIndex = this.highlight[slide.index];
    },
    scrollToSection() {
      scroll();
    },
    insertBookModal(book) {
      this.book = book;
    },
    closeModal() {
      this.show = false;
    },

    searchRecomendations() {
      this.$router.push({
        name: "search",
        query: {
          q: this.autoCompleteSelectedOption,
          id: this.bookSelected.id_obra,
        },
      });
    },
  },

  watch: {
    startPagination: function() {
      return Math.ceil(this.highlightResults / 2);
    },
  },
  mounted() {
    if (VueCookies.get("banner") == null) {
      setTimeout(() => {
        this.showBanner = true;
      }, 5000);
    }
    this.highlights();
    this.campaignName();
    // this.bookCampaign("pra_ninguem_por_defeito");
    //ajuste de pointeiro "inclicavel"
    const logoNav = document.querySelector(".pointer");
    logoNav.classList.add("cursor-default");
  },
};
</script>

<style>
.recommended {
  margin-top: 110px;
  width: 100%;
}

</style>
