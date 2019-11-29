<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Deletar bilhete #{{bilhete.id}}</p>
      </header>
      <section class="modal-card-body">
        <div class="card-content">
          <div class="content">
            Tem certeza que deseja cancelar a aposta?
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
    name: "DeleteBilheteConfirm",
    props: ['bilhete'],
    methods: {
      confirmarDelete(){
        this.$store.dispatch('apostas/deleteAposta', this.bilhete)
        this.$parent.close()

      }
    }
  }
</script>

<style scoped>

</style>
