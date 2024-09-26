<template>
  <div>
    <section
      class="px-3 text-28 flex flex-col items-center lg:items-start lg:grid lg:grid-cols-12 lg:gap-x-5 "
    >
      <div
        class="flex flex-col lg:col-start-2 lg:col-span-6 items-center lg:items-start lg:justify-center lg:h-full"
      >
        
        <Title
          titleType="h1"
          titleClass="homeLargeTitle"
          content="Sua pilha de livros não lidos só cresce?"
          class="mb-3 lg:col-start-2 lg:col-span-6"
        />
        

        <Text
          textClass="assistInfoText"
          content="Sabe aqueles livros que você comprou e não tem tempo para ler ou se
          sente desmotivado para seguir com a leitura? O assistente de leitura
          do Synopsis te ajuda a se organizar com metas e desafios feitos
          exclusivamente para você."
          class="max-w-screen-lg lg:col-start-2 lg:col-span-6"
        />

        <Button
          buttonType="joinUs"
          buttonTitle="junte-se a nós"
          @click="scrollingSubscribe"
        />
      </div>
      <div
        class="hidden lg:flex lg:col-start-9 lg:col-span-4 lg:row-start-1 flex-col items-center relative"
      >
        <img
          src="../../assets/tiny/capa-livro-landing.png"
          alt="Casey McQuiston - Livro Vermelho, Branco e Sangue Azul"
        />

        <Shape
          content="Livro de Mar/2022"
          shapeType="roundedPurple"
        />

      </div>
    </section>
    <!-- Como Funciona -->
    <section class="px-3 text-28 flex flex-col items-center" id="how-works">
      <div class="flex flex-col items-center relative mt-6 lg:hidden">
        <img
          src="../../assets/tiny/capa-livro-landing.png"
          alt="Casey McQuiston - Livro Vermelho, Branco e Sangue Azul"
        />
        
        <Shape
          content="Livro de Mar/2022"
          shapeType="roundedPurple"
        />
      </div>
     
      <Title
        titleType="h2"
        titleClass="assistSubtitle"
        content="Como funciona?"
        class=" mt-7 mb-4  flex flex-col items-center separator"
      />

      <Text
        textClass="assistInfoText"
        content="A partir da leitura do mês, o assistente pessoal do Synopsis cria um
        cronograma de leitura para você totalmente de acordo com sua
        disponibilidade de tempo."
        class="mb-4 lg:hidden"
      />
    
      <Text
        textClass="assistInfoText"
        content="E tem outra: além das metas, nós também vamos te mandar lembretes
        recorrentes para te ajudar a ficar mais motivado e estimulado com seu
        livro. Assim, você consegue finalizar sua leitura em até um mês e já
        fica preparado para a próxima rodada do nosso programa!"
        class="mb-4 lg:hidden"
      />
      <div
        class="flex flex-col lg:grid lg:grid-cols-11 lg:gap-x-5 w-full lg:px-3 lg:justify-center"
      >
        <div
          class="flex flex-col lg:col-start-2 lg:justify-start lg:col-span-3 items-center justify-center mt-5"
        >
          <img class="w-20 h-20" src="../../assets/tiny/boas-vindas.svg" />
         
          <Title
            titleType="h3"
            titleClass="howSubtitle"
            content="Boas-vindas"
            class="lg:mt-1 text-center"
          />

          <Text
            textClass="howInfoText_large"
            content="A partir da leitura do mês, o assistente pessoal do Synopsis cria um
            cronograma de leitura para você totalmente de acordo com sua
            disponibilidade de tempo."
            class="hidden lg:block mt-2 w-56 text-center"
          />
        </div>
        <div
          class="flex flex-col lg:col-start-5 lg:justify-start lg:col-span-3 items-center justify-center mt-5"
        >
          <img class="w-20 h-20" src="../../assets/tiny/leitura.svg" />
         
          <Title
            titleType="h3"
            titleClass="howSubtitle"
            content="Leitura"
            class="lg:mt-1 text-center"
          />
        
          <Text
            textClass="howInfoText_large"
            content="E tem outra: além das metas, nós também vamos te mandar lembretes
            recorrentes para te ajudar a ficar mais motivado e estimulado com
            seu livro."
            class="hidden lg:block mt-2 w-56 text-center"
          />
        </div>
        <div
          class="flex flex-col lg:col-start-8 lg:justify-start lg:col-span-3 items-center justify-center mt-5"
        >
          <img class="w-20 h-20" src="../../assets/tiny/proxima-leitura.svg" />

          <Title
            titleType="h3"
            titleClass="howSubtitle"
            content="Próxima leitura"
            class="lg:mt-1 text-center"
          />

          <Text
            textClass="howInfoText_large"
            content="Assim, você consegue finalizar sua leitura em até um mês e já fica
            preparado para a próxima rodada do nosso programa!"
            class="hidden lg:block mt-2 w-56 text-center"
          />
        </div>
      </div>
    </section>
    <!-- Benefício de ler com a gente -->
    <section class="text-28 flex flex-col items-center" id="benefits">

      <Title
        titleType="h2"
        titleClass="benefitsSubtitle"
        content="Benefícios de ler com a gente"
        class="w-48 lg:w-full mt-7 mb-4 separator flex flex-col items-center text-center"
      />

      <!-- Carrossel - Benefício de ler com a gente-->
      <splide :options="options" class="w-full lg:hidden home-pagination">
        <splide-slide v-for="(item, index) in benefits" :key="index">
          <div
            :class="`w-full h-72 bg-${item.bg} border-plan flex flex-col p-3`"
          >
            <img
              class="w-5 h-5"
              :src="require(`../../assets/tiny/${item.icon}`)"
              alt=""
            />
            <Title 
              class="my-3"
              titleType="h3"
              titleClass="testimonialName"
              :content="item.title"
            />
            <Text
              textClass="testimonialDescription"
              :content="item.description"
            />
          </div>
        </splide-slide>
      </splide>
      <div class="hidden lg:flex lg:justify-between w-full max-w-4xl">
        <div v-for="(item, index) in benefits" :key="index">
          <div :class="`w-48 h-72 bg-${item.bg} border-plan flex flex-col p-3`">
            <img
              class="w-5 h-5"
              :src="require(`../../assets/tiny/${item.icon}`)"
              alt=""
            />
            <Title 
              class="my-3"
              titleType="h3"
              titleClass="testimonialName"
              :content="item.title"
            />
            <Text
              textClass="testimonialDescription"
              :content="item.description"
            />
          </div>
        </div>
      </div>
      <Button
        class="mt-3"
        buttonType="joinUs"
        buttonTitle="leia com a gente"
        @click="scrollingSubscribe"
      />
    </section>
    <!-- O que dizem sobre nós -->
    <section
      class="pb-10 text-28 flex flex-col items-center relative"
      id="talking-about-us"
    >
     
      <Title
        titleType="h2"
        titleClass="benefitsSubtitle"
        content="O que dizem sobre nós"
        class="w-48 lg:w-full mt-7 mb-4 separator flex flex-col items-center text-center"
      />
      <!-- Carrossel - O que dizem sobre nós -->
      <splide
        :options="options1"
        class="w-full block lg:hidden home-pagination"
      >
      
        <splide-slide v-for="(item, index) in testimonials" :key="index">
          <div
            :ref="'testimonial' + index"
            class="absolute z-50 top-0 bg-back items-center w-full rounded-2xl shadow-md flex flex-col p-3"
            style="height: 520px"
          >
            <div class="flex mb-3 w-full">
              <img
                class="w-5 h-5 mr-2 rounded-full"
                :src="require(`../../assets/tiny/${item.icon}`)"
                alt=""
              />
              <div class="flex flex-col">
                <!-- <h3 class="text-sm font-semibold text-main">
                  {{ item.name }}
                </h3> -->
                <Title
                  titleType="h3"
                  titleClass="testimonialName"
                  :content="item.name"
                />
                <Text
                  textClass="testimonialBook"
                  :content="item.book"
                />
              </div>
            </div>
            <p :ref="'text' + index" class="text-sm mb-4 text-tag">
              {{ item.testimonial }}
            </p>

            <Text
              textClass="testimonialDescription"
              class="mb-4"
              :ref="'text' + index"
              :content="item.testimonial"
            />
          </div>
        </splide-slide>
      </splide>

      <splide
        :options="options2"
        class="w-full lg:block hidden home-pagination"
      >
        <splide-slide v-for="(item, index) in testimonials" :key="index">
          <div
            :ref="'testimonial' + index"
            class="absolute z-50 top-0 bg-back items-center w-full rounded-2xl shadow-md flex flex-col p-3"
            style="height: 300px"
          >
            <div class="flex mb-3 w-full">
              <img
                class="w-5 h-5 mr-2 rounded-full"
                :src="require(`../../assets/tiny/${item.icon}`)"
                alt=""
              />
              <div class="flex flex-col">
                <!-- <h3 class="text-sm font-semibold text-main">
                  {{ item.name }}
                </h3> -->

                <Title
                  titleType="h3"
                  titleClass="testimonialName"
                  :content="item.name"
                />
                <!-- <span class="text-xs text-secondary mt-1">{{
                  item.book
                }}</span> -->
                <Text
                  textClass="testimonialBook"
                  :content="item.book"
                  class="mt-1"
                />

                <Text
                  textClass="testimonialDescription"
                  :content="item.testimonial"
                  :ref="'text' + index"
                  class="mt-3"
                />
              </div>
            </div>
          </div>
        </splide-slide>
      </splide>
    </section>
    <!--  Vermelho, Branco e Sangue Azul -->
    <section
      class="px-3 text-28 flex flex-col items-center bg-landing py-4 lg:grid-cols-12 lg:grid lg:gap-x-5"
      id="book"
    >
      <!-- <h2
        class="lg:col-start-1 lg:col-span-12 italic text-center text-tag text-xl mb-1.5 font-semibold flex flex-col items-center"
      >
        Vermelho, Branco e Sangue Azul
      </h2> -->
      <Title
        titleType="h2"
        titleClass="recommendationTitle"
        content="Vermelho, Branco e Sangue Azul"
        class=" flex flex-col text-center items-center lg:col-start-1 lg:col-span-12 mb-1.5"
      />

      <Title
        titleType="h3"
        titleClass="recommendationSubtitle"
        content="Casey McQuiston"
        class=" text-center lg:col-start-1 lg:col-span-12 mb-4"
      />

      <Text
        ref="sinopse"
        textClass="assistInfoText"
        content="O que pode acontecer quando o filho da presidenta dos Estados Unidos se
        apaixona pelo príncipe da Inglaterra? Quando sua mãe foi eleita
        presidenta dos Estados Unidos, Alex Claremont-Diaz se tornou o novo
        queridinho da mídia norte-americana. Bonito, carismático e com
        personalidade forte, Alex tem tudo para seguir os passos de seus pais e
        conquistar uma carreira na política, como tanto deseja. Mas quando sua
        família é convidada para o casamento real do príncipe britânico Philip,
        Alex tem que encarar o seu primeiro desafio diplomático: lidar com
        Henry, irmão mais novo de Philip, o príncipe mais adorado do mundo, com
        quem ele é constantemente comparado ― e que ele não suporta. O encontro
        entre os dois sai pior do que o esperado, e no dia seguinte todos os
        jornais do mundo estampam fotos de Alex e Henry caídos em cima do bolo
        real, insinuando uma briga séria entre os dois. Para evitar um desastre
        diplomático, eles passam um fim de semana fingindo ser melhores amigos e
        não demora para que essa relação evolua para algo que nenhum dos dois
        poderia imaginar ― e que não tem nenhuma chance de dar certo. Ou tem?"
        class="lg:max-w-4xl lg:col-start-2 lg:col-span-6 lg:mb-0 h-60 lg:h-36 overflow-hidden overflow-ellipsis"

      />

      <NavButton
        v-if="sinopsisExpand"
        @click="showMoreSinopsis"
        buttonType="showMore"
        buttonTitle="Saiba mais"
        class="mb-5 text-sm mt-2 w-full lg:col-start-6 lg:col-span-2"
      />
      <NavButton
        v-if="!sinopsisExpand"
        @click="showMoreSinopsis"
        buttonType="showLess"
        buttonTitle="Ver menos"
        class=" mb-5 mt-2 w-full lg:col-start-6 lg:col-span-2"
      />
      
      <div
        class="flex flex-col lg:mb-10 lg:flex-row lg:justify-between lg:self-start lg:col-start-2 lg:col-span-6"
      >
        <div
          class="flex items-center w-52 mb-4 lg:mb-0"
          v-for="item in topAwards"
          :key="item.title"
        >
          <img class="mr-2" src="../../assets/tiny/icone-estrela.svg" alt="" />
          <div class="font-medium text-xs text-tag">
            <Title
              titleType="h4"
              titleClass="fontSemi"
              :content="item.title"
            />
            <Text
              :content="item.award"
            />
          </div>
        </div>
      </div>
      <img
        class="-mb-56 lg:col-start-8 lg:col-span-5 lg:w-full lg:place-self-center lg:max-w-md lg:left-0 lg:-mt-56"
        src="../../assets/tiny/capa-livro-landing.png"
        alt="Livro Agatha Christie - Morte no Nilo"
      />
    </section>
    <!-- Vamos ler Juntos? -->
    <section class="pt-44 px-3 text-28 flex flex-col items-center" id="lets-read">

      <Title
        titleType="h2"
        titleClass="benefitsSubtitle"
        content="Vamos ler juntos?"
        class="w-48 lg:w-full mt-7 mb-4 separator flex flex-col items-center text-center"
      />
      <div
        class="w-full lg:w-80 bg-landing border-plan flex flex-col items-center p-3"
      >
        <ul class="list-disc text-sm w-auto">
          <li class="mb-2">cronograma personalizado</li>
          <li class="mb-2">lembretes customizados</li>
          <li class="mb-2">progresso de leitura</li>
          <li class="mb-2">R$4,99/ciclo após teste</li>
          <li class="mb-2">cancele quando quiser</li>
        </ul>
        <span class="flex flex-col">
          <Text  class="text-center" textClass="xlBold" content="grátis"/>
          <Text  class="text-center" textClass="smallBold" content="no 1º ciclo"/>
        </span>

        <Button
          buttonType="joinUs"
          buttonTitle="experimente agora"
          @click="showModal = true"
        />
      </div>
    </section>
    <!-- FAQ -->
    <section class="px-3 text-28 flex flex-col items-center" id="faq">
      <!-- <h2
        class="text-center text-tag text-xl mt-7 mb-4 font-semibold separator flex flex-col items-center"
      >
        FAQ
      </h2> -->
      <Title
        titleType="h2"
        titleClass="benefitsSubtitle"
        content="FAQ"
        class="w-48 lg:w-full mt-7 mb-4 separator flex flex-col items-center text-center"
      />
      <div class="max-w-screen-sm">
        <div
          v-for="(item, index) in faqQuestions"
          :key="item.question"
          class="answer mb-3 pb-3 border-b-2 border-selection w-full"
        >
          <div
            class="flex w-full justify-between cursor-pointer more"
            @click="handleClick(index)"
          >
            <Title titleType="h2" titleClass="smSemi" :content="item.question"/>
          </div>
          <SpanComp  class="inactive" spanClass="smLead6"> {{item.description}} </SpanComp>
        </div>
      </div>
    </section>
    <modal-contact
      class="fixed z-50 top-0 left-0 w-screen h-screen"
      v-if="showModal"
      v-on:false="showModal = !showModal"
    />

    <div class="grid grid-cols-3 ">
    
    <BackToTop 
        class=" lg:mt-0 my-2 col-start-3 lg:col-start-3 lg:justify-center justify-center align-center lg:col-span-1  "
        @click="scrollToSection" />  
    </div>

  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import ModalContact from "../book-cards/ModalContact.vue";
