<template >
  <div
    ref="url_compartilhar"
    class="flex justify-center lg:items-center items-end w-full h-full"
  >
    <div
      @click="closeModal"
      class="bg-black fixed opacity-50 w-screen h-screen top-0 left-0"
    ></div>
    
    <div
      tabindex="0"
      class="grid grid-cols-6 bg-white z-30 fixed bottom-0 left-0 lg:bottom-auto lg:left-auto lg:w-6/12 lg:h-auto lg:rounded-2xl rounded-t-2xl lg:rounded-2xl z-40 w-screen h-auto flex flex-col items-center py-5 px-5"
      id="buy"
    >
      <div
        class="w-full h-5 mt-0.5 top-0 absolute lg:hidden justify-center flex items-center"
        id="modal-movement"
      >
        <div class="slider w-1/6 bg-slider rounded"></div>
      </div>
      
      <Button 
        @click="closeModal"
        buttonType="close"
        class="absolute top-0 right-0 mr-4 mt-3"
      />

      <!-- conteudo -->
      
      <Text 
        class="col-start-1 col-span-2 flex justify-center "
        textClass="smallSecondary"
        content="vendido por"
      />
     
      <Text 
        class="col-start-3 col-span-2 flex justify-center "
        textClass="smallSecondary"
        content="preço"
      />

      <span class="col-start-1 col-span-6 h-px bg-selection my-2"></span>

      <div class="col-start-1 col-span-2 block justify-center text-sm max-w-17">
        <img
          class="max-h-9 mb-1 block mx-auto"
          src="../../assets/tiny/image_15.png"
          alt=""
        />
        <Text 
          class="text-center block mx-auto"
          content="Amazon"
        />
      </div>

      <div
        class="col-start-3 col-span-2 text-xs flex justify-center"
      >
        <Text 
          textClass="smallBold"
          content="R$"
        />
        <Text 
          textClass="xLargeBold"
          content="79,90"
        />
      </div>

      <NavButton 
        class="col-start-5 col-span-2 m-auto"
        buttonType="navbar"
        buttonTitle="ir para site"
      />

      <span class="col-start-1 col-span-6 h-px bg-selection my-2"></span>

      <div class="col-start-1 col-span-2 block justify-center text-sm max-w-17">
        <img
          class="max-h-9 mb-1 block mx-auto"
          src="../../assets/tiny/image_24.png"
          alt=""
        />
        <Text 
        class="text-center block mx-auto"
        content="Submarino"
      />
      </div>

       <div
        class="col-start-3 col-span-2 text-xs flex justify-center"
      >
        <Text 
          textClass="smallBold"
          content="R$"
        />
        <Text 
          textClass="xLargeBold"
          content="79,90"
        />
      </div>

      <NavButton 
        class="col-start-5 col-span-2 m-auto"
        buttonType="navbar"
        buttonTitle="ir para site"
      />

      <span class="col-start-1 col-span-6 h-px bg-selection my-2"></span>

      <div class="col-start-1 col-span-2 block justify-center text-sm max-w-17">
        <img
          class="max-h-9 mb-1 block mx-auto"
          src="../../assets/tiny/image_18.png"
          alt=""
        />
        <Text 
        class="text-center block mx-auto"
        content="Livraria da Travessa"
      />
      </div>


      <div
        class="col-start-3 col-span-2 text-xs flex justify-center"
      >
        <Text 
          textClass="smallBold"
          content="R$"
        />
        <Text 
          textClass="xLargeBold"
          content="79,90"
        />
      </div>

      <NavButton 
        class="col-start-5 col-span-2 m-auto"
        buttonType="navbar"
        buttonTitle="ir para site"
      />
    </div>
  </div>
</template>

<script>
import Button from "../tiny/newComponents/Button"
import Title from "../tiny/newComponents/Title"
import Text from "../tiny/newComponents/Text"
import NavButton from "../tiny/newComponents/NavButton"
export default {

  name: "ModalBuy",
  components: {Button, Title, Text, NavButton},
  data() {
    return {
      show: false,
      navigator: null,
    };
  },
  methods: {
    closeModal(evento) {
      this.$emit("false");
    },
  },

  watch: {
    // '$route.query.q'(to, from) {
    //   this.pesquisado = `${this.bookSelected.titulo} - ${this.bookSelected.autor}`;
    // },
  },
  mounted() {
    this.navigator = navigator.buy === undefined ? false : true;
    const buy = document.getElementById("buy");
    const modalMoviment = document.getElementById("modal-movement");

    modalMoviment.addEventListener("touchstart", (event) => {
      this.startY = event.touches[0].clientY;
    });
    modalMoviment.addEventListener("touchmove", (event) => {
      event.preventDefault();
      const buy = document.getElementById("buy");

      this.movement = (event.touches[0].clientY - this.startY) * 1.2;
      if (this.movement <= 0) {
        this.movement = 0;
      } else {
        buy.style.transition = "none";

        buy.style.bottom = `${-this.movement}px`;
      }
    });
    modalMoviment.addEventListener("touchend", () => {
      const buy = document.getElementById("buy");
      if (this.movement >= 170) {
        buy.style.transition = "0.5s";
        buy.style.bottom = "-100%";
        setTimeout(() => {
          this.closeModal();
        }, 500);
      }
      if (this.movement < 170) {
        this.movement = 0;
        buy.style.transition = "0.5s";
        buy.style.bottom = `${this.movement}px`;
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
