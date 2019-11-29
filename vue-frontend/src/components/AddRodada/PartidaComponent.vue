<template>
    <article class="message column is-half is-info">
        <div class="message-header">
            {{index + 1}}ª da Rodada
            <b-tooltip label="Cancelar Partida" position="is-right" type="is-white">
                <a href="#" class="delete is-right" v-on:click="$emit('cancel-partida')"></a>
            </b-tooltip>
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
                <div class="column is-2"><p class="versus">X</p></div>
                <div class="column is-4">
                    <div href="#" :class="partida.visitante.sigla" class="image is-3by2 is-centered is-centered">

                    </div>
                </div>
                <div class="column is-1">
                    <span class="is-left">{{partida.visitante.sigla}}</span>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
  export default {
    name: "PartidaComponent",
    props: {
      partida: {
        mandante: {escudo: '', sigla: ''},
        visitante: {escudo: '', sigla: ''}

      },
      deletePartida: Function,
      index: Number
    },

  }
</script>

<style scoped>
    .versus {
      text-align: center;
      font-size: -webkit-xxx-large;
    }
    .FLA {
        background-image: url("../../assets/times/Flamengo.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }
    .FLU {
        background-image: url("../../assets/times/fluminense.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }
    .CEA {
        background-image: url("../../assets/times/ceara.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .COR {
        background-image: url('../../assets/times/corinthians.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .CSA {
        background-image: url('../../assets/times/csa.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .GRE {
        background-image: url('../../assets/times/gre.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .VSC {
        background-image: url('../../assets/times/vasco.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .INT {
        background-image: url('../../assets/times/internacional.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .GOI {
        background-image: url('../../assets/times/Goias_SVG.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .SAN {
        background-image: url('../../assets/times/santos.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .SAO {
        background-image: url('../../assets/times/sao-paulo.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .PAL {
        background-image: url('../../assets/times/palmeiras.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }


    .CRU {
        background-image: url('../../assets/times/cruzeiro.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }


    .CHA {
        background-image: url('../../assets/times/chapecoense.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }


    .BAH {
        background-image: url('../../assets/times/bahia.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .FOR {
        background-image: url('../../assets/times/fortaleza.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .AVA {
        background-image: url('../../assets/times/avai-futebol-clube.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .CAM {
        background-image: url('../../assets/times/atletico-mg.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .CAP {
        background-image: url('../../assets/times/Athletico_Paranaense.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .FOR {
        background-image: url('../../assets/times/fortaleza.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }

    .BOT {
        background-image: url('../../assets/times/botafogo.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center
    }


</style>