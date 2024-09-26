<template>
  <div
    class="flex flex-col justify-between w-full h-full relative box-border"
    @mouseover="display = 'flex'"
    @mouseout="display = 'hidden'"
  >
    <!-- balloon removido  -->
    <div
      class="flex items-center justify-center w-full removed absolute right-0 -top-5 rounded-full shadow-lg  py-1 px-1"
      v-if="removed"
      id="balloon"
    >
      <Text textClass="xSmallNormal" content="título removido" />
      <NavButton
        @click.prevent="undo"
        class="pl-2"
        buttonType="xSmallPurple"
        buttonTitle="desfazer"
      />
    </div>
    <div class="flex justify-center relative h-auto w-full">
      <div
        class="absolute flex-wrap flex flex-col h-full w-full justify-around items-center rounded-2xl removed"
        :class="display"
        v-if="!home"
      >
        <div class="flex flex-col items-center z-10">
          <img
            src="../../assets/tiny/info.svg"
            class="cursor-pointer w-4 mb-1"
            alt=""
            @click="$emit('true')"
          />
          <Text textClass="xSmallWhite" content="saiba mais" />
        </div>
        <div
          class="absolute h-full w-full opacity-70 bg-black rounded-2xl removed z-0"
        ></div>
      </div>
      <img
        :src="bookInfo.url_capa"
        @error="errorImage"
        alt=""
        class="object-fill rounded-2xl h-auto w-full"
      />
    </div>
    <div class="text-left space-y-1 pt-2 flex flex-col h-25 lg:h-32">
      <Text
        class=" flex capitalize ellipsis max-h-5 lg:max-h-6"
        textClass="reviewBookTitle"
        :content="bookInfo.titulo"
      />

      <Text
        class="  h-6"
        textClass="reviewBookAuthor"
        :content="bookInfo.autor"
      />
    </div>
  </div>
</template>

<script>
import Text from "../../components/tiny/newComponents/Text";
import NavButton from "../../components/tiny/newComponents/NavButton";
export default {
  props: ["bookInfo", "book", "home"],
  name: "BasicCard",
  components: { Text, NavButton },
  data() {
    return {
      display: "hidden",
      text: "text-white",
      removed: false,
    };
  },
  methods: {
    errorImage(event) {
      let cover = require("../../assets/tiny/sem_capa.svg");
      event.target.src = cover;
    },
    remove() {
      this.removed = true;
    },
    undo() {
      this.removed = false;
    },
  },
};
</script>

<style>
.removed {
  font-size: 10px;
}
#balloon:after {
  content: "";

  width: 0;
  height: 0;

  position: absolute;

  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;

  bottom: -6px;
  left: 10%;
}

.title-size {
  font-size: 1.125rem;
}
</style>
