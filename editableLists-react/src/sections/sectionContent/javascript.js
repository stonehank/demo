import React from 'react'
import Template from './../template'

export default class Javascript extends React.Component{
    render(){
        const {section}=this.props
        return(
            <React.Fragment>
                <p>{`这是${section} section`}</p>
                <Template  section={section} />
            </React.Fragment>

        )
    }
}




