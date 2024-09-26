<template>
  <div class="grid lg:grid-cols-12 grid-cols-5 px-5 lg:px-0 gap-x-5">
    <Title
      class="mt-2 lg:mt-10 font-semibold text-center col-start-1 lg:col-span-12 col-span-5"
      titleType="h1"
      titleClass="homeLargeTitle"
      content="Contate-nos"
    />

    <section
      class="lg:col-start-3 col-start-1 lg:col-span-8 col-span-5 mt-2 lg:mt-5"
    >

      <Text
        class="text-center"
        textClass="subForm"
        content=" Alguma dúvida, crítica ou sugestão?"
      />

      <Text
        class="text-center"
        textClass="subForm"
        content=" Nos envie uma mensagem!"
      />
      <div class="grid grid-cols-6 lg:gap-5 gap-2 mt-8">
        <Text
          v-if="selected != null"
          :class="selected !== null ? 'text-main-action' : 'hidden'"
          @click="(selected = null), (statusSend = false)"
          class="lg:hidden col-start-2 col-span-4 text-center h-5 flex justify-center items-center"
          textClass="smallSemi"
          content="voltar para categorias"
        />

        <Text
          v-else
          :class="selected !== null ? 'text-main-action' : 'block'"
          @click="selected = null"
          class="lg:hidden col-start-2 col-span-4 text-center h-5 flex justify-center items-center"
          textClass="smallSemiPurple"
          content="selecione uma categoria abaixo"
        />
       
        <Button
          :class="
            selected === null
              ? 'bg-transparent border-1 border-selection text-tag'
              : selected === 'question'
              ? 'bg-main-purple text-back'
              : 'hidden lg:flex lg:bg-transparent lg:border-1 lg:border-selection'
          "
          @click="(selected = 'question'), (statusSend = false)"
          buttonTitle="dúvida / sugestão / crítica"
          class="lg:col-start-1 lg:col-span-2 col-start-2  col-span-4  flex justify-center items-center rounded-full"
          buttonType="contactForm"
        />

        <Button
          :class="
            selected === null
              ? 'bg-transparent border-1 border-selection text-tag '
              : selected === 'publisher'
              ? 'bg-main-purple text-back'
              : 'hidden lg:flex lg:bg-transparent lg:border-1 lg:border-selection'
          "
          @click="(selected = 'publisher'), (statusSend = false)"
          class="lg:col-start-3 lg:col-span-2 col-start-2 col-span-4 rounded-full flex justify-center items-center"
          buttonTitle="sou uma editora"
          buttonType="contactForm"
        />

        <!-- não encontrei um livro -->

        <Button
          :class="
            selected === null
              ? 'bg-transparent border-1 border-selection text-tag '
              : selected === 'book'
              ? 'bg-main-purple text-back'
              : 'hidden lg:flex lg:bg-transparent lg:border-1 lg:border-selection'
          "
          @click="(selected = 'book'), (statusSend = false)"
          class="lg:col-start-5 lg:col-span-2 col-start-2 col-span-4 rounded-full flex justify-center items-center"
          buttonTitle="não encontrei um livro"
          buttonType="contactForm"
        />
        <!-- reportar livro -->

        <Button
          :class="
            selected === null
              ? 'bg-transparent border-1 border-selection text-tag '
              : selected === 'report'
              ? 'bg-main-purple text-back'
              : 'hidden lg:flex lg:bg-transparent lg:border-1 lg:border-selection'
          "
          @click="(selected = 'report'), (statusSend = false)"
          class="lg:col-start-1 lg:col-span-2 col-start-2 col-span-4 rounded-full  flex justify-center items-center"
          buttonTitle="reportar livro"
          buttonType="contactForm"
        />
        <!-- sou autor(a) independente -->
        <!-- outro assunto -->

        <Button
          :class="
            selected === null
              ? 'bg-transparent border-1 border-selection text-tag '
              : selected === 'independent'
              ? 'bg-main-purple text-back'
              : 'hidden lg:flex lg:bg-transparent lg:border-1 lg:border-selection'
          "
          @click="
            (selected = 'independent'),
              (statusSend = false),
              (statusAbout = 0),
              (statusEdition = null),
              (statusContact = null),
              (statusDone = null)
          "
          class="lg:col-start-3 lg:col-span-2 col-start-2 col-span-4 rounded-full flex justify-center items-center"
          buttonType="contactForm"
          buttonTitle="sou autor(a) independente"
        />

        <Button
          :class="
            selected === null
              ? 'bg-transparent border-1 border-selection text-tag '
              : selected === 'outro'
              ? 'bg-main-purple text-back'
              : 'hidden lg:flex lg:bg-transparent lg:border-1 lg:border-selection'
          "
          @click="(selected = 'outro'), (statusSend = false)"
          class="lg:col-start-5 lg:col-span-2 col-start-2 col-span-4 rounded-full flex justify-center items-center"
          buttonType="contactForm"
          buttonTitle="outro assunto"
        />
      </div>
    </section>
    <section
      class="lg:col-start-3 col-start-1 col-span-5 lg:col-span-8 col-span-3 lg:mt-12 mt-6"
      id="form-contact"
    >
      <!-- Duvida -->
      <form
        class="flex lg:flex-wrap lg:flex-row flex-col"
        v-if="(selected == 'question' && statusSend == false || pathname.indexOf('form-contact') != -1)"
      >
        <div class="lg:w-1/2 flex flex-col mb-5">
          <label class="text-sm mb-2">Nome*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="name"
            placeholder="Nome"
            :class="name ? 'border-1 border-error' : 'border-1 border-selection'"
          />

          <Text
            v-if="name"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira seu nome"
          />
        </div>
        <div class="lg:w-1/2 flex flex-col mb-5 lg:pl-4">
          <label class="text-sm mb-2">Email*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="email"
            ref="email"
            placeholder="contato@email.com"
            :class="email ? 'border-1 border-error' : 'border-1 border-selection'"
          />

          <Text
            v-if="email"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira um email válido"
          />
        </div>
        <div class="lg:w-1/2 flex flex-col mb-5">
          <label class="text-sm mb-2">Assunto*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="subject"
            :class="
              subject ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="subject"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira o assunto da mensagem"
          />
        </div>
        <div class="flex flex-col w-full mb-5">
          <label class="text-sm mb-2">Mensagem*</label>
          <textarea
            class="rounded-2xl h-40 outline-none px-2 py-1 border-1 border-selection"
            ref="message"
            placeholder="Escreva sua mensagem..."
            :class="
              message ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="message"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira sua mensagem"
          />
        </div>
      </form>

      <!-- Reportar livro -->
      <form
        class="flex flex-col"
        v-if="selected == 'report' && statusSend == false"
        id="report"
      >
        <div class="flex flex-col">
          <label class="text-sm mb-2"> Quero reportar: </label>
          <div class="relative pb-5">
            <a
              class="relative cursor-pointer bg-main-purple px-2 py-2 rounded-full w-44 text-back flex justify-around z-30"
              @click="list = !list"
            >
              {{ report }}
              <img src="../../assets/tiny/down.svg" alt="" />
            </a>

            <ul
              v-if="list"
              class="absolute bg-back w-44 border-1 border-selection rounded-b-2xl pb-3 pt-6 -mt-4 z-10"
            >
              <li
                v-for="(item, index) in reportList"
                :key="index"
                @click="(report = item), (list = !list)"
                class="pl-3 h-5 cursor-pointer hover:bg-selection hover:text-main text-secondary font-bold flex items-center"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full flex flex-col mb-5" v-if="report !== 'selecione'">
          <div v-if="report !== 'capa'" class="flex flex-col">
            <label class="text-sm mb-2 capitalize">{{ report }}*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="authorIrregularity"
              :placeholder="'Digite um ' + report"
              :class="
                authorIrregularity
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />
            <Text
              v-if="authorIrregularity"
              class="mt-1"
              textClass="formError"
              :content="`Por favor, insira ${report}`"
            />

            <Text
              v-if="name"
              class="mt-1"
              textClass="formError"
              content="Por favor, insira seu nome"
            />
          </div>
          <div v-else class="flex flex-col relative">
            <span class="font-bold text-sm w-full"
              >Arquivo capa (png, jpeg ou tiff)*</span
            >

            <label ref="image" class="">
              <input
                type="file"
                accept="image/jpeg"
                @change="insertImage"
                ref="inputImage"
              />

              <div class="container-file cursor-pointer">
                <div class="bar" ref="bar"></div>
                <img src="../../assets/tiny/anexo.svg" alt="" class="attachment" />
              </div>
            </label>

            <Text
              v-if="inputImage"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira uma foto"
            />
          </div>
        </div>
        <div class="w-full flex flex-col mb-5" v-if="report !== 'selecione'">
          <label class="text-sm mb-2">Indique a irregularidade*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="irregularity"
            placeholder="Descreva a irregularidade"
            :class="
              irregularity
                ? 'border-1 border-error'
                : 'border-1 border-selection'
            "
          />

          <Text
            v-if="irregularity"
            class=" mt-1"
            textClass="formError"
            content="Por favor, indique a irregularidade"
          />
        </div>
        <div
          class="w-full flex flex-col mb-5"
          v-if="report !== 'selecione' && report !== 'capa'"
        >
          <label class="text-sm mb-2">Insira o {{ report }} correto*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="correction"
            :class="
              correction ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="correction"
            class=" mt-1"
            textClass="formError"
            :content="`Por favor insira o(a) ${report} correto(a)`"
          />
        </div>
      </form>

      <!-- Editora -->
      <form
        class="flex lg:flex-wrap flex-col lg:flex-row"
        v-if="selected == 'publisher' && statusSend == false"
      >
        <div class="lg:w-1/2 flex flex-col mb-5">
          <label class="text-sm mb-2">Editora*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="publisher"
            placeholder="Editora"
            :class="
              publisher ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="publisher"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira seu nome"
          />
        </div>
        <div class="lg:w-1/2 flex flex-col mb-5 lg:pl-4">
          <label class="text-sm mb-2">Email*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="email"
            ref="publisherEmail"
            placeholder="contato@email.com"
            :class="
              publisherEmail ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="publisherEmail"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira um email válido"
          />
        </div>
        <div class="lg:w-1/2 flex flex-col mb-5">
          <label class="text-sm mb-2">Assunto*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="publisherSubject"
            :class="
              publisherSubject
                ? 'border-1 border-error'
                : 'border-1 border-selection'
            "
          />

          <Text
            v-if="publisherSubject"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira o assunto da mensagem"
          />
        </div>
        <div class="flex flex-col w-full mb-5">
          <label class="text-sm mb-2">Mensagem*</label>
          <textarea
            class="rounded-2xl h-40 outline-none px-2 py-1 border-1 border-selection"
            ref="publisherMessage"
            placeholder="Escreva sua mensagem..."
            :class="
              publisherMessage
                ? 'border-1 border-error'
                : 'border-1 border-selection'
            "
          />

          <Text
            v-if="publisherMessage"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira sua mensagem"
          />
        </div>
      </form>

      <!-- Outro -->
      <form
        class="flex lg:flex-wrap flex-col lg:flex-row"
        v-if="selected == 'outro' && statusSend == false"
      >
        <div class="lg:w-1/2 flex flex-col mb-5">
          <label class="text-sm mb-2">Nome*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="otherName"
            placeholder="Nome"
            :class="
              otherName ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="otherName"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira seu nome"
          />
        </div>
        <div class="lg:w-1/2 flex flex-col mb-5 lg:pl-4">
          <label class="text-sm mb-2">Email*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="email"
            ref="otherEmail"
            placeholder="contato@email.com"
            :class="
              otherEmail ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="otherEmail"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira um email válido"
          />
        </div>
        <div class="lg:w-1/2 flex flex-col mb-5">
          <label class="text-sm mb-2">Assunto*</label>
          <input
            class="rounded-full h-5 outline-none"
            type="text"
            ref="otherSubject"
            :class="
              otherSubject ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="otherSubject"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira o assunto da mensagem"
          />
        </div>
        <div class="flex flex-col w-full mb-5">
          <label class="text-sm mb-2">Mensagem*</label>
          <textarea
            class="rounded-2xl h-40 outline-none px-2 py-1 border-1 border-selection"
            ref="otherMessage"
            placeholder="Escreva sua mensagem..."
            :class="
              otherMessage ? 'border-1 border-error' : 'border-1 border-selection'
            "
          />

          <Text
            v-if="otherMessage"
            class=" mt-1"
            textClass="formError"
            content="Por favor, insira sua mensagem"
          />
        </div>
      </form>

      <!-- Nao encontrei um livro-->
      <form
        class="flex lg:flex-wrap flex-col lg:flex-row"
        v-if="selected == 'book' && statusSend == false"
      >
        <Text
          content="Quer ver um livro, autor ou editora no Synopsis? Conte para a gente
          abaixo:"
        />

        <div class="w-full flex flex-col mb-5 mt-4">
          <div
            v-for="(item, index) in forms"
            :key="index"
            class="flex flex-col lg:flex-row mt-4 mb-4"
          >
            <div
              class="lg:min-w-1/3 flex flex-col lg:mr-4"
              :ref="'suggestion' + (index + 1)"
            >
              <label class="text-sm">sugestão {{ index + 1 }}*</label>
              <input
                class="rounded-full h-5 outline-none mt-2"
                type="text"
                :ref="'suggestionInput' + (index + 1)"
                placeholder="Sugestão"
                :class="
                  item.suggestion
                    ? 'border-1 border-error'
                    : 'border-1 border-selection'
                "
              />

              <Text
                v-if="item.suggestion"
                class=" mt-1"
                textClass="formError"
                content="Por favor, insira sua sugestão"
              />

              <div
                class="w-full flex justify-between flex-wrap lg:mt-4 mt-3 overflow-hidden mb-3 lg:mb-0"
              >
                <label>
                  <input
                    type="radio"
                    :name="'suggestion' + (index + 1)"
                    class="mr-2"
                    :ref="'radioTitle' + (index + 1)"
                    checked
                    @click="suggestionBook(index + 1, 1)"
                  />
                  <span class="text-xs font-normal">título</span>
                  <!-- <Text content="título" textClass="xSmallNormal" /> -->
                </label>
                <label>
                  <input
                    type="radio"
                    :name="'suggestion' + (index + 1)"
                    class="mr-2"
                    :ref="'radioAuthor' + (index + 1)"
                    @click="suggestionBook(index + 1, 0)"
                  />
                  <span class="text-xs font-normal">autor</span>
                 
                </label>
                <label>
                  <input
                    type="radio"
                    :name="'suggestion' + (index + 1)"
                    class="mr-2"
                    :ref="'radioPublisher' + (index + 1)"
                    @click="suggestionBook(index + 1, 0)"
                  />
                  <span class="text-xs font-normal">editora</span>
                </label>
              </div>
            </div>

            <div
              class="lg:min-w-1/3 flex flex-col lg:mr-4"
              :ref="'author' + (index + 1)"
            >
              <label class="text-sm">Insira o Autor*</label>
              <input
                class="w-full rounded-full h-5 outline-none mt-2"
                type="text"
                :ref="'authorInput' + (index + 1)"
                placeholder="Autor"
                :class="
                  item.author
                    ? 'border-1 border-error'
                    : 'border-1 border-selection'
                "
              />

              <Text
                v-if="item.author"
                class=" mt-1"
                textClass="formError"
                content="Por favor, insira um autor"
              />
            </div>
            <div
              class="lg:min-w-1/3 flex flex-col mt-3 lg:mt-0"
              :ref="'publisher' + (index + 1)"
            >
              <label class="text-sm">Insira a editora</label>
              <input
                class="w-full rounded-full h-5 outline-none mt-2"
                type="text"
                :ref="'publisherInput' + (index + 1)"
                placeholder="Editora"
                :class="
                  item.publisher
                    ? 'border-1 border-error'
                    : 'border-1 border-selection'
                "
              />

              <Text
                v-if="item.publisher"
                class=" mt-1"
                textClass="formError"
                content="Por favor, insira uma editora"
              />
            </div>
          </div>
          <div class="flex lg:flex-row flex-col">
            <div
              v-if="forms.length > 1"
              class="flex mt-4 cursor-pointer mr-3"
              @click="removeForm"
            >
              <img
                src="../../assets/tiny/remove_circle.svg"
                alt=""
                class="mr-1"
              />
              <Text
                textClass="regularPurple"
                content="remover última sugestão"
              />
            </div>

            <div class="flex mt-4 cursor-pointer" @click="addForm">
              <img src="../../assets/tiny/add_circle.svg" alt="" class="mr-1" />
              <Text
                textClass="regularPurple"
                content="adicionar última sugestão"
              />
            </div>
          </div>
        </div>
      </form>

      <!-- sou autor independente -->
      <form
        class="flex flex-col"
        v-if="selected == 'independent' && statusSend == false"
      >
        <Text
          content="Adoraríamos incluir seu livro no Synopsis. Preencha as informações
          abaixo e em breve seu livro estará em nossa plataforma."
        />

        <!-- cabeçalho de paginação -->
        <div class="flex justify-between relative mt-9">
          <div class="lg:px-6 w-full absolute top-2 z-0">
            <!-- Status do formulário -->
            <div class="h-0.5 w-full flex">
              <div
                class="h-full w-1/3"
                :class="
                  statusEdition == 0 || statusEdition == 1
                    ? 'bg-main-purple'
                    : 'bg-slider'
                "
              ></div>
              <div
                class="h-full w-1/3"
                :class="
                  statusContact == 0 || statusContact == 1
                    ? 'bg-main-purple'
                    : 'bg-slider'
                "
              ></div>
              <div
                class="h-full w-1/3"
                :class="
                  statusDone == 1 ? 'bg-main-purple' : 'bg-slider'
                "
              ></div>
            </div>
          </div>
          <!-- bolinhas -->
          <div class="flex flex-col items-center z-10">
            <Text
              class="rounded-full w-4 h-4 flex justify-center items-center"
              :class="
                statusAbout == 0
                  ? 'bg-back text-main-action border-1 border-main-purple'
                  : statusAbout == 1
                  ? 'bg-main-purple text-back'
                  : statusAbout == null
                  ? 'bg-back text-secondary border-1 border-secondary'
                  : ''
              "
              content="1"
            />

            <Text
              :class="
                statusAbout == 0
                  ? 'text-main-action'
                  : statusAbout == 1
                  ? 'text-main-action'
                  : statusAbout == null
                  ? 'text-inactive'
                  : ''
              "
              class="lg:block hidden mt-1"
              textClass="regularSemi"
              content="sobre o livro"
            />
          </div>
          <div class="flex flex-col items-center z-10">
            <Text
              class="rounded-full bg-main-purple w-4 h-4 flex justify-center items-center"
              :class="
                statusEdition == 0
                  ? 'bg-back text-main-action border-1 border-main-purple'
                  : statusEdition == 1
                  ? 'bg-main-purple  text-back'
                  : statusEdition == null
                  ? 'bg-back text-secondary border-1 border-secondary'
                  : ''
              "
              content="2"
            />

            <Text
              :class="
                statusEdition == 0
                  ? 'text-main-action'
                  : statusEdition == 1
                  ? 'text-main-action'
                  : statusEdition == null
                  ? 'text-inactive'
                  : ''
              "
              class="lg:block hidden mt-1"
              textClass="regularSemi"
              content="edição"
            />
          </div>
          <div class="flex flex-col items-center z-10">
            <Text
              class="rounded-full bg-main-purple w-4 h-4 flex justify-center items-center"
              :class="
                statusContact == 0
                  ? 'bg-back text-main-action border-1 border-main-purple'
                  : statusContact == 1
                  ? 'bg-main-purple text-back'
                  : statusContact == null
                  ? 'bg-back text-secondary border-1 border-secondary'
                  : ''
              "
              content="3"
            />

            <Text
              :class="
                statusContact == 0
                  ? 'text-main-action'
                  : statusContact == 1
                  ? 'text-main-action'
                  : statusContact == null
                  ? 'text-inactive'
                  : ''
              "
              class="lg:block hidden mt-1"
              textClass="regularSemi"
              content="contato"
            />
          </div>
          <div class="flex flex-col items-center z-10">
            <Text
              class="rounded-full bg-main-purple w-4 h-4 flex justify-center items-center"
              :class="
                statusDone == 0
                  ? 'bg-back text-main-action border-1 border-main-purple'
                  : statusDone == 1
                  ? 'bg-main-purple text-back'
                  : statusDone == null
                  ? 'bg-back text-secondary border-1 border-secondary'
                  : ''
              "
              content="4"
            />

            <Text
              :class="
                statusDone == 0
                  ? 'text-main-action'
                  : statusDone == 1
                  ? 'text-main-action'
                  : statusDone == null
                  ? 'text-inactive'
                  : ''
              "
              class="lg:block hidden mt-1"
              textClass="regularSemi"
              content="concluído"
            />
          </div>
        </div>

        <!-- concluido -->
        <div
          class="w-full grid grid-cols-6 gap-5 flex flex-col mt-13 mb-5"
          :class="
            statusDone == 1 && statusSend == false ? 'block' : 'hidden'
          "
          id="independent"
        >
          <div
            class="col-start-1 col-span-6 flex flex-col justify-center items-center"
          >
            <anima></anima>
          </div>
        </div>

        <!-- formulario Sobre o Livro-->
        <div
          class="w-full grid grid-cols-6 gap-5 flex flex-col mt-13 mb-5"
          :class="statusAbout == 0 ? 'block' : 'hidden'"
          id="independent"
        >
          <div
            class="col-start-1 lg:col-span-3 col-span-6 flex flex-col justify-between"
          >
            <label class="text-sm mb-2">Título*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentTitle"
              placeholder="Título"
              :class="
                independentTitle
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentTitle"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira o título"
            />
          </div>
          <div
            class=" lg:col-start-4 col-start-1 lg:col-span-3 col-span-6 flex flex-col justify-between"
          >
            <label class="text-sm "
              >Autor
              <!-- <span class="text-sm font-medium"
                >(caso possua mais de um autor separe com vírgula)</span
              >* -->
              <Text
                class="mb-2"
                textClass="smallMedium"
                content="(caso possua mais de um autor, separe com vírgula)*"
              />
            </label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentAuthor"
              placeholder="ex. Mario de Andrade, Cecília Meireles"
              :class="
                independentAuthor
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentAuthor"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira um autor"
            />
          </div>

          <div class="col-start-1 lg:col-span-3 col-span-6 flex flex-col">
            <label class="text-sm mb-2">Gênero(s)*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentGenre"
              placeholder="Romance, Policial"
              :class="
                independentGenre
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentGenre"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira um gênero"
            />
          </div>
          <div
            class="lg:col-start-4 col-start-1 lg:col-span-3 col-span-6 flex flex-col"
          >
            <label class="text-sm mb-2">Número de páginas*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentPages"
              placeholder="200"
              :class="
                independentPages
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentPages"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira o número de páginas"
            />
          </div>

          <div
            class="col-start-1 lg:col-span-3 col-span-6 flex flex-col"
            id="report"
          >
            <Text
              class="w-full  mb-2"
              textClass="smallBold"
              content="Arquivo capa (png, jpeg ou tiff)*"
            />

            <label ref="image" class="">
              <input
                type="file"
                accept="image/jpeg"
                @change="insertImage"
                ref="independentCover"
              />

              <div class="container-file cursor-pointer">
                <div class="bar" ref="bar"></div>
                <img src="../../assets/tiny/anexo.svg" alt="" class="attachment" />
              </div>
            </label>

            <Text
              v-if="independentCover"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira a capa"
            />
          </div>

          <div class="col-start-1 col-span-6 flex flex-col">
            <label class="text-sm mb-2">Sinopse*</label>
            <textarea
              class="rounded-2xl h-40 outline-none px-2 py-1"
              type="text"
              ref="independentSynopsis"
              placeholder="Escreva a sinopse..."
              :class="
                independentSynopsis
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentSynopsis"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira uma sinopse"
            />
          </div>
        </div>

        <!-- formulario Edição-->
        <div
          class="w-full grid grid-cols-6 gap-6 flex flex-col mt-13 mb-5"
          :class="statusEdition == 0 ? 'block' : 'hidden'"
          id="independent"
        >
          <div class="col-start-1 col-span-3 flex flex-col">
            <label class="text-sm mb-2">Editora</label>
            <input
              class="rounded-full h-5 outline-none border-1 border-selection"
              type="text"
              ref="independentPublisher"
              placeholder="Editora"
            />
          </div>
          <div class="col-start-4 col-span-3 2 flex flex-col">
            <label class="text-sm mb-2">Número da Edição</label>
            <input
              class="rounded-full h-5 outline-none border-1 border-selection"
              type="text"
              ref="independentNumber"
              placeholder="Número da Edição"
            />
          </div>

          <div class="col-start-1 col-span-3 flex flex-col">
            <label class="text-sm mb-2">ISBN</label>
            <input
              class="rounded-full h-5 outline-none border-1 border-selection"
              type="text"
              ref="independentIsbn"
              placeholder="000-00-000-0000-0"
            />
          </div>
          <div class="col-start-4 col-span-3 flex flex-col">
            <label class="text-sm mb-2">Idioma*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentLang"
              placeholder="Idioma"
              :class="
                independentLang
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentLang"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira o idioma"
            />
          </div>

          <div class="col-start-1 col-span-3 flex flex-col">
            <label class="text-sm mb-2">Data de publicação</label>
            <input
              class="rounded-full h-5 outline-none border-1 border-selection"
              type="text"
              ref="independentYear"
              placeholder="2021"
            />
          </div>
        </div>

        <!-- formulario Contato-->
        <div
          class="w-full grid grid-cols-6 gap-6 flex flex-col mt-13 mb-5"
          :class="statusContact == 0 ? 'block' : 'hidden'"
          id="independent"
        >
          <div class="col-start-1 col-span-3 flex flex-col">
            <label class="text-sm mb-2">Nome*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentName"
              :class="
                independentName
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentName"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira seu nome"
            />
          </div>
          <div class="col-start-4 col-span-3 2 flex flex-col">
            <label class="text-sm mb-2">email*</label>
            <input
              class="rounded-full h-5 outline-none"
              type="text"
              ref="independentEmail"
              placeholder="seunome@email.com"
              :class="
                independentEmail
                  ? 'border-1 border-error'
                  : 'border-1 border-selection'
              "
            />

            <Text
              v-if="independentEmail"
              class=" mt-1"
              textClass="formError"
              content="Por favor, insira seu email"
            />
          </div>
        </div>

        <!-- setas de formulario -->
        <div
          class="flex flex-col lg:flex-row w-full justify-between mb-11"
          v-if="selected == 'independent' && statusDone !== 1"
        >
          <Text
            class=" lg:mb-0 mb-3"
            textClass="smallBold"
            content="itens com (*) são obrigatórios"
          />

          <div class="flex justify-end">
            <Button
              v-if="statusAbout != 0"
              @click="previous"
              buttonType="roundedWhite"
              buttonTitle="anterior"
            />

            <Button
              @click="next"
              v-if="statusContact !=0"
              class="flex justify-center items-center h-5 w-10 px-8 rounded-full bg-main-purple"
              buttonType="roundedPurpleSemi"
              buttonTitle="próximo"
            />
            

            <Button
              @click="next"
              v-else
              class="flex justify-center items-center h-5 w-10 px-8 rounded-full bg-main-purple"
              buttonType="roundedPurpleSemi"
              buttonTitle="próximo"
            />
          </div>
        </div>
      </form>

      <!-- botão enviar -->
      <div
        class="flex lg:flex-row flex-col w-full justify-between items-center mb-11"
        v-if="
          selected !== 'independent' &&
            selected !== null &&
            statusSend == false
        "
      >
        <Text
          class=" lg:mb-0 mb-3"
          textClass="smallBold"
          content="itens com (*) são obrigatórios"
        />
      <div>

        <Button
          v-if="send"
          @click="send"
          buttonType="roundedPurpleSemi"
          buttonTitle="enviar"
        />

        <Button
          v-else
          @click="send"
          buttonType="roundedError"
          buttonTitle="Para continuar preencha todos os campos acima"
          
        />
      </div>
    </div>
      <!-- Concluído-->
      <div
        class="w-full grid grid-cols-6 flex flex-col mb-10"
        :class="statusSend == true ? 'block' : 'hidden'"
        id="independent"
      >
        <!-- <span
          v-if="selected == 'independente' && statusSend == true"
          class="text-center col-span-6"
        >
          Agradecemos sua contrubuição! Em breve seu livro estará em nossa
          plataforma. <br />Quer incluir outro livro?
          <b @click="resetForm" class="cursor-pointer text-main-action"
            >clique aqui</b
          >
        </span> -->
        <div
          v-if="selected == 'independent' && statusSend == true"
          class="text-center col-span-6"
        >
          <Text
            content="Agradecemos sua contrubuição! Em breve seu livro estará em nossa
            plataforma."
          />
          <div class="inline-flex	">
            <Text
              content="Quer incluir outro livro?"
            />
            <NavButton
              @click="resetForm"
              class="ml-1 "
              buttonType="navbar"
              buttonTitle="clique aqui"
            />
          </div>
        </div>

        <div
          v-if="selected == 'report' && statusSend == true"
          class="text-center col-span-6 "
        >
          <Text
            content="Agradecemos sua contrubuição! Nossa equipe irá avaliar sua reportagem."
          />
          <div class="inline-flex	">
            <Text
              content="Para reportar novamente"
            />
            <NavButton
              @click="(selected = null), (statusSend = false)"
              class="ml-1 "
              buttonType="navbar"
              buttonTitle="clique aqui"
            />
          </div>
        </div>

        <div
          v-if="selected == 'book' && statusSend == true"
          class="text-center col-span-6 "
        >
          <Text
            content="Agradecemos sua contrubuição! "
          />
          <div class="inline-flex	">
            <Text
              content="Quer fazer novas sugestões?"
            />
            <NavButton
              @click="(selected = null), (statusSend = false)"
              class="ml-1 "
              buttonType="navbar"
              buttonTitle="clique aqui"
            />
          </div>
        </div>

        <div
          v-if="
            (statusSend == true && selected == 'question') ||
              selected == 'publisher' ||
              selected == 'outro'
          "
          class="text-center col-span-6 "
          >
          <Text
            content="Agradecemos seu contato! Em breve entraremos em contato."
          />
          <div class="inline-flex	">
            <Text
              content="Para enviar nova mensagem"
            />
            <NavButton
              @click="(selected = null), (statusSend = false)"
              class="ml-1 "
              buttonType="navbar"
              buttonTitle="clique aqui"
            />
          </div>
        </div>
        

        <div
          class="lg:col-start-3 lg:col-span-2 col-start-2 col-span-4 flex flex-col mt-7"
        >
          <router-link to="/" class="cursor-pointer">
            
            <Button
              buttonType="roundedPurpleHome"
              buttonTitle="página inicial"
            />
            
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { api_caller } from "../../http-common";
import scroll from "../../scrollToSection";
import Button from "../tiny/newComponents/Button";
import Text from "../tiny/newComponents/Text";
import Title from "../tiny/newComponents/Title";
import NavButton from "../tiny/newComponents/NavButton";
import Input from "../tiny/newComponents/Input";
import Anima from "../tiny/Anima.vue";

