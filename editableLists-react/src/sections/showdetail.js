import React from 'react'
import {connect} from 'react-redux'
import {   action_edit,
            action_getNavList,
            action_delete,
            action_postDeleteContent,
            } from '../actions'
import {scrollToX} from '../other/tools'
import showPrompt from '../other/prompt'
import {replace } from 'react-router-redux'



class ShowDetail extends React.Component{

    /**
     * 删除包括（store上删除，重新渲染菜单项，数据库删除）
     * @param i
     * @param id
     */
    handleDelete(i,id){
        showPrompt('确定删除？',(boolean)=>{
            if(boolean){
                const {dispatch,section}=this.props;
                let argObj={id:id,section:section,type:'del'};
                dispatch(action_delete(section,i))
                dispatch(action_getNavList(section));
                dispatch(action_postDeleteContent(argObj))
                dispatch(replace('/'+section))
            }else{
                return false;
            }
        })
    }

    /**
     * edit 只是将isEditing设置为true
     * @param i
     */
    handleEdit(i){
        const {dispatch,section}=this.props;
        dispatch(action_edit(section,i))
    }

    /**
     * 当前detail scroll到最顶端
     */
    componentDidMount(){
        const {name}=this.props
        let sections=document.getElementsByClassName('sections')[0],
            curHashEle=document.getElementById('hash_'+name);
        if(curHashEle)scrollToX(sections,curHashEle.offsetTop)
    }
    render(){
        const {content,i,id}=this.props
        return(
            <React.Fragment>
                <pre>{content}</pre>
                <button className="edit" onClick={this.handleEdit.bind(this,i)}>edit</button>
                <button className="delete" onClick={this.handleDelete.bind(this,i,id)}>delete</button>
            </React.Fragment>
        )
    }
}

export default ShowDetail=connect()(ShowDetail)