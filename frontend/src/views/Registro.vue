<template>
  <div>
    <h1 class="my-5">Te damos la Bienvenida 👋</h1>

    <form class="d-flex flex-column container" @submit.prevent="agregarUsuario()">
      <div id="form" class="container">
        <h3 class="mt-3">Nuevo usuario </h3>
        <input
          type="text"
          class="form-control my-2"
          placeholder="Nombre"
          v-model="usuario.nombre"
        />
        <div class="d-flex justify-content-center mt-3">
          <p>Tipo de usuario:</p>
          <div class="form-check mx-5">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="tatuador"
              value="true"
              v-model="usuario.tatuador"
            />
            <label class="form-check-label" for="tatuador"> Tatuador </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="cliente"
              value="false"
              checked
              v-model="usuario.tatuador"
            />
            <label class="form-check-label" for="cliente"> Cliente </label>
          </div>
        </div>
        <div class="d-flex">
          <label class="" for="date">Fecha de nacimiento: </label>
          <input
            type="date"
            id="date"
            class="form-control my-2"
            v-model="usuario.fechaNacimiento"
          />
        </div>
        <div class="d-flex align-items-center">
          Foto de perfil:
          <input type="file" class="form-control m-2" />
        </div>
        <input
          type="text"
          class="form-control my-2"
          placeholder="Nick"
          v-model="usuario.usuario"
        />
        <input
          type="password"
          class="form-control my-2"
          placeholder="Contraseña"
          v-model="usuario.password"
        />
      </div>

      <b-button
      id="enviar"
        pill
        class="my-4"
        @click="alerta()"
        type="submit"
        >Enviar</b-button
      >
    </form>

    <div class="container">
        <b-alert
        :show="dismissCountDown"
        :variant="mensaje.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        >
        <p>{{ mensaje.texto }}</p>
        <b-progress
            :variant="mensaje.color"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
        ></b-progress>
        </b-alert>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      usuarios: [],
      dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
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
    
  },
  methods: {
    alerta() {
      this.mensaje.color = "warning";
      this.mensaje.texto = "Usuario agregado con exito! 👌";
      this.showAlert();
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
    #form{
        background-color:#82a5c7;
        color: #243241;
        border-radius: 10px;
    }
    #enviar{
        background-color:#82a5c7;
        color: #243241;
    }
</style>