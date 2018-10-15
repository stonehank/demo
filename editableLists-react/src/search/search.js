import React from 'react'
import {action_calcSearchList,action_setSearchList,action_showDetail} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPath} from '../other/tools'

export default class Search extends React.Component{
    constructor(){
        super()
        this.state={
            searching:false
        };
        this.toInput=this.toInput.bind(this)
        this.blur=this.blur.bind(this)
    }
    blur(){
        this.setState({
            searching:false
        })
    }
    toInput(){
        this.setState({
            searching:true
        })
    }
    render(){
        return this.state.searching
            ?
            <SearchInput  blur={this.blur} />
            :
            <h2 className="search" onClick={this.toInput}>search</h2>

    }
}

class SearchInput extends React.Component{
    constructor(props) {
        super(props)
        this.blur=this.blur.bind(this)
        this.valueChange=this.valueChange.bind(this)
    }
    valueChange(e){
        const {dispatch}=this.props;
        const v=e.target.value;
        if(v.trim()===""){return dispatch(action_setSearchList(false))}
        dispatch(action_calcSearchList(v))
    }
    blur(e){
        const v=e.target.value;
        if(v.trim()==="")this.props.blur()
    }

    goToDetail(path){
        const {dispatch}=this.props;
        dispatch(action_setSearchList(false));
        this.props.blur()
        let name=getPath(path,0)
        dispatch(action_showDetail(name,true))
    }
    render(){
        const {searchList}=this.props
        return(
            <div className="searchInputWrap">
                <input type="text" autoFocus={true} placeholder="请输入搜索" onChange={this.valueChange} onBlur={this.blur} />
                <ul>
                    {searchList
                        ?
                        searchList[0]
                            ?
                            searchList.map((e,i)=>(
                                <li  key={i}>
                                    <Link  onClick={this.goToDetail.bind(this,e)} to={e}>{e}</Link>
                                </li>))
                            :
                            <p>无数据</p>
                        :
                        null}
                </ul>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        searchList:state.search.searchList
    }
}

SearchInput=connect(mapStateToProps)(SearchInput)