import scroll from "../../scrollToSection";
import Button from "../tiny/newComponents/Button";
import Text from "../tiny/newComponents/Text";
import Title from "../tiny/newComponents/Title";
import NavButton from "../tiny/newComponents/NavButton";
import BackToTop from "../tiny/newComponents/BackToTop";
import Shape from "../tiny/newComponents/Shape";
import SpanComp from "../tiny/newComponents/SpanComp";

export default {
  name: "LandingB",
  components: {
    Splide,
    SplideSlide,
    ModalContact,
    Button,
    Text,
    Title,
    NavButton,
    BackToTop,
    Shape,
    SpanComp,
  },
  data() {
    return {
      showModal: false,
      sinopsisExpand: true,
      topAwards: [
        { title: "Melhor Romance", award: "Goodreads Awards 2019" },
        { title: "Best-seller do New York Times", award: "" },
        { title: "Entre os mais vendidos", award: "Amazon Top 15" },
      ],
      faqQuestions: [
        {
          question: "O que é um ciclo?",
          description:
            "O ciclo é o espaço de tempo escolhido por você, de no máximo 30 dias, para concluir a sua jornada de leitura com nosso assistente pessoal, incluindo no pacote: o cronograma e os lembretes personalizados.",
        },
        {
          question: "A assinatura é automática após o período de teste? ",
          description:
            "Não. O seu primeiro ciclo é gratuito, após esse período você tem a possibilidade de assinar o Synopsis por R$ 4,99/ciclo através dos nossos canais de comunicação.",
        },
        {
          question: "Quais são as formas de pagamento?",
          description:
            "Você pode efetuar o pagamento por PIX. Após clicar em assine agora e enviar suas informações de contato, nossa equipe te informará os próximos passos.",
        },
        {
          question: "O livro está incluso na assinatura?",
          description:
            "Não, a sua assinatura corresponde ao assistente de leitura.",
        },
        {
          question: "Quero ler outro livro",
          description:
            "O Synopsis tem o objetivo de despertar o hábito da leitura um passo de cada vez, por isso focamos em um livro mensalmente. Mas ficaremos felizes em receber sugestões de nossos leitores.",
        },
        {
          question: "Posso mudar minha meta de leitura?",
          description:
            "Claro, fique à vontade para ler quando e como quiser, você tem liberdade total para pedir ajustes no seu cronograma e lembrete a qualquer hora.",
        },
      ],
      benefits: [
        {
          icon: "habito.svg",
          title: "Hábito de leitura",
          description:
            "Para criar hábitos, é preciso disciplina. Com o Synopsis você consegue atingir o tempo mínimo de 21 dias para firmar seu costume de ler.",
          bg: "fundo",
        },
        {
          icon: "feito-para-voce.svg",
          title: "Feito para você",
          description:
            "Nossos leitores são únicos. Cada detalhe do Synopsis é pensado para você, desde o cronograma até os lembretes.",
          bg: "landing",
        },
        {
          icon: "progresso.svg",
          title: "Seu progresso",
          description:
            "Para nós cada página é uma conquista. Mantenha-se motivado por meio dos feedbacks de evolução de leitura.",
          bg: "fundo",
        },
        {
          icon: "explore.svg",
          title: "Explore mais",
          description:
            "Aumente seu repertório por meio de novas descobertas literárias indicadas por nós.",
          bg: "landing",
        },
      ],
      testimonials: [
        {
          icon: "photo-testimonial.png",
          name: "Nathalia",
          book: "O homem de Giz",
          testimonial:
            "Minha experiência com o Synopsis foi extremamente positiva por ter me proporcionado um maior controle sobre minhas leituras. Ter um cronograma e uma previsão do fim da leitura me permitem atingir minhas metas de leitura e torna-las cada vez mais desafiadoras. Além disso, o Synopsis é capaz de apresentar livros (talvez) pouco conhecidos pelo grande público, mas que vão de encontro com meus maiores interresses. Recomendo a todos os leitores vozares, assim como àqueles que estão apenas começando seu engajamento com os livros.",
        },
        {
          icon: "photo-testimonial-2.png",
          name: "Renata",
          book: "O Apanhador no Campo de Centeio",
          testimonial:
            "A experiência de ler com o Synopsis foi bem legal. Algo que sempre me disseram é que a leitura é um hábito diário, e ter esse acompanhamento do cronograma de leitura que o assistente faz, com os lembretes diários personalizados, foi um ótimo incentivo para abrir o livro todos os dias e ler algumas páginas que seja. Tanto para quem já está habituado a ler ou quem quer ler mais, é uma grande ajuda!",
        },
        {
          icon: "photo-testimonial-3.png",
          name: "Rebeca",
          book: "Vermelho, Branco e Sangue Azul",
          testimonial:
            "Gostei muito de usar o assistente de Leitura Synopsis! Queria um cronograma bonito desses para cada livro que eu fosse ler kkkk Os lembretes são consistentes e me motivaram a continuar a leitura.",
        },
        {
          icon: "photo-testimonial-4.png",
          name: "Karol",
          book: "Vermelho, Branco e Sangue Azul",
          testimonial:
            "Excelente experiência, achei muito legal a organização e o acompanhamento na minha leitura. Me senti acolhida e incentivada durante todo o processo. E ainda como                   recompensa consegui cumprir a minha meta de leitura. Os 30 dias com o Synopsis me ajudou mais que os mil livros de autoajuda para criar hábito que já li.",
        },
      ],
      options: {
        type: "loop",
        focus: "center",
        clones: 1,
        trimSpace: true,
        rewind: true,
        arrows: false,
        cover: true,
        width: "100%",
        heigth: "100%",
        gap: "0px",
        start: 1,
        perPage: 3,
        autoplay: true,
        pauseOnFocus: true,
        fixedWidth: "212px",
        fixedHeight: "298px",
      },
      options1: {
        type: "loop",
        focus: "center",
        clones: 1,
        trimSpace: true,
        rewind: true,
        arrows: false,
        cover: true,
        width: "100%",
        heigth: "100%",
        gap: "16px",
        start: 1,
        perPage: 3,
        autoplay: true,
        pauseOnFocus: true,
        fixedWidth: "260px",
        fixedHeight: "530px",
      },
      options2: {
        type: "loop",
        focus: "center",
        clones: 1,
        rewind: true,
        arrows: false,
        cover: true,
        width: "100%",
        heigth: "100%",
        gap: "32px",
        start: 1,
        perPage: 1,
        autoplay: true,
        pauseOnFocus: true,
        fixedWidth: "704px",
        fixedHeight: "320px",
      },
    };
  },
  methods: {
    scrollToSection() {
      scroll();
    },
    scrollingSubscribe() {
      const section = document.querySelector("#lets-read");
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    showMoreSinopsis() {
      this.sinopsisExpand = !this.sinopsisExpand;
      this.$refs["sinopse"].$el.classList.toggle("h-60");
      this.$refs["sinopse"].$el.classList.toggle("h-full");

      this.$refs["sinopse"].$el.classList.toggle("lg:h-full");
      this.$refs["sinopse"].$el.classList.toggle("lg:h-36");
    },
    handleTestimonial(ref) {
      const arrow = "arrow" + ref;
      const testimonial = "testimonial" + ref;
      const text = "text" + ref;
      this.$refs[arrow].classList.toggle("rotate-180");
      this.$refs[arrow].classList.toggle("rotate-0");
      this.$refs[testimonial].classList.toggle("h-auto");
      this.$refs[testimonial].classList.toggle("h-64");
      this.$refs[text].classList.toggle("h-full");
      this.$refs[text].classList.toggle("h-20");
    },
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

<style>
.separator:after {
  content: "";
  height: 4px;
  width: 66px;
  margin-top: 8px;
  background-color: #9a3a88;
  border-radius: 3px;
  display: block;
}
.border-plan {
  border-radius: 32px 16px;
}
.home-pagination .splide__pagination {
  bottom: -32px !important;
  z-index: 40 !important;
}
.home-pagination .splide__slide {
  z-index: 50;
}
</style>
