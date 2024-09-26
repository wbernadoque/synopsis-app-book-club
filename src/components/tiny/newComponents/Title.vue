<template>
    <h1 v-if="titleType === 'h1'" :class="classes[titleClass]">
      {{ content }}
    </h1>

    <h2 v-else-if="titleType === 'h2'" :class="classes[titleClass]">
      {{ content }}
    </h2>
    <h3 v-else-if="titleType === 'h3'" :class="classes[titleClass]">
      {{ content }}
    </h3>
     <h4 v-else-if="titleType === 'h4'" :class="classes[titleClass]">
      {{ content }}
    </h4>
</template>
<script>
export default {
  name: "Title",
  props: ["titleType", "titleClass", "content"],
  data() {
    return {
      classes: {
        homeLargeTitle: "lg:text-5xl text-3xl font-semibold text-black",
        homeInfoText: "tracking-tight lg:text-lg text-base leading-normal",
        homeSubtitle: "text-2xl font-semibold",
        assistSubtitle: "text-xl text-main font-semibold  ",
        howSubtitle: "text-main-action font-semibold text-base",
        benefitsSubtitle: "text-tag text-xl font-semibold",
        recommendationTitle: "italic text-tag text-xl font-semibold ",
        recommendationSubtitle: " text-tag text-sm font-semibold ",
        footerSubtitle: "font-bold",
        fontSemi: "font-semibold",
        testimonialName: "text-sm font-semibold text-main",
        xLargeSemi:"font-semibold lg:text-2xl text-xl capitalize",
        normalBase: "font-normal text-base text-color capitalize",
        XLargeSemiMain: "text-xl font-semibold text-main-action",
        SmallBase:"text-sm lg:text-base",
        baseExtraLarge:"font-semibold lg:text-xl text-base text-main",
        extraLargeSemiMain:"text-5xl font-semibold text-main",
        xLargeBoldTitle:"title text-xl font-bold",
        smSemi: "text-sm font-semibold",
        baseSemi: "text-base font-semibold",
        xl5Semi:"lg:text-5xl text-2xl font-semibold ",
        xl2SemiCap:"text-2xl font-semibold capitalize",
        baseSemiName:"cor-nome font-base font-semibold capitalize",
        LargeXl2Semi:"text-lg lg:text-2xl font-semibold tracking-wide",
        baseBold:"font-bold text-base ",
        smMedGray:"text-gray-400 font-medium text-sm capitalize",
        xl3Semi:"lg:text-3xl leading-42 lg:leading-48 text-28 font-semibold",
      },
    };
  },
};
</script>

<style scooped></style>
