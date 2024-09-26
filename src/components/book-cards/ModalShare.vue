<template>
  <div
    ref="url_compartilhar"
    class="flex justify-center lg:items-center items-end w-full h-full"
  >
    <div
      @click="closeModal"
      class="backdrop-brightness-50 backdrop-filter backdrop-blur-sm  fixed w-screen h-screen top-0 left-0"
    ></div>
    <div
      tabindex="0"
      class="bg-white z-30 fixed bottom-0 left-0 lg:bottom-auto lg:left-auto lg:w-6/12 lg:h-auto lg:rounded-2xl rounded-t-2xl lg:rounded-2xl z-40 w-screen h-auto flex flex-col items-center py-5 px-5"
      id="share"
    >

    
      <div
        class="w-full h-5 -mt-5 absolute lg:hidden justify-center flex items-center"
        id="modal-movement"
      >
        <div class="slider w-1/6 bg-slider rounded"></div>
      </div>
      <Button 
        @click="closeModal"
        buttonType="close"
        class="absolute top-0 right-0 mr-4 mt-3"
      />
      
      <Title
        class="w-full text-center"
        titleType="h2"
        titleClass="assistSubtitle"
        content="Compartilhe essas recomendações"
      />

      <div class="flex flex-roq justify-around my-5 w-3/4">
        <div data-href="https://developers.facebook.com/docs/plugins/">
          <a
            target="_blank"
            :href="postFacebook"
            class="fb-xfbml-parse-ignore cursor-pointer"
            ><img src="../../assets/tiny/facebook.svg" class="" alt=""
          /></a>
         
        </div>
        <a :href="linkedin" target="_blank" class="cursor-pointer"
          ><img src="../../assets/tiny/linkedin-post.svg" class="" alt=""
        /></a>
        <a :href="tweet" target="_blank" class="cursor-pointer"
          ><img src="../../assets/tiny/twitter-post.svg" class="" alt=""
        /></a>
        <a
          class="cursor-pointer shadow-sm w-3 h-3 border-1 rounded-sm flex justify-center align-bottom"
          :class="navigator == false ? 'hidden' : ''"
          @click="share"
          ><SpanComp>...</SpanComp></a
        >
      </div>

      <!-- <span class="hidden text-secondary w-full lg:block">ou copie o link</span> -->
      <div
        class="lg:mt-1 flex lg:flex-row flex-col w-full justify-around items-center rounded-full bg-transparent lg:bg-gray py-2 px-1"
      >
        <input
          type="text"
          :value="newLink"
          class="url text-white lg:text-secondary bg-transparent w-auto lg:block lg:opacity-100 opacity-0"
        />
    
        <Button
          @click="copyLink"
          class="bg-main-purple lg:bg-transparent lg:py-0 py-2 w-2/3 lg:w-auto flex justify-center cursor-pointer rounded-full font-semibold text-white lg:text-main-action"
          :buttonTitle="copy"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../tiny/newComponents/Title"
import Button from "../tiny/newComponents/Button"
import NavButton from "../tiny/newComponents/NavButton"
import SpanComp from "../tiny/newComponents/SpanComp"
export default {
  props: ["book"],
  name: "ModalShare",
  components: {Title, Button, NavButton, SpanComp},

  data() {
    return {
      newLink: window.location.href.toString(),
      book: this.book,
      copy: "Copiar Link",
      show: false,
      navigator: null,

      postFacebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href.toString()
      )}`,
      tweet: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href.toString()
      )}&text=Já leu "${
        this.book.titulo
      }"? &via=Synopsis_ia&hashtags=synopsis`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        window.location.href.toString()
      )}`,
    };
  },
  methods: {
    share() {
      if (navigator.share !== undefined) {
        navigator
          .share({
            title: `Já leu "${this.book.titulo}"?`,
            text: `Já leu "${this.book.titulo}"?`,
            url: window.location.href.toString(),
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      } else {
      }
    },
    copyLink() {
      const textArea = document.querySelector(".url");

      textArea.select();
      document.execCommand("copy");
      this.copy = "Copiado";
    },
    closeModal(evento) {
      this.$emit("false");
    },
  },
  computed: {
    whereIam: () => {
      return window.location.href.toString();
    },
  },
  watch: {},
  mounted() {
    this.navigator = navigator.share === undefined ? false : true;
    const share = document.getElementById("share");
    const modalMoviment = document.getElementById("modal-movement");

    modalMoviment.addEventListener("touchstart", (event) => {
      this.startY = event.touches[0].clientY;
    });
    modalMoviment.addEventListener("touchmove", (event) => {
      event.preventDefault();
      const share = document.getElementById("share");

      this.movement = (event.touches[0].clientY - this.startY) * 1.2;
      if (this.movement <= 0) {
        this.movement = 0;
      } else {
        share.style.transition = "none";

        share.style.bottom = `${-this.movement}px`;
      }
    });
    modalMoviment.addEventListener("touchend", () => {
      const share = document.getElementById("share");
      if (this.movement >= 170) {
        share.style.transition = "0.5s";
        share.style.bottom = "-100%";
        setTimeout(() => {
          this.closeModal();
        }, 500);
      }
      if (this.movement < 170) {
        this.movement = 0;
        share.style.transition = "0.5s";
        share.style.bottom = `${this.movement}px`;
      }
    });
  },
};
</script>

<style>
.slider {
  height: 4px;
}
.fit-content {
  width: fit-content;
}
.width-45-percent {
  width: 45%;
}
.width-55-percent {
  width: 55%;
}

.title-size {
  font-size: 1.125rem;
}
.text-color {
  color: #7d7d7d;
}
.theme {
  background: #e0e0e0;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.balloon {
  content: "";

  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;

  left: -18px;
  bottom: 0;

  -webkit-filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
  -moz-filter: drop-shadow(-3px 0px 4px rgba(85, 43, 43, 0.1));
  -ms-filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
  -o-filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
}
@media (max-width: 1023px) {
  .balloon {
    display: none;
  }
}
</style>
