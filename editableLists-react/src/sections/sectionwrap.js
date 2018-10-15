import React from 'react';
import Bundle from './bundle'
import CreateNav from '../nav/createnav'
import {connect} from 'react-redux'
import isPhone from '../isphone'
import {ErrorSection,Loading} from '../tipsPage'


 class SectionWrap extends React.PureComponent {
    render() {
        const {match,isMockData}=this.props
        const section=match.params.section
        const curSection = section ? section : 'Overview'
        return (
        isMockData===null?
            <p>检查是否能连接数据库...</p>:
            <div className="sectionContents">
                {createSectionLazy(curSection,{section},isMockData)}
                <CreateNav type={isPhone?'wapNav':'webNav'} orient="vertical" showChild={true} match={match}/>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        isMockData:state.mockData
    }
}
export default SectionWrap=connect(mapStateToProps)(SectionWrap)

/**
 * 分别判断mod存在，不存在和错误的情况
 */
 function createSectionLazy(name,props,isMockData){
    var lowerName=name.toLowerCase();
    return (
    /**
     * 能连接数据库时，则用lazy加载各自的section
     * 不能连接数据库则lazy加载同一个section
     */
        <Bundle component={()=>{return isMockData?import(`./template`):import(`./SectionContent/${lowerName}`)}} name={lowerName}>
            {(Mod)=>{
                if(typeof Mod==='function'){
                    return <Mod {...props}/>
                }else if(Mod){
                    /**
                     * 此处只有通过第二种import才会进行
                     */
                    var errMessage=Mod[1]
                    return <ErrorSection errMessage={errMessage} />
                }else{
                    return <Loading />
                }
            }}
        </Bundle>
    )
}


