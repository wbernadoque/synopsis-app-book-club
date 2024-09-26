<template>
  <div :class="shapeClasses[shapeType]"  >
  <p :class="textClasses[shapeType]" >
    {{content}}
  </p>
  </div>
</template>
<script>
import Text from "../newComponents/Text";
export default {
  name: "Shape",
  components: { Text },
  props: ["content", "shapeType"],
   data() {
    return {
      shapeClasses: {
        category:
        "flex flex-row theme",
        roundedPurple:"w-16 h-5 rounded-md flex items-center justify-center bg-main-purple bottom-0",
      },
      textClasses: {
        category:
        "capitalize px-3 py-1 font-semibold text-sm text-tag",
        roundedPurple:" text-sm text-center font-semibold text-back",
        roundedGray:"capitalize font-semibold text-sm text-tag"
      }
    }
   }
};
</script>

<style scooped></style>