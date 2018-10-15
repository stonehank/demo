import {getData,postData,value2pathname} from '../other/tools'
import mockData from '../other/mock'
let timer;

export const action_getNavList=(section,argObj)=>(dispatch,getState)=>{
    /**
     * 已经存在数据，就从数据中获取
     */
    if(getState().navList.shallowList[0] && getState().content[section]){
        dispatch(action_fetchNavRequest(section));
        getState().navList.deepList[section]=getState().content[section]
        return  dispatch(action_fetchNavReceive(section,getState().navList))
    }
    /**
     * 不存在数据，fetch获取
     */
    dispatch(action_fetchNavRequest(section));
    if(getState().mockData){
        return dispatch(action_fetchNavReceive(section,mockData.navList));
    }else {
        getData(argObj).then(data=> {
            /**
             * fetch失败，从mockdata获取
             */
            if (!data) {
                if (!getState().mockData) {
                    console.warn('数据库获取nav失败，尝试启用mockData');
                    dispatch(action_setDataStatus(true));
                    dispatch(action_fetchNavReceive(section, mockData.navList))
                    dispatch(action_autoPop(`数据库连接失败，尝试启用mockData`,3000,'error'))
                    return;
                }
            }
            /**
             * fetch成功
             */
            dispatch(action_setDataStatus(false));
            dispatch(action_autoPop(`数据库连接成功`,3000,'success'))
            let result = {};
            result.isFetching = true;
            result.shallowList = data;
            result.showingDetail = {};
            let _argObj = {};
            _argObj.select = ['id', 'name'];
            _argObj.condition = 1;
            result.deepList = {};
            data.forEach((e, i)=> {
                result.showingDetail[e.name] = false
                _argObj.section = e.name;
                getData(_argObj).then(_data=> {
                    result.deepList[e.name] = _data;
                    if (i === data.length - 1) {
                        dispatch(action_fetchNavReceive(section, result))
                        dispatch(action_setDataStatus(false));
                    }
                })
            })
        })
    }
}



export const action_getSectionContent=(section,argObj)=>(dispatch,getState)=>{
    /**
     * 已经存在数据，就从数据中获取
     */
    if(getState().content[section]){
        dispatch(action_fetchContentRequest(section));
        return  dispatch(action_fetchContentReceive(section,getState().content))
    }
    /**
     * 不存在数据，则fetch获取
     */
    dispatch(action_fetchContentRequest(section));
    if(getState().mockData){
        return dispatch(action_fetchContentReceive(section,mockData.content));
    }else{
        getData(argObj).then(data=>{
                /**
                 * fetch失败，从mockdata获取
                 */
            if(!data){
                console.warn(`数据库获取content失败，尝试启用mockData获取${section}`);
                dispatch(action_fetchContentReceive(section,mockData.content));
                dispatch(action_setDataStatus(true));
                return;
            }
            /**
             * fetch成功
             * @type {{}}
             */
            dispatch(action_setDataStatus(false));
            let result={};
            result.isFetching=true;
            data.forEach((e,i)=>{
                e.isEditing=false;
                if(i===data.length-1){
                    result[section]=data;
                     dispatch(action_fetchContentReceive(section,result))
                    dispatch(action_setDataStatus(false))
                }
            })
        })
    }
}

 const action_setDataStatus=(status)=>{
    return{
        type:'SET_DATASTATUS',
        status:status
    }
}

 const action_turnonPop=(data,status)=>{
    return{
        type:'TURNON_POPINFORM',
        status:status,
        data:data
    }
}
 const action_turnoffPop=()=>{
    return{
        type:'TURNOFF_POPINFORM'
    }
}
export const action_autoPop=(data,delay=5000,status)=>(dispatch)=>{

    clearTimeout(timer)
    dispatch(action_turnonPop(data,status));
    timer=setTimeout(()=>{
        dispatch(action_turnoffPop())
    },delay)
}


export const action_postSaveContent=(argObj)=>(dispatch,getState)=>{
    if(getState().mockData){return  dispatch(action_autoPop('SAVE成功',5000,'success'))}
    postData(argObj).then(data=>{
        dispatch(action_autoPop('SAVE'+data.message,5000,data.status))
    })
}
export const action_postAddContent=(argObj)=>(dispatch,getState)=>{
    if(getState().mockData){return dispatch(action_autoPop('ADD成功',5000,'success'))}
    postData(argObj).then(data=>{
        dispatch(action_autoPop('ADD'+data.message,5000,data.status))
    })
}
export const action_postDeleteContent=(argObj)=>(dispatch,getState)=>{
    if(getState().mockData){return dispatch(action_autoPop('DEL成功',5000,'success'))}
    postData(argObj).then(data=>{
        dispatch(action_autoPop('DEL'+data.message,5000,data.status))
    })
}



export const action_setActiveNav=()=>({
    type:'SET_ACTIVE_NAV'
})

 const action_fetchNavRequest=(section)=>({
    type:'FETCH_NAV_REQUEST',
    section:section
})

 const action_fetchNavReceive=(section,data)=>({
    type:'FETCH_NAV_RECEIVE',
    post:data,
    section:section
})



 const action_fetchContentRequest=(section)=>({
    type:'FETCH_CONTENT_REQUEST',
    section:section
})

 const action_fetchContentReceive=(section,data)=>({
    type:'FETCH_CONTENT_RECEIVE',
    post:data,
    section:section
})



export const action_showDetail=(navName,forceState)=>({
    type:'SHOW_DETAIL',
    forceState:forceState,
    navName:navName
})

export const action_add=(section,maxID)=>({
    type:"ADD_CONTENT",
    section:section,
    maxID:maxID
})

export const action_edit=(section,i)=>({
    type:'EDIT_CONTENT',
    i:i,
    section:section
})

export const action_delete=(section,i)=>({
    type:'DELETE_CONTENT',
    i:i,
    section:section
})

export const action_cancel=(section,i)=>({
    type:'CANCEL_CONTENT',
    section:section,
    i:i
})

export const action_save=(section,title,content,i)=>({
    type:'SAVE_CONTENT',
    title:title,
    content:content,
    section:section,
    i:i
})


 const action_setSearchValue=(value)=>{
    return {
        type:'SEARCH_VALUE',
        value:value
    }
}

export const action_calcSearchList=(value)=>(dispatch,getState)=>{
    let deepList=getState().navList.deepList;

    dispatch(action_setSearchValue(value))
    dispatch(action_setSearchList(value2pathname(value,deepList)))
}

 export const action_setSearchList=(arr)=>{
    return {
        type:'SEARCH_LIST',
        list:arr
    }
}