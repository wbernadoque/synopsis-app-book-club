<template>
  <div
    ref="url_compartilhar"
    class="flex justify-center lg:items-center items-end w-full h-full"
  >
    <div
      @click="closeModal"
      class="backdrop-brightness-50 backdrop-filter backdrop-blur-sm  fixed w-screen h-screen top-0 left-0"
    ></div>
    
    <div
      v-if="sucess"
      tabindex="0"
      class="bg-white animation-show-up overflow-auto justify-around relative bottom-0 left-0 lg:bottom-auto lg:left-auto lg:w-5/12 lg:h-auto rounded-t-2xl lg:rounded-2xl z-40 w-screen h-11/12 flex flex-col  items-center py-5 px-5"
      id="share"
    >
      <img class="w-64 md:w-48" src="../../assets/big/HeroSectionLanding.svg" />
      <div class="flex flex-col justify-center items-center">
        
        <Title 
          class="mb-2 mt-5"
          titleType="h2"
          titleClass="XLargeSemiMain"
          content="Envio com sucesso!"
        />
       
        <Text 
        class="w-72 text-center mb-3"
          textClass="smallRegularMain"
          content="Em breve entraremos em contato. Enquanto isso conheça as recomendações
          do Synopsis para você."
        />
      </div>
     
      <Button 
        @click="$router.push('/')"
        buttonType="roundedPurpleDefault"
        buttonTitle="descobrir"
      />
    </div>
    <div
      v-if="notSucess"
      tabindex="0"
      class="bg-white animation-show-up overflow-auto justify-around relative bottom-0 left-0 lg:bottom-auto lg:left-auto lg:w-6/12 lg:h-auto rounded-t-2xl lg:rounded-2xl z-40 w-screen h-11/12 flex flex-col items-center py-5 px-5"
      id="share"
    >
      <img class="w-64 md:w-48" src="../../assets/big/MonsterLanding.svg" />
      <div class="flex flex-col justify-center items-center">
        
        <Title 
          class="mb-2 mt-5"
          titleType="h2"
          titleClass="XLargeSemiMain"
          content="Ops! Algo deu errado."
        />
        
        <Text 
        class="w-72 text-center mb-3"
          textClass="smallRegularMain"
          content="Houve um problema no envio dos seus dados, por favor tente novamente."
        />
      </div>
      
      <Button 
        @click="(activeForm = true), (notSucess = false)"
        buttonType="roundedPurpleDefault"
        buttonTitle="tentar novamente"
      />
    </div>
    <div
      v-if="activeForm"
      tabindex="0"
      class="bg-white animation-show-up overflow-auto relative bottom-0 left-0 lg:bottom-auto lg:left-auto lg:w-6/12 lg:max-w-3xl lg:h-auto rounded-t-2xl lg:rounded-2xl z-40 w-screen h-11/12 flex flex-col items-center py-5 px-5"
      id="share"
    >
      
      <Button 
        @click="closeModal"
        buttonType="close"
        class="absolute top-0 right-0 mr-4 mt-3"
      />
      
      <Title
        class="separator text-center flex flex-col items-center"
        titleType="h2"
        titleClass="assistSubtitle"
        content="Vamos ler juntos?"
      />
      
      <Text
        class="text-center mt-3"
        textClass="smallRegularMain"
        content="Vocês está a poucos passos de se juntar ao Synopsis e mudar seu hábito
        de leitura. Preencha os campos abaixo e em 24h entraremos em contato."
      />
      <form
        class="flex flex-col w-full lg:grid lg:grid-cols-2 lg:gap-x-3"
        @submit.prevent="handleSubmit"
        id="form-contact"
      >
        <label class="text-sm mb-2 mt-4 capitalize font-semibold lg:col-span-1 "
          >Nome</label
        >
        <input
          class="rounded-full h-5 outline-none border-1 px-3  lg:col-start-1 "
          :class="errorName ? 'border-error' : 'border-selection'"
          ref="nome"
          type="text"
          placeholder="Digite seu nome"
          v-model="formData.nameContact"
          required
        />
        <span
          v-if="errorName"
          class="mt-1 text-error lg:col-start-1 lg:row-start-3"
          >{{ errors[0] }}</span
        >

        <label
          class="text-sm mt-4 mb-2 capitalize font-semibold lg:col-span-1 "
          :class="
            pathname === '/escolha-seu-livro'
              ? 'lg:col-start-1 lg:row-start-4'
              : 'lg:col-start-2 lg:row-start-1'
          "
          text-main
          >Celular</label
        >
        <input
          class="rounded-full h-5 outline-none border-1 px-3 "
          :class="[
            errorPhone ? 'border-error' : 'border-selection',
            pathname === '/escolha-seu-livro'
              ? 'lg:col-start-1 lg:row-start-5'
              : 'lg:col-start-2 lg:row-start-2',
          ]"
          ref="celular"
          type="tel"
          placeholder="DDD + número"
          required
          v-mask="'(##) #####-####'"
          v-model="formData.phoneNumber"
          masked
        />
        <span
          v-if="errorPhone"
          class="mt-1 text-error"
          :class="
            pathname === '/escolha-seu-livro'
              ? 'lg:col-start-1 lg:row-start-6'
              : 'lg:col-start-2 lg:row-start-3'
          "
          >{{ errors[1] }}</span
        >
        <label
          v-if="pathname === '/escolha-seu-livro'"
          class="text-sm mt-4 mb-2 font-semibold lg:col-span-1 lg:col-start-2 lg:row-start-1"
          text-main
          >Livro (não se preocupe em escolher agora)</label
        >
        <input
          v-if="pathname === '/escolha-seu-livro'"
          class="rounded-full h-5 outline-none border-1 px-3 lg:col-start-2 lg:col-span-3 "
          :class="errorBook ? 'border-error' : 'border-selection'"
          ref="livro"
          type="text"
          placeholder="Opcional"
          required
          v-model="formData.book"
          masked
        />
        <label
          class="mt-4 text-main"
          :class="
            pathname === '/escolha-seu-livro'
              ? ' lg:col-start-2 lg:row-start-4'
              : 'lg:col-start-1'
          "
        >
          Canal de comunicação</label
        >
        <div
          class="mt-2 "
          :class="
            pathname === '/escolha-seu-livro'
              ? 'lg:col-start-2  lg:row-start-5'
              : 'lg:col-start-1 lg:row-start-5'
          "
        >
          <label class="mr-2 ">
            <input
              type="radio"
              name="comunicacao"
              ref="telegram"
              class="mr-2"
              v-model="formData.channel"
              value="telegram"
              :checked="formData.channel === 'telegram'"
            />
            <span class="text-sm font-normal text-main">telegram</span>
          </label>
          <label>
            <input
              type="radio"
              name="comunicacao"
              ref="whatsapp"
              v-model="formData.channel"
              value="whatsapp"
              class="mr-2"
              :checked="formData.channel === 'whatsapp'"
            />
            <span class="text-sm font-normal text-main">whatsapp</span>
          </label>
        </div>
        <span
          v-if="errorChannel"
          class="mt-1 text-error"
          :class="
            pathname === '/escolha-seu-livro'
              ? 'lg:col-start-2 lg:row-start-6'
              : 'lg:col-start-1 lg:row-start-6'
          "
          >{{ errors[3] }}</span
        >

        <Button
          @click.prevent="handleSubmit"
          class=" lg:col-span-2 lg:row-start-7 lg:place-self-center 0"
          buttonType="roundedPurpleAnimation"
          buttonTitle="enviar"
          :animation="animation"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { api_caller } from "../../http-common";
