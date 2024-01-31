import React, { useEffect } from 'react';
import './style.css';
import { Button, Card, Col, Drawer, Input, Row } from 'antd';
//@ts-ignore
import meSpeak from 'mespeak';
import ZH_JSON from '../../lib/speak/zh.json';
import { pinyin } from 'pinyin-pro';




type State = {
}

export class Home extends React.PureComponent<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {

		};
	}
	render() {

		return (
			<div style={{ width: "100%", color: `#333333`, textAlign: "center" }}>
				<div style={{ width: 1200, maxWidth: "100%", display: "inline-block" }}>
					<Row>
						{Array.from([1, 1, 1, 1], item => {
							return <Col span={24}>
								<TouchingCard />
							</Col>
						})}
						<Col span={24}>
							333
							{/* <Title>{"TranslateGLM"}</Title> */}
							<Button onClick={this.speak.bind(this)}>test</Button>
						</Col>

					</Row>

				</div>

			</div >
		);
	}
	async speak(): Promise<void> {
		//Select english/american voice
		meSpeak.loadConfig("/mespeak_config.json");
		meSpeak.loadVoice("/zh.json")

		const say = (text: string) => {
			return new Promise((resolve, reject) => {
				const mod = pinyin(text, { toneType: 'num' })
				let pitch = 50
				meSpeak.speak(mod, {
					voice: 'zh',
					amplitude: 50,
					pitch,
					wordgap: 10,
					speed: 100,

				})
				setTimeout(() => {
					resolve("ok")
				}, 300)
			})


		}
		// néng yuán jù tóu shī nài dé diàn qì zāo lè suǒ ruǎn jiàn gōng jī , dà liàng qǐ yè shù jù bèi qiè qǔ

		await say("降本增效，通用汽车计划今年销售至少 25 万辆电动汽车、削减 20 亿美元成本")
		// console.log(pinyin('汉语拼音', { toneType: 'num' }))
	}
}



export default Home;




const TouchingCard = (props: {}) => {
	const [pointing, setPointing] = React.useState(false)
	const [drawerVisible,  setDrawerVisible] = React.useState(false)
	useEffect(() => {
		if (pointing) {
			console.log("pointing")
			setDrawerVisible(true)
		}
	}, [pointing])
	const onPointerLeave = () => {
		setPointing(false)
	}
	const onPointerEnter = () => {
		setPointing(true)
	}
	return <><Card title="Default size card"
		extra={<a href="#">More</a>} style={{ width: "100%", height: 200 }} bordered
		onPointerLeave={onPointerLeave}
		onPointerEnter={onPointerEnter}>
		<p>Card content</p>
		<p>Card content</p>
		<p>Card content</p>
	</Card>
		<Drawer
			title="Basic Drawer"
			placement="right"
			closable={true}
			onClose={() => setDrawerVisible(false)}
			visible={drawerVisible}
		>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Drawer>
	</>
}
