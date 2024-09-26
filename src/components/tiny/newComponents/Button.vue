<template>
  <div>
    <button
      v-if="buttonType === 'roundedError'" :class="classes[buttonType]"
      >
      <img class="mr-1" src="../../../assets/tiny/warning.svg" alt="" />
      {{buttonTitle}}
    </button>
    <button
      v-else-if="buttonType === 'search'" :class="classes[buttonType]"
      >
      <img
        v-if="buttonType === 'search'"
        src="../../../assets/tiny/search.svg"
        alt=""
        class="block lg:hidden"
      />
      <p class="lg:block hidden">
      {{buttonTitle}}
      </p>
    </button>
    <button
      v-else-if="buttonType === 'close'" :class="classes[buttonType]"
      >
      <img
        src="../../../assets/tiny/close-mobile.svg"
        alt=""
      />
    </button>
    <button
        v-else-if="buttonType === 'roundedPurpleAnimation'" :class="classes[buttonType]"

          class="mt-5 rounded-full font-semibold h-5 flex self-center justify-center items-center cursor-pointer bg-main-purple text-back w-32 lg:col-span-2 lg:row-start-7 lg:place-self-center 0"
        >
          <svg
            v-if="animation"
            class="animate-spin h-3 w-3 mr-1 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          enviar
    </button>
    <button v-else :class="classes[buttonType]">
      {{buttonTitle}}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["buttonTitle", "buttonType", "animation"],
  data() {
    return {
      classes: {
        joinUs:
          "text-sm font-semibold mt-5 w-44 rounded-full text-center h-5 flex justify-center items-center cursor-pointer bg-main-purple text-back ",
        read:
          "absolute bottom-2 z-50 left-0 right-0 mx-auto lg:right-2 lg:left-auto w-40 rounded-full text-center h-5 flex justify-center items-center cursor-pointer bg-main-purple text-back px-5",
        subscribe:
          "bg-main-purple text-base  font-semibold text-white",
        search:
          "flex justify-center items-center my-1 mr-1 lg:h-auto lg:w-auto w-6 h-6 py-0 px-0 lg:py-1 lg:px-5 absolute inset-y-0 right-0 bg-main-purple rounded-full font-semibold text-white text-base leading-5 botao-linha",
        cookie:
          "flex justify-center items-center h-5 py-1.5 px-5 w-48 bg-main-purple rounded-full font-semibold text-white text-sm",
        banner:
          "bg-main-purple text-center w-40 text-back text-sm rounded-full cursor-pointer py-1 mt-4",
        contactForm: " text-sm  text-center h-5 cursor-pointer",
        roundedWhite:
          "h-5 flex justify-center items-center w-10 mr-2 rounded-full font-semibold cursor-pointer bg-back text-main-action  ",
        roundedPurpleSemi:
          "rounded-full font-semibold h-5 flex justify-center items-center cursor-pointer bg-main-purple text-back w-10 px-8",
        roundedError:
          "text-xs text-back rounded-full text-center h-5 flex justify-center items-center cursor-pointer w-auto px-3 py-2 bg-error-email",
        roundedPurpleRegular:
          "text-back cursor-pointer text-center ",
        close:"  opacity-90 cursor-pointer",
        roundedPurple:" text-sm rounded-full font-semibold cursor-pointer bg-main-purple text-back ",
        roundedPurpleDefault:"text-sm rounded-full font-semibold h-5 flex self-center justify-center items-center cursor-pointer bg-main-purple text-back px-5",
        roundedPurpleAnimation:" rounded-full font-semibold h-5 flex self-center justify-center items-center cursor-pointer bg-main-purple text-back w-32",
        roundedPurpleHome:"rounded-full font-semibold h-5 cursor-pointer bg-main-purple text-back w-full",
        roundedPurpleNotFound:"bg-main-purple cursor-pointer rounded-full text-base lg:w-32 w-31 lg:h-6 h-5 text-white",
        roundedPurpleBase:"font-semibold text-back w-full text-base rounded-full text-white"
        
      },
    };
  },
};
</script>

<style scooped></style>