import Text from "../tiny/newComponents/Text"
import Title from "../tiny/newComponents/Title"
import Button from "../tiny/newComponents/Button"

export default {
  name: "ModalContact",
  directives: { mask },
  components:{Text, Title, Button},
  data() {
    return {
      pathname: "",
      sucess: false,
      notSucess: false,
      activeForm: true,
      animation: false,
      formData: {
        phoneNumber: "",
        channel: "",
        nameContact: "",
        book: "",
      },
      errorName: false,
      errorPhone: false,
      errorChannel: false,
      // errorBook: false,
      errors: [
        "Digite um nome",
        "Digite um numero de celular válido",
        "Digite um livro",
        "Selecione uma opção",
      ],
    };
  },
  mounted() {
    this.pathname = window.location.pathname;
  },
  methods: {
    closeModal() {
      this.$emit("false");
    },
    handleSubmit() {
      let now = new Date();
      const timestamp = `${now.getDate()}/${
        now.getMonth() + 1 === 12 ? 1 : now.getMonth() + 1
      }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
      this.errorName = this.formData.nameContact == "";
      // this.errorBook = this.formData.book == "";
      this.errorPhone = this.formData.phoneNumber.length < 15;
      this.errorChannel = this.formData.channel == "";
      if (
        this.formData.phoneNumber &&
        this.formData.channel &&
        this.formData.nameContact
      ) {
        this.animation = true;
        api_caller({
          method: "post",
          url: "/contato",
          data: {
            body: {
              nome: this.formData.nameContact,
              celular: this.formData.phoneNumber,
              canal: this.formData.channel,
              data: timestamp,
              origem: window.location.pathname,
              livro: this.formData.book,
            },
          },
        })
          .then(() => {
            this.animation = false;
            this.activeForm = false;
            this.notSucess = false;
            this.sucess = true;
          })
          .catch((er) => {
            this.animation = false;
            this.activeForm = false;
            this.notSucess = true;
            console.error(er);
          });
      } else {
      }
    },
  },
};
</script>

<style>
input:focus {
  border: 1px solid #9a3a88;
}
.separator:after {
  content: "";
  height: 4px;
  width: 66px;
  margin-top: 8px;
  background-color: #9a3a88;
  border-radius: 3px;
  display: block;
}

.theme {
  background: #e0e0e0;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.balloon {
  content: "";

  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;

  left: -18px;
  bottom: 0;

  -webkit-filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
  -moz-filter: drop-shadow(-3px 0px 4px rgba(85, 43, 43, 0.1));
  -ms-filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
  -o-filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(-3px 0px 4px rgba(0, 0, 0, 0.1));
}
@media (max-width: 1023px) {
  .balloon {
    display: none;
  }
}
</style>
