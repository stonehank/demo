let file = document.getElementById("file")
let control = document.getElementById("control")
let cancel = document.getElementById("cancel")
let progressColor = document.getElementById("progressColor")
let oProgress = document.getElementById("progress")
let progressNum=document.getElementById("progressNum")

let allSize
// 数据分割值
let gap = 1024*1024
// 剩下的数据大小
let lastSize
// 当前次上传数据值（如果剩下的小于分割值，就取剩下的，否则去分割值）
let curUpload
let progress = 0
let progressW = parseInt(oProgress.clientWidth, 10)
let start = 0, end
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
    lastSize=allSize
    curUpload=lastSize-gap>0?gap:lastSize
    end=start+curUpload
    segmentUpload(start,end)
    control.innerText=isUpLoading?"暂停":"继续"
  }else{
    isUpLoading=false;
  }

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
  console.log(start,end,allSize)
  if (start >= allSize) return
  let fd = new FormData()
  let cur = blob.slice(start, end, blob.type)
  fd.append('name', blob.name)
  fd.append('start', start)
  fd.append('fragments', cur);
  xhr.open('POST', 'http://localhost:8080/upload.js', true);
  xhr.upload.onprogress=function(progress){
    if (progress.lengthComputable ) {
      progressUpdate(progress.loaded / progress.total)
    }
  }
  xhr.send(fd)
}
function progressUpdate(addSize){
  if(!isUpLoading){
    control.disabled=true
    control.innerText="请稍后..."
    if(addSize===1){
      control.disabled=false
      control.innerText=isUpLoading?"暂停":"继续"
      return
    }
  }
  let newProgress=0
  if(addSize){
    newProgress=addSize*(curUpload/allSize>1?1:curUpload/allSize)
  }
  if (progress+newProgress >= 1) {
    progress = 1;
    newProgress=0
    file.value=''
    dataClear()
  }
  progressNum.innerText=((progress+newProgress)*100).toFixed(2)+"%";
  progressColor.style.transform = `translate(${progressW * (progress+newProgress - 1)}px,0)`
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
        lastSize=allSize-end
        curUpload=lastSize-gap>0?gap:lastSize
        // console.log(progress,lastSize)
        start = end
        end = start + curUpload
        // console.log('new',start,end)
        // 只有开始传送的时候才会更新
        if(isUpLoading){
          segmentUpload(start, end)
          progressUpdate()
        }
      }
    }
  }
}