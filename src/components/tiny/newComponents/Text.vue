<template>
<div>

  <p :class="classes[textClass]">
    {{ content }}
  </p>
</div>
</template>
<script>
export default {
  name: "Text",
  props: ["content", "textClass" ],
  data() {
    return {
      classes: {
        assistInfoText: "text-sm text-tertiary leading-6 ",
        howInfoText_large: "text-sm leading-9",
        testimonialDescription: "text-sm  text-tag",
        testimonialBook: "text-xs text-secondary",
        smallSecondary: " text-sm text-secondary",
        backToTop: "font-semibold lg:text-base text-xs ",
        subForm: "lg:text-xl text-base font-normal ",
        formError: "text-error text-xs ",
        xSmallNormal: "text-xs font-normal",
        smallBold: "font-bold text-sm",
        reviewBookTitle: "font-semibold lg:text-lg text-sm",
        reviewBookAuthor:
          "text-xs lg:text-base capitalize font-medium text-gray-600",
        xSmallWhite: "text-white text-xs",
        xSmallMediumGray: "text-gray-400 font-medium text-xs capitalize",
        regularMediumGray: "font-medium text-gray-400",
        smallSemi: "font-semibold text-sm",
        smallSemiPurple: "font-semibold text-sm text-main-action",
        regularPurple: "text-main-action",
        regularSemi: "font-semibold",
        smallMedium: "text-sm font-medium",
        smallSemiSec:"text-xs font-semibold text-secondary",
        smallSemiMain: "text-sm font-semibold text-main ",
        xLargeBold: "text-xl font-bold",
        smallRegularMain: "text-sm font-normal text-main",
        xLargeNormal: "text-xl font-normal ",
        boldMain:"font-bold text-main-action",
        xlBold:"text-2xl  font-bold",
        smLead6:"text-sm leading-6",
        smGray:"text-sm text-gray-700",
        xsLead8:"text-xs leading-8 ",
        xSmall:"text-xs"
        
        
      },
    };
  },
};
</script>

<style scooped></style>
