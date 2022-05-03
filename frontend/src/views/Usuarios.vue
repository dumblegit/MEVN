<template>
  <div>
    <h1>Usuarios</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }} {{ dismissCountDown }}
    </b-alert>

    <form class="d-flex flex-column" @submit.prevent="agregarUsuario()">
        <div class="container bg-success rounded">
            <h3 class="mt-3">Nuevo usuario</h3>
            <input type="text" class="form-control my-2" placeholder="Nombre" v-model="usuario.nombre">
            <div class="d-flex justify-content-center mt-3">
                <p>Tipo de usuario: </p>
                <div class="form-check mx-5">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="tatuador" value=true v-model="usuario.tatuador">
                    <label class="form-check-label" for="tatuador">
                        Tatuador
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="cliente" value=false checked v-model="usuario.tatuador">
                    <label class="form-check-label" for="cliente">
                        Cliente
                    </label>
                </div>        
            </div>
            <div class="d-flex">
                <label class="" for="date">Fecha de nacimiento: </label>
                <input type="date" id="date" class="form-control my-2" v-model="usuario.fechaNacimiento">
            </div>
            <div class="d-flex align-items-center">
                Foto de perfil:
                <input type="file" class="form-control m-2">
            </div>
            <input type="text" class="form-control my-2" placeholder="Nick" v-model="usuario.usuario">
            <input type="password" class="form-control my-2" placeholder="Contraseña" v-model="usuario.password">
        </div>
        
        <b-button pill variant="success" class="my-4" @click="alerta()" type="submit">Enviar</b-button>
        
    </form>

    <table class="table table-success table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Nick-name</th>
          <th scope="col">Fecha Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.nombre }}</td>
          <td>{{ item.usuario }}</td>
          <td>{{ item.fechaNacimiento }}</td>
          <b-button @click="eliminarUsuario(item._id)" class="btn-danger"></b-button>
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
          citas: []
      }
    };
  },
  created() {
    this.listarUsuarios();
  },
  methods: {
      alerta(){
          this.mensaje.color = "success"
          this.mensaje.texto = "Usuario agregado con exito! " 
          this.showAlert()
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
    agregarUsuario(){
        console.log(this.usuario);
        this.axios.post('/usuarios/nuevo', this.usuario)
        .then(res => {
            this.usuarios.push(res.data);
             this.usuario.nombre = ""
             this.usuario.tatuador = false
             this.usuario.fotoPerfil = ""
             this.usuario.fechaNacimiento = new Date();
             this.usuario.usuario = ""
             this.usuario.password = ""
        })
        .catch((e) => {
            console.log(e.response);
        })
    },
    eliminarUsuario(id){
      this.axios.delete('/usuarios/borrar/'+id)
      .then(res=> {
        const index = this.usuarios.findIndex(item => item._id === res.data._id)
        this.usuarios.splice(index,1);
        this.mensaje.color = "danger"
        this.mensaje.texto = "Usuario eliminado con exito!" 
        this.showAlert()
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