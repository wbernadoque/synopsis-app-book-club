<template>
  <div
    class="flex flex-col-reverse lg:flex-row lg:justify-end lg:items-center items-center cursor-pointer w-full"
  >
    <Text
      class="text-center mt-1 lg:mt-0"
      textClass="backToTop"
      content="voltar ao topo"
    />
    <a
      class="lg:w-12 lg:h-12 w-auto h-auto ml-0 flex justify-center lg:items-center items-end"
    >
      <img src="../../../assets/tiny/top-control.svg" class="w-5 h-5" alt="" />
    </a>
  </div>
</template>
<script>
import Text from "../newComponents/Text";
export default {
  name: "BackToTop",
  components: { Text },
};
</script>

<style scooped></style>
