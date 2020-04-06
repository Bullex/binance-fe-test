import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import initStore from './libs/initRedux'
import MarketContainer from './containers/MarketContainer';

import 'antd/dist/antd.css';

const { store } = initStore()

ReactDOM.render(
  <Provider store={store}>
    <MarketContainer />
  </Provider>,
  document.getElementById("root")
);
