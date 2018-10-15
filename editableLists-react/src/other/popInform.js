import React from 'react'

export default class PopInform extends React.Component{
    render(){
        let clsName='';
        let {data,status}=this.props;
        if(status==='success'){
            clsName='popInform popSuc'
        }else if(status==="error"){
            clsName='popInform popErr'
        }else{clsName='popInform'}
        return(
            <div className={clsName}>
                <span>{data}</span>
            </div>
        )
    }
}