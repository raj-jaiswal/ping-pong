const express=require('express');
const app=express();

app.listen(3000,()=>{
  console.log('listening to port 3000');
});

app.use(express.json({limit:'1mb'}));
app.use(express.static('public'));

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


//////////////
app.post('/p1',(request,response)=>{
  p1Pos=request.body.pos;
  ballPos=request.body.ballPos;
  score1=request.body.score1;
  score2=request.body.score2;
  let d=new Date();
  let out=false;
  p1Timestamp=d.getTime();
  if(p1Timestamp-p2Timestamp>max){
    out=true;
  }
  console.log('p2',out);
  response.json({
    p2_pos:p2Pos,
    p2_out:out
  });
});


///////////////
app.post('/p2',(request,response)=>{
  p2Pos=request.body.pos;
  let d=new Date();
  let out=false;
  p2Timestamp=d.getTime();
  if(p2Timestamp-p1Timestamp>max){
    out=true;
  }
  console.log('p1',out);
  response.json({
    p1_pos:p1Pos,
    ballPos:ballPos,
    p1_out:out,
    'score1':score1,
    'score2':score2
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