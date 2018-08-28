import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';
import {Plane} from './Components/Plane'
import * as constants from './constants';
import KeyHandler, {KEYPRESS, KEYDOWN, KEYUP} from 'react-key-handler';
import {Patron} from './Components/Patron';

class Airplane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patronsInfo: [
                {x: window.innerWidth/2 + 110,
                y: window.innerHeight/2,
            }],
            XPlane: window.innerWidth/2,
            YPlane: window.innerHeight/2 + 200,
            XObstacle: window.innerWidth,
            YObstacle: window.innerHeight - 500,
            clickOnRight: false,
            clickOnLeft: false,
            countPatron: 0,
        }
        this.timer = setInterval(() => this.gameLoop(), 5);
    };

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

    clickOnLeft = () => {
        this.setState({
            clickOnLeft: true
        });
    };

    moveLeftPlane() {
        this.setState( prevState => {
            if (prevState.clickOnLeft) {
                return {
                    XPlane: prevState.XPlane - 2,
                }
            }
        });
    }

    movePatrones() {
        this.setState( prevState => { 
            const positions = prevState.patronsInfo.map(dict => {
                    return {
                        x: dict.x,
                        y: dict.y - 1,
                    }
                });
                return {
                    patronsInfo: positions,
                }
        });
    }

    createPatron() {
        this.setState( prevState => { 
            if (prevState.countPatron < 100){
                return {
                    countPatron: prevState.countPatron + 1,
                }
            }
            else {
                return {
                    patronsInfo: prevState.patronsInfo.concat([ 
                        {x: prevState.XPlane + 115,
                        y: prevState.YPlane,
                        }]),
                    countPatron: 0,

                }
            }
        });
    }

    deletePatron() {
        this.setState(prevState => ({
            patronsInfo: prevState.patronsInfo.filter(dict => {
                if (dict.y > 0) {
                    return true;
                }
            })
        }));
    }

    gameLoop() {
        this.moveRightPlane();
        this.moveLeftPlane();
        this.movePatrones();
        this.createPatron();
        this.deletePatron();
    }


    render() {
        const patrons = this.state.patronsInfo.map( dict =>
            <Patron 
                x = {dict.x}
                y = {dict.y}
            />
        );
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {/* <Text text="Hello!" fontSize={36}/> */}
                    <Plane
                        x={this.state.XPlane}
                        y={this.state.YPlane}
                    />
                    {patrons}
                    <KeyHandler keyEventName={KEYDOWN} keyValue="d" onKeyHandle={this.clickOnRight}/>
                    <KeyHandler keyEventName={KEYUP} keyValue="d" onKeyHandle={e => {
                        this.setState({clickOnRight: false});
                    }} />
                    <KeyHandler keyEventName={KEYDOWN} keyValue="a" onKeyHandle={this.clickOnLeft}/>
                    <KeyHandler keyEventName={KEYUP} keyValue="a" onKeyHandle={e => {
                        this.setState({clickOnLeft: false});
                    }} />
                </Layer>
            </Stage>
        );
    }
}

ReactDOM.render(<Airplane />, document.getElementById('root'));
