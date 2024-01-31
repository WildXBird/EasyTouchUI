import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "./style/antd.min.css"
import App from './routes/home/index';


class Root extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}
ReactDOM.render(<Root />, document.getElementById('root'));





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
