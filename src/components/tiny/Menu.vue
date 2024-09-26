<template>
  <div class="flex flex-col w-screen h-screen  bg-main-purple pt-2">
    <img
      class="ml-3 w-3 h-3"
      @click="$emit('showMenu', false)"
      src="../../assets/tiny/menu-white.svg"
    />
    <ul class="text-back pl-8 mt-3">
      <li class="w-56 mb-3">
        <NavButton
          buttonType="readAssist"
          buttonTitle="Assistente de leitura"
          @click="$emit('showMenu', false), $router.push('/assistente-de-leitura')"
        />
      </li>
      <div v-if="$route.path == '/assistente-de-leitura' || $route.path == '/escolha-seu-livro'" >
        <li class="w-56 mb-3">
          
          <NavButton
            :hrefTo="`#how-works`"
            @click="$emit('showMenu', false)"
            buttonType="smText"
            buttonTitle="Como funciona"
          />
          
        </li>

        <li class="w-56 mb-3 ">
          <NavButton
            :hrefTo="`#benefits`"
            @click="$emit('showMenu', false), $router.push('/assistente-de-leitura')"
            buttonType="smText"
            buttonTitle="Benefícios de ler com a gente"
          />
        </li>
        <li class="w-56 mb-3">
          
          <NavButton
            :hrefTo="`#talking-about-us`"
            @click="$emit('showMenu', false), $router.push('/assistente-de-leitura')"
            buttonType="smText"
            buttonTitle="O que dizem sobre nós"
          />
        </li>

        <li v-if="$route.path == '/assistente-de-leitura'" class="w-56 mb-3">
          
          <NavButton
            :hrefTo="`#book`"
            @click="$emit('showMenu', false), $router.push('/assistente-de-leitura')"
            buttonType="smText"
            buttonTitle="Vermelho, Branco e Sangue Azul"
          />
        </li>
        <li class="w-56 mb-3">
          
          <NavButton
            :hrefTo="`#lets-read`"
            @click="$emit('showMenu', false)"
            buttonType="smText"
            buttonTitle="Vamos ler juntos?"
          />
        </li>
        <li class="w-56 mb-3">
          <NavButton
            :hrefTo="`#faq`"
            @click="$emit('showMenu', false)"
            buttonType="smText"
            buttonTitle="FAQ"
          />
        </li>
      </div>

    </ul>
    <ul class="text-back pl-8 font-semibold">
      <li class="w-56 mb-3 text-sm">
        <NavButton
          buttonType="readRecommend"
          buttonTitle="Recomendações de leitura"
          @click="$emit('showMenu', false), $router.push('/resenhas')"

        />
      </li>
      <li class="w-56 mb-3 text-sm">
        
        <NavButton
          buttonType="contactMenu"
          buttonTitle="Contato"
          @click="$emit('showMenu', false), $router.push('/contato')"

        />
      </li>
    </ul>
  </div>
</template>
<script>
import NavButton from "../../components/tiny/newComponents/NavButton"
import Title from "../../components/tiny/newComponents/Title"
import Text from "../../components/tiny/newComponents/Text"
export default {
  name: "Menu",
  components: {NavButton, Title, Text},
  data() {
    return {};
  },
};
</script>

<style></style>
