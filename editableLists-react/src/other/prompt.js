import React from 'react';
import ReactDOM from 'react-dom'

 class MyPrompt extends React.Component{
    render(){
        const {message,onCancel,onConfirm}=this.props
        return(
            <React.Fragment>
        <div className="mask"></div>
            <div className="promptModal">
                <p>{message}</p>
                <div>
                    <button onClick={onConfirm}>yes</button>
                    <button onClick={onCancel}> no</button>
                </div>
            </div>
                </React.Fragment>
        )
    }
}

export default function showPrompt(message,callback){

    const modal=document.getElementById('modal');
    modal.style.display='block';

    const withCleanup = (answer) => {
        modal.style.display='none';
        callback(answer)
    };
        ReactDOM.render(
            <MyPrompt
                message={message}
                onCancel={() => withCleanup(false)}
                onConfirm={() => withCleanup(true)}/>
            ,modal
        )
}