import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {   action_getSectionContent,
            action_add,
            action_autoPop} from '../actions'
import {getPath,scrollToX} from '../other/tools'
import * as Immutable from 'immutable';
import EditDetail from './editdetail'
import Detail from './detail'
import {replace } from 'react-router-redux'
import isPhone from '../isphone'
import {FetchingData,NoData,NotFound} from '../tipsPage'


const {is,fromJS}=Immutable;


/**
 * 替换url为'/'+section，
 * 因为地址栏如果为../jquery/进入，
 * 再点击detail会发生错误，
 * 因为url此时是"/jquery/"而不是"/jquery"
 */
class Template extends React.Component{

    constructor(props){
        super(props);
        this.handleAdd=this.handleAdd.bind(this);
    }
    shouldComponentUpdate(nextProps){
        return !(is(fromJS(this.props),fromJS(nextProps)))
    }
    /**
     * 获取section数据
     */
    //原 componentWillMount
    componentDidMount(){
        const {section,dispatch}=this.props;
        let argObj={section:section,select:['*'],condition:'1'};
        dispatch(action_getSectionContent(section,argObj))
    }

    /**
     * 404判断
     * pop弹框
     * 获取URL中section之后的所有值 对比每一个的name
     * @param nextProps
     */
    componentDidUpdate(nextProps){
        const {curList,activeNav,dispatch,section}=this.props;
        const curPath=activeNav
        const curDetailName=getPath(curPath,0,true)
        if(curList && curList[0]){
            const result=curList.find(e=>e.name===curDetailName)
            if(!result && curDetailName!==''){
                dispatch(action_autoPop(`404-未找到'${curDetailName}'`,6000,'error'))
                dispatch(replace('/'+section))
            }
        }

    }

    /**
     * +按钮
     * 先算出当前最大的id，再+1
     * 再scroll到最顶端
     */
    handleAdd(){
        const {section,dispatch}=this.props;
        let maxID;
        if(this.idArr.length===0){maxID=1}else{
            maxID=Math.max.apply(Math,this.idArr)+1;
        }
        dispatch(action_add(section,maxID))
        let sections=document.getElementsByClassName('sections')[0];
        scrollToX(sections,0,true)
    }

    render(){
        this.idArr=[];
        const {section,contentIsFetching,curList,activeNav}=this.props;
        if(!curList){return <NotFound />}
            /**
             * fetching只有连接上数据库
             */
        if(contentIsFetching){return <FetchingData />}
        return(
            <section className={isPhone?"sections secwap":"sections secweb"}>
                <p>公用section</p>
                <h1>{section.toUpperCase()}</h1>
                <Link to={`/${section}`}><button className="add" onClick={this.handleAdd}>+</button></Link>
                {curList.length>0?curList.map((e,i)=>{
                    this.idArr.push(e.id);
                    return (
                        e.isEditing?
                            <EditDetail key={e.id}
                                        i={i}
                                        id={e.id}
                                        content={e.content}
                                        name={e.name}
                                        newAdd={e.newAdd}
                                        section={section}
                                        curPath={activeNav}/>:
                            <Detail key={e.id}
                                    id={e.id}
                                    content={e.content}
                                    name={e.name}
                                    newAdd={e.newAdd}
                                    section={section}
                                    i={i}
                                    curPath={activeNav}/>)
                }):
                    <NoData />
                }
            </section>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{
        contentIsFetching:state.content.isFetching,
        curList:state.content[ownProps.section],
        activeNav:state.router.location.pathname
    }
}

export default Template=(connect(mapStateToProps)(Template))


