<template>
  <div>
    <section
      class="px-3 text-28 flex flex-col items-center lg:items-start lg:grid lg:grid-cols-12 lg:gap-x-5 "
    >
      <div
        class="flex flex-col lg:col-start-2 lg:col-span-5 items-center lg:items-start lg:justify-center lg:h-full"
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
          class="lg:col-start-2 lg:col-span-6"
          buttonType="joinUs"
          buttonTitle="junte-se a nós"
          @click="scrollingSubscribe"
        />
      </div>
      <div
        class="hidden lg:flex lg:col-start-8 lg:col-span-5 lg:row-start-1 flex-col items-center relative"
      >
        <img src="../../assets/tiny/livros.png" alt="Varios livros juntos" />
      </div>
    </section>
    <!-- Como Funciona -->
    <section class="px-3 text-28 flex flex-col items-center" id="how-works">
      <div class="flex flex-col items-center relative mt-6 lg:hidden">
        <img src="../../assets/tiny/livros.png" alt="Varios livros juntos" />
      </div>
      <Title
        titleType="h2"
        titleClass="assistSubtitle"
        content="Como funciona?"
        class=" mt-7 mb-4  flex flex-col items-center separator"
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
            content="A partir da sua escolha de livro, o assistente pessoal do Synopsis
            cria um cronograma de leitura para você totalmente de acordo com sua
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
        buttonType="joinUs"
        buttonTitle="leia com a gente"
        @click="scrollingSubscribe"
      />
    </section>
    <!-- O que dizem sobre nós -->
    <section
      class="lg:pb-10 pb-1 text-28 flex flex-col items-center relative"
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
            
            <Text
              :ref="'text' + index"
              class="mb-4"
              :content="item.testimonial"
              textClass="testimonialDescription"
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
                <Title
                  titleType="h3"
                  titleClass="testimonialName"
                  :content="item.name"
                />
                
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

    <!-- Vamos ler Juntos? -->
    <section class="px-3 text-28 flex flex-col items-center" id="lets-read">
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
          <li class="mb-2">
            <Text content="cronograma personalizado" />
          </li>
          <li class="mb-2">
            <Text content="lembretes customizados" />
          </li>
          <li class="mb-2">
            <Text content="progresso de leitura" />
          </li>
          <li class="mb-2">
            <Text content="7 dias ou seu dinheiro de volta" />
          </li>
          <li class="mb-2">
            <Text content="cancele quando quiser" />
          </li>
        </ul>
        
        <span class="inline-flex">
          <Text textClass="smallBold" content="R$"/>
          <Text textClass="xlBold" content="5,99"/>
          <Text class="self-end" textClass="smallBold" content="/ciclo"/>
        </span>
        
        <Button
          @click="showModal = true"
          buttonType="joinUs"
          buttonTitle="assine agora"
        />
      </div>
    </section>
    <!-- FAQ -->
    <section class="px-3 text-28 flex flex-col items-center" id="faq">
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
            class="flex w-full justify-between more cursor-pointer"
            @click="handleClick(index)"
          >
            <Title titleType="h2" titleClass="smSemi" :content="item.question"/>
          </div>
          <span class="inactive text-sm leading-6">{{ item.description }}</span>
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
import BackToTop from "../tiny/newComponents/BackToTop";
import Title from "../tiny/newComponents/Title"
import Text from "../tiny/newComponents/Text"
import NavButton from "../tiny/newComponents/NavButton"
import Button from "../tiny/newComponents/Button"

export default {
  name: "LandingA",
  components: { Splide, SplideSlide, ModalContact, BackToTop, Text, Title, NavButton, Button },
  data() {
    return {
      showModal: false,
      sinopsisExpand: true,
      topAwards: [
        { title: "Melhor Romance", award: "Goodreads Awards 2016" },
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
          question: "Posso cancelar minha assinatura?",
          description:
            "Sim, você tem até 7 dias para solicitar reembolso completo. Após esse período cancele a qualquer momento por meio dos nossos canais de comunicação.",
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
          question: "Posso ler qualquer livro?",
          description:
            "Depende, a única restrição que impomos é que você traga um livro de até 400 páginas para que o seu planejamento mensal seja concluído e além disso o livro proposto estará sujeito à análise da equipe.",
        },
        {
          question:
            "Quero ler um livro com mais de 400 páginas em um mês, como faço?",
          description:
            "Podemos abrir exceções a partir do preenchimento do seu formulário contendo sua rotina de leitura e sua disponibilidade de tempo para ler. Caso nossa análise seja positiva, liberamos a leitura de um livro maior. Mas já saiba que o seu desafio ficará mais complexo!",
        },
        {
          question: "Em quanto tempo recebo meu cronograma?",
          description:
            "Após o cadastro pelo nosso site entraremos em contato com você e em até 72h depois do preenchimento do formulário de boas-vindas te enviaremos o cronograma.",
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
      this.$refs["sinopse"].classList.toggle("h-60");
      this.$refs["sinopse"].classList.toggle("h-full");

      this.$refs["sinopse"].classList.toggle("lg:h-full");
      this.$refs["sinopse"].classList.toggle("lg:h-36");
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
        a[n].classList.remove("less");
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
