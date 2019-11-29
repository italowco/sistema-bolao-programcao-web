<template>
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="#">Financeiro</a></li>
                <li class="is-active"> Vendas<a href="#" aria-current="page"></a></li>
            </ul>
        </nav>
        <div class="">
            <b-field label="Vendas da Rodada">
                <b-select placeholder="Selecione uma rodada" v-model="rodada" @input="changeRodada($event)">
                    <option v-for="rodada in rodadas" :key="rodada.id" :value="rodada">{{rodada.numero}} Rodada</option>
                </b-select>
            </b-field>
        </div>
        <b-table :data="users" detailed :paginated="isPaginated"  per-page="10">
            <template slot-scope="props">
                <b-table-column field="id" label="ID"  width="40" :centered="isCentered" numeric>
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name" label="Nome">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="email" label="Email">
                    {{ props.row.email }}
                </b-table-column>
                <b-table-column label="Quantidade de Apostas" :centered="isCentered">
                    {{quantidadeApostas(props.row.id)}}
                </b-table-column>
                <b-table-column label="Total Vendido" :centered="isCentered">
                    R$ {{(valorTotal(props.row.id)).toFixed(2)}}
                </b-table-column>
                <b-table-column label="Comissão a pagar" :centered="isCentered">
                    R$ {{(valorTotal(props.row.id) * rodada.comissao/100).toFixed(2)}}
                </b-table-column>
            </template>

          <template slot="detail" slot-scope="props">
            <table class="table">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(aposta) in apostasPorVendedor(props.row.id)" :key="aposta.id">
                  <td>{{aposta.id}}</td>
                  <td>{{aposta.numero}}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </b-table>

    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "Vendas",
        data () {
            return {
                isPaginated: true,
                isCentered: true,
                tagClass: 'tag',
                rodada: Object
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
                apostas: state => state.apostas.all
            })
        },
        methods: {
            changeRodada (e) {
                this.$store.dispatch('apostas/byRodada', e.id)
                console.warn(this.rodada)
            },
            quantidadeApostas(userId) {
                if (this.rodada === undefined ) return 0
                const qtd = this.apostas.filter( ap => ap.user_id == userId ).length
                return qtd
            },
            apostasPorVendedor(userId) {
              if (this.rodada === undefined ) return 0
              const apostas = this.apostas.filter( ap => ap.user_id == userId )
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
