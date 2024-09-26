<template>
  <div class="grid lg:grid-cols-12 grid-cols-5 gap-5">
    <Title
      class="mt-10 text-center col-start-1 lg:col-span-12 col-span-5"
      titleType="h1"
      titleClass="extraLargeSemiMain"
      content="Como podemos ajudar?"
    />
    <section class="lg:col-start-4 col-start-2 lg:col-span-6 col-span-3">
      <!-- <busca-faq class="mb-5" /> -->
      
      <Text
        class="text-center"
        textClass="xLargeNormal"
        content="Está com alguma dúvida, dê uma olhada abaixo nas perguntas mais
        frequentes ou entre em contato conosco."
      />
      <FaqComp
        :faqQuestions="faqQuestions"
        class="lg:col-start-4 col-start-1 lg:col-span-6 col-span-5 px-5 lg:px-0 mb-6"
      />
    </section>
    
     
  </div>
</template>

<script>
import FaqComp from "../../components/tiny/newComponents/FaqComp"
import Title from "../../components/tiny/newComponents/Title"
import Text from "../../components/tiny/newComponents/Text"

export default {
  props: ["query"],
  components: {
    FaqComp,
    Title,
    Text,
  },
  data() {
    return {
      faqQuestions: [
        { 
          question:"Não encontrei um livro",
          answer: "Esse livro pode não estar cadastrado em nossa base. <a href='/contato?q=question' class='text-main-action font-semibold'>  Clique aqui </a>  para sugerir.",

        },
        { 
          question:"Quero sugerir um livro ou autor",
          answer:"Ficaremos felizes em incluir sua sugestão em nossa plataforma. Para isso preencha as informações em <a href='/contato?q=book' class='text-main-action font-semibold'> não encontrei um livro </a> na nossa página de contato."
        },
        { 
          question:"Como são feitas as recomendações?",
          answer:"As recomendações são feitas a partir da comparação de uma série de características do livro pesquisado com os livros em nossa base de dados. As obras com atributos mais similares aos da consulta são as indicadas pelo Synopsis."
        },
        { 
          question:"Eu pago para usar o Synopsis?",
          answer:"O Synopsis é uma plataforma gratuita, você pode utilizá-la em seu computador, tablet ou celular sem custo."
        },
        { 
          question:"Como reportar um livro com categoria errada?",
          answer:"Para indicar irregularidades em um livro, vá em <a href='/contato?q=report' class='text-main-action font-semibold'> reportar um livro </a> na nossa página de contato, selecione reportar gênero, busque pelo livro e preencha as informações."
        },
        { 
          question:"Encontrei um livro com capa errada",
          answer:"Para indicar que um livro está com capa errada, vá em <a href='/contato?q=report' class='text-main-action font-semibold'> reportar um livro </a> na nossa página de contato, selecione reportar capa, busque pelo livro e preencha as informações, incluindo imagem em jpeg, png ou tiff da capa correta."
        },
        { 
          question:"Sou uma editora, como faço para entrar em contato.",
          answer:"Ficaremos felizes em saber mais de você, nos <a href='/contato?q=publisher' class='text-main-action font-semibold'> envie uma mensagem! </a> "
        },
        { 
          question:"Sou um(a) autor(a) independente. Como posso incluir meu livro no Synopsis?",
          answer:"Adoraríamos ter seu livro em nossa plataforma. Para incluí-lo siga os passos de <a href='/contato?q=independent' class='text-main-action font-semibold'> sou autor(a) independente </a> em nossa página de contato."
        },
      ],

    };
  },
  
  mounted() {
    const section = document.querySelector("#body");
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  },

};
</script>

<style>
</style>