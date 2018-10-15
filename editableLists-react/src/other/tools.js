
export function getData(obj={section:'navlist',select:['*'],condition:'1'}){
    var _select=obj.select.join();
    var src='http://www.mylib.com/handleData.php?search='+obj.section+'&select='+_select+'&condition='+obj.condition;
    var result=fetch(src)
        .then(response=>{return response.json()},
            error=>{console.error('error',error)})
    return result
}

export function postData(obj){
    if(!obj.type){throw new Error('未设置type');}
    if(obj.type==='save' || obj.type==="add" ){
        if(!obj.section || !obj.id || !obj.text ||!obj.titleName  ){
            throw new Error('add/save参数不对');
        }
    }else if( obj.type==='del'){
        if(!obj.section || !obj.id){
            throw new Error('delete参数不对')
        }
    }else{
        throw new Error('无法解析type：'+obj.type)
    }
    var src='http://www.mylib.com/handleData.php';
    var result=fetch(src,{
        method: 'POST',
        //mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `section=${obj.section}&id=${obj.id}&text=${obj.text}&titleName=${obj.titleName}&type=${obj.type}`
    })
        .then(response=>response.json(),
            error=>{console.error('error',error)})
    return result
}
/**
 * 分割'/aaa/bbb'为[aaa,bbb]
 * 参数i选择对应index的值
 */
export function getPath(pathname,i,getAllBehind){
    let rgx=/\/([^/])*/g;
    let resultArr=decodeURI(pathname).match(rgx);
    let len=resultArr.length;
    let allBehind='';
    for(let j=i+1;j<len;j++){
        allBehind+=resultArr[j]
    }
    let path=getAllBehind?allBehind:resultArr[i];
    return path?path.substr(1):'';
}

export function scrollToX(wrap,toWhere,async){
    if(async){
        setTimeout(function(){wrap.scrollTop=toWhere?toWhere:0},0)
    }else{
        wrap.scrollTop=toWhere?toWhere:0
    }

}

export function value2pathname(v,deepList){
    var arr=[];
    var regExp='^'+v+'.*';
    for(let i in deepList){
        deepList[i].forEach(e=>{
            if(e.name.match(new RegExp(regExp,'i'))){arr.push('/'+i+'/'+e.name)}
        })}
    return arr;
}