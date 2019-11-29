<template>
    <form action="" class="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                Finalizaçao de rodada #{{rodada.numero}}
            </header>
            <section class="modal-card-body">
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline">
                            <article v-for="(partida, index) in partidas" :key="partida.id" class="message column is-half is-info">
                                <div class="message-header">
                                    {{index + 1}}ª da Rodada
                                </div>
                                <div class="message-body">
                                    <div class="columns is-2">
                                        <div class="column is-1">
                                            <span class="is-right">{{partida.mandante.sigla}}</span>
                                        </div>
                                        <div class="column is-4">
                                            <div href="#" :class="partida.mandante.sigla" class="image is-3by2 is-centered is-centered">

                                            </div>
                                        </div>
                                        <div class="column is-1"><p class="">X</p></div>
                                        <div class="column is-4">
                                            <div href="#"  :class="partida.visitante.sigla" class="image is-3by2 is-centered is-centered">

                                            </div>
                                        </div>
                                        <div class="column is-1">
                                            <span class="is-left">{{partida.visitante.sigla}}</span>
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <b-field>
                                        <b-radio-button
                                                v-model="aposta.resultado[index]"
                                                v-bind:native-value="partida.mandante.sigla"
                                                type="is-danger">

                                            Vencedor {{partida.mandante.sigla}}
                                        </b-radio-button>

                                        <b-radio-button
                                                v-model="aposta.resultado[index]"
                                                native-value="empate"
                                                type="is-success">
                                            <span>Empate</span>
                                        </b-radio-button>

                                        <b-radio-button
                                                v-model="aposta.resultado[index]"
                                                v-bind:native-value="partida.visitante.sigla">
                                            Vencedor {{partida.visitante.sigla}}
                                        </b-radio-button>
                                    </b-field>
                                </footer>
                            </article>
                        </div>
                    </div>

                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Fechar</button>
                <button class="button is-primary" type="button" @click="fecharRodada()">Finalizar</button>
            </footer>
        </div>
    </form>
</template>
<script>
  export default {
    name: 'apostaModal',
    props: ['rodada'],
    data() {
      return {
        aposta: {
          bilhete: null,
          resultado: []
        },

      }
    },
    methods: {
      fecharRodada() {
        var jogos = this.partidas
        var validation = true
        var resultados = jogos.map( (partida, index) => {
          if(this.aposta.resultado[index] == undefined) {
            validation = false
          }
          return {
            partida_id: partida.id,
            resultado: this.aposta.resultado[index]
          }

        })
        if(validation){
          resultados.forEach( r => this.$store.dispatch('partidas/edit', r))
          this.$store.dispatch('alert/success', "Rodada " + this.rodada.numero + " finalizada.")
          this.$store.dispatch('rodada/edit', {
            id: this.rodada.id,
            finalizada: true
          })
          this.$parent.close()
        } else {
          this.$store.dispatch('alert/error', "Escolha o resultado de cada partida antes de finalizar a rodada.")
        }

      }

    },
    computed: {
      escudo() {
        return require(this.timeCasa.escudo);
      },
      partidas() {
        return this.$store.getters['partidas/partidasProntas'](this.rodada.id)
      }
    }
  }
</script>

<style scoped>
    .FLU {
        background-image: url('../assets/times/fluminense.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .FLA {
        background-image: url('../assets/times/Flamengo.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }
    .COR {
        background-image: url('../assets/times/corinthians.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .CSA {
        background-image: url('../assets/times/csa.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .GRE {
        background-image: url('../assets/times/gre.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .VSC {
        background-image: url('../assets/times/vasco.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .INT {
        background-image: url('../assets/times/internacional.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .GOI {
        background-image: url('../assets/times/Goias_SVG.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .SAN {
        background-image: url('../assets/times/santos.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .SAO {
        background-image: url('../assets/times/sao-paulo.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .PAL {
        background-image: url('../assets/times/palmeiras.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }


    .CRU {
        background-image: url('../assets/times/cruzeiro.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }


    .CHA {
        background-image: url('../assets/times/chapecoense.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }


    .BAH {
        background-image: url('../assets/times/bahia.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .FOR {
        background-image: url('../assets/times/fortaleza.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }


    .AVA {
        background-image: url('../assets/times/avai-futebol-clube.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .CAM {
        background-image: url('../assets/times/atletico-mg.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .CEA {
        background-image: url('../assets/times/ceara.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .CAP {
        background-image: url('../assets/times/Athletico_Paranaense.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .FOR {
        background-image: url('../assets/times/fortaleza.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }

    .BOT {
        background-image: url('../assets/times/botafogo.svg');
        background-size: contain;
        background-potition: center;
        background-repeat: no-repeat;
    }
    @media (max-width: 768px) {
      .modal-card-body {
        height: 280px;
      }
    }
</style>
