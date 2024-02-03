import React, { PureComponent } from 'react';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { Speech } from 'components/VoiceSpeech';

export default class AdvancedProfile extends PureComponent {
  constructor() {
    super()
    this.state = {
      temperature: undefined,
      temperatureLow: undefined,
      temperatureHigh: undefined,
      ymdText: undefined,
      type: undefined,
      week: undefined,
      dark: false,
      icon: undefined,
    }
  }
  render() {
    return (
      <>
        <div style={{
          width: "100%", height: "100vh", textAlign: "center",
          backgroundColor: this.state.dark ? "#23272D" : "#FFFFFF", color: this.state.dark ? "white" : "black"
        }}>
          <video id="video" autoplay></video>
          <button id="capture">拍照</button>
          <canvas id="canvas" width="640" height="480"></canvas>
        </div>

      </>
    );
  }
  async componentDidMount() {
      // 获取视频和画布元素
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var captureButton = document.getElementById('capture');
  // 获取媒体流
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        // 将媒体流绑定到video元素上
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err0r) {
        console.log("An error occurred: " + err0r);
      });
  } else {
    alert('抱歉，您的浏览器不支持摄像头功能。');
  }
  // 拍照功能
  captureButton.addEventListener('click', function() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 这里可以进一步处理图片，例如上传或保存
  });
  }
  backHome() {
    setTimeout(() => {
      this.props.history.push("/home/home");
    }, 5000)
  }


} 