<template>
  <v-card>
    <v-toolbar color="blue" dense card>
      <v-toolbar-title class="white--text">SOBRE O DIARIOBOT</v-toolbar-title>
    </v-toolbar>
    <div class="pa-2 blue-grey--text text--darken-3">
      <p>
        O <span class="bold uppercase">diariobot</span> é um robô que coleta publicações disponibilizadas no diário da
        <a href="http://ioes.dio.es.gov.br/portal/visualizacoes/diario_oficial" target="_blank" class="uppercase">Imprensa Oficial/ES</a>,
        e aplica técnicas de
        <a href="https://pt.wikipedia.org/wiki/Aprendizado_de_m%C3%A1quina" target="_blank" class="italic">machine learning</a>
        afim de tentar prever a qual tema (de acordo com as competências de algumas das unidades técnicas do TCE-ES) essa publicação pertenceria.
      </p>

      <v-divider class="mb-3"></v-divider>

      <p>
        Desenvolvido inicialmente no NTI (Núcleo de Tecnologia da Informação) apenas para vasculhar e armazenar as publicações feitas no diário oficial,
        o projeto atualmente conta com algoritmos que aprendem como um humano classificaria a temática das publicações,
        entre:
        <template v-for="tema in temasStylized">
          <span class="px-1 lowercase white--text" v-bind:style="{backgroundColor: tema.color}">{{ tema.text }}</span>{{ tema.append }}
        </template>
      </p>

      <p>
        O próprio diário oficial já fornece informações muito úteis sobre as publicações, como o Tipo (contrato, licitação...), o Órgão e o Jurisdicionado que fez a publicação, entre outros.
        No entanto, o mesmo não fornece informações relacionadas à temática, o que dificulta a seleção de publicações de acordo com o seu conteúdo.
        É aí que entra o <span class="bold uppercase">diariobot</span>, analisando o conteúdo das publicações e atribuindo temas, através de técnicas de
        <a href="https://pt.wikipedia.org/wiki/Processamento_de_linguagem_natural" target="_blank">processamento de linguagem natural</a>.
      </p>

      <p class="mb-0">
         Atualmente o <span class="bold uppercase">diariobot</span> acerta em torno de 80% das vezes,
         mas estamos trabalhando para melhorar esse número, além de trazer publicações de outros diários.
      </p>
    </div>
  </v-card>
</template>

<script>
import ColorScheme from 'common/color.scheme'

export default {
  name: 'InformativoDialogContent',
  props: {
    temas: { type: Array, required: true }
  },
  computed: {
    temasStylized () {
      return this.temas
      .sort((a, b) => { return a.ordem - b.ordem })
      .map((tema, index, original) => {
        let append = '.';
        if (index < original.length - 2)
          append = ', '
        else if (index == original.length - 2)
          append = ' e '

        return { text: tema.nome, append: append, color: ColorScheme.classes[tema.ordem] }
      })
    }
  }
}
</script>

<style scoped>

  .bold {
    font-weight: 700
  }

  .italic {
    font-style: italic
  }

  .uppercase {
    text-transform: uppercase
  }

  .lowercase {
    text-transform: lowercase
  }

</style>
