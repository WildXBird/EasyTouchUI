import './polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './rollbar';

import './index.less';
{
  //优化环境
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  // document.body.addEventListener('touchmove', function (e) {
  //   if (e._isScroller) return;
  //   e.preventDefault();//阻止默认的处理方式(阻止下拉滑动的效果)
  // }, {
  //   passive: false
  // });//passive 参数不能省略，用来兼容ios和android
}
// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
