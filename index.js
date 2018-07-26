let file = document.getElementById("file")
let control = document.getElementById("control")
let cancel = document.getElementById("cancel")
let progressColor = document.getElementById("progressColor")
let oProgress = document.getElementById("progress")
let progressNum=document.getElementById("progressNum")

let allSize
let gap = 1024*1024
let progress = 0
let progressW = parseInt(oProgress.clientWidth, 10)
let start = 0, end = start + gap;
let isUpLoading = false
let blob
let xhr = new XMLHttpRequest()


control.addEventListener('click',function () {
  if(file.files.length===0){
    alert('请选择文件')
    return
  }
  if(!isUpLoading){
    isUpLoading=true
    blob = file.files[0];
    allSize = blob.size;
    segmentUpload(start,end)
  }else{
    isUpLoading=false;
  }
  control.innerText=isUpLoading?"暂停":"继续"
})

file.addEventListener('change',function () {
  clear()
})

cancel.addEventListener('click',function () {
  if(file.value!==''){
    clear()
  }
})

function segmentUpload(start, end) {
  if (start > allSize) return
  let fd = new FormData()
  let cur = blob.slice(start, end, blob.type)
  fd.append('name', blob.name)
  fd.append('start', start)
  fd.append('fragments', cur);
  xhr.open('POST', 'http://localhost:8080/upload.js', true);
  xhr.send(fd)
}

function done(progress) {
  if (progress >= 1) {
    progress = 1;
    file.value=''
    dataClear()
  }
  progressNum.innerText=(progress*100).toFixed(2)+"%";
  progressColor.style.transform = `translate(${progressW * (progress - 1)}px,0)`
}
function dataClear(){
  isUpLoading=false
  start = 0;
  end = start + gap;
  control.innerText='开始'
}

function clear(){
  dataClear()
  progressNum.innerText=0+"%";
  progressColor.style.transform = `translate(${-progressW}px,0)`
}

xhr.responseType='json'
xhr.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 300 ||this.status === 304) {
      if (this.response.ok!==true) {
        alert('失败，请重新发送');
        clear()
      } else {
        progress = end / allSize
        start = end
        end = start + gap
        if(isUpLoading){
          done(progress)
          segmentUpload(start, end)
        }
      }
    }
  }
}