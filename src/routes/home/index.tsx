import React, { } from 'react';
import './style.css';
import { Button, Col, Input, Row } from 'antd';



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
						<Col span={24}>
							333
							{/* <Title>{"TranslateGLM"}</Title> */}
							{/* <Button onClick={this.test.bind(this)}>test</Button> */}
						</Col>
			
					</Row>

				</div>

			</div >
		);
	}

}



export default Home;
