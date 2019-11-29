<template>
  <div class="modal-card is-mobile" style="width: auto">
    <header class="modal-card-head">
      <h1 class="title">Bilhete #{{bilhete.id}} | {{bilhete.numero}}</h1>
    </header>
    <section class="modal-card-body">
      <div class="card-content">
        <div class="columns is-multiline is-mobile">
          <div class="column is-half" v-for=" (jogo,index) in bilhete.bilhetes" :key="jogo.id">
            <span class="has-text-centered has-text-weight-bold">Jogo {{index + 1}}</span>
            <div class="jogos">
              <div class="partida-column">
                <b-tooltip :label="jogo.partida.mandante.name" type="is-white">
                  <div class="image is-24x24 " :class="[ jogo.resultado == jogo.partida.mandante.sigla ? 'selected' : '', jogo.partida.mandante.sigla]">
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
            </div>
         </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Fechar</button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "ApostaVoucherModal",
    props: ['bilhete']
  }
</script>

<style scoped>
  .jogos {
    display: flex;
    padding-right: 12px;
    padding-left: 12px;
    align-content: center;
    align-items: center;
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
    align-items: center;
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

  .column {
    align-content: center;
    align-items: center;
    display: flex;
  }
</style>
