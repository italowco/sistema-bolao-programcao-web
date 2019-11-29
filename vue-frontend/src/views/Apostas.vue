<template>
<div>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="#">Serie A</a></li>
      <li class="is-active"><a href="#" aria-current="page">Rodada {{rodada.numero}}</a></li>
    </ul>
    <div class="columns">
      <div class="column is-2">
        <b-field label="Número da Rodada">
          <b-select placeholder="Selecione uma rodada" v-model="rodada" :loading="loading">
            <option v-for="rodada in rodadas()" :key="rodada.id" :value="rodada">{{rodada.numero}} Rodada</option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-2" >
        <button class="button is-primary"  :disabled="rodada.id == undefined || new Date(rodada.data_fim) < new Date() || rodada.finalizada" v-show="isLogged()"  @click="isModalActive = true">Criar Aposta</button>
      </div>
      <div class="column is-8">
        <b-message :type="[ rodada.finalizada || new Date(rodada.data_fim) < new Date() ? 'is-warning' : 'is-success'  ]">
          <span :class="[rodada.finalizada || new Date(rodada.data_fim) < new Date() ? 'finalizada' : 'aberta'  ]"> <b>{{ rodada.finalizada || new Date(rodada.data_fim) < new Date() ? ' Rodada finalizada' : ' Rodada aberta'  }}</b></span>
          <b> - Finalização:</b> {{ new Date(rodada.data_fim) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
        </b-message>
      </div>
    </div>
  </nav>


  <b-collapse class="card" aria-id="contentIdForA11y3" >
    <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3">
      <p class="card-header-title">
        Bilhetes | Total de apostadores: {{$store.state.apostas.all.length}} | Valor prêmio: R$ {{ ($store.state.apostas.all.length * (rodada.valor_bilhete * (1 - parseFloat(rodada.lucro)/100))) < parseFloat(rodada.valor) ? rodada.valor : ($store.state.apostas.all.length * (rodada.valor_bilhete * (1 - rodada.lucro/100))).toFixed(2) }}

      </p>
      <a class="card-header-icon">
        <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
        </b-icon>
      </a>

    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>ID</th>
            <th>Bilhete</th>
            <th>1° Jogo</th>
            <th>2° Jogo</th>
            <th>3° Jogo</th>
            <th>4° Jogo</th>
            <th>5° Jogo</th>
            <th>6° Jogo</th>
            <th>7° Jogo</th>
            <th>8° Jogo</th>
            <th>9° Jogo</th>
            <th>10° Jogo</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(folha) in $store.state.apostas.all" :key="folha.id">
            <td><a @click=" e => deleteAposta(folha, e)">#{{folha.id}}</a></td>
            <td><a @click=" e => deleteAposta(folha, e)">{{folha.numero}}</a></td>
            <td v-for="jogo in folha.bilhetes">
              <a @click="showModalVoucher(folha)" class="times is-gapless jogos">
                <div class="partida-column">
                  <b-tooltip :label="jogo.partida.mandante.name" type="is-white">
                    <div class=" image is-24x24 " :class="[ jogo.resultado == jogo.partida.mandante.sigla ? 'selected' : '', jogo.partida.mandante.sigla]">
                    </div>
                  </b-tooltip>
                </div>
                <div class="partida-column">
                  <div class="image is-24x24 empate" :class="[ jogo.resultado == 'empate' ? 'selected' : '']"></div>
                </div>
                <div class="partida-column" >
                  <b-tooltip :label="jogo.partida.visitante.name"  type="is-white">
                    <div  class=" image is-24x24" :class="[  jogo.resultado == jogo.partida.visitante.sigla ? 'selected' : '', jogo.partida.visitante.sigla ]">
                    </div>
                  </b-tooltip>
                </div>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </b-collapse>
  <b-collapse class="card" aria-id="contentIdForA11y3" >
    <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3">
      <p class="card-header-title">
        Vencedores
      </p>
      <a class="card-header-icon">
        <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
        </b-icon>
      </a>

    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Jogos</th>
            <th>1° Jogo</th>
            <th>2° Jogo</th>
            <th>3° Jogo</th>
            <th>4° Jogo</th>
            <th>5° Jogo</th>
            <th>6° Jogo</th>
            <th>7° Jogo</th>
            <th>8° Jogo</th>
            <th>9° Jogo</th>
            <th>10° Jogo</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Resultados</td>
            <td v-for="partida in partidas" :key="partida.id" class="jogos-coluna">
              <div  class="times is-gapless jogos">
                <div class="partida-column">
                  <b-tooltip :label="partida.mandante.name" type="is-white">
                    <div class=" image is-24x24 " :class="[ partida.resultado == partida.mandante.sigla ? 'selected' : '', partida.mandante.sigla]">
                    </div>
                  </b-tooltip>


                </div>
                <div class="partida-column">
                  <div class="image is-24x24 empate" :class="[ partida.resultado == 'empate' ? 'selected' : '']"></div>
                </div>
                <div class="partida-column" >
                  <b-tooltip :label="partida.visitante.name"  type="is-white">
                    <div  class=" image is-24x24" :class="[  partida.resultado == partida.visitante.sigla ? 'selected' : '', partida.visitante.sigla ]">
                    </div>
                  </b-tooltip>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>ID</th>
            <th>Posição</th>
            <th>Bilhete</th>

            <th>Número de acertos</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(jogo, index) in vencedores()">
              <td><b>#{{jogo.id}}</b></td>
              <td><b>{{index + 1}}</b></td>
              <td>{{jogo.numero}}</td>
              <td>{{jogo.pontos}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </b-collapse>

  <b-modal :active.sync="isModalActive" >
    <ApostaModal :rodada="rodada" ></ApostaModal>
  </b-modal>
  <b-modal :active.sync="isDeleteConfirm" >
    <DeleteBilheteConfirm :bilhete="selecionada" ></DeleteBilheteConfirm>
  </b-modal>
    <b-modal :active.sync="showVoucher" >
      <ApostaVoucherModal :bilhete="selecionada" ></ApostaVoucherModal>
    </b-modal>
  </div>
</template>
<script>
import ApostaModal from "@/components/ApostaModal";
import DeleteBilheteConfirm from "@/components/DeleteBilheteConfirm";
import BField from "buefy/src/components/field/Field";
import ApostaVoucherModal from '@/components/ApostaVoucher/ApostaVoucherModal'
import { rodadaService} from "../services/rodada.service";
import { mapGetters } from "vuex"

export default {
  components: { BField, ApostaModal, DeleteBilheteConfirm, ApostaVoucherModal },
  data() {
    return {
      isModalActive: false,
      isDeleteConfirm: false,
      showVoucher: false,
      columns: [
        {
          label: "Bilhete",
          field: "bilhete"
        }
      ],
      columns2: [
        {
          label: "Partida 1",
          field: "bilhete"
        }
      ],
      rodada: Object ,
      //numeroApostas: 0,
      apostas: [],
      resultados: [],
      ranking: [],
      partidas: [],
      bilhetes: [],
      selecionada: Number,
      loading: true
    };
  },
  methods: {
    rodadas() {
      return this.$store.state.rodada.all
    },
    isLogged() {
      return this.$store.state.auth.user
    },
    filterBilhetes(){

      return this.$store.state.bilhetes.all
    },
    vencedores(){
      if(this.rodada.finalizada){
        var x = []
        this.$store.state.apostas.all.forEach( aposta => {
          var rank = { id: aposta.id, numero: aposta.numero, pontos: 0 }
          aposta.bilhetes.forEach( (jogo, index) => {
            if(this.partidas[index].resultado !== undefined) {
              if (this.partidas[index].resultado == jogo.resultado) {
                rank.pontos++
              }
            }
          })
          x.push(rank)
        })
        return x.sort( (a,b) => a.pontos < b.pontos ? 1 : -1 )
      }
      return []

    },
    deleteAposta(bilhete, e){
      if(this.isLogged()){
        this.selecionada = bilhete
        this.isDeleteConfirm = true
      }
    },
    showModalVoucher(folha){
      this.selecionada = folha
      this.showVoucher = true
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    getApostas () {
      if(this.rodada.hasOwnProperty("ïd")){
        return this.$store.getters['bilhetes/bilhetesDaRodada'](this.rodada.id)
      } else {
        return null
      }
    },
    todasPartidas(){
      if(this.rodada.hasOwnProperty("ïd")){
        return this.$store.getters['partidas/partidasProntas'](this.rodada.id)
      } else {
        return null
      }
    },
    numeroApostasDaRodada(){
      if(this.rodada.hasOwnProperty("ïd")){
        return this.$store.getters['bilhetes/numeroBilhetesPorRodada'](this.rodada.id)
      } else {
        return null
      }
    },
    ...mapGetters({
      numerosApostas: 'apostas/numeroBilhetesPorRodada'
    }),
    numeroApostas(){
      return this.numerosApostas(this.id)
    }

  },
  watch: {
    rodada: function() {
      this.$store.dispatch('apostas/byRodada', this.rodada.id)
      this.partidas = this.$store.getters['partidas/partidasProntas'](this.rodada.id)
    },
    isDeleteConfirm: (newValue, oldVale) => {
      if(oldVale == true){
        this.$store.dispatch('apostas/byRodada', this.rodada.id)
      }
    },
    isModalActive: (newValue, oldVale) => {
      if(oldVale == true){
        this.$store.dispatch('apostas/byRodada', this.rodada.id)
      }
    }
  },
  beforeCreate() {
      rodadaService.getRodadas().then((response) => {
          setTimeout(() => {
              this.loading = false
              this.rodada = response[response.length - 1]
              this.partidas = this.$store.getters['partidas/partidasProntas'](this.rodada.id)
              this.$store.dispatch('apostas/byRodada', this.rodada.id)
          }, 1000)
      })
  }
}
</script>
<style scoped>
  .jogos {
    display: flex;
  }
  .separador {
    padding: 0;
  }

  .times {
    margin-bottom: 0.5em !important;
    flex-direction: row;
    display: flex;
    width: 80px;
  }

  .b-radio.radio + .radio {
    margin-left: 0;
  }

  .partida-column {
    width: 24px;
    height: 24px;
    padding: 0;
    margin-right: 2px;
    flex-direction: column;
  }

  .jogos {
    width: 84px;
  }

  .jogos-coluna {
    width: 100px;
  }

  .selected {
    border-radius: 50%;
    border-style: solid;
    border-color: #00d1b2;
    width: 26px;
    height: 26px;
  }

  .card-content {
    overflow-x: overlay;
  }

  .finalizada {
    color: darkorange;
  }

  .aberta {
    color: lawngreen;
  }
</style>
