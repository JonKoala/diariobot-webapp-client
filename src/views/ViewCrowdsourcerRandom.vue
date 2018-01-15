<template>
</template>

<script>
import ApiService from '../common/api.service'

export default {
  name: 'ViewCrowdsourcerRandom',
  mounted() {
    ApiService.get('publicacoes/rand').then(publicacao => {
      this.$router.replace({name: 'crowdsourcer', params: {id: publicacao.id}});
    });
  }
}
</script>
