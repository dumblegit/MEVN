<template>
  <div>
    <h1 class="my-5"><span><h3>🙋‍♂️ 🙋‍♀️</h3></span>Usuarios</h1>
    <table class="table table-striped container mb-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Nick</th>
          <th scope="col">Fecha Nacimiento</th>
          <th scope="col">accion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
          <th scope="row"><a href="">{{item._id}}</a></th>
            <td>{{ item.nombre }}</td>
            <td>{{ item.usuario }}</td>
            <td>{{ item.fechaNacimiento }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <b-button @click="actualizarUsuario(item)" class="btn-warning" title="edit">🛠</b-button>
              <b-button @click="eliminarUsuario(item._id)" class="btn-danger" title="delete">💥</b-button>
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
    agregarUsuario() {
      //console.log(this.usuario);
      this.axios.post("/usuarios/nuevo", this.usuario)
        .then((res) => {
          this.usuarios.push(res.data);
          this.usuario.nombre = "";
          this.usuario.tatuador = false;
          this.usuario.fotoPerfil = "";
          this.usuario.fechaNacimiento = new Date();
          this.usuario.usuario = "";
          this.usuario.password = "";
        })
        .catch((e) => {
          console.log(e.response);
        });
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
    actualizarUsuario(item){
      this.axios.put('/usuarios/actualizar/' + item._id, item)
      .then((res) => {
        const index = this.usuario.findIndex(n => n._id === res.data._id);
        this.usuario[index].nombre = "edit";
        this.usuario[index].tatuador = true;
        this.usuario[index].fotoPerfil = "edit";
        this.usuario[index].fechaNacimiento = new Date();
        this.usuario[index].usuario = "edit";
        this.usuario[index].password = "edit";
      })
      .catch((e) => {
        console.log(e.response);
      })

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