<template>
  <span :class="classes[spanClass]">
    <slot></slot>
  </span>
  
</template>
<script>
export default {
  name: "SpanComp",
  props:["spanClass"],
   data() {
    return {
      classes:{
        mainSemi:"text-main-action font-semibold",
        mainSemiPointer: "font-semibold cursor-pointer text-main-action",
        medGray:"font-medium text-gray-400",
        semiGray:"font-semibold text-gray-400",
        semiBlack:"font-semibold text-black",
        smLead6:"text-sm leading-6",

      }
    }
   },
};
</script>

<style scooped></style>