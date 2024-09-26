<template>
    <section class="px-3 text-28 flex flex-col items-center" id="faq">
      <Title
        titleType="h2"
        titleClass="xLargeBoldTitle"
        content="FAQ"
        class="w-48 lg:w-full mt-5 mb-7 flex flex-col place-self-start"
      />
      <div class="max-w-screen-sm">
        <div
          v-for="(item, index) in faqQuestions"
          :key="item.question"
          class="answer mb-3 pb-3 border-b-2 border-selection w-full"
        >
          <div
            class="flex w-full justify-between more cursor-pointer"
            @click="handleClick(index)"
          >
            <Title titleType="h2" titleClass="baseSemi" :content="item.question"/>
          </div>
            <span class="inactive text-base leading-6" v-html="item.answer"></span>

        </div>
      </div>
    </section>
</template>
<script>
import Text from "../../tiny/newComponents/Text"
import Title from "../../tiny/newComponents/Title"
export default {
  name: "FAQ",
  props: ["faqQuestions"],
  components: {Text, Title},
   data() {
    return {
      
    }
   },
   methods:{
     handleClick(n) {
      const span = document.querySelectorAll(".answer span");
      const a = document.querySelectorAll(".answer div");
      span[n].classList.toggle("active");

      if (a[n].classList.contains("less")) {
        a[n].classList.remove("less");
        a[n].classList.add("more");
      } else if (a[n].classList.contains("more")) {
        a[n].classList.add("less");
        a[n].classList.remove("more");
      }
    },
    
   },
  

};
</script>

<style scooped></style>