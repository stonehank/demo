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

  let form = new multiparty.Form();

  form.parse(req)
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
    part.on('error', function(err) {
      console.log(err)
    });
  });

  form.on('field',function(name,value){
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