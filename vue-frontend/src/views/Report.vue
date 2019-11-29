<template>
  <div class="container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#">Apostas</a></li>
      <li class="is-active"><a href="#" aria-current="page">Rodadas</a></li>
    </ul>
    <div class="columns">
      <div class="column is-3">
        <button class="button is-primary" type="button" @click="isModalActive = true">Adicionar Rodada</button>
      </div>
      <div class="column">
        <span class="label">Filtro de rodadas</span>
        <div class="">
          <b-radio v-model="filtro"
                   :native-value="true">
            Fechada
          </b-radio>
          <b-radio v-model="filtro"
                   :native-value="false">
            Aberta
          </b-radio>
        </div>
      </div>
    </div>
  </nav>
    <b-tabs v-model="activeTab">
    <b-tab-item label="Rodadas">
      <div>

        <div class="dashboard-content columns is-multiline">
          <div v-for="(rodada, index) in rodadas()" :v-show="$store.state.rodadas" :key="index" class="column is-4">
            <reportItem :rodada='rodada'></reportItem>
          </div>
        </div>


        <b-modal :active.sync="isModalActive">
          <AddRodadaModal></AddRodadaModal>
        </b-modal>
        <b-modal :active.sync="isFinalizarModalActive">
          <FinalizarRodadaModal></FinalizarRodadaModal>
        </b-modal>

      </div>
    </b-tab-item>
    <b-tab-item label="Financeiro">
      <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th><abbr title="Identificador">ID</abbr></th>
            <th><abbr title="N da Rodada">Rodada</abbr></th>
            <th><abbr title="Quantidade de apostas">Jogos feitos</abbr></th>
            <th><abbr title="Valor total">Total acumulado</abbr></th>
            <th><abbr title="Lucro da casa">Acumulado da Casa</abbr></th>
            <th><abbr title="Valor inicial da rodada">Valor Inicial</abbr></th>
            <th><abbr title="Valor a pagar">A pagar</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rodada) in rodadas()" >
            <td># {{rodada.id}}</td>
            <td>{{rodada.numero}}</td>
            <td>{{qtdBilhetes(rodada)}}</td>
            <td>R$ {{(qtdBilhetes(rodada) * rodada.valor_bilhete).toFixed(2)}}</td>
            <td>R$ {{(qtdBilhetes(rodada) * (rodada.valor_bilhete * (rodada.lucro / 100))).toFixed(2)}}</td>
            <td>R$ {{parseFloat(rodada.valor).toFixed(2)}}</td>
            <td>R$ {{valorAPagar(rodada)}}</td>
          </tr>
        </tbody>
      </table>
    </b-tab-item>
  </b-tabs>
  </div>
</template>
<script>
import ReportItem from '@/components/ReportItem'
import AddRodadaModal from '@/components/AddRodadaModal'
import FinalizarRodadaModal from '@/components/FinalizarRodadaModal'
import { mapGetters } from 'vuex'



export default {
  components: { ReportItem, AddRodadaModal, FinalizarRodadaModal },
  data() {
    return {
      isModalActive: false,
      isFinalizarModalActive: false,
      filtro: false,
      activeTab: 0
    }
  },
  methods: {
    resolveReport(e) {
        this.$store.dispatch('removeReport', e)
    },
    rodadas () {
      if(this.$store.state.rodada.all.length > 0) {
        return this.$store.state.rodada.all.filter(r => r.finalizada == this.filtro)
      }


    },
    isLogged() {
      return this.$store.state.auth.user.user.profile == 2
    },
    qtdBilhetes(rodada){
      return this.$store.state.apostas.all.filter( a => rodada.id == a.rodada_id ).length
    },
    valorAPagar(rodada){
      var acumulado = this.qtdBilhetes(rodada) * (rodada.valor_bilhete * (1 - rodada.lucro / 100))
      return acumulado > rodada.valor ? acumulado.toFixed(2) : parseFloat(rodada.valor).toFixed(2)
    }

  },
  computed: {
    ...mapGetters({
      bilhetes: 'bilhetes/numeroBilhetesPorRodada',
      apostas: 'bilhetes/bilhetesDaRodada'
    })
  },
  created() {
    this.$store.dispatch('apostas/getAll')
    this.$store.dispatch('rodada/getAll')
    this.$store.dispatch('bilhetes/getAll')

  }

}
</script>
<style scoped>

</style>
