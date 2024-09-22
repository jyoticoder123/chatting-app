const express = require('express')
const path = require('path')
const app = express()


app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const server = require('http').createServer(app);
const io = require('socket.io')(server);



const usernames = [];
const userid = [];

io.on('connection', (socket) => {
    socket.on("new-user", (username) => {
        usernames.push(username);
        userid.push(socket.id);
    });

    socket.on("message", (message) => {
        let index = userid.indexOf(socket.id);
        let username = usernames[index];
        io.emit("message", { message, username, id: socket.id });
    });
});



app.get('/',(req , res)=>{
    res.render('index')
})


server.listen(3000);