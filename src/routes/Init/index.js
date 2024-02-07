import React, { PureComponent } from 'react';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';

export default class AdvancedProfile extends PureComponent {
  constructor() {
    super()
  }
  render() {
    return (
      <>
        <div style={{ width: "100%", height: "100%", textAlign: "center",paddingTop:200 }}>

          <button id="wtf"
            onClick={this.speakText.bind(this)}
            style={{
              width: 250,
              height: 250,
              background: "red",
              borderRadius: "100%",
              fontSize: 32
            }}>点击</button>
        </div>

      </>
    );
  }
componentDidMount(){
  
}
  into() {
    const { history } = this.props;
    window.init = true
    history.push("/home/home");
  }
  speakText() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = "你好";
    msg.lang = 'zh-CN';
    msg.rate = 0.5;
    msg.pitch = 1.0;
    msg.volume = 1.0;
    // msg.onend = this.into.bind(this)
    window.speechSynthesis.speak(msg);
    this.into()
  }

} 