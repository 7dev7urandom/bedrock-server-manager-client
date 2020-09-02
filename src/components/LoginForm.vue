<template>
  <div v-show="!loggedIn">
      <h1>Bedrock Server Manager</h1>
      <h3>By Micah Henney</h3>
        <span v-if="error" class="error">Wrong username or password</span>
      <br>
        <input v-model="username" placeholder="Username" v-on:keyup.enter="submit"><br>
        <input type="password" placeholder="Password" v-model="password" v-on:keyup.enter="submit"><br>
        <button v-on:click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'LoginForm',
  data: () => {
      return { 
          username: "",
          password: "",
          loggedIn: false,
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
          this.loggedIn = true;
          this.password = "";
          this.$socket.client.emit("getServers");
          this.$root.$emit('loginSuccessful');
    //       document.getElementById('login').classList.add("hidden");
    //       const serversele = document.getElementById("servers");
    //       serversele.classList.remove("hidden");
    //       socket.emit("getServers");
    //       socket.on("serverList", (acceptedServers) => {
    //           // console.log(servers);
    //           acceptedServers.forEach(server => {
    //                const skeletonBegin = `<tr class="server-row"><td><table id="serverlistid${server.id}" class="listblack serverlist mc-font">
    //         <tbody>
    //             <tr>
    //                 <td class="server-cell fill-space"><span style="color: white; font-size: 1em;">${server.name}</h3></td>

    //                 <td class="server-cell right-align">${server.version}</td>
    //                  <td class="server-cell right-align min-cell-size ${server.status === "Started" ? 'green' : server.status === "Stopped" ? 'red' : 'yellow'}">${server.status}</td>
    //              </tr>
    //              <tr>
    //                 <td class="server-cell">${server.port}</td>
    //                 <td class="server-cell right-align" style="white-space: nowrap;">${server.onlinePlayers}/${server.maxPlayers} online</td>
    //                <td class="server-cell right-align min-cell-size">${server.status === "Started" ? '<img class="status-light" src="Green light.png">' : '<img class="status-light" src="Red light.png">'}</td>
    //            </td></tr>
    //         </tbody>
    //     </table></td> 
    // </tr>`;
    //                  serverbox.children[0].innerHTML += skeletonBegin;
    //                  // console.log("Adding event listener! " + document.getElementById('serverlistid'+server.id).id);
    //               // Use a delay to let the document changes apply
    //                  setTimeout(() => document.getElementById('serverlistid' + server.id).addEventListener('click', data => serverClicked(server.id, data)), 1);
    //           });
    //           servers = new Map(acceptedServers.map(server => {
    //               server.isCached = false;
    //               return [server.id, server];
    //           }));
    //           document.getElementById('loginFinished').classList.remove("hidden");
    //       });
      }
  }
});
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
