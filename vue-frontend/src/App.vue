<template>
  <div>
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <h1> Bolão Maceió</h1>
        </a>
        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu"  id="navMenu">
        <div class="navbar-start">

          <div class="navbar-item">
            <router-link to="/">Serie A</router-link>
          </div>

          <div class="navbar-item" v-show="isAdmin()">
            <router-link to="/rodadas">Rodadas</router-link>
          </div>

          <div class="navbar-item" v-show="isAdmin()">
            <router-link to="/usuarios">Usuarios</router-link>
          </div>
          <div class="navbar-item" v-show="isAdmin()">
            <router-link to="/minhas-vendas">Minhas vendas</router-link>
          </div>
          <div class="navbar-item" v-show="isAdmin()">
            <router-link to="/vendas">Vendas</router-link>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item"  v-show="!isLogged()">
            <div class="buttons">
              <a class="button is-light"  @click="open()">
                Entrar
              </a>
            </div>
          </div>
          <div class="navbar-item" >
            <div class="buttons">
              <a class="button is-primary"  v-show="isLogged()" @click="logOut()">
                Sair
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class=" main-content">
        <div class="section">
            <router-view/>
        </div>
    </div>
    <b-modal :active.sync="loginModal" :on-cancel="close">
      <Login></Login>
    </b-modal>
  </div>
</template>
<script>
import Login from './views/Login'
import {mapState} from 'vuex'

export default {
  name: 'app',
  components: { Login },
  methods: {
    isAdmin() {
      if(this.$store.state.auth.user == undefined){
        return false
      }
      return this.$store.state.auth.user.profile > 1
    },
    logOut(){
      this.$store.dispatch('auth/logout')
      this.user = null
      this.$router.go()
    },
    open() {
      this.$store.dispatch('modal/open')
    },
    close() {
      this.$store.dispatch('modal/close')
    },
    isLogged() {
      return this.auth.user
    }

  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      loginModal: state => state.modal.loginModal
    })
  },

  beforeCreate() {
    this.$store.dispatch('teams/getAll')
    this.$store.dispatch('rodada/getAll')
    this.$store.dispatch('partidas/getAll')
    this.$store.dispatch('auth/getUser')


  },
  watch: {
    loginModal: function( newValue, oldValue) {
      if(oldValue == true){
        this.$router.go()
      }
    }
  }


}


</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #55948b;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$modal-content-width: 840px;

$table-cell-padding: 0.25em 0em;


$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
$menu-item-color: $white;
$menu-label-color: $white;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";


.sidemenu {
  background-color: $dark;
  height: auto;
}

.navbar-item > a {
  color: white;
}

.is-active > .navbar-start, .is-active > .navbar-end {
  background-color: $primary;
  padding: 0;

}

.FLU {
  background-image: url('../src/assets/times/fluminense.svg');
  background-size: cover;
  background-potition: center;
}

.FLA {
  background-image: url('../src/assets/times/Flamengo.svg');
  background-size: cover;
  background-potition: center;
}
.COR {
  background-image: url('../src/assets/times/corinthians.svg');
  background-size: cover;
  background-potition: center;
}

.CSA {
  background-image: url('../src/assets/times/csa.svg');
  background-size: cover;
  background-potition: center;
}

  .GRE {
    background-image: url('../src/assets/times/gre.svg');
    background-size: cover;
    background-potition: center;
  }

  .VSC {
    background-image: url('../src/assets/times/vasco.svg');
    background-size: cover;
    background-potition: center;
  }

  .INT {
    background-image: url('../src/assets/times/internacional.svg');
    background-size: cover;
    background-potition: center;
  }

  .GOI {
    background-image: url('../src/assets/times/Goias_SVG.svg');
    background-size: cover;
    background-potition: center;
  }

  .SAN {
    background-image: url('../src/assets/times/santos.svg');
    background-size: cover;
    background-potition: center;
  }

  .SAO {
    background-image: url('../src/assets/times/sao-paulo.svg');
    background-size: cover;
    background-potition: center;
  }

  .PAL {
    background-image: url('../src/assets/times/palmeiras.svg');
    background-size: cover;
    background-potition: center;
  }


.CRU {
  background-image: url('../src/assets/times/cruzeiro.svg');
  background-size: cover;
  background-potition: center;
}


.CHA {
  background-image: url('../src/assets/times/chapecoense.svg');
  background-size: cover;
  background-potition: center;
}


.BAH {
  background-image: url('../src/assets/times/bahia.svg');
  background-size: cover;
  background-potition: center;
}

.FOR {
  background-image: url('../src/assets/times/fortaleza.svg');
  background-size: cover;
  background-potition: center;
}

.AVA {
  background-image: url('../src/assets/times/avai-futebol-clube.svg');
  background-size: cover;
  background-potition: center;
}

.CAM {
  background-image: url('../src/assets/times/atletico-mg.svg');
  background-size: cover;
  background-potition: center;
}

.CEA {
  background-image: url('../src/assets/times/ceara.svg');
  background-size: cover;
  background-potition: center;
}

.CAP {
  background-image: url('../src/assets/times/Athletico_Paranaense.svg');
  background-size: cover;
  background-potition: center;
}

.FOR {
  background-image: url('../src/assets/times/fortaleza.svg');
  background-size: cover;
  background-potition: center;
}

.BOT {
  background-image: url('../src/assets/times/botafogo.svg');
  background-size: cover;
  background-potition: center;
}
.empate {
  background-image: url('../src/assets/cancel-music.svg');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
}



</style>
