<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Adicionar Rodada</p>
            </header>
            <section class="modal-card-body">
                <div class="card-content">
                    <div class="content">
                        <div class="columns">
                            <div class="column">
                                <b-field label="Serie da Rodada">
                                    <b-select placeholder="Escolha" icon="earth" v-model="divisao">
                                        <option value="a">Serie A</option>
                                    </b-select>
                                </b-field>
                                <b-field label="Valor da aposta (R$)">
                                  <b-numberinput v-model="valor_bilhete"></b-numberinput>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field>
                                    <b-input placeholder="Nª da Rodada" v-model="numero" ></b-input>
                                    <p class="control">
                                        <span class="button is-static">ª Rodada</span>
                                    </p>
                                </b-field>
                                <b-field>
                                    <b-input placeholder="Insira o valor" v-model="valor" ></b-input>
                                    <p class="control">
                                        <span class="button is-static">Valor inicial</span>
                                    </p>
                                </b-field>
                                <b-field>
                                  <b-input placeholder="Valor" v-model="lucro" ></b-input>
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
                                <b-timepicker v-model="time" editable
                                              placeholder="Clique para selecionar">


                                </b-timepicker>
                            </b-field>
                        </section>
                    </div>
                    <div class="column">
                        <b-field label="Data de encerramento das apostas">
                            <b-datepicker v-model="dia"
                                    placeholder="Clique aqui para selecionar..."
                                    icon="calendar-today" editable   >
                            </b-datepicker>
                        </b-field>
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

  export default {
    name: "AddRodadaModal",
    props: ['rodada'],
    data() {
      return {
        partidas: [],
        numero: null,
        divisao: null,
        time: new Date(),
        dia: new Date(),
        valor: null,
        valor_bilhete: number,
        lucro: null
      }
    },
    methods: {
      times() {
        return this.$store.state.teams.all.forEach( (time) => {
          time.isSelected = false
          time.divisao = 'a'
        });
      },
      addToPartida(){

      },

      adicionarRodada() {
        this.$store.dispatch('rodada/add', {
          resultado: [],
          numero: this.numero,
          finalizada: false,
          data_fim: this.dataHora(),
          divisao: this.divisao,
          valor: this.valor,
          lucro: this.lucro,
          valor_bilhete: this.valor_bilhete,
          comissao: this.comissao
        })

        this.$parent.close()
      },
      dataHora() {
        return new Date(this.dia.setHours(this.time.getHours(), this.time.getMinutes()))
      }

    },
    computed: {

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
