<template>
  <v-card>
    <v-toolbar color="blue" dense card>
      <v-toolbar-title class="white--text">SOBRE O DIARIOBOT</v-toolbar-title>
    </v-toolbar>
    <div class="pa-2 blue-grey--text text--darken-3">
      <p>
        O <span class="bold uppercase">diariobot</span> é um robô que coleta publicações do
        <a href="http://ioes.dio.es.gov.br/portal/visualizacoes/diario_oficial" target="_blank" class="uppercase">Diário Oficial do Espírito Santo</a>
        e aplica técnicas de
        <a href="https://pt.wikipedia.org/wiki/Aprendizado_de_m%C3%A1quina" target="_blank" class="italic">machine learning</a>
        a fim de tentar prever a qual tema essa publicação pertence, de acordo com as especialidades das unidades técnicas do TCE-ES.
      </p>

      <v-divider class="mb-3"></v-divider>

      <p>
        Desenvolvido inicialmente no NTI (Núcleo de Tecnologia da Informação),
        o projeto atualmente está disponível a toda a Corte e conta com algoritmos que aprendem como um humano classificaria a temática das publicações,
        entre:
        <template v-for="tema in temas">
          <span class="px-1 lowercase white--text" v-bind:style="{backgroundColor: tema.color}">{{ tema.text }}</span>{{ tema.append }}
        </template>
        Assim,
        além de obter informações já oferecidas pelo próprio Diário Oficial,
        como o Tipo (contrato, licitação...),
        o Órgão e o Jurisdicionado que fez a publicação,
        o <span class="bold uppercase">diariobot</span> é capaz de analisar o conteúdo das publicações e atribuir temas por meio de técnicas de
        <a href="https://pt.wikipedia.org/wiki/Processamento_de_linguagem_natural" target="_blank">processamento de linguagem natural</a>.
      </p>

      <p class="mb-0">
        Atualmente o <span class="bold uppercase">diariobot</span> acerta em torno de 80% das vezes,
        mas estamos trabalhando para melhorar seu desempenho e trazer publicações de outros diários.
      </p>
    </div>
  </v-card>
</template>

<script>
import ColorScheme from 'services/color.scheme'

export default {
  name: 'AppInformativoDialogContent',
  computed: {
    temas () {
      return this.$store.getters['classes']
      .sort((a, b) => { return a.ordem - b.ordem })
      .map((classe, index, original) => {
        let append = '.'
        if (index < original.length - 2)
          append = ', '
        else if (index == original.length - 2)
          append = ' e '

        return { text: classe.nome, append: append, color: ColorScheme.classes[classe.ordem] }
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