export default {
  props: ["query"],
  components: {
    Anima,
    Button,
    Text,
    Title,
    Text,
    NavButton,
    Input,
  },
  data() {
    return {
      validEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      independentNumber: false,
      independentTitle: false,
      independentAuthor: false,
      independentGenre: false,
      independentPages: false,
      independentCover: false,
      independentSynopsis: false,
      inputImage: false,

      imageBase64: null,
      independentPublisher: false,
      independentNumber: false,
      independentIsbn: false,
      independentLang: false,
      independentYear: false,

      independentName: false,
      independentEmail: false,

      statusAbout: 0,
      statusEdition: null,
      statusContact: null,
      statusDone: null,

      selected: null,
      form: null,
      name: false,
      otherName: false,
      publisher: false,
      email: false,
      publisherEmail: false,
      otherEmail: false,
      subject: false,
      publisherSubject: false,
      otherSubject: false,
      message: false,
      publisherMessage: false,
      otherMessage: false,
      report: "selecione",
      authorIrregularity: false,
      irregularity: false,
      correction: false,

      suggestion1: false,

      send: true,
      statusSend: false,

      forms: [
        {
          sugestao: false,
          autor: false,
          editora: false,
        },
      ],

      reportList: [
        "selecione",
        "título",
        "autor",
        "gênero",
        "editora",
        "capa",
        "outro",
      ],
      list: false,

      formSend: {},
      pathname: window.location.href
    };
  },
  methods: {
    sendForm() {
      api_caller({
        method: "post",
        url: "https://s0f1v6ul3j.execute-api.us-east-2.amazonaws.com/dev",
        data: JSON.stringify(this.formSend),
      })
        .then((response) => {
          if (response.status == 200) {
            this.statusSend = true;
          }
        })
        .catch((er) => {
          console.log(er);
        });
    },
    getBase64(pic) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(pic);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    resetForm() {
      this.statusAbout = 0;
      this.statusSend = false;
      this.statusEdition = null;
      this.statusContact = null;
      this.statusDone = null;
    },
    previous() {
      if (this.statusEdition == 0) {
        this.statusEdition = null;
        this.statusAbout = 0;
      } else if (this.statusContact == 0) {
        this.statusContact = null;
        this.statusEdition = 0;
      }
    },

    next(event) {
      event.preventDefault();

      if (this.statusAbout == 0) {
        // validação de campos para passar para proxima parte

        if (
          this.$refs.independentTitle.value !== "" &&
          this.$refs.independentAuthor.value !== "" &&
          this.$refs.independentGenre.value !== "" &&
          this.$refs.independentPages.value !== "" &&
          this.$refs.independentCover.files.length != 0 &&
          this.$refs.independentSynopsis.value != ""
        ) {
          this.statusAbout = 1;
          this.statusEdition = 0;

        } else {
          this.$refs.independentTitle.value == ""
            ? (this.independentTitle = true)
            : (this.independentTitle = false);
          this.$refs.independentAuthor.value == ""
            ? (this.independentAuthor = true)
            : (this.independentAuthor = false);
          this.$refs.independentGenre.value == ""
            ? (this.independentGenre = true)
            : (this.independentGenre = false);
          this.$refs.independentPages.value == ""
            ? (this.independentPages = true)
            : (this.independentPages = false);
          this.$refs.independentCover.files.length == 0
            ? (this.independentCover = true)
            : (this.independentCover = false);
          this.$refs.independentSynopsis.value == ""
            ? (this.independentSynopsis = true)
            : (this.independentSynopsis = false);

        }
      } else if (this.statusEdition == 0) {
        // validação de campos para passar para proxima parte
        if (this.$refs.independentLang.value !== "") {
          this.statusEdition = 1;
          this.statusContact = 0;
        } else {
          this.$refs.independentNumber.value == ""
            ? (this.independentNumber = true)
            : (this.independentNumber = false);
          this.$refs.independentIsbn.value == ""
            ? (this.independentIsbn = true)
            : (this.independentIsbn = false);
          this.$refs.independentLang.value == ""
            ? (this.independentLang = true)
            : (this.independentLang = false);
          this.$refs.independentYear.value == ""
            ? (this.independentYear = true)
            : (this.independentYear = false);
        }
      } else if (this.statusContact == 0) {
        // validação de campos para passar para o final
        const validation = this.validEmail.test(
          this.$refs.independentEmail.value
        );

        if (this.$refs.independentName.value !== "" && validation == true) {
          this.statusContact = 1;
          this.statusDone = 1;
        } else {
          this.$refs.independentName.value == ""
            ? (this.independentName = true)
            : (this.independentName = false);
          this.$refs.independentEmail.value == ""
            ? (this.independentEmail = true)
            : (this.independentEmail = false);
          validation == true
            ? (this.independentEmail = false)
            : (this.independentEmail = true);
        }
      }

      if (this.statusDone == 1) {
        this.getBase64(this.$refs.independentCover.files[0])
          .then(
            (data) =>
              (this.formSend = {
                tipo: this.selected,
                titulo: this.$refs.independentTitle.value,
                autor: this.$refs.independentAuthor.value,
                genero: this.$refs.independentGenre.value,
                paginas: this.$refs.independentPages.value,
                capa: data,
                sinopse: this.$refs.independentSynopsis.value,
                editora: this.$refs.independentPublisher.value,
                numeroEdicao: this.$refs.independentNumber.value,
                isnb: this.$refs.independentIsbn.value,
                idioma: this.$refs.independentLang.value,
                ano: this.$refs.independentYear.value,
                email: this.$refs.independentEmail.value,
                nome: this.$refs.independentName.value,
              })
          )
          .then(() => {
            this.sendForm();
            this.independentTitle = false;
            this.independentAuthor = false;
            this.independentGenre = false;
            this.independentNumber = false;
            this.independentCover = false;
            this.independentSynopsis = false;
          });
      }
    },
    insertImage() {
      this.$refs.bar.classList.add("start");
    },
    addForm() {
      this.forms.push({
        sugestao: false,
        autor: false,
        editora: false,
      });
    },
    removeForm() {
      this.forms.length > 1 ? this.forms.pop() : "";
    },
    send() {
      if (this.selected == "question") {
        const validation = this.validEmail.test(this.$refs.email.value);
        this.$refs.name.value == "" ? (this.name = true) : (this.name = false);
        this.$refs.subject.value == ""
          ? (this.subject = true)
          : (this.subject = false);
        this.$refs.message.value == ""
          ? (this.message = true)
          : (this.message = false);

        if (validation === false) {
          this.email = true;
        } else {
          this.email = false;
        }

        if (
          this.name == false &&
          this.subject == false &&
          this.message == false &&
          validation === true
        ) {
          this.send = true;

          this.formSend = {
            tipo: this.selected,
            mail: this.$refs.email.value,
            nome: this.$refs.name.value,
            assunto: this.$refs.subject.value,
            mensagem: this.$refs.message.value,
          };
          this.sendForm();
        } else {
          this.send = false;
        }
      } else if (this.selected == "publisher") {
        const validation = this.validEmail.test(this.$refs.publisherEmail.value);
        this.$refs.publisher.value == ""
          ? (this.publisher = true)
          : (this.publisher = false);
        this.$refs.publisherSubject.value == ""
          ? (this.publisherSubject = true)
          : (this.publisherSubject = false);
        this.$refs.publisherMessage.value == ""
          ? (this.publisherMessage = true)
          : (this.publisherMessage = false);

        if (validation === false) {
          this.publisherEmail = true;
        } else {
          this.publisherEmail = false;
        }

        if (
          this.publisher == false &&
          this.publisherSubject == false &&
          this.publisherMessage == false &&
          validation === true
        ) {
          this.send = true;

          this.formSend = {
            tipo: this.selected,
            editoria: this.$refs.publisher.value,
            mail: this.$refs.publisherEmail.value,
            assunto: this.$refs.publisherSubject.value,
            mensagem: this.$refs.publisherMessage.value,
          };
          this.sendForm();
        } else {
          this.send = false;
        }
      } else if (this.selected == "outro") {
        const validation = this.validEmail.test(this.$refs.otherEmail.value);
        this.$refs.otherName.value == ""
          ? (this.otherName = true)
          : (this.otherName = false);
        this.$refs.otherSubject.value == ""
          ? (this.otherSubject = true)
          : (this.otherSubject = false);
        this.$refs.otherMessage.value == ""
          ? (this.otherMessage = true)
          : (this.otherMessage = false);

        if (validation === false) {
          this.otherEmail = true;
        } else {
          this.otherEmail = false;
        }
        if (
          this.otherName == false &&
          this.otherSubject == false &&
          this.otherMessage == false &&
          validation === true
        ) {
          this.send = true;

          this.formSend = {
            tipo: this.selected,
            mail: this.$refs.otherEmail.value,
            nome: this.$refs.otherName.value,
            assunto: this.$refs.otherSubject.value,
            mensagem: this.$refs.otherMessage.value,
          };
          this.sendForm();
        } else {
          this.send = false;
        }
      } else if (this.selected == "report") {
        if (this.$refs.inputImage != undefined) {
          this.$refs.inputImage.files != 0
            ? (this.inputImage = true)
            : (this.inputImage = false);
        } else {
        }

        if (this.$refs.authorIrregularity != undefined) {
          this.$refs.authorIrregularity.value == ""
            ? (this.authorIrregularity = true)
            : (this.authorIrregularity = false);
        } else {
          this.authorIrregularity = true;
        }

        this.$refs.irregularity.value == ""
          ? (this.irregularity = true)
          : (this.irregularity = false);

        if (this.$refs.correction != undefined) {
          this.$refs.correction.value == ""
            ? (this.correction = true)
            : (this.correction = false);
        }

        if (this.report == "autor") {
          if (
            this.independentAuthor == false &&
            this.irregularity == false &&
            this.correction == false
          ) {
            this.send = true;

            this.formSend = {
              tipo: this.selected,
              reporte: this.report,
              reporteCorreto: this.$refs.correction.value,
              irregularidade: this.$refs.irregularity.value,
              autor: this.$refs.authorIrregularity.value,
            };
            this.sendForm();
          } else {
            this.send = false;
          }
        } else if (this.report == "gênero") {
          if (
            this.independentAuthor == false &&
            this.irregularity == false &&
            this.correction == false
          ) {
            this.send = true;
            this.formSend = {
              tipo: this.selected,
              reporte: this.report,
              reporteCorreto: this.$refs.correction.value,
              irregularidade: this.$refs.irregularity.value,
              genero: this.$refs.authorIrregularity.value,
            };
            this.sendForm();
          } else {
            this.send = false;
          }
        } else if (this.report == "publisher") {
          if (
            this.independentAuthor == false &&
            this.irregularity == false &&
            this.correction == false
          ) {
            this.send = true;
            this.formSend = {
              tipo: this.selected,
              reporte: this.report,
              reporteCorreto: this.$refs.correction.value,
              irregularidade: this.$refs.irregularity.value,
              editora: this.$refs.authorIrregularity.value,
            };
            this.sendForm();
          } else {
            this.send = false;
          }
        } else if (this.report == "título") {
          if (
            this.independentAuthor == false &&
            this.irregularity == false &&
            this.correction == false
          ) {
            this.send = true;
            this.formSend = {
              tipo: this.selected,
              reporte: this.report,
              reporteCorreto: this.$refs.correction.value,
              irregularidade: this.$refs.irregularity.value,
              editora: this.$refs.authorIrregularity.value,
            };
            this.sendForm();
          } else {
            this.send = false;
          }
        } else if (this.report == "capa") {
          if (this.inputImage == false && this.irregularity == false) {
            console.log("capa errada")
            let foto;
            this.getBase64(this.$refs.inputImage.files[0])
              .then(
                (data) =>
                  (this.formSend = {
                    tipo: this.selected,
                    reporte: this.report,
                    irregularidade: this.$refs.irregularity.value,
                    capa: data,
                  })
              )
              .then(() => {
                this.sendForm();
              });

            this.send = true;
          } else {
            this.send = false;
          }
        } else if (this.report == "outro") {
          if (
            this.independentAuthor == false &&
            this.irregularity == false &&
            this.correction == false
          ) {
            this.send = true;
            this.formSend = {
              tipo: this.selected,
              reporte: this.report,
              reporteCorreto: this.$refs.correction.value,
              irregularidade: this.$refs.irregularity.value,
              outro: this.$refs.authorIrregularity.value,
            };
            this.sendForm();
          } else {
            this.send = false;
          }
        }
      } else if (this.selected == "book") {
        let form = [];

        this.forms.forEach((item, index) => {
          if (this.$refs["radioTitle" + (index + 1)].checked) {
            this.$refs["suggestionInput" + (index + 1)].value == ""
              ? (item.suggestion = true)
              : (item.suggestion = false);
            this.$refs["authorInput" + (index + 1)].value == ""
              ? (item.author = true)
              : (item.author = false);

            if (
              this.$refs["suggestionInput" + (index + 1)].value == "" &&
              this.$refs["authorInput" + (index + 1)].value == ""
            ) {
              this.send = false;
            } else {
              this.send = true;

              form.push({
                tipo: this.selected,
                sugestao: this.$refs["suggestionInput" + (index + 1)].value,
                autor: this.$refs["authorInput" + (index + 1)].value,
                editora: this.$refs["publisherInput" + (index + 1)].value,
              });
            }
          } else {
            this.$refs["suggestionInput" + (index + 1)].value == ""
              ? (item.suggestion = true)
              : (item.suggestion = false);

            if (this.$refs["suggestionInput" + (index + 1)].value == "") {
              this.send = false;
            } else {
              this.send = true;

              if (this.$refs["radioAuthor" + (index + 1)].checked) {
                form.push({
                  tipo: this.selected,
                  sugestao: "",
                  autor: this.$refs["suggestionInput" + (index + 1)].value,
                  editora: "",
                });
              } else {
                form.push({
                  tipo: this.selected,
                  sugestao: "",
                  autor: "",
                  editora: this.$refs["suggestionInput" + (index + 1)].value,
                });
              }
            }
          }
        });

        this.formSend = form;
        this.sendForm();
      }
      setTimeout(() => {
        this.send = true;
      }, 3000);
    },
    suggestionBook(suggestionNumber, status) {
      if (status == 0) {
        this.$refs["author" + suggestionNumber].classList.add("hidden");
        this.$refs["publisher" + suggestionNumber].classList.add("hidden");
      } else {
        this.$refs["author" + suggestionNumber].classList.remove("hidden");
        this.$refs["publisher" + suggestionNumber].classList.remove("hidden");
      }
    },
  },
  mounted() {
    scroll();

    this.$props.query !== undefined
      ? (this.selected = this.$props.query)
      : "";
    
  },
};
</script>

<style></style>
