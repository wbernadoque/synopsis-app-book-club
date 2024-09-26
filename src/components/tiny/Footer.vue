<template>
  <footer>
    <div class="bg-black text-white">
      <div
        class="grid lg:grid-cols-12 lg:grid-rows-1  grid-rows-5 grid-cols-5 gap-5 lg:py-5 py-2 pt-2 lg:pt-5 px-2"
      >
        <div
          class="col-start-2 col-span-3 lg:col-start-1 lg:col-span-2 lg:row-start-1 row-start-5 lg:row-start-1 row-span-2 lg:row-span-1 flex justify-center items-center"
        >
          <img src="../../assets/logos/footer.svg" alt="" class="logoWidth" />
        </div>

        <div
          class="lg:col-start-3 col-start-2 lg:col-span-2 col-span-3 lg:row-start-1 row-start-3 row-span-1 flex items-center justify-around lg:justify-start flex-col"
        >

          <Title
            titleType="h3"
            titleClass="footerSubtitle"
            content="siga-nos"
            class="text-center lg:text-left"
          />

          <div
            class="text-secondary flex flex-row justify-center space-x-3 mt-0 lg:mt-6"
          >
            <a href="https://www.instagram.com/synopsis_ia/"
              ><img src="../../assets/tiny/insta.svg" alt=""
            /></a>
            <a href="https://www.linkedin.com/company/synopsis-ia"
              ><img src="../../assets/tiny/linkedin.svg" alt=""
            /></a>
            <a href="https://www.twitter.com/synopsis_ia"
              ><img src="../../assets/tiny/twitter.svg" alt=""
            /></a>
          </div>
        </div>

        <div
          class="lg:col-start-5 col-start-2 flex justify-center lg:grid col-span-3 lg:grid-rows-1 grid-rows-2 row-start-4 lg:row-span-1 lg:row-start-1"
        >
          <div class="flex flex-col pb-5 row-start-1 hidden">
            <Title
                titleType="h3"
                titleClass="footerSubtitle"
                content="sobre nós"
                class="text-center pb-2 lg:text-left"
            />
            <div class="text-secondary">
              <NavButton
                  buttonType="footer"
                  buttonTitle="synopsis-ia"
              />
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="flex flex-col text-center lg:text-left">
              <!-- <span class="font-bold pb-2">suporte</span> -->

              <Title
                titleType="h3"
                titleClass="footerSubtitle"
                content="suporte"
                class="text-center pb-2 lg:text-left"
              />

              <div class="text-secondary flex flex-col space-y-1">
                <NavButton
                  buttonType="footer"
                  buttonTitle="faq"
                  @click="goToFaq"
                />
                <NavButton
                  buttonType="footer"
                  buttonTitle="contato"
                  @click="goToContato"
                />

                <NavButton
                  buttonType="footer"
                  buttonTitle="política de privacidade"
                  @click="goToLGPD"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="lg:col-start-8 col-start-1 row-span-2 lg:row-span-0 row-start-1 lg:col-span-5 col-span-5 grid grid-rows-2 lg:grid-rows-1 grid-cols-4 gap-x-5"
        >
          <ul class="row-start-1 col-span-4 flex justify-center flex-col">
            <li class="font-bold lg:pb-3 pb-2 lg:text-left text-center">
              <Title
                titleType="h3"
                titleClass="footerSubtitle"
                content="fique por dentro!"
                class="text-center lg:text-left"
              />
            </li>
            
            <li class="text-sm lg:text-left text-center lg:mb-3 mb-0">
              <Text
                content="notícias e soluções incríveis para a sua leitura!"
              />
            </li>
          </ul>

          <form
            @submit.prevent="subscribe"
            class="mt-2 flex flex-col lg:flex-row col-start-1 col-span-4 relative items-center w-full items-center justify-between"
          >
            <input
              type="text"
              class="bg-transparent w-full pr-1 lg:pr-52 lg:text-left text-center text-indent p-1 lg:p-0 outline-none border border-gray-200 rounded-full lg:h-8 h-7 "
              placeholder="seunome@email.com"
              v-model="email"
              ref="email"
            />
           
            <Button
              v-if="toasty == false && send == false"
              buttonTitle="inscreva-se"
              buttonType="roundedPurpleBase"
              class="button-position bg-main-purple max-size rounded-full  mt-3 lg:mt-0 lg:py-3.5 py-2.5 lg:w-2/5 w-3/5 lg:absolute right-1"
            
            />

            <a
              v-if="toasty"
              class="bg-error-email padding-responsive-mobile toasty-position absolute custom-toast lg:flex rounded-full font-semibold text-white text-xs lg:mt-0 lg:py-3.5 py-2.5 flex text-center justify-around"
              @click="toasty = false"
            >
              <!-- <img class="" src="../assets/warning.svg" alt="" /> -->

              <span class="text-xs">
                <Text
                  content="Esse endereço não está correto. Digite novamente."
                />
              </span>
            </a>
            <a
              @click="send = false"
              v-if="send"
              class="bg-main-purple padding-responsive-mobile toasty-position absolute custom-toast lg:flex rounded-full font-semibold text-white text-xs lg:mt-0 lg:py-3.5 py-2.5 flex text-center justify-around"
            >
              <Text content="Você está inscrito! Em breve novidades." />
            </a>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { api_caller } from "../../http-common";
import router from "../../router";
import Button from "../tiny/newComponents/Button";
import NavButton from "../tiny/newComponents/NavButton";
import Text from "../tiny/newComponents/Text";
import Title from "../tiny/newComponents/Title";

export default {
  name: "Footer",
  email: "",
  components: {
    Button,
    NavButton,
    Text,
    Title,
  },

  data() {
    return {
      emailInvalid: false,
      toasty: false,
      send: false,
      email: "",
    };
  },

  methods: {
    goToContato() {
      this.$router.push("/contato");
    },
    goToLGPD() {
      this.$router.push("/lgpd");
    },
    goToFaq() {
      this.$router.push("/faq");
    },
    subscribe() {
      const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const validation = validEmail.test(this.email);

      if (validation === false) {
        this.toasty = true;
        this.emailInvalid = true;
        var self = this;
        setTimeout(function() {
          self.emailInvalid = false;
          self.toasty = false;
        }, 5000);
      } else {
        api_caller({
          method: "post",
          url: "/newsletter",
          params: {
            email: this.email,
          },
        })
          .then((response) => {
            var self = this;
            this.send = true;
            setTimeout(function() {
              self.toasty = false;
              self.send = false;
            }, 5000);
          })
          .catch((er) => {
            console.log(er);
          });
      }
      this.email = "";
    },
  },
};
</script>

<style></style>
