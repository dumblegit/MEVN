<template>
  <div>
    <h1 class="my-5"><span><h3>🙋‍♂️ 🙋‍♀️</h3></span>Usuarios</h1>
    <table class="table table-striped container mb-5">
      <thead>
        <tr>
          <th scope="col">Perfil</th>
          <th scope="col">Nombre</th>
          <th scope="col">Nick</th>
          <th scope="col">Fecha Nacimiento</th>
          <th scope="col">Rol</th>
          <th scope="col">Password</th>
          <th scope="col">Citas</th>
          <th scope="col">accion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
            <td>
              <button class="btn btn-success" @click="perfil(item._id)">
                🙎‍♂️
              </button>
            </td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.usuario }}</td>
            <td>{{ item.fechaNacimiento.substring(0,10) }}</td>
            <td v-if="item.tatuador == true">tatuador</td>
            <td v-else>cliente</td>
            <td>{{ item.password }}</td>
            <td>{{ item.citas.length }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button @click="editarUsuario(item._id)" class="btn btn-warning" title="edit">🛠</button> 
              <button @click="eliminarUsuario(item._id)" class="btn btn-danger" title="delete">💥</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      usuarios: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: {
        color: "",
        texto: "",
      },
      usuario: {
        nombre: "",
        tatuador: Boolean,
        fechaNacimiento: "",
        fotoPerfil: "",
        usuario: "",
        password: "",
        citas: [],
      },
    };
  },
  created() {
    this.listarUsuarios();
  },
  methods: {
    alerta() {
      this.mensaje.color = "success";
      this.mensaje.texto = "Usuario agregado con exito! ";
      this.showAlert();
    },
    listarUsuarios() {
      this.axios
        .get("/usuarios/listar")
        .then((res) => {
          //   console.log(res);
          this.usuarios = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editarUsuario(id){
      window.location.href="/usuarios/editar?id="+id;
    },
    eliminarUsuario(id) {
      this.axios.delete("/usuarios/borrar/" + id).then((res) => {
        const index = this.usuarios.findIndex(
          (item) => item._id === res.data._id
        );
        this.usuarios.splice(index, 1);
        this.mensaje.color = "danger";
        this.mensaje.texto = "Usuario eliminado con exito!";
        this.showAlert();
      });
    },
    perfil(id){
      window.location.href="/usuario?id=" + id;
    
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style>
  table{
    background-color:#82a5c7;
    color: #243241;
    border-radius: 10px;
  }
  a{
    color: #328b63;
    text-decoration: none;
  }
</style>