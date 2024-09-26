<template>
  <div class="grid lg:grid-cols-12 grid-cols-4 lg:px-0 px-5">
    <section
      id="searchBar"
      class="flex flex-col lg:col-start-4 py-1 col-start-1 col-span-5 lg:col-span-6 sticky top-0 transition duration-200 ease-in-out z-20"
    >
      <div class="flex justify-center" id="search">
        <div class="max-w-2xl w-full">
          <Autocomplete2
            v-model:modelValue="autoCompleteSelectedOption"
            v-model:selected="bookSelected"
            v-model:error="foundBook"
            @click="closeModalShare"
          />
        </div>
      </div>
    </section>
    <section
      v-if="foundBook == true"
      class="lg:col-start-2 lg:col-span-10 col-start-1 col-span-4 mt-11"
    >
      <div class="grid lg:grid-cols-10 grid-cols-4 gap-x-5">
          <div class="text-center lg:text-left flex-col space-y-2  col-start-1 lg:col-span-10 col-span-7 mb-5">
            <SpanComp
              spanClass="medGray"
            >
              Você pesquisou por:
            </SpanComp>
            
            <SpanComp 
              spanClass="semiGray"> " {{typed}} " </SpanComp>
          </div>
        <div
          class="col-start-1 lg:col-span-3 col-span-4 flex justify-center"
          id="info-book"
        >
          <div
            class="h-auto relative lg:mb-7 mb-0 max-w-xs max-h-96 lg:max-h-full lg:w-full flex justify-center lg:block"
          >
            <img
              v-if="mobile"
              :src="bookCover"
              alt=""
              class="rounded-2xl w-auto h-full lg:w-full shadow-cover"
              @click="insertBookModal(this.researchedBook)"
              @error="errorImage"
            />

            <img
              v-if="!mobile"
              :src="bookCover"
              alt=""
              class="w-auto h-full lg:w-full lg:h-auto rounded-2xl shadow-cover"
              @error="errorImage"
            />
          </div>
        </div>

        <div
          class="hidden lg:flex col-span-7 col-start-4 flex-col overflow-hidden e relative"
          id="info-book"
          ref="infoBook"
        >
          
          <Title
            class="mb-1 w-3/5"
            titleType="h1"
            titleClass="xl2SemiCap"
            :content="researchedBook.title"
          />
           
          <Title
            class="mb-4 w-3/5"
            titleType="h1"
            titleClass="baseSemiName"
            :content="researchedBook.author"
          />
          <div class="flex flex-row mb-4">
            <div class="flex flex-col mr-4">
              
              <Text
                class="mb-1"
                textClass="smallSemiSec"
                content="editora"
              />
              
              <Text
                v-if="researchedBook.publisher"
                textClass="smallSemiMain"
                :content="researchedBook.publisher"
              />
              <span class="font-semibold text-main text-sm" v-else>-</span>
            </div>
            <div class="flex flex-col">
             <Text
                class="mb-1"
                textClass="smallSemiSec"
                content="páginas"
              />
              
              <Text
                v-if="researchedBook.pages"
                textClass="smallSemiMain"
                :content="researchedBook.pages"
              />
              <span v-else class="font-semibold text-main text-sm">-</span>
            </div>
          </div>
          <div class="flex mb-6">
            <div class="flex theme mr-2 w-auto">
              
              <Shape
                class="px-2 py-1"
                shapeType="roundedGray"
                :content="researchedBook.category"
              />
            </div>
          </div>
          <div class="text-base leading-8 h-full ">
            
            <SpanComp>
              {{displayedSynopsis}}
            </SpanComp>
                        
            <!-- de outra pagina -->
            <NavButton
              v-if="read && cut"
              @click="readMore"
              class="lg:inline-block hidden ml-1"
              buttonType="showMore"
               buttonTitle="Ler mais"
            />
           <NavButton
              v-else-if="!read && cut"
              @click="readLess(displayedSynopsis)"
              class="lg:inline-block hidden ml-1"
              buttonType="showLess"
              buttonTitle="Ler menos"
           />
          
          </div>

          <div
            class="flex items-center cursor-pointer lg:absolute right-0 top-0"
          >
          
            <div
              class="flex flex-col items-center justify-center mr-3"
              @click="changeModalShareState()"
            >
              <img
                src="../../assets/tiny/share.svg"
                alt=""
                class="mb-2 w-2.5"
              />
              <Text
                textClass="xSmall"
                content="compartilhar"
              />
            </div>

            <Button
              class="bg-main-purple rounded-full px-5 py-2 hidden "          
              @click="changeModalBuyState()"
              buttonType="roundedPurpleBase"
              buttonTitle="comprar"
            />
          </div>
        </div>
        <div
          class="flex flex-col items-center cursor-pointer lg:hidden col-start-2 col-span-2 mt-3 lg:mt-0"
        >
          <div
            class="flex flex-col items-center justify-center"
            @click="changeModalShareState()"
          >
            <img src="../../assets/tiny/share.svg" alt="" class="mb-2 w-2.5" />
            <Text
                textClass="xSmall"
                content="compartilhar"
            />
          </div>
          
          <Button
              class="bg-main-purple rounded-full px-5 py-2 hidden "          
              @click="changeModalBuyState()"
              buttonType="roundedPurpleBase"
              buttonTitle="comprar"
            />
        </div>
      </div>
    </section>

    <section
      v-else-if="foundBook == false"
      class="lg:col-start-4 lg:col-span-6 col-start-1 col-span-4"
      id="book-not-found"
    >
      <Title
        class="text-center mb-3 lg:mt-13"
        titleType="h1"
        titleClass="xl5Semi"
        content="Não encontramos o livro da sua busca"
      />
      
      <Text
        class="text-center"
        content="Tente novamente ou confira nossas sugestões para você."
      />
    </section>

    <section
      v-else-if="loading == true && foundBook == null"
      class="flex pb-11 lg:col-start-5 col-start-1 col-span-4 lg:col-span-3 items-center justify-center"
    >
      <anima />
    </section>

    <!-- sessão autor -->
    <section
      class="grid lg:grid-cols-10 grid-cols-5 lg:gap-5 lg:col-span-10 col-start-1 lg:col-start-2 col-span-5 z-0 lg:mt-11 mt-5 mb-3 lg:mb-0"
      v-if="topAuthorList != false"
    >
   
      <Title
        class="mb-3 lg:mb-1 col-start-1 lg:col-start-1 lg:col-span-10 col-span-5 mx-5 lg:mx-0"
        titleType="h2"
        titleClass="homeSubtitle"
        :content="`Mais de ${ researchedBook.author}`"
      />

      <div
        class="lg:col-span-2 hidden lg:block"
        v-for="(item, index) in topAuthorList"
        :key="index"
      >
        <BasicCard
          :bookInfo="item"
          :book="index"
          :author="false"
          v-on:true="insertBookModal(item)"
        />
      </div>

      <div class="col-span-5  gap-5 lg:hidden highlights -mx-5 block">
        <splide :options="option5">
          <splide-slide v-for="(item, index) in topAuthorList" :key="index">
            <BasicCard
              :bookInfo="item"
              :book="index"
              :author="false"
              v-on:true="insertBookModal(item)"
            />
          </splide-slide>
        </splide>
      </div>
    </section>
    <section
      v-if="topAuthorList == null"
      class="flex justify-center lg:col-start-1 lg:col-span-12 col-start-1 col-span-5 z-0 lg:mt-40 mt-5 mb-3 lg:mb-0 lg:mx-0 mx-gn"
    >
      <anima />
    </section>

    <Title
        v-if="foundBook"
        class="mt-11 text-left col-start-1 col-span-4 lg:col-start-2 lg:col-span-10"
        titleType="h2"
        titleClass="LargeXl2Semi"
        content="Você também pode gostar"
      />
    <section
      v-if="suggestedBookList != undefined || suggestedBookList != null"
      class="lg:col-start-2 lg:col-span-10 col-start-1 col-span-4 grid lg:grid-cols-10 grid-cols-4 gap-5 items-stretch mt-4"
    >
      <div
        v-for="(item, index) in suggestedBookList"
        :key="index"
        class="grid col-span-2 relative"
      >
        <BasicCard
          :bookInfo="item"
          :book="index"
          :author="false"
          v-on:true="insertBookModal(item)"
          class="col-span-2"
        />
      </div>
    </section>
    <section
      v-else
      class="flex lg:col-start-2 col-start-1 col-span-4 lg:col-span-10 items-center justify-center mt-10"
    >
      <anima />
    </section>

    <div
      class="flex lg:flex-row flex-col-reverse lg:items-center items-end justify-end lg:col-start-2 lg:col-span-10 col-start-1 col-span-4 cursor-pointer mt-2 mb-4"
      @click="scrollToSection"
      v-if="foundBook"
    >
      <div
        class="flex flex-col-reverse lg:flex-row items-end lg:justify-end justify-center lg:col-start-10 col-start-4 col-span-3 lg:mt-0 mt-10"
      >
        <BackToTop @click="scrollToSection" />
      </div>
    </div>
    <!-- Modal -->
    <modal-book
      :bookInfo="book"
      v-if="show"
      v-on:false="closeModal"
      v-on:book="bookSelected = $event"
      class="fixed z-30 top-0 left-0 w-screen h-screen"
    />
    <modal-share
      v-if="showShare"
      v-on:false="closeModalShare"
      :book="researchedBook"
      ref="url_compartilhar"
      class="fixed z-30 top-0 left-0 w-screen h-screen"
    />
   
    <modal-buy
      v-if="showBuy"
      v-on:false="closeModalBuy"
      ref="url_compartilhar"
      class="fixed z-30 top-0 left-0 w-screen h-screen"
    />
  </div>
