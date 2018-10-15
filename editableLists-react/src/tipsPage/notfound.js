import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound(){
    return (
        <div>
            <p style={{color:"red"}}>未找到section!</p>
            <Link to="/"><button>回首页</button></Link>
        </div>
    )
}

