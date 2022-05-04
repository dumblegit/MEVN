<template>
  <div>
    <h1 class="my-5"><span><h3>🙋‍♂️ 🙋‍♀️</h3></span>Usuarios</h1>
    <table class="table table-striped container mb-5">
      <thead>
        <tr>
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
        <tr>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.usuario }}</td>
            <td>{{ usuario.fechaNacimiento.substring(0,10) }}</td>
            <td v-if="usuario.tatuador == true">tatuador</td>
            <td v-else>cliente</td>
            <td>{{ usuario.password }}</td>
            <td>{{ usuario.citas.length }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <b-button @click="editarUsuario(usuario._id)" class="btn-warning" title="edit">🛠</b-button> 
              <b-button @click="eliminarUsuario(usuario._id)" class="btn-danger" title="delete">💥</b-button>
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
    const id = (location.href).split('?id=')[1];
      this.axios.get("usuarios/listar/"+id)
      .then(res => {
        //console.log(typeof(res.data.fechaNacimiento));  
        this.usuario = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
  },
  methods: {
    alerta() {
      this.mensaje.color = "success";
      this.mensaje.texto = "Usuario agregado con exito! ";
      this.showAlert();
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