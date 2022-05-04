<template>
  <div id="app">
    <nav class="navbar sticky-top">
      <router-link to="/">
        <!-- <img
          src="@/assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        /> -->
        <h2>🥑 Tattoo</h2>
      </router-link>
      | <router-link to="/registro">Registrarse</router-link> |
      <router-link to="/usuarios">Usuarios</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view /> 
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #82a5c7;
    background-color: #152230;
    height: 100%;
  }
  nav {
    padding: 30px;
    background-color: #4e647a;
  }
  nav h2{
    font-weight: 600;
  }
  a:hover{
    color: rgb(200, 255, 0)!important;
  }
  nav a {
    font-weight: bold;
    color: #243241;
    text-decoration: none;
  }
  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
