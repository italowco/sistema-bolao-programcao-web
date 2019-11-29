<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar Rodada {{numero}}</p>
      </header>
      <section class="modal-card-body">
        <div class="card-content">
          <div class="content">
            <div class="columns">
              <div class="column">
                <b-field label="Serie da Rodada">
                  <b-select placeholder="Country" icon="earth" v-model="divisao">
                    <option value="a">Serie A</option>
                    <option value="b">Serie B</option>
                  </b-select>
                </b-field>
                <b-field label="Valor das apostas">
                  <b-numberinput v-model="valor_bilhete"></b-numberinput>
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-input placeholder="Nª da Rodada correspondente" v-model="numero" ></b-input>
                  <p class="control">
                    <span class="button is-static">ª Rodada</span>
                  </p>
                </b-field>
                <b-field>
                  <b-input placeholder="Nª da Rodada correspondente" v-model="valor" ></b-input>
                  <p class="control">
                    <span class="button is-static">Valor inicial</span>
                  </p>
                </b-field>
                <b-field>
                  <b-input placeholder="0" v-model="lucro" ></b-input>
                  <p class="control">
                    <span class="button is-static">% de lucro da casa</span>
                  </p>
                </b-field>
                <b-field>
                  <b-input placeholder="Valor" v-model="comissao" ></b-input>
                  <p class="control">
                    <span class="button is-static">% de comissão do vendedor</span>
                  </p>
                </b-field>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <section>
              <b-field label="Hora de encerramento">
                <b-timepicker v-model="hora"
                              placeholder="Clique para selecionar" editable >
                </b-timepicker>
              </b-field>
            </section>
          </div>
          <div class="column">
            <b-field label="Data de encerramento das apostas">
              <b-datepicker v-model="dia"
                            placeholder="Clique aqui para selecionar..."
                            icon="calendar-today" editable>
              </b-datepicker>
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Fechar</button>
        <button class="button is-primary" type="button" @click="adicionarRodada">Editar</button>
        <b-button type="is-danger" @click="deleteModal = true">DeletarRodada</b-button>

      </footer>
    </div>
    <b-modal :active.sync="deleteModal">
      <DeleteRodadaModal :rodada="rodada"></DeleteRodadaModal>
    </b-modal>
  </form>

</template>

<script>
  import DeleteRodadaModal from '@/components/DeleteRodadaConfirm/DeleteRodadaModal'

  export default {
    name: "EditRodadaModal",
    props: ['rodada'],
    components: { DeleteRodadaModal },
    data() {
      return {
        hora: new Date(this.rodada.data_fim),
        dia: new Date(this.rodada.data_fim),
        numero: this.rodada.numero,
        divisao: this.rodada.divisao,
        valor: this.rodada.valor,
        valor_bilhete: this.rodada.valor_bilhete,
        lucro: this.rodada.lucro,
        deleteModal: false,
        comissao: this.rodada.comissao

      }
    },
    methods: {
      adicionarRodada() {
        this.$store.dispatch('rodada/edit', {
          numero: this.numero,
          data_fim: this.dataHora(),
          divisao: this.divisao,
          valor: this.valor,
          id: this.rodada.id,
          valor_bilhete: this.valor_bilhete,
          lucro: this.lucro,
          comissao: this.comissao
        }),
        this.$parent.close()
      },
      dataAtualFormatada(time){
        var data = new Date(time),
          dia  = data.getDate().toString(),
          diaF = (dia.length == 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length == 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
        return new Date(diaF+"/"+mesF+"/"+anoF);
      },
      dataHora() {
        return new Date(this.dia.setHours(this.hora.getHours(), this.hora.getMinutes()))
      }

    },
    mounted() {
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

  @media (max-width: 768px) {
    .modal-card-body {
      height: 280px;
    }
  }

</style>
