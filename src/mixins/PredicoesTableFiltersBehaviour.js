
export default {
  props: {
    tipos: { type: Array },
    orgaos: { type: Array },
    suborgaos: { type: Array },
    macrorregioes: { type: Array },
    classes: { type: Array }
  },
  data () {
    return {
      moneyMask: '############',

      startingDate: null,
      endingDate: null,
      valorMinimo: null,
      valorMaximo: null,
      corpo: null,
      tipo: null,
      orgao: null,
      suborgao: null,
      macrorregiao: null,
      classe: null
    };
  },
  methods: {
    unformatNumber (value) {
      return (value) ? Number(value) : null;
    }
  },
  computed: {
    filterArguments () {
      return {
        startingDate: this.startingDate,
        endingDate: this.endingDate,
        valorMinimo: this.unformatNumber(this.valorMinimo),
        valorMaximo: this.unformatNumber(this.valorMaximo),
        corpo: this.corpo,
        tipo: this.tipo,
        orgao: this.orgao,
        suborgao: this.suborgao,
        macrorregiao: this.macrorregiao,
        classe: this.classe
      }
    }
  },
  watch: {
    filterArguments (newValue) {
      this.$emit('filterChanged', this.filterArguments);
    }
  }
}