</template>

<script>
import Autocomplete2 from "../tiny/Autocomplete2.vue";
import Toast from "../tiny/Toast.vue";
import BasicCard from "../book-cards/BasicCard.vue";
import ModalBook from "../book-cards/ModalBook.vue";
import ModalShare from "../book-cards/ModalShare.vue";
import ModalBuy from "../book-cards/ModalBuy.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { api_caller } from "../../http-common";
import scroll from "../../scrollToSection";
import Highlight from "../book-cards/Highlight.vue";
import { SemipolarSpinner } from "epic-spinners";
import Anima from "../tiny/Anima.vue";
import BackToTop from "../../components/tiny/newComponents/BackToTop";
import Text from "../../components/tiny/newComponents/Text";
import Title from "../../components/tiny/newComponents/Title";
import Shape from "../../components/tiny/newComponents/Shape";
import NavButton from "../../components/tiny/newComponents/NavButton";
import Button from "../../components/tiny/newComponents/Button";
import SpanComp from "../../components/tiny/newComponents/SpanComp";


export default {
  props: ["query", "capa", "bookObject"],
  components: {
    Autocomplete2,
    Toast,
    BasicCard,
    Splide,
    SplideSlide,
    ModalBook,
    ModalShare,
    SemipolarSpinner,
    Anima,
    ModalBuy,
    Highlight,
    BackToTop,
    Text,
    Title,
    Shape,
    NavButton,
    Button,
    SpanComp,
  },

  name: "ResultadoPage",
  author: "",
  data() {
    return {
      book: "",
      mobile: null,
      show: false,
      showShare: true,
      showBuy: false,
      autoCompleteSelectedOption: "",
      suggestedBookList: [],
      topAuthorList: [],
      read: true,
      cut: null,

      loading: true,
      loadingRecomendacao: true,
      bookSelected: null,
      author: this.author,
      title: this.title,
      bookCover: null,
      bookId: this.$props.query.id,
      typed: this.$props.query.q,
      researchedBook: {
        title: null,
        author: null,
        category: null,
        synopsis: null,
        pages: null,
        publisher: null,
      },
      displayedSynopsis: null,
      foundBook: null,
      optionsLoading: {
        trimSpace: true,
        focus: "center",
        arrows: false,
        perPage: 1,
        autoplay: true,
      },
      option5: {
        type: "slide",
        autoplay: true,
        rewind: false,
        focus: "center",
        lazyLoad: false,
        arrows: false,
        gap: "2rem",
        perPage: 2,
        pagination: false,
        width: "100%",
        // start: 2,
      },
      options4: {
        type: "slide",
        autoplay: true,
        rewind: false,
        lazyLoad: false,
        arrows: false,
        gap: "2rem",
        perPage: 5,

        pagination: false,
        autoWidth: "true",
        width: "100%",
        // height:'2vh',
        arrowPath:
          "M0.33 18.1299L2.1 19.8999L12 9.9999L2.1 0.0999031L0.33 1.8699L8.46 9.9999L0.33 18.1299Z",
      },
    };
  },
  methods: {
    errorImage(event) {
      let cover = require("../../assets/tiny/sem_capa.svg");
      event.target.src = cover;
    },
    searchBarMove(event) {
      const searchBar = document.getElementById("searchBar");

      const positionTop = event.path[1].pageYOffset;

      if (positionTop >= 105) {
        searchBar.classList.remove("lg:col-start-4");
        searchBar.classList.remove("lg:col-span-6");

        searchBar.classList.contains("lg:col-start-1")
          ? ""
          : searchBar.classList.add("lg:col-start-3");
        searchBar.classList.contains("lg:col-span-12")
          ? ""
          : searchBar.classList.add("lg:col-span-8");
      } else if (positionTop < 105) {
        searchBar.classList.add("lg:col-start-4");
        searchBar.classList.add("lg:col-span-6");

        searchBar.classList.remove("lg:col-start-3");
        searchBar.classList.remove("lg:col-span-8");
      } else {
      }
    },
    readLess(synopsis) {
      let reducedSynopsis;
      const splitSynopsis = synopsis.split(" ");
      if (splitSynopsis.length > 68) {
        this.cut = true;
        reducedSynopsis = splitSynopsis.filter((item, index) => {
          if (index < 68) {
            return item;
          }
        });
        this.displayedSynopsis = reducedSynopsis
          .join(" ")
          .replaceAll("<p>", "")
          .replaceAll("</p>", " ")
          .replaceAll("<strong>", "")
          .replaceAll("</strong>", "")
          .replaceAll("<em>", " ")
          .replaceAll("</em>", "")
          .replaceAll("<b>", "")
          .replaceAll("<br />", "")
          .replaceAll("</b>", "")
          .replaceAll(/\&\#160\;/g, "")
          .replaceAll("<i>", "")
          .replaceAll("</i>", " ");
      } else {
        this.displayedSynopsis = this.researchedBook.synopsis
          .replaceAll("<p>", "")
          .replaceAll("</p>", " ")
          .replaceAll("<strong>", "")
          .replaceAll("</strong>", "")
          .replaceAll("<em>", " ")
          .replaceAll("</em>", "")
          .replaceAll("<b>", "")
          .replaceAll("<br />", "")
          .replaceAll("</b>", "")
          .replaceAll(/\&\#160\;/g, "")
          .replaceAll("<i>", "")
          .replaceAll("</i>", " ");
        this.cut = false;
      }
      this.read = true;
    },

    readMore() {
      this.displayedSynopsis = this.researchedBook.synopsis
        .replaceAll("<p>", "")
        .replaceAll("</p>", " ")
        .replaceAll("<strong>", "")
        .replaceAll("</strong>", "")
        .replaceAll("<em>", " ")
        .replaceAll("</em>", "")
        .replaceAll("<b>", "")
        .replaceAll("<br />", "")
        .replaceAll("</b>", "")
        .replaceAll(/\&\#160\;/g, "")
        .replaceAll("<i>", "")
        .replaceAll("</i>", " ");
      this.read = false;
    },

    resize(size) {
      if (size > 1023) {
        this.mobile = false;
      } else {
        this.mobile = true;
      }
    },
    closeToast() {
      this.toast = "-right-full";
    },
    inputTop() {
      const input = document.querySelector("#search");
      input.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    changeModalShareState() {
      this.showShare = !this.showShare;
    },
    changeModalBuyState() {
      this.showBuy = !this.showBuy;
    },
    synopsis(book) {
      const editionId = book.id_edicao;

      api_caller({
        method: "get",
        url: `/edicao/${editionId}`,
      })
        .then((response) => {
          this.researchedBook.category = response.data.body.categoria;
          this.researchedBook.synopsis = response.data.body.sinopse;
          this.researchedBook.pages = response.data.body.paginas;
          this.researchedBook.publisher = response.data.body.editora;

          this.foundBook = true;
          this.readLess(response.data.body.sinopse);
          this.loading = true;
        })
        .catch((er) => {
          console.error(er);
          this.loading = false;
        });
    },
    replaceChars(string) {
      string = string.replace(/[àáâãäå]/g, "a");
      string = string.replace(/[èéẽë]/g, "e");
      string = string.replace(/[òóõôö]/g, "o");
      string = string.replace(/[ìíï]/g, "i");
      string = string.replace(/[ç]/g, "c");
      string = string.replace(/[^a-z0-9]/gi, "");
      return string;
    },

    insertBookModal(book) {
      this.book = book;
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    closeModalShare() {
      this.showShare = false;
    },
    closeModalBuy() {
      this.showBuy = false;
    },
    scrollToSection() {
      scroll();
    },
    searchBook() {
      api_caller({
        method: "get",
        url: "/obras",
        params: {
          search: this.$props.query.q,

          limit: 10,
        },
      })
        .then((response) => {
          this.bookSelected = response.data.body.find((element) => {
            let info = element.titulo + "-" + element.autor;
            info = info.split("-").join(" ");

            return (
              element.id_obra == this.$props.query.id ||
              info == this.$props.query.q.split("-").join(" ")
            );
          });

          this.researchedBook.title = this.bookSelected.titulo;
          this.researchedBook.author = this.bookSelected.autor;
          this.bookCover = this.bookSelected.url_capa;
          this.foundBook = true;

          this.bookId = this.bookSelected.id_obra;
          this.synopsis(this.bookSelected);
        })
        .catch((er) => {
          console.log(er);
          this.loading = false;
        });
    },
    refreshPage() {
      this.autoCompleteSelectedOption = "";
      if (this.bookSelected != undefined || this.bookSelected != null) {
        this.bookId = this.bookSelected.id_obra;
        this.researchedBook.title = this.bookSelected.titulo;
        this.researchedBook.author = this.bookSelected.autor;
        this.bookCover = this.bookSelected.url_capa;
        this.foundBook = true;
        this.synopsis(this.bookSelected);

        this.fetchData();
      } else if (
        this.$props.query.id != undefined ||
        this.$props.query.id != null
      ) {
        this.bookId = this.$props.query.id;

        this.researchedBook.author = this.$props.query.q.split("-")[
          this.$props.query.q.split("-").length - 1
        ];
        this.researchedBook.title = this.$props.query.q.split("-")[0];
        this.searchBook();
        this.fetchData();
      }
    },

    fetchData() {
      api_caller({
        method: "post",
        url: "/obras",
        data: {
          book_id: `${this.bookId}`,

          author_limit: 5,
          recommendation_limit: 10,
        },
      })
        .then((response) => {
          var body = response.data.body;
          if (response.data.statusCode == 404) {
            this.suggestedBookList = [];
            this.topAuthorList = body.topAuthor;
            this.loading = false;
            this.autoCompleteSelectedOption = "";
          } else {
            this.suggestedBookList = body.recommendations;
            this.topAuthorList = body.topAuthor;

            this.autoCompleteSelectedOption = "";

            this.loading = true;
          }
        })
        .catch((er) => {
          console.error(er);
          this.suggestedBookList = false;
          this.topAuthorList = false;
          this.foundBook = false;
          this.loading = false;
        });

      this.closeModalShare();
    },
  },
  watch: {
    "$route.query"(to, from) {
      if (to.id != undefined || to.id != null) {
        this.refreshPage();
      }
    },
    foundBook: function(newValue) {
      if (newValue == false) {
        this.suggestedBookList = [];
        this.topAuthorList = [];
        this.foundBook = false;
        this.loading = false;
      }
    },
  },
  created() {
    scroll();

    if (this.$props.query.id == null || this.$props.query.id == undefined) {
      this.foundBook = false;
    } else {
      this.refreshPage();
    }
  },
  mounted() {
    document.addEventListener("scroll", this.searchBarMove);
    scroll();
    const width = window.innerWidth;
    const logoNav = document.querySelector(".pointer");
    logoNav.classList.add("cursor-pointer");

    if (width > 1023) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }

    window.addEventListener("resize", (event) => {
      this.resize(event.target.innerWidth);
    });
  },
  unmounted() {
    document.removeEventListener("scroll", this.searchBarMove);
    window.removeEventListener("resize", (event) => {
      this.resize(event.target.innerWidth);
    });
    this.researchedBook = null;
    this.foundBook = null;
    this.suggestedBookList = null;
    this.topAuthorList = null;
  },
};
</script>

<style>
.max-synopsis {
  max-height: 353px;
}
.modalPosition {
  left: unset;
  top: unset;
}
@media (max-width: 1023px) {
  .carrossel-autor img {
    max-width: 127.5px;
    max-height: 191.17px;
  }
  .modalPosition {
    left: 0;
    top: 0;
  }
}

</style>
