<template>
  <div
    class="flex justify-center md:flex-nowrap -space-y-1 md:space-y-0 md:-space-x-4"
  >
    <!-- imagem -->
    <div class="bg-transparent w-full md:w-80 rounded-2xl md:max-w-xs z-20">
      <img
        :src="bookInfo.url_capa"
        @error="errorImage"
        alt=""
        class="object-cover rounded-2xl md:h-72 md:w-full lg:h-full"
      />
    </div>

    <!-- infos -->
    <div
      class="hidden lg:block panel-desc  max-h-30 w-full justify-start  md:h-64 z-10"
    >
      <div class="relative mt-1 shadow-highlight shadow-hoverHighlight rounded-b-2xl md:rounded-b-2xl md:rounded-r-2xl">
        <div class="py-1 pl-3 mx-5 text-sm text-left -space-y-1 h-64">
          <div class="flex flex-wrap">
            <span class="absolute right-0 top-0 pt-5 pr-5"
              ><svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
               
              </svg>
            </span>
          </div>

          <div class="flex flex-wrap justify-between h-full">
            <div class="flex flex-wrap mb-4">
              
              <Text 
              class=" w-full pt-2 capitalize mb-1"
              textClass="smallBold"
              :content="bookInfo.titulo"
              />
              
              <Text 
              class=" w-full pt-2 capitalize "
              textClass="xSmallMediumGray"
              :content="bookInfo.autor"
              />
            </div>

            <div class="overflow-ellipsis">
              <p class="text-sm text-gray-700 line-clamp">
                {{ bookInfo.sinopse.replaceAll("<p>","").replaceAll("</p>"," ").replaceAll("<strong>","").replaceAll("</strong>", "").replaceAll("<em>"," ").replaceAll("</em>","").replaceAll("<b>", "").replaceAll("<br />",'').replaceAll("</b>","").replaceAll("<i>","").replaceAll("</i>"," ").replaceAll(/\&\#160\;/g,'') }}
              </p>
              
              
            </div>

            <div class="inline-flex items-baseline space-x-2" @click="redirect(bookInfo)">
              
              <NavButton
                buttonType="showMore"
                buttonTitle="Saiba mais"
                class=" mb-5 mt-2 w-full lg:col-start-6 lg:col-span-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavButton from "../tiny/newComponents/NavButton";
import Text from "../tiny/newComponents/Text";

export default {
  props: ["bookInfo"],
  name: "Highlight",
  components: {
    NavButton,
    Text
  },

methods:{
  errorImage(event){
    
      let cover = require('../../assets/tiny/sem_capa.svg')
      event.target.src = cover
    },

  redirect(event){
    
    this.$router.push({
        name: "search",
        query: {
          q: event.titulo+'-'+event.autor,
          id:event.id_obra,
        },
      });
  },
  },

  };
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.panel-desc {
  background: #fbfbfb;
}
</style>
