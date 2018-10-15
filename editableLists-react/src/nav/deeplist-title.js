
import React from 'react'
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'



class DeepListTitle extends React.Component{
    render(){
        //console.log('render')
        let {deepList,secondLi,name,listTitleClick,secondUl}=this.props;

        let listLen = deepList ? deepList.length : 0;
        return (
            listLen > 0 ?
                <ul className={secondUl}>
                    {deepList.map((_e)=>(
                        <li key={_e.id} className={secondLi} >
                            <NavLink to={`/${name}/${_e.name}`}
                                     onClick={listTitleClick}
                                     activeStyle={{borderLeft:'3px solid #dadada',paddingLeft:'0.5rem',background:'#79cfcb'}}>{_e.name}</NavLink>
                        </li>
                    ))}
                </ul> :
                <p>无数据</p>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {

    return {
        deepList: state.navList.deepList[ownProps.name],
        activeNav:state.router.location.pathname
    }
}


export default DeepListTitle = connect(mapStateToProps)(DeepListTitle)