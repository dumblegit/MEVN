<template>
  <v-container white--text>
    <h1 class="primary--text display-4 mb-3">grid</h1>
    <v-layout wrap>
      <v-flex class="primary" xs12>
        <h1>12</h1>
      </v-flex>
      <v-flex class="success" xs6>
        <h1>6</h1>
      </v-flex>
      <v-flex class="error" xs6>
        <h1>6</h1>
      </v-flex>
    </v-layout>
    <v-layout mt-5 secondary justify-center align-center style="height: 100px">
      <v-flex class="info" xs3>
        <h1>centrado</h1>
      </v-flex>
      <v-flex class="success" xs3>
        <h1>centrado</h1>
      </v-flex>
    </v-layout>
    <v-layout warning>
      <v-flex>
        <h1 class="display-1">Lorem ipsum</h1>
        <h1 class="display-2">Lorem ipsum</h1>
        <h1 class="display-3">Lorem ipsum</h1>
        <h1 class="display-4">Lorem ipsum</h1>
      </v-flex>
    </v-layout>

    <h1 class="primary--text display-4">btn</h1>

    <v-layout>
      <v-flex>
        <v-btn class="ml-2">texto</v-btn>

        <v-btn class="success pink--text ml-2">texto</v-btn>

        <v-btn class="info ml-2">texto</v-btn>

        <v-btn class="info ml-2">
          user
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn>

        <v-btn class="ml-2" icon color="pink">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>

        <v-btn class="ml-2" fab color="red">
          <v-icon dark>mdi-account-outline</v-icon>
        </v-btn>

        <v-btn class="ml-2" icon color="orange">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>

        <v-btn class="ml-2" outlined color="error">
          user
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn>

        <v-btn class="ma-2" outlined fab color="teal">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>

        <v-btn class="ml-2" block outlined color="error">
          user
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn>

        <v-btn class="ma-2" block rounded color="error">
          user
          <v-icon right>mdi-account-circle</v-icon>
        </v-btn>

        <div>
          <v-text-field label="Main input"></v-text-field>
          <v-text-field label="Another input"></v-text-field>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {};
</script>
