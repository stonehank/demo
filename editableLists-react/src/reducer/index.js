import * as Immutable from 'immutable';
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'

const {Map,List,fromJS}=Immutable;

 const reducer_getNavList_fetchStatus=(state=true,action)=>{
    switch(action.type){
        case('FETCH_NAV_REQUEST'):
            return true
        case('FETCH_NAV_RECEIVE'):
            return false
        default:
            return state;
    }
}


const reducer_getShallowList=(state=[],action)=>{
    switch(action.type){
        case('FETCH_NAV_RECEIVE'):
            return action.post.shallowList;
        default:
            return state;
    }
}

const reducer_getDeepList=(state={},action)=>{
    switch(action.type){
        case('FETCH_NAV_RECEIVE'):
            return action.post.deepList;
        default:
            return state;
    }
}

const reducer_getNavList_showingDetail=(state={},action)=>{
    switch(action.type){
        //case('FETCH_NAV_RECEIVE'):
        //    return action.post.showingDetail;
        case('SHOW_DETAIL'):
            let trueKey=Map(state).findKey(v=>v===true);
            let oldStatus=state[action.navName];
            return Map(state).withMutations(map=>{
                if(trueKey){map.set(trueKey,false)}
                map.set(action.navName,(action.forceState || !oldStatus))
            }).toJS();
        default:
            return state;
    }
}
const reducer_getContent_fetchStatus=(state=true,action)=>{
    switch(action.type){
        case('FETCH_CONTENT_REQUEST'):
            return true;
        case('FETCH_CONTENT_RECEIVE'):
            return false;
        default:
            return state;
    }
}
const reducer_getContent_showPopInform=(state={},action)=> {
    switch (action.type) {
        case('TURNON_POPINFORM'):
            return {data:action.data,status:action.status,promptSwitch:true};
        case('TURNOFF_POPINFORM'):
            return {data:null,status:null,promptSwitch:false};
        default:
            return state;
    }
}

const reducer_getContent_Content=(state=[],action)=>{
    //if(!action.section){throw new Error('必须带有section参数')}
    switch(action.type){
        case('FETCH_CONTENT_RECEIVE'):
            return action.post[action.section]
        case('ADD_CONTENT'):
            const list=List(state)
            return list.unshift({id:action.maxID,name:'',content:'',isEditing:true,newAdd:true}).toJS()
        case('DELETE_CONTENT'):
            return List(state).delete(action.i).toJS()
        case('EDIT_CONTENT'):
            return fromJS(state).setIn([action.i,'isEditing'],true).toJS()
        case('CANCEL_CONTENT'):
            return fromJS(state).setIn([action.i,'isEditing'],false).toJS()
        case('SAVE_CONTENT'):
            console.log('exe')
            return fromJS(state)
                .withMutations(list=>list
                    .setIn([action.i,'name'],action.title)
                    .setIn([action.i,'content'],action.content)
                    .setIn([action.i,'newAdd'],false)
                    .setIn([action.i,'isEditing'],false)).toJS()
        default:
            return state
    }
}


const reducer_searchValue=(state='',action)=>{
    switch(action.type){
        case('SEARCH_VALUE'):
            return action.value
        default:
            return state
    }
}
const reducer_searchList=(state=false,action)=>{
    switch(action.type){
        case('SEARCH_LIST'):
            return action.list
        default:
            return state
    }
}

const reducer_setDataStatus=(state=null,action)=>{
    switch(action.type){
        case('SET_DATASTATUS'):
            return action.status;
        default:
            return state
    }
}

function content(state={},action){
    return Object.assign({},state,{
        isFetching:reducer_getContent_fetchStatus(state.isFetching,action),
        showPopInform:reducer_getContent_showPopInform(state.showPopInform,action),
        [action.section]:action.section?reducer_getContent_Content(state[action.section],action):null
    })
}

const rootReducer=combineReducers({
    mockData:reducer_setDataStatus,
    navList:combineReducers({
        shallowList:reducer_getShallowList,
        isFetching:reducer_getNavList_fetchStatus,
        showingDetail:reducer_getNavList_showingDetail,
        deepList:reducer_getDeepList
    }),
    content,
    search:combineReducers({
        searchValue:reducer_searchValue,
        searchList:reducer_searchList
    }),
    router: routerReducer
})


export default rootReducer
