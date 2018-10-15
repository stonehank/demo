import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {action_autoPop} from '../actions'

class ErrorSection extends React.Component{
    componentDidMount(){
        const {dispatch,errMessage}=this.props
        dispatch(action_autoPop(`${errMessage}`,5000,'error'))
    }
    render(){
        return <Redirect to='/' />
    }
}
export default ErrorSection=connect()(ErrorSection)