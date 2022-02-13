//using socket.io code here!

const express=require('express');
const app=express();
const http=require('http').Server(app);
app.use(express.static('public'));

http.listen(3000,()=>{
  console.log('listening to port 3000');
});

const io=require('socket.io')(http,{
  cors:{origin:'*'}
});

//variables
let p1Pos;
let p1Timestamp;
let p2Pos;
let p2Timestamp;
let max=3000;
let ballPos={x:0,y:0};
let score1=0;
let score2=0;

let date=new Date();
p1Timestamp=date.getTime();
p2Timestamp=p1Timestamp;

//when connection made 
io.on('connection',(socket)=>{
  console.log('connection made!');
  //when message recieved
  socket.on('getMessage',(message)=>{
    if(message.player=='p1'){
      p1Pos=message.pos;
      ballPos=message.ballPos;
      score1=message.score1;
      score2=message.score2;
      let d=new Date();
      let out=false;
      p1Timestamp=d.getTime();
      if(p1Timestamp-p2Timestamp>max){
        out=true;
      }
      io.to(socket.id).emit('postData',{
        p2_pos:p2Pos,
        p2_out:out
      });
    }
    else{
      p2Pos=message.pos;
      let d=new Date();
      let out=false;
      p2Timestamp=d.getTime();
      if(p2Timestamp-p1Timestamp>max){
        out=true;
      }
      io.to(socket.id).emit('postData',{
        p1_pos:p1Pos,
        ballPos:ballPos,
        p1_out:out,
        'score1':score1,
        'score2':score2
      });
    }
  });
});

setInterval(()=>{
  let now=date.getTime;
  if(now-p1Timestamp>max+2000 && now-p2Timestamp>max+2000){
    p1Pos=0;
    p2Pos=0;
    ballPos={x:0,y:0};
    score1=0;
    score2=0;
  }
},5000);

