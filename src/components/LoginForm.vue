<template>
  <div v-show="!$store.state.loggedIn">
      <h1>Bedrock Server Manager</h1>
      <h3>By Micah Henney</h3>
        <span v-if="error" class="error">Wrong username or password</span>
      <br>
        <input v-model="username" placeholder="Username" v-on:keyup.enter="submit" autofocus><br>
        <input type="password" placeholder="Password" v-model="password" v-on:keyup.enter="submit"><br>
        <button v-on:click="submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => {
      return { 
          username: "",
          password: "",
          error: false
      }
  },
  methods: {
      submit () {
          this.$socket.client.emit("login", { username: this.username, password: this.password });
      }
  },
  // @ts-ignore
  sockets: {
      loginResult: function (data) {

          if(!data.success) {
              console.log("No success :(");
              this.error = true;
              return;
          }
          this.password = "";
          this.$socket.client.emit("getServers");
          this.$store.state.loggedIn = true;
          this.$store.state.currentUserData = data;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
    color: red;
}
* {
    text-align: center;
}
* {
    font-weight: normal;
}
input {
    font-family: Minecraftia;
}
</style>
