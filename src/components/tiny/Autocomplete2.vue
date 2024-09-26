<template>
  <div class="relative">
    <div class="flex flex-row">
      <input
        @click="inputTop"
        type="text"
        ref="input"
        :value="modelValue"
        @blur="onBlur"
        @keydown="onKeydown"
        @input="onInput($event.target.value)"
        :class="{
          'rounded-t-3xl': showing_autocomplete_list,
          'border-b-0': showing_autocomplete_list,
          'rounded-full': !showing_autocomplete_list,
        }"
        class="h-8 w-full bg-back text-tag py-2 px-5 outline-none border border-gray-200"
        placeholder="Digite um título"
        data-cy="search"
      />
     
      <Button
        buttonTitle="pesquisar"
        buttonType="search"
        @click="searchButton(modelValue)"
        data-cy="button-search"
      />
    </div>

    <div
      v-show="mutableOptions"
      :class="{
        'border-none': !showing_autocomplete_list,
        'rounded-b-xl': showing_autocomplete_list,
        'border-t-0': showing_autocomplete_list,
      }"
      class="absolute w-full bg-back overflow-hidden border z-10"
    >
      <ul class="" ref="list">
        <li
          v-for="(item, index) in mutableOptions"
          :key="index"
          tabindex="0"
          @click="selectBookOption()"
          @mouseover="setArrowCounter(index)"
          :class="{ 'bg-selection': arrowCounter === index }"
          class="autocomplete-item capitalize py-2 text-sm px-5 hover:bg-selection font-semibold leading-4 text-gray-400 cursor-pointer"
          :data-cy="'search' + index"
        >
          {{ item.titulo }} - {{ item.autor }}
        </li>
      </ul>
    </div>

    <!-- lista de sugestoes -->
  </div>
</template>

<script>
import { api_caller } from "../../http-common";
import Button from "../tiny/newComponents/Button";

export default {
  name: "Autocomplete2",
  emits: ["update:modelValue", "update:selected"],
  props: {
    modelValue: String,
  },
  components: {
    Button,
  },
  data() {
    return {
      selectSearch: "",
      autocomplete_list_suggestion: null,
      showing_autocomplete_list: false,
      mutableOptions: [],
      arrowCounter: 0,
    };
  },
  methods: {
    inputTop() {
      // const input = document.querySelector("#search");
      const size = screen.width;

      if (size < 1024) {
        setTimeout(() => {
          document.getElementById("top").scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 1000);
      }
    },
    replaceChars(string) {
      string = string.replace(/[àáâãäå]/g, "a");
      string = string.replace(/[èéẽë]/g, "e");
      string = string.replace(/[òóõôö]/g, "o");
      string = string.replace(/[ìíï]/g, "i");
      string = string.replace(/[ç]/g, "c");
      string = string.replace(/[^a-z0-9]/gi, "");
      return string;
    },
    findElement(books) {
      const book = books.data.body.find((element) => {
        const elementTitle = this.replaceChars(element.titulo.toLowerCase());
        const elementAuthor = this.replaceChars(element.autor.toLowerCase());
        const researched = this.replaceChars(this.modelValue.toLowerCase());
        return (
          elementTitle + elementAuthor == researched ||
          elementTitle == researched
        );
      });

      if (book == undefined) {
        this.$emit("update:error", false);
      } else {
        this.$router.push({
          name: "search",
          query: {
            q: book.titulo + "-" + book.autor,
            id: book.id_obra,
          },
        });

        this.$emit("update:selected", book);
      }
    },
    //responsavel pelo envio da string digitada
    searchButton(search) {
      if (search.length > 0) {
        api_caller({
          method: "get",
          url: "/obras",
          params: {
            search: search,
            limit: 10,
          },
        })
          .then((response) => {
            this.findElement(response);
          })
          .catch((er) => {
            console.log(er);
          });

        this.$emit("update:selected", search);
      }
    },

    onBlur(event) {
      const target = event.relatedTarget;
      if (target && target.classList.contains("autocomplete-item")) {
        return;
      }
      this.resetOptions();
      this.resetArrowCounter();
    },
    selectBookOption() {
      const selected = this.mutableOptions[this.arrowCounter];

      this.selectSearch = this.createKeywordString(selected);

      this.$router.push({
        name: "search",
        query: {
          q: selected.titulo + "-" + selected.autor,
          id: selected.id_obra,
        },
      });

      // this.$emit("update:modelValue", this.selectSearch);
      this.$emit("update:selected", selected);

      this.resetOptions();
      this.resetArrowCounter();
    },
    setArrowCounter(number) {
      this.arrowCounter = number;
    },
    resetArrowCounter() {
      this.arrowCounter = 0;
    },
    resetOptions() {
      this.mutableOptions = [];
    },
    cloneOptions() {
      this.mutableOptions = this.autocomplete_list_suggestion;
    },
    onInput(selectedOption) {
      this.selectSearch = selectedOption;
      this.$emit("update:modelValue", selectedOption);
    },
    onKeydown(evt) {
      /* Responsavel por cuidar dos eventos das keys.
       */
      if (!this.showing_autocomplete_list) {
        return;
      }
      switch (evt.code) {
        case "Enter":
          this.selectBookOption();
          break;
        case "Escape":
          this.onEsc();
          break;
        case "ArrowDown":
          evt.preventDefault();
          this.onArrowDown();
          break;
        case "ArrowUp":
          evt.preventDefault();
          this.onArrowUp();
          break;
      }
    },
    onEsc() {
      this.$refs.input.blur();
      this.resetOptions();
    },
    onArrowDown() {
      if (this.arrowCounter < this.mutableOptions.length - 1) {
        this.arrowCounter += 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1;
      }
    },
    createKeywordString(opt) {
      return `${opt.titulo} - ${opt.autor}`;
    },
    searchBooks(selectedOption) {
      this.$emit("update:modelValue", selectedOption);
      // if (selectedOption.length > 0) {
      api_caller({
        method: "get",
        url: "/obras",
        params: {
          search: selectedOption.toLowerCase(),
          limit: 5,
        },
      })
        .then((response) => {
          this.autocomplete_list_suggestion = response.data.body;
          this.showing_autocomplete_list = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    modelValue() {
      this.searchBooks(this.modelValue);
    },
    autocomplete_list_suggestion: function() {
      if (this.modelValue.length === 0) {
        // this.autocomplete_list_suggestion = [];
        this.showing_autocomplete_list = false;

        this.$emit("update:modelValue", "");
      }
      this.cloneOptions();
    },
    mutableOptions: function() {
      setTimeout(() => {
        if (this.$refs.list === null) {
        } else {
          const list = this.$refs.list.querySelectorAll("li");
          const researched = this.$refs.input.value;
          list.forEach((result) => {
            const sideResearch = result.textContent.toLowerCase();

            if (sideResearch.indexOf(researched.toLowerCase()) >= 0) {
              result.innerHTML =
                '<span class="">' +
                sideResearch.replace(
                  researched.toLowerCase(),
                  `<b class="text-main ">${researched.toLowerCase()}</b>`
                ) +
                "</span>";
            }
          });
        }
      });
      if (this.mutableOptions == 0) {
        this.showing_autocomplete_list = false;
      } else {
        this.showing_autocomplete_list = true;
      }
    },
  },
};

//
</script>

<style>

input::-moz-placeholder {
  font-size: 16px;
}
</style>
