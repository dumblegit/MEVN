<template>
  <div>
    <h1 class="my-5">Edición de usuario 🛠</h1>

    <form class="d-flex flex-column container " @submit.prevent="actualizarUsuario(usuario)">
      <div id="form" class="container px-5 pb-3">
        <h3 class="mt-3">Usuario </h3>
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
        >Editar</b-button
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
      const id = (location.href).split('?id=')[1];
      this.axios.get("usuarios/listar/"+id)
      .then(res => {
        this.usuario = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
  },
  methods: {
    alerta() {
      this.mensaje.color = "primary";
      this.mensaje.texto = "Usuario editado con exito! 👌";
      this.showAlert();
    },
    actualizarUsuario(item){
      this.axios.put('usuarios/actualizar/' + item._id, item)
      .then((res) => {
        let index = this.usuarios.findIndex(n => n._id === res.data._id);
        this.usuario[index].nombre = res.data.nombre;
        this.usuario[index].tatuador = res.data.tatuador;
        this.usuario[index].fotoPerfil = res.data.fotoPerfil;
        this.usuario[index].fechaNacimiento = res.data.fechaNacimiento;
        this.usuario[index].usuario = res.data.usuario;
        this.usuario[index].password = res.data.password;
      })
      .catch((e) => {
        console.log(e.response);
      })

    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      setTimeout(() => {
        // this.$router.go(-1);
        window.location.href = '/usuarios'
      }, 5000);
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
    input{
        background-color: #4e647a!important;
        color: #82a5c7!important;
    }
    #enviar{
        background-color:#82a5c7;
        color: #243241;
    }
</style>