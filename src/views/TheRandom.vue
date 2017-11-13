<template>
    <p>nada</p>
</template>

<script>
import ApiService from '../common/api.service'
import PublicacaoViewer from '../components/publicacaoViewer'

export default {
  name: 'TheRandom',
  mounted() {
    ApiService.get('publicacoes/rand').then(publicacao => {
      this.$router.replace({name: 'classifier', params: {id: publicacao.id}});
    });
  }
}
</script>
