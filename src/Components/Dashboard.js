import React, { useEffect, Component } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

//Change Endpoint to local Host if You are runnign along with backend
const ENDPOINT = "http://localhost:4040/";
// const ENDPOINT = "https://task1-backend.herokuapp.com/";

var socket = io.connect(ENDPOINT)

const myPeer = new Peer(undefined, {host : "/", port : "3001"})

const peers={}


navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;



function Dashboard(props) {


  const myVideo = document.createElement("video")
  myVideo.muted = true

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video:true, audio:true
    }).then( stream => {
      addVideoStream(myVideo, stream)

      myPeer.on("call", call =>{
        call.answer(stream)
        // const video = document.createElement("video")
        // call.on("stream", userVideoStream => {
        //   addVideoStream(video, userVideoStream)
        // })
      })

      socket.on("userConnected", userID => {
        connectToNewUser(userID, stream)
      })
    })    
  }, [])
    
    function addVideoStream(video, stream) {
      video.srcObject = stream
      onload(video);
      document.getElementById("video-grid").append(video);
      console.log(video)
    }
    
    function connectToNewUser(userID, stream){
      const call = myPeer.call(userID, stream)
      const video = document.createElement("video")
      call.on("stream", userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
      call.on("close", ()=>{
        video.remove()
      })

      peers[userID] = userID
    }

     function onload(video){
      console.log("Meta data");
      video.play();
    }

    myPeer.on("open", id=> {
      socket.emit("joinRoom",props.LoginRoomID,id)
    })  
    
    
    socket.on("userConnected" , userID => {
      console.log("Connected user Id : ",userID)
    })


    socket.on("userDisconnected", userID =>{
      console.log("disconnected user Id : ",userID)
       if(peers[userID]) peers[userID].close()
    })

  return (
    <div id="main">
      <div id="video-grid"></div>
    </div>
  );
}

export default Dashboard;
