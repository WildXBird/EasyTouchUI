import React, { PureComponent } from 'react';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { Row, Col } from 'antd';
import { Speech } from 'components/VoiceSpeech';
import lunisolar from 'lunisolar';

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
    const d = lunisolar()
    return (
      <>
        <div style={{
          width: "100%", height: "100vh", textAlign: "center",
          backgroundColor: this.state.dark ? "#23272D" : "#FFFFFF", color: this.state.dark ? "white" : "black"
        }}>
          <Row>
            <Col span={8} style={{ height: "100vh", transform: "scaleY(0.8)" }}>
              {this.renderDayCard(new Date().valueOf() - 3600 * 1000 * 24)}
            </Col>
            <Col span={8} style={{ height: "100vh", transform: "scaleY(0.9)", zIndex: 9 }}>
              {this.renderDayCard(new Date("2024-10-11T12:00:00+08:00").valueOf())}
            </Col>
            <Col span={8} style={{ height: "100vh", transform: "scaleY(0.8)" }}>
              {this.renderDayCard(new Date().valueOf() + 3600 * 1000 * 24)}
            </Col>
          </Row>
        </div>

      </>
    );
  }
  renderDayCard(date) {
    const lunar = lunisolar(new Date(date))

    return <div style={{
      width: "100%", height: "100%", backgroundColor: "#fff9c7",
      boxShadow: `0 0 20px 8px #848484`
    }}>
      <div style={{ fontSize: 48 }}>
        {lunar.lunar.getMonthName()}
      </div>
      <div style={{ fontSize: 180 }}>
        {lunar.lunar.day}
      </div>
      <div style={{ fontSize: 48, lineHeight: 48 }}>
        {lunar.solarTerm?.toString()}节气
      </div>
      <div style={{ fontSize: 48, lineHeight: 48 }}>
        {lunar.solarTerm?.toString()}节气
      </div>
    </div>
  }
  async componentDidMount() {
    setTimeout(() => {
      // this.backHome()
    }, 30000);
    Speech.cancel()
    const lunar = lunisolar()
    let month = lunar.lunar.getMonthName()
    let day = lunar.lunar.day
    const 节气 = lunar.solarTerm?.toString()

    switch (lunar.lunar.month) {
      case 1:
        month = "一月正月"
        break;
      case 11:
        month = "十一月冬月"
        break;
      case 12:
        month = "十二月腊月"
        break;
      default:
        break;
    }

    if (lunar.lunar.month === 1 && lunar.lunar.day < 10) {
      day = `初${lunar.lunar.day}`
    }
    const text = [`今天是农历 ${month} ${day}`]
    if (节气) {
      text.push(`今天的节气是${节气}`)
    }
    setTimeout(() => {
      Speech(text.join("\n"), () => {
        // this.backHome()
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