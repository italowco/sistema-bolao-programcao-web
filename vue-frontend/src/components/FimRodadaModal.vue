<template>
  <div class="modal-card">
    <header class="modal-card-head">
      Mudar estado da Rodada
    </header>
    <section class="modal-card-body">
      <b-message type="is-warning" has-icon>
        Ao fechar ou abrir uma rodada, verifique se a data de encerramento já foi ultrapassada, caso tenha sido ultrapassada não será possivel criar apostas independente do estado.
      </b-message>
      <div class="block">
        <b-radio v-model="finalizada"
                 native-value="false"
                 size="is-large">
                Abrir
        </b-radio>
        <b-radio v-model="finalizada"
                 native-value="true"
                  size="is-large">
                Fechar
        </b-radio>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Fechar</button>
      <button class="button is-primary" type="button" @click="alterarRodada()">Finalizar</button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "FinalizrRodadaModal",
    props: ['rodada'],
    data() {
      return {
        finalizada: this.rodada.finalizada
      }
    },
    methods: {
      alterarRodada(){
        this.$store.dispatch('rodada/edit', {
          id: this.rodada.id,
          finalizada: this.finalizada
        })
        this.$parent.close()
      }
    }
  }
</script>

<style scoped>
  @media (max-width: 768px) {
    .modal-card-body {
      height: 280px;
    }
  }
</style>
