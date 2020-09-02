class LocalPermissions {
    static CAN_VIEW =             0b00000001;
    static CAN_USE_CONSOLE =      0b00000010;
    static CAN_EDIT_PROPERTIES =  0b00000100;
    static CAN_CREATE_WORLDS =    0b00001000;
    static CAN_DELETE_WORLDS =    0b00010000;
    static CAN_SEE_STATUS =       0b00100000;
    static CAN_EDIT_PERMISSIONS = 0b01000000;
    static IS_CREATOR_OF_SERVER = 0b10000000;
}

// id: the server id
function refreshData(id) {
    const server = servers.get(id);
    if(!server.isCached && (server.access & LocalPermissions.CAN_VIEW)) {
        socket.emit("getServer", id);
    }
    const statustext = document.getElementById("infotablestatus");
    statustext.innerHTML = server.status;
    statustext.classList.remove("red", "green", "yellow");
    statustext.classList.add(server.status === "Started" ? 'green' : server.status === "Stopped" ? 'red' : 'yellow');
    document.getElementById("infotableplayersonline").innerHTML = server.onlinePlayers;
    document.getElementById("infotablemaxplayers").innerHTML = server.maxPlayers;
    
    
    document.getElementById("infotablename").innerHTML = server.name;
    document.getElementById("infotableport").innerHTML = server.port;
    document.getElementById("infotableversion").innerHTML = server.version;
    document.getElementById("infotabledesc").innerHTML = server.description;    
    
    document.getElementById("infotable").classList.remove("hidden");
    console.log(server.access);
    const perms = [];
    if(server.access & LocalPermissions.CAN_VIEW) perms.push("View");
    if(server.access & LocalPermissions.CAN_USE_CONSOLE) perms.push("Use Console");
    if(server.access & LocalPermissions.CAN_EDIT_PROPERTIES) perms.push("Edit Properties");
    if(server.access & LocalPermissions.CAN_CREATE_WORLDS) perms.push("Create Worlds");
    if(server.access & LocalPermissions.CAN_DELETE_WORLDS) perms.push("Delete Worlds");
    if(server.access & LocalPermissions.CAN_EDIT_PERMISSIONS) {
        perms.push("Edit User Permissions");
        document.getElementById("permeditavailible").classList.remove("hidden");
    } else {
        document.getElementById("permeditavailible").classList.add("hidden");
    }
    const permlist = document.getElementById("permsself");
    permlist.innerHTML = "";
    perms.forEach(perm => permlist.innerHTML += `<li>${perm}</li>`);
}

socket.on("getServerres", res => {
    if(res.err) throw err;
    servers.set(res.server.id, res.server);
    console.log("Got server data with id " + res.server.id);
});