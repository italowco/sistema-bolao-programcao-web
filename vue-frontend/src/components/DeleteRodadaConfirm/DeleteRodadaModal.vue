<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Deseja deletar a rodada {{rodada.numero}}</p>
      </header>
      <section class="modal-card-body">
        <div class="card-content">
          <div class="content">
            Deletando a rodada, você deletar todas as partidas e apostas feitas para esta rodada.
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancelar</button>
        <button class="button is-danger" type="button" @click="confirmarDelete()">Deletar</button>
      </footer>
    </div>
  </form>

</template>

<script>
  export default {
    name: "DeleteRodadaModal",
    props: ['rodada'],
    methods: {
      confirmarDelete(){
        this.$store.dispatch('rodada/delete', this.rodada.id)
        this.$parent.close()
        this.$parent.$parent.close()
      }
    }
  }
</script>

<style scoped>

</style>
