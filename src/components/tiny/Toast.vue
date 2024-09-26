<template>
  <!-- @mousedown.prevent="initClick"
    @mousemove="moveToast" -->
  <div
    class="bg-back z-20 shadow-highlight shadow-hoverHighlight rounded-xl container-toast flex overflow-hidden"
    id="toast"
  >
    <div class="bg-main-purple side-border h-full"></div>

    <div class="flex lg:flex-row flex-col justify-center items-center w-full">
      <img
        src="../../assets/tiny/cookie.svg"
        alt=""
        class="lg:w-3 w-4 mx-2 lg:mt-0 mt-3 lg:mb-0 mb-4"
      />
     
        <div class="block px-2 pb-2 lg:px-5">
          <SpanComp>
            Nós usamos cookies para melhorar sua experiência. Ao usar o Synopsis você concorda com a coleta de dados descrita na nossa 
          </SpanComp>

          <SpanComp
            @click="goToPrivacyPolicy"
            spanClass="mainSemiPointer"
          >
            Política de Privacidade
          </SpanComp>
        </div>
        <Button
          class="mx-2"
          buttonType="cookie"
          buttonTitle="continuar no site"
          @click="cookie"
        />
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import Button from "../tiny/newComponents/Button";
import Text from "../tiny/newComponents/Text";
import NavButton from "../tiny/newComponents/NavButton";
import SpanComp from "../tiny/newComponents/SpanComp";
export default {
  name: "Toast",
  components: {
    Button,
    NavButton,
    Text,
    SpanComp,
  },

  data() {
    return {
      click: false,

      startX: 0,
      movement: 0,
    };
  },
  methods: {
    cookie() {
      VueCookies.set("acceptCookie", "yes", "10y");
      this.$emit("false");
    },
    initClick(event) {
      this.click = true;
      this.startX = event.clientX;
    },

    moveToast(event) {
      const toast = document.getElementById("toast");
      this.movement = (event.clientX - this.startX) * 1.5;

      if (this.click == true) {
        toast.style.transition = "none";
        toast.style.right = `-${this.movement}px`;
        if (this.movement > 260) {
          toast.style.transition = "0.5s";
          toast.style.right = "-100%";
        }
      }
    },
    goToPrivacyPolicy(){
      window.open('https://forms.gle/5eEbPwThVK93oULz9')
    }
  },

  mounted() {
    const toast = document.getElementById("toast");
  },
};
</script>

<style>
.container-toast {
  width: 100%;
  height: 116px;
}
@media (max-width: 1023px) {
  .container-toast {
    height: 292px;
  }
}
.side-border {
  width: 12px;
}
</style>
