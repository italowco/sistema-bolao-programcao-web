<template>
  <div class="container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="#">Usuários</a></li>
        <li class="is-active">Admnistrativo<a href="#" aria-current="page"></a></li>
      </ul>
    </nav>
    <b-button class="is-primary" @click="openCreate">Novo usuário</b-button>
    <b-table :data="users" :paginated="isPaginated"  per-page="10">
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
        <b-table-column field="profile" label="Perfil" :centered="isCentered">
          <span class="tag">{{ props.row.profile > 1 ? 'Admnistrator' : ' Apostador' }}</span>
        </b-table-column>
        <b-table-column label="Ações" :centered="isCentered">
          <b-dropdown aria-role="list">
            <button class="button" slot="trigger">
              <span></span>
              <b-icon icon="user-edit"></b-icon>
            </button>
            <b-dropdown-item aria-role="listitem"  @click="changePassword(props.row)" >Mudar senha</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="updateUser(props.row)">Editar</b-dropdown-item>
            <b-dropdown-item customn aria-role="listitem" @click="deleteUser(props.row.id)" ><a class="has-text-danger">Deletar</a></b-dropdown-item>
          </b-dropdown>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="createModal">
      <CreateEditUsuario :action="modalAction" :user="modalUser" ></CreateEditUsuario>
    </b-modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CreateEditUsuario from "../components/usuario/CreateEditUsuario";

  export default {
      name: "Usuarios",
      components: {CreateEditUsuario},
      data () {
          return {
              isPaginated: true,
              isCentered: true,
              tagClass: 'tag',
              createModal: false,
              modalAction: 1,
              modalUser: {
                  name: null,
                  email: null,
                  profile: null
              }
          }
      },
      beforeCreate() {
          this.$store.dispatch('usuarios/getAll')
      },
      computed: {
          ...mapState({
              users: state => state.usuarios.all
          })
      },
      methods: {
          deleteUser(id) {
              this.$store.dispatch('usuarios/deleteUser', id)
          },
          openCreate(){
              this.createModal = true
              this.modalAction = 1
          },
          updateUser(user) {
              this.createModal = true
              this.modalAction = 2
              this.modalUser = user
          },
          changePassword(user) {
              this.createModal = true
              this.modalAction = 3
              this.modalUser = user
          }
      }
  }
</script>

<style scoped>

</style>