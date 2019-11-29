<template>
    <form action="" class="">
        <div class="modal-card is-mobile" style="width: auto">
            <header class="modal-card-head">
                Nova Aposta para Rodada {{rodada.numero}}
            </header>
            <section class="modal-card-body">
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-mobile">

                            <div class="column is-half">
                                <b-field label="Nome do bilhete">
                                    <b-input placeholder="0000" v-model="aposta.bilhete"
                                             icon="credit-card">
                                    </b-input>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns  is-multiline">
                            <article v-for="(partida, index) in partidas" :key="partida.id" class="message column is-12-desktop is-info">
                                <div class="message-header">
                                    {{index + 1}}ª da Rodada
                                </div>
                                <div class="message-body content-center">
                                    <div class="columns is-mobile is-2">
                                        <div class="column is-1">
                                            <span class="is-right">{{partida.mandante.sigla}}</span>
                                        </div>
                                        <div class="column is-4">
                                            <div href="#" :class="partida.mandante.sigla" class="image is-3by2 is-centered is-centered">

                                            </div>
                                        </div>
                                        <div class="column is-2 versus"><p class="">X</p></div>
                                        <div class="column is-4">
                                            <div href="#"  :class="partida.visitante.sigla" class="image is-3by2 is-centered is-centered">

                                            </div>
                                        </div>
                                        <div class="column is-1">
                                            <span class="is-left">{{partida.visitante.sigla}}</span>
                                        </div>
                                    </div>
                                </div>
                                <footer class="content-center">
                                    <b-field class="content-center">
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
                <button class="button is-primary" type="button" @click="criarAposta()">Adicionar</button>
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
        }
      }
    },
    methods: {
        times() {
            return this.$store.state.teams.all
        },
        signTo(e) {
            this.$store.dispatch('removeReport', e)
            this.$parent.close()
        },
      rodadas() {
          return this.$store.state.rodada.all
      },
      criarAposta() {

        var jogos = this.partidas
        var validateBilhete = true

        //Criar aposta_folha
        var aposta_folha = {
            numero: this.aposta.bilhete,
            rodada_id: this.rodada.id,
            user_id:  this.$store.state.auth.user.id
        }

        var bilhetes = jogos.map( (partida, index) => {
            if(this.aposta.resultado[index] == undefined){
                validateBilhete = false
            }
            return {
                rodada_id: this.rodada.id,
                numero: this.aposta.bilhete,
                partida_id: partida.id,
                resultado: this.aposta.resultado[index],
                bilhete_id: aposta_folha.id
            }
        })

        if(this.aposta.bilhete == null) {
          this.$store.dispatch('alert/error', "Adicione um número ao bilhete.");
          return;
        }

        if(this.apostas.find( ap => ap.numero == this.aposta.bilhete)){
            this.$store.dispatch('alert/error', "Você já cadastrou um bilhete com esse número.");
            return;
        }

        if(validateBilhete) {
            //console.warn(bilhetes)
            this.$store.dispatch('apostas/createApostaEBilhete', { aposta: aposta_folha, bilhetes: bilhetes})
            this.$store.dispatch('alert/success', "O bilhete #" + this.aposta.bilhete + " foi criado com sucesso!");
            //this.$store.dispatch('apostas/byRodada', this.rodada.id);
            this.$parent.close()
        } else {
            console.warn("Bilhete errado")
            this.$store.dispatch('alert/error', "Você nao preencheu a cartela toda.");
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
    },
    created() {
        this.apostas = this.$store.getters['bilhetes/bilhetesDaRodada'](this.rodada.id)
    }
}
</script>

<style scoped>

    .content-center {
      justify-content: center;
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

    .versus {
      text-align: center;
      font-size: 30px;
    }

    @media (max-width: 768px) {
      .modal-card-body {
        height: 280px;
      }
    }


</style>
