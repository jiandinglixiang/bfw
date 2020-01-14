import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import home from './page/home/store'
import AnalysisData from './page/AnalysisData/store'
import ReduxThunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // redux-devtool

export const store = createStore(
  combineReducers({
    home: home.reducer,
    details: AnalysisData.reducer
  }),
  composeEnhancers(applyMiddleware(ReduxThunk)) // 中间件
)

export default store
