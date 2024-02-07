import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { Speech } from 'components/VoiceSpeech';

export default class AdvancedProfile extends PureComponent {
  constructor() {
    super()
  }
  render() {
    return (
      <>
        <div>
          {/* <button id="wtf" 
          onClick={()=>{alert("onClick2")}}
          onPointerDown={speakText}
          style={{
            width:100,
            height:100
          }}>朗读文本4</button> */}
        </div>
        <AppCards onRedirect={this.redirect.bind(this)} />

      </>
    );
  }

  redirect(path) {
    const { history } = this.props;
    history.push(path);
  }
}


class AppCards extends PureComponent {
  constructor() {
    super()
    this.state = {
      coverWidth: 0,
      touchingCardId: undefined,
      touchStartTime: 0
    }

  }
  timer = 0
  openWaitTime = 10000
  colors = [ '#2e2e2e','burlywood', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white', 'cyan', 'magenta', 'teal']


  render() {
    const arr = [
      { title: "告诉我天气", icon: "/icon/weather.svg", description: "告诉我今天的天气", link: "/weather" },
      { title: "农历", icon: "/icon/Google_Calendar.png", description: "查看今天的农历", link: "/calendar" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
      { title: "告诉我这是什么东西", icon: "https://picsum.photos/200/300", description: "告诉我这是什么东西", link: "/thingsScan" },
    ]
    return Array.from(arr).map((item, index) => {
      return <div style={{ position: "relative", display: "inline-block", margin: 12, verticalAlign: "bottom", }}>
        <Card
          onTouchStart={(event) => { this.onTouchStart(event, index, item) }}
          onTouchEnd={(event) => { this.onTouchEnd(event, index, item) }}
          onClick={(event) => { this.onTouchEnd(event, index, item) }}
          title={<span style={{color:"white"}}>{item.title}</span>}
          style={{
            width: 300, height: 300,
            background: this.colors[index],
            textAlign: "center", overflow: "hidden",
            verticalAlign: "bottom"
          }}>
          <div>
            <img src={item.icon} style={{
              maxHeight: "calc(100% - 32px)", maxWidth: "100%",
              position: "relative", top: -32
            }} />
          </div>
        </Card>
        {this.state.touchingCardId === index ? <>
          <div key={"card-cover-" + index} style={{
            position: "absolute", top: 0, left: 0,
            height: "100%", width: this.state.coverWidth + "%",
            background: "rgba(255, 0, 0, 0.5)",
            display: "block",
            transition: "all 0.3s"
          }} />
        </> : <></>}

      </div>
    })
  }

  onTouchStart(event, cardId, item) {
    event.stopPropagation()
    event.preventDefault()
    this.setState({
      touchingCardId: cardId,
      touchStartTime: new Date().valueOf(),
    })

    let speechTrigged = false
    this.timer = setInterval(() => {
      const past = new Date().valueOf() - this.state.touchStartTime
      if (past > 1000 && speechTrigged === false) {
        speechTrigged = true
        Speech(`${item.description}。一直按住来打开。`)
      }

      let coverWidth = past / this.openWaitTime * 100
      if (coverWidth > 100) {
        clearInterval(this.timer)
        coverWidth = 100
        this.props.onRedirect(item.link)
      }
      this.setState({
        coverWidth: coverWidth
      })

    }, 100);
  }
  onTouchEnd(event, cardId) {
    event.stopPropagation()
    event.preventDefault()
    this.resetCardsState()
  }
  resetCardsState() {
    clearInterval(this.timer)
    Speech.cancel()
    this.setState({
      coverWidth: 0,
      touchingCardId: undefined,
      touchStartTime: 0
    })
  }

}
