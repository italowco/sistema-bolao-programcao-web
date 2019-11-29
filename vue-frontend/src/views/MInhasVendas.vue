<template>
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="#">Financeiro</a></li>
                <li class="is-active"> Vendas<a href="#" aria-current="page"></a></li>
            </ul>
        </nav>
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-content">
                <b-field label="Vendas por Rodada">
                  <b-select placeholder="Selecione uma rodada" v-model="rodada" @input="changeRodada($event)">
                    <option v-for="rodada in rodadas" :key="rodada.id" :value="rodada">{{rodada.numero}} Rodada</option>
                  </b-select>
                </b-field>
                <section label="Bilhetes">
                  <b-table :data="minhasApostas()" :paginated="isPaginated"  per-page="10">
                    <template slot-scope="props">
                      <b-table-column field="id" label="ID"  width="40" :centered="isCentered" numeric>
                        {{ props.row.id }}
                      </b-table-column>
                      <b-table-column field="name" label="Nome">
                        {{ props.row.numero }}
                      </b-table-column>
                    </template>
                  </b-table>
                </section>
              </div>
            </div>
          </div>
          <div class="column">
            <section>
              <h4 class="title is-6">Dados da Rodada</h4>
              <div class="columns is-multiline">
                <div class="column is-half">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        Rodada {{this.rodada.numero}}
                      </p>
                    </header>
                    <div class="card-content">
                      <div class="media-content">
                        <p class="title is-5">
                          Total de apostas
                        </p>
                        <p class="subtitle is-6">
                          {{apostas.length}}
                        </p>
                        <p class="title is-5">
                          Valor por aposta
                        </p>
                        <p class="subtitle is-6">
                          R$ {{valorDaRodada}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        Suas vendas
                      </p>
                    </header>
                    <div class="card-content">
                      <div class="media-content">
                        <p class="title is-5">
                          Feitas por você
                        </p>
                        <p class="subtitle is-6">
                          {{quantidadeApostas()}}
                        </p>
                        <p class="title is-5">
                          Total em reais vendido
                        </p>
                        <p class="subtitle is-6">
                          R$ {{quantidadeApostas() * valorDaRodada}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "MinhasVendas",
        data () {
            return {
                isPaginated: true,
                isCentered: true,
                tagClass: 'tag',
                rodada: ''
            }
        },
        beforeCreate() {
            this.$store.dispatch('usuarios/getAll')
            this.$store.dispatch('apostas/getAll')
        },
        computed: {
            ...mapState({
                users: state => state.usuarios.all,
                rodadas: state => state.rodada.all,
                apostas: state => state.apostas.all,
                user: state => state.auth.user
            }),
            valorDaRodada () {
              if (this.rodada.valor_bilhete !== null) {
                return this.rodada.valor_bilhete
              }
              return 0

            }
        },
        methods: {
            changeRodada (e) {
                this.$store.dispatch('apostas/byRodada', e.id)
            },
            quantidadeApostas() {
                return this.minhasApostas().length
            },
            minhasApostas() {
                if (this.rodada === undefined ) return 0
                const apostas = this.apostas.filter( ap => ap.user_id == this.user.id )
                return apostas
            },
            valorTotal(userId) {
                const qtd = this.quantidadeApostas(userId)
                if(this.rodada.valor_bilhete === undefined) return 0
                return qtd * this.rodada.valor_bilhete
            }
        }
    }
</script>

<style scoped>

</style>
