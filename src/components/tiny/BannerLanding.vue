<template>
  <div class="flex justify-center lg:items-center items-end">
    <div
      class="backdrop-brightness-50 backdrop-filter backdrop-blur-sm w-screen h-screen top-0 left-0"
    ></div>
    <div
      class="bg-back overflow-hidden fixed lg:rounded-2xl rounded-t-2xl z-20 w-full modal flex py-3 px-4 bottom-0 lg:bottom-auto"
      id="modal"
    >
      <img
        src="../../assets/backgrounds/background-banner.svg"
        class="h-full hidden lg:block absolute left-0 top-0"
        alt=""
      />
      <img
        src="../../assets/backgrounds/background-banner-rotate.svg"
        class="w-full lg:hidden absolute left-0 top-0"
        alt=""
      />
      <div
        class="w-full h-5 z-40 left-0 -mt-2 absolute lg:hidden justify-center flex items-center"
      >
        <div class="slider w-1/6 bg-slider rounded" id="modal-movement"></div>
      </div>
      <a class=" block absolute right-0 mr-3 opacity-90 cursor-pointer z-50">
        <img
          @click="$emit('false')"
          src="../../assets/tiny/close-mobile.svg"
          alt=""
        />
      </a>

      <div
        class="w-full relative grid lg:grid-cols-2 grid-cols-1 items-center max-h-full justify-between"
      >
        <div class="flex justify-center items-center lg:mt-0 mt-3 px-3 lg:px-3">
          <img src="../../assets/big/image-banner.svg" />
        </div>
        <div
          class="lg:col-start-2 flex flex-col items-center lg:items-start h-full w-full"
        >
          <Title
            class="text-center lg:text-left mt-2 lg:mt-5"
            titleType="h2"
            titleClass="xl3Semi"
            content="Quer um motivo para"
          />
          <Title
            class="text-center lg:text-left "
            titleType="h2"
            titleClass="xl3Semi"
            content="usar o Synopsis?"
          />
          <Title
            class="text-center lg:text-left mb-3"
            titleType="h2"
            titleClass="xl3Semi"
            content="Nós te damos 3!"
          />

          <div>
            <div class="inline-flex my-1">
              <Text
                textClass="boldMain"
                content="1.&nbsp;"
              />
              <Text
                content="Indicação de leitura"

              />
            </div>
            <div class="inline-flex my-1">
              <Text
                textClass="boldMain"
                content="2.&nbsp;"
              />
              <Text
                content="Cronograma personalizado"
              />
            </div>
            <div class="inline-flex my-1">
              <Text
                textClass="boldMain"
                content="3.&nbsp;"
              />
              <Text
                class=""
                content="Lembretes customizados"
              />
            </div>
          </div>
          
          <Button
            buttonTitle="saiba mais "
            buttonType="banner"
            @click="handleButton"
            data-cy="cookie"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import Button from "../tiny/newComponents/Button";
import Text from "../tiny/newComponents/Text";
import Title from "../tiny/newComponents/Title";
export default {
  name: "BannerLanding",
  components: {
    Button,
    Text,
    Title,
  },
  data() {
    return {
      show: true,
      startY: 0,
      movement: 0,
    };
  },
  methods: {
    handleButton() {
      VueCookies.set("banner", "yes", "7d");
      this.$emit("false");
      this.$router.push("/assistente-de-leitura");
    },
    movimentationTouch(event) {
      event.preventDefault();
      const modal = document.getElementById("modal");

      this.movement = (event.touches[0].clientY - this.startY) * 1.2;

      if (this.movement <= 0) {
        this.movement = 0;
      } else {
        modal.style.transition = "none";

        modal.style.bottom = `${-this.movement}px`;
      }
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
          this.$emit("false");
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
  max-height: 477px;
  max-width: 827px;
}
@media (max-width: 1023px) {
  .modal {
    height: 652px;
    max-height: 652px;
    max-width: 100%;
  }
}
</style>
