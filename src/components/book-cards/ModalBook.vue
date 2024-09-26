<template>
  <div class="flex justify-center lg:items-center items-end">
    <div
      @click="closeModal"
      class="backdrop-brightness-50 backdrop-filter backdrop-blur-sm  w-screen h-screen top-0 left-0"
    ></div>
    <div
      class="bg-white fixed lg:rounded-2xl rounded-t-2xl z-20 lg:w-6/12 lg:h-7/12 w-full h-7/12 modal flex py-2 pl-2 pr-0 lg:pr-0 bottom-0 lg:bottom-auto"
      id="modal"
    >
      <div
        class="w-full h-5 -mt-2 absolute lg:hidden justify-center flex items-center"
        id="modal-movement"
      >
        <div class="slider w-1/6 bg-slider mr-2 rounded"></div>
      </div>
      <a class="absolute right-0 mr-3 opacity-90 cursor-pointer">
        <img
          @click="closeModal"
          src="../../assets/tiny/close-mobile.svg"
          alt=""
        />
      </a>
      <div
        class="width-full lg:flex hidden items-start max-h-full justify-start w-2/5"
      >
        <img
          :src="bookInfo.url_capa"
          @error="errorImage"
          class="h-auto w-auto rounded-2xl max-inherit"
          alt=""
        />
      </div>
      <div
        id="sinopse-modal"
        class="relative flex flex-col items-start overflow-auto z-40 overflow-x-hidden lg:w-3/5 w-full modal-info lg:px-2 px-0 mt-3 lg:mb-6 mb-7"
      >
        
        <Title 
          class="pr-4 lg:pr-0 mb-1 "
          titleType="h2"
          titleClass="xLargeSemi"
          :content="bookInfo.titulo"
        />
        
        <Title
          class="mb-4"
          titleType="h3"
          titleClass="normalBase"
          :content="bookInfo.autor"
        />

        <div class="mb-4">
          
          <Shape
            v-if="bookInfo.categoria"
            shapeType="category"
            :content="bookInfo.categoria"
          />

          <Shape
            v-else
            shapeType="category"
            content="-"
          />

        </div>
        <div class="flex flex-row mb-4">
          <div class="flex flex-col mr-4">
            
            <Text  
              class="mb-1"
              textClass="smallSemiSec"
              content="editora"
            />
           
            <Text  
              v-if="bookInfo.editora"
              textClass="smallSemiMain"
              :content="bookInfo.editora"
            />
           
            <Text  
              v-else
              textClass="smallSemiMain"
              content="-"
            />
          </div>
          <div class="flex flex-col">
           
            <Text  
              class="mb-1"
              textClass="smallSemiSec"
              content="páginas"
            />
           
            <Text  
              v-if="bookInfo.paginas"
              textClass="smallSemiMain"
              :content="bookInfo.paginas"
            />
           
            <Text  
              v-else
              textClass="smallSemiMain"
              content="-"
            />
          </div>
        </div>
        <span class="pr-4 pb-5 text-sm leading-7 z-10">{{
          bookInfo.sinopse.replaceAll("<p>","").replaceAll("</p>"," ").replaceAll("<strong>","").replaceAll("</strong>", "").replaceAll("<em>"," ").replaceAll("</em>","").replaceAll("<b>", "").replaceAll("<br />",'').replaceAll(/\&\#160\;/g,'').replaceAll("</b>","").replaceAll("<i>","").replaceAll("</i>"," ")
        }}</span>
         
         </div>
          
          <Button 
            @click="read(bookInfo.titulo + ' - ' + bookInfo.autor,bookInfo.id_obra)"
            class="bg-main-purple absolute bottom-2 z-50 left-0 right-0 mx-auto lg:right-2 lg:left-auto w-40 rounded-full  h-5 flex justify-center items-center px-5 "
            buttonType="roundedPurpleRegular"
            buttonTitle="quero ler"
          />
    </div>
  </div>
</template>

<script>
import scroll from "../../scrollToSection";
import Button from "../tiny/newComponents/Button"
import Text from "../tiny/newComponents/Text"
import Title from "../tiny/newComponents/Title"
import Shape from "../tiny/newComponents/Shape"

export default {
  props: ["bookInfo"],
  name: "ModalBook",
  components: {Button, Text, Title, Shape},

  data() {
    return {
      show: false,
      startY: 0,
      movement: 0,
    };
  },
  methods: {
    goToBuy(){
      window.open(this.bookInfo.url_compra,"_blank")
    },
    errorImage(event){
    
      let cover = require('../../assets/tiny/sem_capa.svg')
      event.target.src = cover

    },
    read(livro,id) {
      this.$emit("book",this.bookInfo)
      this.closeModal();
      this.$router.push({
        name: "search",
        query: {
          q: livro,
          id:id
        },
      });
      scroll();
    },
    movimentationTouch(event) {
      event.preventDefault();
      const modal = document.getElementById("modal");
      this.movement = (event.touches[0].clientY - this.startY) * 1.2;
      if (this.movement <= -100) {

        modal.style.height = "100%"
        modal.classList.remove('h-7/12');
        modal.classList.remove('bottom-0');
        modal.classList.add('h-screen')
        modal.style.bottom = '0px'
        this.movement = 0;
      } else if(this.movement>-100 && this.movement <0){
        modal.style.height = `${(58 - (this.movement/10))}%`
        this.movement = 0;
      } else {
        modal.style.transition = "none";
        modal.style.bottom = `${-this.movement}px`;
      }
    },
    closeModal() {
      this.$emit("false");
    },
  },

  mounted() {

    const modalMovement = document.getElementById("modal-movement");

    modalMovement.addEventListener("touchstart", (event) => {
      this.startY = event.touches[0].clientY;
    });

    modalMovement.addEventListener("touchmove", this.movimentationTouch, true);

    modalMovement.addEventListener("touchend", () => {
      const modal = document.getElementById("modal");
      if (this.movement >= 170) {
        modal.style.transition = "0.5s";
        modal.style.bottom = "-100%";
        setTimeout(() => {
          this.closeModal();
        }, 500);
      }
      if (this.movement < 170) {
        
        this.movement = 0;
        modal.style.transition = "0.5s";
        modal.style.bottom = `${this.movement}px`;
      }

      modal.removeEventListener("touchstart", (event) => {
        this.startY = event.touches[0].clientY;
      });
      modal.removeEventListener("touchmove", (event) => {
        event.preventDefault();
        const modal = document.getElementById("modal");
        this.movement = (event.touches[0].clientY - this.startY) * 1.6;
        modal.style.bottom = `${-this.movement}px`;
        if (this.movement >= 170) {
          modal.style.bottom = "-100%";
        }
      });
    });
  },
};
</script>

<style>
.max-inherit {
  max-height: inherit;
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
.modal {
  max-height: 581px;
  max-width: 827px;
}
@media(max-width:1023px){
  .modal{
    max-height: none !important;
    max-width: none !important;
  }
  
}
</style>
