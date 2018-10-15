import React from 'react'
import {Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPath} from '../other/tools'
import ShowDetail from './showdetail'

class Detail extends React.Component{
    /**
     * 只渲染准备前往的detail（打开）和之前的detail（关闭）
     * @param nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps){
        const curProps=this.props;
        let nextPathname=getPath(nextProps.curPath,1);
        let curPathName=getPath(curProps.curPath,1);
        return nextPathname===nextProps.name || curPathName===nextProps.name
    }

    render(){
        const {content,name,i,id,section}=this.props
        return(
            <li ><Link id={'hash_'+name} className="section-title" to={`/${section}/${name}`} >{name}</Link>
                <Route path={`/${section}/${name}`} render={()=>{
            return <ShowDetail name={name}
                                       content={content}
                                       section={section}
                                       i={i}
                                       id={id}
                                       />
                                        }} />
            </li>
        )
    }
}

export default Detail=connect()(Detail)