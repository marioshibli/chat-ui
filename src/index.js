import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/index.js";
import io from "socket.io-client";

//connecting to Socket.IO chat server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");
var appSocketEventListener= ReactDOM.render(<App />, document.getElementById('root'));

// Server Connection
socket.on("connect", function() {
	console.log("connected to chat server : ",timeNow());
});

// Server Disconnect
socket.on("disconnect", function() {
	console.log("disconnected from chat server : ",timeNow());
});


// Socket Event Listener
socket.on('spotim/chat', function(data){
	console.log("this Client SocketId : ", socket.id);
	console.log("Msg sender SocketId : ", data.userid);
	console.log("Message : ",data) // test log
	var thisClient = 0;           // for messages colors
	if(data.userid===socket.id) thisClient = 1;  // if this client id =equal= to the user message id
	appSocketEventListener.addMessagesToPage(data.avatar,data.username,data.text,data.time,thisClient);		
});


// method to send user messages by io.socket
export const sendMsgByIOSocket = (avatarStr,usernameStr,textStr)=>{
	socket.emit('spotim/chat', {
			avatar: avatarStr, 
			username: usernameStr,
			text: textStr,
			time: timeNow(), // message time , my extra!
			userid : socket.id  // if users have the same username (for messages colors).
		}
	);
}


// message time (my extra)
function timeNow(){
	var currentTime = new Date(),
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes();	
	var suffix = "AM";
	if (minutes < 10)
		minutes = "0" + minutes;
	if (hours >= 12) {
		suffix = "PM";
		hours = hours - 12;
	}	
	if (hours === 0) hours = 12;
	return (hours + ":" + minutes + " " + suffix);
}