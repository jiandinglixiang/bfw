import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import { device, updateDeviceSize } from './page/device'
import details from './page/details/store'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // redux-devtool
export const store = createStore(
  combineReducers({
    device: device.reducer,
    details: details.reducer,
  }),
  composeEnhancers(applyMiddleware(ReduxThunk)), // 中间件
)
updateDeviceSize(store)// 设备宽高更新
export default store
