import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {action_showDetail} from '../actions'
import {getPath} from '../other/tools'
import ShallowListTitle from './shallowlist-title'
import DeepListTitle from './deeplist-title'

class NavCore extends React.Component {

    handleShallowClick=(name,e)=>{
        const {showDetailNav,listTitleClick}=this.props
        if(listTitleClick)listTitleClick(e);
        showDetailNav(name,true)
    }

    componentDidMount(nextProps){
        const {showChild,activeNav,showDetailNav}=this.props
        if (!showChild) {
            return
        }
        const name = getPath(activeNav,0)
            showDetailNav(name, true)

    }

    render() {

        let {css,showChild,shallowList,listTitleClick}=this.props
        //console.log('render')
        let {nav,firstLi,secondLi,firstUl,secondUl}=css

        return (
            <nav className={nav}>
                <ul className={firstUl}>
                    <li key={0} className={firstLi}>
                        <NavLink  exact={true}
                                  to="/"
                                  onClick={listTitleClick}
                                  activeStyle={{borderBottom:'3px solid #dadada',padding:'0.5rem',background:'#79cfcb'}}>
                            Overview</NavLink>
                    </li>
                    {shallowList.map((e, i)=>(
                        <li key={e.id} className={firstLi}>
                            {showChild ?
                                <ShallowListTitle name={e.name}>
                                    <DeepListTitle secondLi={secondLi}
                                                   secondUl={secondUl}
                                                   i={i}
                                                   listTitleClick={listTitleClick}
                                                   name={e.name}/>
                                </ShallowListTitle> :
                                <NavLink to={`/${e.name}`}
                                         onClick={this.handleShallowClick.bind(this,e.name)}
                                         activeStyle={{borderBottom:'3px solid #dadada',padding:'0.5rem',background:'#79cfcb'}} >
                                    {e.name}
                                </NavLink>
                            }

                        </li>
                    ))}
                </ul>

            </nav>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        shallowList: state.navList.shallowList,
        activeNav:state.router.location.pathname
    }
}
const mapDispatchToProps = {
    showDetailNav: action_showDetail
}

export default NavCore = connect(mapStateToProps, mapDispatchToProps)(NavCore)