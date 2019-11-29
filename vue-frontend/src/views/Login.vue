<template>
    <form action=""  @submit.prevent="handleSubmit">
        <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                    v-model="username"
                                    type="email"
                                    :value="username"
                                    placeholder="Your email"
                                    required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                    v-model="password"
                                    type="password"
                                    :value="password"
                                    password-reveal
                                    placeholder="Your password"
                                    required>
                            </b-input>
                        </b-field>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="close()">Fechar</button>
                        <button class="button is-primary">Entrar</button>
                    </footer>
        </div>
    </form>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        submitted: false,
        wrongCredentials: false
      }
    },
    methods: {
      handleSubmit (e) {
        this.submitted = true;
        const { username, password } = this;
        const { dispatch } = this.$store;
        if (username && password) {
          dispatch('auth/login', { username, password });
          if(this.$store.state.auth.status.loggedIn){
            dispatch('modal/close')

          }
        }
      },
      close() {
        this.$store.dispatch('modal/close')
      }
    }
  }
</script>

<style scoped>

</style>