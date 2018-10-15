import React from 'react'

export default class Bundle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mod:null,
            err:null
        }
    }
    componentWillMount(){
        this.loadMod(this.props.component)
    }
    componentWillReceiveProps(nextProps){
        if(this.props.name!==nextProps.name){
            this.loadMod(nextProps.component)
        }
    }
    loadMod(prop){
        this.setState({
            mod:null,
            err:null
        });
        prop().then((mod)=>{
            this.setState({
                mod:mod.default?mod.default:mod
            })
        },(err)=>{
            this.setState({
                err:err
            })
        }).catch(err=>alert(err))
    }
    render(){
        const {mod,err}=this.state
        return(
            this.props.children(mod?mod:err?['Error',err.message]:null)
        )
    }
}
