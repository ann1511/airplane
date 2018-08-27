import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';
import {Plane} from './Components/Plane'
import * as constants from './constants';
import KeyHandler, {KEYPRESS, KEYDOWN, KEYUP} from 'react-key-handler';

class Airplane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            XPlane: window.innerWidth/2,
            YPlane: window.innerHeight/2,
            xObstacle: window.innerWidth,
            YObstacle: window.innerHeight - 500,
            clickOnRight: false,
        }
        this.timer = setInterval(() => this.gameLoop(), 5);
    };

    // moveObstacles(){
    //     this.setState( prevState => {
            
    //     });
    // }

    clickOnRight = () => {
        this.setState({
            clickOnRight: true
        });
    };

    moveRightPlane() {
        this.setState( prevState => {
            if (prevState.clickOnRight) {
                return {
                    XPlane: prevState.XPlane + 2,
                }
            }
        });
    }

    gameLoop() {
        this.moveRightPlane();
    }

    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {/* <Text text="Hello!" fontSize={36}/> */}
                    <Plane
                        x={this.state.XPlane}
                        y={this.state.YPlane}/>
                    <KeyHandler keyEventName={KEYDOWN} keyValue="d" onKeyHandle={this.clickOnRight}/>
                    <KeyHandler keyEventName={KEYUP} keyValue="d" onKeyHandle={e => {
                        this.setState({clickOnRight: false});
                    }} />
                </Layer>
            </Stage>
        );
    }
}

ReactDOM.render(<Airplane />, document.getElementById('root'));
