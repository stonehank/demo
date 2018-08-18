const http=require('http');
const fs=require("fs");
const multiparty = require('../node_modules/multiparty');
let extendName
let lastFileName
let curFileName
let content=''
let start
let writable

let server=http.createServer(function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");

  let form = new multiparty.Form({
    // autoFields:true,
    // autoFiles:false
  });


  if(req.method==="OPTIONS"){
    res.statusCode=204
    res.end()
  }else{
    //此处会检测content-type，而options请求不带content-type，因此会触发错误
    form.parse(req)
  }

  form.on('part', function(part) {
    if (!part.filename) {
      part.resume();
    }
    if (part.filename) {
      let chunks = [];
      part.on('data', function(chunk){
        chunks.push(chunk);
      });
      part.on('end', function(){
        content = Buffer.concat(chunks);
        writable=fs.createWriteStream(curFileName,{flags:'r+',start:+start})
        writable.write(content)
        res.end('{"ok":true,"msg":' + start + '}')
      });
      part.resume();
    }

    part.on('aborted',function(err){
      console.log(err)
    })

    part.on('error', function(){
      res.on('error', function(){});
      res.end( 'Error receiving');
    });
  });

  form.on('field',function(name,value){
    // console.log('field:',name,value)
    if(name==='start')start=value
    if(name==="name" ){
      if(lastFileName!==value){
        lastFileName=value
        extendName=value.match(/.*\.(.*)/)[1]
        curFileName=Date.now()+'.'+extendName
        try {
          fs.accessSync(curFileName);
        } catch (err) {
          writable=fs.createWriteStream(curFileName)
        }
      }
    }
  })

})

server.listen(8080)