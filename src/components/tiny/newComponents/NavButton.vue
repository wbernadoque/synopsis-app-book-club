<template>
  <div>
    <span v-if="buttonType === 'showMore'" class="flex justify-end	items-center " >
        <a :class="classes[buttonType]">
            {{ buttonTitle }}
        </a>
        <img src="../../../assets/tiny/show-more.svg" class="ml-2 mt-0">
    </span>
    <span v-else-if="buttonType === 'showLess'" class="flex justify-end items-center " >
        <img src="../../../assets/tiny/show-less.svg" class="mr-1 mt-0">
        <a :class="classes[buttonType]">
            {{ buttonTitle }}
        </a>
    </span>
    <span v-else-if="buttonType === 'readAssist'" class="flex items-center " >
        <img src="../../../assets/tiny/assistente-leitura.svg" class="absolute left-3">
        <a :class="classes[buttonType]">
            {{ buttonTitle }}
        </a>
    </span>
    <span v-else-if="buttonType === 'readRecommend'" class="flex items-center " >
        <img src="../../../assets/tiny/search.svg" class="absolute left-3">
        <a :class="classes[buttonType]">
            {{ buttonTitle }}
        </a>
    </span>
    <span v-else-if="buttonType === 'contactMenu'" class="flex items-center " >
        <img src="../../../assets/tiny/contact_support.svg" class="absolute left-3">
        <a :class="classes[buttonType]">
            {{ buttonTitle }}
        </a>
    </span>
    <a :href="hrefTo" v-else :class="classes[buttonType]">
        {{ buttonTitle }}
    </a>
    
  </div>
      
</template>

<script>
export default {
  name: "NavButton",
  props: ["buttonTitle", "buttonType", "hrefTo"],
  data() {
    return {
      classes: {
        navbar: "font-semibold cursor-pointer text-main-action",
        footer: "element-subtexto cursor-pointer",
        showMore: "text-sm font-semibold cursor-pointer	",
        showLess: "text-sm font-semibold cursor-pointer	",
        xSmallPurple: "cursor-pointer text-xs text-main-action font-semibold",
        showMoreLead:"font-semibold leading-tight cursor-pointer",
        medGray:"font-medium text-gray-400",
        semiBlack:"font-semibold text-black",
        readAssist:"text-sm font-semibold",
        readRecommend:"text-sm font-semibold",
        contactMenu:"text-sm font-semibold",
        smText:"text-sm",
        mainSemi: "text-main font-semibold",
        
      },
    };
  },
};
</script>

<style scooped></style>
