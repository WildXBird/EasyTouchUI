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
          backgroundColor: this.state.dark?"#23272D":"#FFFFFF", color:  this.state.dark?"white":"black" 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: 64 }}>
              {this.state.ymdText}
            </div>
            <div style={{ fontSize: 64 }}>
              {this.state.week}
            </div>
          </div>
          <div style={{ fontSize: 128, position: "absolute", bottom: 0, width: "100%" }}>
            <div style={{ fontSize: 64, display: "block" }}>
              <div>
                <img src={this.state.icon} style={{ width: 400 }} />
              </div>
            </div>
            <div style={{ display: "block" }}>
              {this.state.temperatureLow}
              <span style={{ fontSize: 64, }}>{"度"}</span>
              <span style={{ color:  this.state.dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)"  }}>{"-"}</span>
              {this.state.temperatureHigh}
              <span style={{ fontSize: 64, }}>{"度"}</span>
            </div>
          </div>
        </div>

      </>
    );
  }
  async componentDidMount() {
    setTimeout(() => {
      this.backHome()
    }, 30000);
    Speech.cancel()
    const data = await this.getWeather()
    const weather = data.weather

    const ymd = weather.today.ymd.split("-")
    this.setState({
      temperature: (weather.today.high + weather.today.low) / 2,
      temperatureHigh: weather.today.high,
      temperatureLow: weather.today.low,
      ymdText: `${ymd[0]}年${ymd[1]}月${ymd[2]}日`,
      type: weather.today.type,
      week: weather.today.week,
    })

    if (weather.today.type.indexOf("晴") !== -1) {
      this.setState({
        background: "/background/beach-3434591_640.jpg",
        icon: "/icon/sunny.svg",
      })
    } else if (weather.today.type.indexOf("雨") !== -1) {
      this.setState({
        background: "/background/raindrop-6544618_640.jpg",
        icon: "/icon/rain.svg",
      })
    } else if (weather.today.type.indexOf("云") !== -1) {
      this.setState({
        background: "/background/raindrop-6544618_640.jpg",
        icon: "/icon/cloudy.svg",
      })
    }
    this.setState({
      background: "/background/beach-3434591_640.jpg",
      icon: "/icon/sunny.svg",
      dark:false
    })
    setTimeout(() => {
      Speech(data.text, () => {
        this.backHome()
      })
    }, 0);
  }
  backHome() {
   setTimeout(() => {
    this.props.history.push("/home/home");
   }, 5000)
  }
  async getWeather() {
    return await (await fetch("http://d0252043043d462399c1c4f48df972dc.apig.cn-east-2.huaweicloudapis.com/weather")).json()
  }

} 