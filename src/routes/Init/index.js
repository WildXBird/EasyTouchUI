import React, { PureComponent } from 'react';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';

export default class AdvancedProfile extends PureComponent {
  constructor() {
    super()
  }
  render() {
    return (
      <>
        <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <input type="file" capture="camera" accept="image/*"/>


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
  var video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  
  // 获取用户的摄像头和麦克风权限
  navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
    // 将视频流赋值给 video 元素的 src 属性
    video.src = URL.createObjectURL(stream);
    // 将 video 元素添加到页面中
    document.body.appendChild(video);
    // 播放视频
    video.play();
  }, function(error) {
    // 处理错误
    console.error(error);
  });


  // alert(JSON.stringify(Object.keys(navigator)))
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