<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Rodada {{rodada.rodada}}</p>
            </header>
            <section class="modal-card-body">
                <p class="title is-6">Partidas</p>
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline">
                            <article v-for="(partida, index) in rodada.partidas" class="message column is-half is-info">
                                <div class="message-header">
                                    {{index + 1}}ª da Rodada
                                </div>
                                <div class="message-body">
                                    <div class="columns is-2">
                                        <div class="column is-1">
                                            <span class="is-right">{{partida.mandante.sigla}}</span>
                                        </div>
                                        <div class="column is-4">
                                            <div href="#" class="image is-3by2 is-centered is-centered">
                                                <img :src="partida.mandante.escudo">
                                            </div>
                                        </div>
                                        <div class="column is-1"><p class="">X</p></div>
                                        <div class="column is-4">
                                            <div href="#" class="image is-3by2 is-centered is-centered">
                                                <img :src="partida.visitante.escudo">
                                            </div>
                                        </div>
                                        <div class="column is-1">
                                            <span class="is-left">{{partida.visitante.sigla}}</span>
                                        </div>
                                    </div>
                                </div>
                                <footer>
                                    <b-field>
                                        <b-radio-button v-model="resultado.gabarito[index]"
                                                        v-bind:native-value="partida.mandante.sigla"
                                                        type="is-danger">

                                            Vencedor {{partida.mandante.sigla}}
                                        </b-radio-button>

                                        <b-radio-button v-model="resultado.gabarito[index]"
                                                        native-value="empate"
                                                        type="is-success">
                                            <span>Empate</span>
                                        </b-radio-button>

                                        <b-radio-button v-model="resultado.gabarito[index]"
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
                <button class="button is-primary" type="button" @click="encerrarRodada()">Encerrar</button>
            </footer>
        </div>
    </form>
</template>
<script>
export default {
    name: 'rodadaModal',
    props: ['rodada'],
    data() {
        return {
            aposta: {
                rodada: Number,
                bilhete: null,
                partidas: []
            },
            resultado: {
                rodada: Number,
                gabarito: []
            },
            partida: Object
        }
    },
    methods: {
        doctors() {
            return this.$store.state.doctors
        },
        doctorsByService() {
            return this.$store.state.doctors.reduce(function(rv, x) {
                (rv[x['service']] = rv[x['service']] || []).push(x)
                return rv
            }, {})
        },
        signTo(e) {
            this.$store.dispatch('removeReport', e)
            this.$parent.close()
        },
        user() {
          return this.$store.user;
        },
        encerrarRodada() {
          console.log(this.resultado)
          //return this.$store.state.gabarito.push(this.resultado)
        }
    }
}
</script>

