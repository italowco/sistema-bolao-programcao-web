<template>
    <tr v-for="aposta in apostas()">
        <td>{{aposta.bilhete}}</td>
        <td v-for="partida in aposta.partidas">
            <div class="columns">
                <div class="column is-5">
                    <div href="#" class="image is-24x24 is-centered">
                        <img :src="partida.mandante.escudo">
                    </div>
                </div>
                <div class="column">x</div>
                <div class="column is-5">
                    <div href="#" class="image is-24x24 is-centered">
                        <img :src="partida.visitante.escudo">
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
  export default {
    name: "PartidasApostas",
    props: ['rodada'],
    props: {
      apostas: []
    },
    created(){
      this.$store.getters['partidas/partidasProntas'](this.rodada.id)
    }
  }
</script>

<style scoped>

</style>