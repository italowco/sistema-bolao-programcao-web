<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Criar Usuário</p>
            </header>
            <section class="modal-card-body">
                <div v-show="action == 1 || action == 2">
                    <b-field label="Nome">
                        <b-input type="text" placeholder="Insira o nome"  v-model="currentUser.name" :value="currentUser.name">
                        </b-input>
                    </b-field>
                    <b-field label="Email">
                        <b-input placeholder="Insira o email" type="email"  v-model="currentUser.email" :value="currentUser.email">
                        </b-input>
                    </b-field>
                    <b-field label="Perfil">
                        <b-select placeholder="Selecione a função"  v-model="currentUser.profile" :value="currentUser.profile">
                            <option value="1">
                                Apostador
                            </option>
                            <option value="2">
                                Admnistrador
                            </option>
                        </b-select>
                    </b-field>
                </div>
                <div v-show="action == 1 || action == 3">
                    <b-field label="Senha" >
                        <b-input type="password" v-model="currentUser.password">
                        </b-input>
                    </b-field>
                    <b-field label="Confirmar Senha" >
                        <b-input type="password" v-model="currentUser.password_confirmation">
                        </b-input>
                    </b-field>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Cancelar</button>
                <button class="button is-primary" v-if="action !== 1" @click="submitUser" type="button">Concluir</button>
                <button class="button is-primary" v-else @click="createUser" type="button">Adicionar</button>

            </footer>
        </div>
    </form>
</template>

<script>
export default {
    name: "CreateEditUsuario",
    props: [ 'user', 'action' ],
    data () {
        return {
            currentUser: this.user,
        }
    },
    methods: {
        submitUser(){
            // TO DO ADICIONAR METODO DE CRIAR, REMOVER E EDITAR
            this.$store.dispatch('usuarios/updateUser', this.currentUser)
            this.$parent.close()
        },
        createUser(){
            console.warn(this.currentUser)
            this.$store.dispatch('usuarios/createUser', this.currentUser)
            this.$parent.close()
        }
    }
}
</script>

<style scoped>

</style>