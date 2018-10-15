const G=6.67e-9
// let modi=1
// m|n:kg,
// r:meter
function getF(ball1,ball2,r){
  // console.log(r)
  // modi=1
  if(r<0.1){
    r=0.1
    // modi=-1
  }
  let f= G*ball1.m*ball2.m/(r*r)

  ball1.fFrom[ball2.name]=f;
  ball2.fFrom[ball1.name]=f;
}

function getA(f,m){
  return f/m
}

function getS(v,t){
  return v*t/1000
}

function getVXAndVY(ball,r){
  let fObj=ball.fFrom
  let aObj={}
  let res
  for(let k in fObj){
    let f=fObj[k]
    let fromBall=balls[k]
    let disX=fromBall.sX-ball.sX
    let disY=fromBall.sY-ball.sY
    aObj[k]={
      aX:disX/(r/f),
      aY:disY/(r/f)
      // vX:disX/disY *
    }
    // console.log(aObj[k].aX)
    res=aObj[k]
  }
  /*多个速度合并*/

  return res
}


let balls={
  ball1:{
    name:'ball1',
    m:100000,
    sX:500,
    sY:500,
    vX:0,
    vY:-5,
    fFrom:{}
  },
  ball2:{
    name:'ball2',
    m:100000,
    sX:450,
    sY:500,
    vX:0,
    vY:5,
    fFrom:{}
  }
}
let ball1=balls.ball1

let ball2=balls.ball2


function update(ball,nowA){
  if(ball.name==="ball1")console.log(nowA.aX,nowA.aY)
  ball.vX+=nowA.aX
  ball.vY+=nowA.aY
  ball.sX+=getS(ball.vX,16.6667)
  ball.sY+=getS(ball.vY,16.6667)
}



function calc(){
  let distanceX=Math.abs(ball1.sX-ball2.sX)
  let distanceY=Math.abs(ball1.sY-ball2.sY)
  // console.log(distanceX,distanceY)
  let nowR=Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2))
  // if(nowR===0){
  //   throw 1
  // }
  // console.log(nowR)
  getF(ball1,ball2,nowR)
  // console.log(nowR,nowF)
  let nowA1=getVXAndVY(ball1,nowR)
  let nowA2=getVXAndVY(ball2,nowR)
  update(ball1,nowA1)
  update(ball2,nowA2)
}

// setInterval(()=>{
//   calc()
  // console.log(nowA1,nowA2)

  // console.log(ball1,ball2)
// },16.6667)

setInterval(()=>{console.log(ball1.fFrom.ball2,ball1.vX)},1000)

// window.calc=calc
// window.balls=balls
