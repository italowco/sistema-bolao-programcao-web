<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Gerênciar partidas da Rodada {{rodada.numero}}</p>
            </header>

            <section class="modal-card-body">
                <p class="title is-6">Selecione dois Times</p>
                <b-tooltip label="Selecione dois times antes" position="is-right" type="is-white">
                    <a class="button is-outlined" @click="addPartida(selectedTeams)">Adicionar Partida</a>
                </b-tooltip>
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline is-1">
                            <a v-for="time in partidasFilter()" :key="time.id" class="column is-one-quarter time" :class="time.sigla"
                                v-show="!time.partida" @click="e => selecionarTime(time, e)">
                              {{time.sigla}}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="content">
                        <div class="partidas columns is-multiline">
                            <partida-component v-for="(partida, index) in partidasProntas" v-bind:partida="partida" v-bind:index="index" v-on:cancel-partida="cancelarPartida(partida)">
                            </partida-component>
                        </div>
                    </div>
                </div>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Fechar</button>
                <button class="button is-primary" type="button" @click="adicionarRodada">Finalizar</button>
            </footer>
        </div>
    </form>
</template>

<script>
  import PartidaComponent from './AddRodada/PartidaComponent'

  export default {
    name: "PartidasRodadaModal",
    components: {'partida-component': PartidaComponent},
    props: ['rodada'],
    data() {
      return {
        selectedTeams: [],
        timesSelecionados: [],
        numero: null,
        time: new Date(),
        valor: null,
        teams: []
      }
    },
    methods: {
      times() {
        return this.teams.forEach( (time) => {
          time.isSelected = false
        });
      },
      addToPartida(){

      },
      addPartida(teams = []) {
        if(this.partidas.length < 10 && this.selectedTeams.length == 2){
          teams[0].partida = true
          teams[1].partida = true
          const novaPartida = {
            mandante_id: teams[0].id,
            visitante_id: teams[1].id,
            rodada_id: this.rodada.id
          }
          this.selectedTeams.forEach( (t) => t.e.target.classList.remove('active'))
          this.$store.dispatch("partidas/add", novaPartida);

          this.selectedTeams = []
        } else if (this.partidas.length >= 10){
          this.$toast.open({
            message: 'O número máximo de partidas ja foi alcançado.',
            type: 'is-danger'
          })
        } else {
          this.$toast.open({
            message: 'Você precisa adicionar pelo menos mais ' + (2 - this.selectedTeams.length)  + ' time(s).'  ,
            type: 'is-danger'
          })
        }
      },
      selecionarTime(time, e) {
        if(time.isSelected){
          time.isSelected = false
          this.selectedTeams.splice(this.selectedTeams.findIndex(t => t.sigla === time.sigla), 1)
          e.target.classList.remove('active')
        } else if(this.selectedTeams.length < 2) {
          time.isSelected = true
          time.e = e
          e.target.classList.toggle('active')
          this.selectedTeams.push(time)
        }
      },
      partidasFilter() {
        return this.times.filter((time) => {
          //time.isSelected = true
          var jogando = this.partidasProntas.filter((partida) =>
            partida.visitante.id == time.id
            || partida.mandante.id == time.id )
          return jogando.length == 0
        })
      },
      timeJogando(time) {
        this.partidas.filter((partida) => partida.visitante.id == time.id
          || partida.mandante.id == time.id)
      },
      cancelarPartida(part){
        this.$store.dispatch("partidas/deletePartida", part)
        //dispatch('teams/')

      },
      adicionarRodada() {

        this.$parent.close()
      },
      adicionarPartida() {
        this.$store.getters.rodada.getLast()
      },

      partidas(){
        return this.$store.state.partidas.all
      },
    },
    computed: {
      partidasProntas() {
        return this.$store.getters['partidas/partidasProntas'](this.rodada.id)
      },
    },
    created() {
      this.times = this.$store.state.teams.all
    }
  }
</script>

<style scoped>
.modal-card {
    min-width: 80%;
}
.selected {
    border-style: dashed;
}

.time:hover {
  border-style: solid;
}

.time {
  height: 80px;
}

.active {
  border-style: solid;
}


.FLU {
    background-image: url('../assets/times/fluminense.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.FLA {
    background-image: url('../assets/times/Flamengo.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.COR {
    background-image: url('../assets/times/corinthians.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.CSA {
    background-image: url('../assets/times/csa.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.GRE {
    background-image: url('../assets/times/gre.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.VSC {
    background-image: url('../assets/times/vasco.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.INT {
    background-image: url('../assets/times/internacional.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.GOI {
    background-image: url('../assets/times/Goias_SVG.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.SAN {
    background-image: url('../assets/times/santos.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.SAO {
    background-image: url('../assets/times/sao-paulo.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.PAL {
    background-image: url('../assets/times/palmeiras.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}


.CRU {
    background-image: url('../assets/times/cruzeiro.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}


.CHA {
    background-image: url('../assets/times/chapecoense.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}


.BAH {
    background-image: url('../assets/times/bahia.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.FOR {
    background-image: url('../assets/times/fortaleza.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}


.AVA {
    background-image: url('../assets/times/avai-futebol-clube.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.CAM {
    background-image: url('../assets/times/atletico-mg.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.CEA {
    background-image: url('../assets/times/ceara.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.CAP {
    background-image: url('../assets/times/Athletico_Paranaense.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.FOR {
    background-image: url('../assets/times/fortaleza.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.BOT {
    background-image: url('../assets/times/botafogo.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}


</style>
