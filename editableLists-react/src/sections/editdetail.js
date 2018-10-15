import React from 'react'
import {Prompt} from 'react-router-dom'
import {connect} from 'react-redux'
import {   action_getNavList,
            action_save,
            action_cancel,
            action_delete,
            action_postSaveContent,
            action_postAddContent,
            action_autoPop} from '../actions'
import {getPath} from '../other/tools'

class EditDetail extends React.Component{
    constructor(props){
        super(props)
        this.handleSave=this.handleSave.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.checkDirty=this.checkDirty.bind(this)
        this.state={
            isDirty:false
        }
        this.fromSave=false
        this.newAdd=props.newAdd
    }

    /**
     * cancel只是将isEditing设置为false
     */
    handleCancel(){
        const {dispatch,i,section}=this.props
        dispatch(action_cancel(section,i))
    }


    handleSave(){
        const {dispatch,i,section,id,newAdd,content,name}=this.props;
        const newTitle=this.changeTitle.value
        const newContent=this.changeContent.value

        //确定不为空
        if(newTitle.trim()==='' || newContent.trim()===''){alert('标题和内容不能为空');return}
        //无变动情况
        if(newContent===content && newTitle===name){
            dispatch(action_autoPop('无变动，无须提交',3000));
            dispatch(action_cancel(section,i))
            this.fromSave=true;
            return;
        }
        //有变动情况
        /**
         * &字符要转换成%26才能进行post
         */
        let _newTitle=newTitle.replace(/[&]/g,(match)=>escape(match))
        let _newContent=newContent.replace(/[&]/g,(match)=>escape(match))
        let argObj={section,id,text:_newContent,titleName:_newTitle,type:'save'}

        if(newAdd){
            argObj.type='add';
            dispatch(action_postAddContent(argObj))
        }else{
            dispatch(action_postSaveContent(argObj));
        }
        dispatch(action_save(section,newTitle,newContent,i));
        dispatch(action_getNavList(section));
        this.fromSave=true;
    }

    /**
     * 标题或者内容和原内容不符则判定为dirty
     * @param e
     */
    checkDirty(e){
        const {nodeName,value}=e.target;
        const {content,name}=this.props;
        let dirty=false
        switch(nodeName){
            case('INPUT'):
                value===name?dirty=false:dirty=true;
                break;
            case('TEXTAREA'):
                value===content?dirty=false:dirty=true;
                break;
            default:
                dirty=false;
        }
        this.setState({
            isDirty:dirty
        })
    }


    /**
     * 离开section时 取消edit状态
     * newAdd 如果通过save离开 则cancel 不是save则delete
     * 非newAdd 都一律cancel
     */
    componentWillUnmount(){
        const {dispatch,i,section}=this.props
        if(this.newAdd){
            if(this.fromSave){
                dispatch(action_cancel(section,i))
            }else{
                dispatch(action_delete(section,i))
            }
        }else{
            dispatch(action_cancel(section,i))
        }
        this.fromSave=false;
        this.newAdd=false;
    }

    /**
     * 切换detail时 取消edit状态
     * @param nextProps
     */
    componentDidUpdate(){
        const {dispatch,i,section,curPath}=this.props
        const curDetail=this.props.name;
        const nextDetail=getPath(curPath,1)
        if(curDetail!==nextDetail){
            dispatch(action_cancel(section,i))
        }
    }
    render(){
        const {content,name}=this.props
        return(
            <div>
                <Prompt
                    when={this.state.isDirty}
                    message={() => {
                        return (
            `修改尚未保存，确定离开？`
          )}
          }
                />
                <input style={{width:'90%'}} type="text" placeholder="标题" autoFocus={true} onChange={this.checkDirty} defaultValue={name} ref={v=>this.changeTitle=v}/>
                <div>
                    <textarea style={{width:'90%',height:'5rem'}} placeholder="内容" onChange={this.checkDirty}  defaultValue={content} ref={v=>this.changeContent=v} />
                </div>
                <button className="save" onClick={this.handleSave}>save</button>
                <button className="cancel" onClick={this.handleCancel}>cancel</button>
            </div>
        )
    }
}


export default EditDetail=connect()(EditDetail)