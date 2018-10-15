import React from 'react'
import {connect} from 'react-redux'
import {action_showDetail} from '../actions'


class ShallowListTitle extends React.Component {
    constructor(){
        super()
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(){
        let {name,showDetailNav}=this.props
        showDetailNav(name)
    }
    render() {
        let {name,showingDetail}=this.props
        return (
            <React.Fragment>
                <span onClick={this.handleClick}>{name}</span>
                {showingDetail[name] ? this.props.children : null}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        showingDetail: state.navList.showingDetail,
        activeNav:state.router.location.pathname
    }
};
const mapDispatchToProps = {
    showDetailNav: action_showDetail
};

export default ShallowListTitle = connect(mapStateToProps, mapDispatchToProps)(ShallowListTitle);
