<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Rodada {{rodada.numero}} | ID: #{{rodada.id}}
            </p>
            <span class="card-header-title" :class="[rodada.finalizada ? 'finalizada' : 'aberta' ]">Status: {{ rodada.finalizada ?  "Fechada" : "Aberta"}}</span>
        </header>
        <div class="card-content">
            <div class="content">
             <span>Valor inicial: R$ {{rodada.valor}}</span><br/>
              <span>Quantidade de apostas feitas: {{numeroApostas(this.rodada.id)}}</span><br/>
              <span>Valor acumulado: R$ {{numeroApostas(this.rodada.id) * this.rodada.valor_bilhete}}</span><br/>
              <span>Comissao por aposta: R$ {{this.rodada.valor * (this.rodada.comissao/100)}}</span>
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item is-success" @click="isModalActive = true">Jogos</a>
            <a class="card-footer-item is-danger" @click="openModal()">Editar Rodada</a>
            <a class="card-footer-item is-success" @click="finalizarModalActive = true">Inserir Resultados</a>
            <a class="card-footer-item is-success" @click="finalizarModal = true">Abrir/Fechar</a>
        </footer>
      <b-modal :active.sync="isModalActive">
        <PartidasRodadaModal :rodada="rodada"></PartidasRodadaModal>
      </b-modal>
      <b-modal :active.sync="finalizarModalActive">
        <FinalizarRodadaModal :rodada="rodada"></FinalizarRodadaModal>
      </b-modal>

      <b-modal :active.sync="editRodadaActive">
        <EditRodadaModal :rodada="rodada"></EditRodadaModal>
      </b-modal>
      <b-modal :active.sync="finalizarModal">
        <FimRodadaModal :rodada="rodada"></FimRodadaModal>
      </b-modal>

      <b-modal :active.sync="deleteModal">
        <DeleteRodadaModal :rodada="rodada"></DeleteRodadaModal>
      </b-modal>
    </div>
</template>
<script>
import EditRodadaModal from '@/components/EditRodadaModal'
import PartidasRodadaModal from '@/components/PartidasRodadaModal'
import FinalizarRodadaModal from '@/components/FinalizarRodadaModal'
import FimRodadaModal from '@/components/FimRodadaModal'
import DeleteRodadaModal from '@/components/DeleteRodadaConfirm/DeleteRodadaModal'
import { mapGetters } from 'vuex'

import BModal from "buefy/src/components/modal/Modal"

export default {
    name: "reportItem",
    components: {BModal, EditRodadaModal, PartidasRodadaModal, FinalizarRodadaModal, FimRodadaModal, DeleteRodadaModal},
    props: ['rodada'],
    data() {
        return {
            isModalActive: false,
            partidasModalActive: false,
            finalizarModalActive: false,
            editRodadaActive: false,
            finalizarModal: false,
            deleteModal: false
        }
    },
    methods: {
        removeAposta(e) {
            this.$store.dispatch('removeReport', e)
        },
        valorAposta() {
          const valorTotal = this.aposta() * 10;
          return this.rodada.valor > valorTotal ? this.rodada.valor : valorTotal
        },
        openModal(){
          this.editRodadaActive = true
        },
        valordaAposta(){
          return this.numeroApostas(this.rodada)
        },
        qtdBilhetes(rodada){
          const bilhetes = [... new Set(this.apostas(rodada.id).map( ap => ap.numero))].sort()
          return bilhetes.length
        }

    },
    computed: {
      ...mapGetters({
        apostas: 'bilhetes/bilhetesDaRodada',
        numeroApostas: 'apostas/numeroApostasPorRodada'
      })
    }
}
</script>
<style>
  .finalizada {
    color: red;
  }
  .aberta {
    color: lawngreen;
  }
</style>
