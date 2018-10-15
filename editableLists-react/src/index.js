import React from 'react'
import ReactDOM from 'react-dom'
import {Route,Switch} from 'react-router-dom'
import {createStore,applyMiddleware,compose } from 'redux'
import {connect,Provider} from 'react-redux'
import {ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'

import {action_getNavList,action_setSearchList} from './actions'
import showPrompt from './other/prompt'
import reducers from './reducer'

import './css/marginpadding.css'
import 'normalize.css'
import './css/index.css'

import Search from './search/search'
import CreateNav from './nav/createnav'
import Overview from './sections/sectionContent/overview'
import PopInform from './other/popInform'
import SectionWrap from './sections/sectionwrap'
import isPhone from './isphone'

//redux-router history creation function
const history = createHistory({
    getUserConfirmation:showPrompt
});

const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//两种写法一致
//写法1
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk,middleware)
));
//写法2
//const enhanceCS=composeEnhancers(
//    applyMiddleware(thunk,middleware)
//)(createStore)
//const store = enhanceCS(reducers);



class App extends React.Component {

    constructor(){
        super()
        this.closeSearchList=this.closeSearchList.bind(this)
    }
    componentWillMount(){
        const {dispatch}=this.props
        dispatch(action_getNavList())
    }

    closeSearchList(){
        const {dispatch}=this.props
        dispatch(action_setSearchList(false))
    }
    render() {
        const {navIsFetching,showPopInform}=this.props;
        return (
            <ConnectedRouter history={history} >
                <div onClick={this.closeSearchList}>
                    {showPopInform.promptSwitch
                        ?
                        <PopInform data={showPopInform.data} status={showPopInform.status}/>
                        :
                        null}
                    <div className="navMain">
                        {(navIsFetching)?
                            <span>Fetching Nav...</span> :
                                <CreateNav type={isPhone?'wapNav':'webNav'} orient="horizontal" showChild={false} />}
                        <Search />
                    </div>
                    <Switch>
                        <Route exact path="/"  component={Overview} />
                        <Route path="/:section" component={SectionWrap}/>
                    </Switch>
                </div>
            </ConnectedRouter>

        )
    }
}

const mapStateToProps=(state)=>{
    return{
        navIsFetching:state.navList.isFetching,
        showPopInform:state.content.showPopInform

    }
}
App=connect(mapStateToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
