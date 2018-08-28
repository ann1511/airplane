import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';
import {Plane} from './Components/Plane'
import * as constants from './constants';
import KeyHandler, {KEYPRESS, KEYDOWN, KEYUP} from 'react-key-handler';
import {Patron} from './Components/Patron';
import { Obstacle } from './Components/Obstacle';

class Airplane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patronsInfo: [
                {x: window.innerWidth/2 + 119,
                y: window.innerHeight/2 + 200,
            }],
            XPlane: window.innerWidth/2,
            YPlane: window.innerHeight/2 + 200,
            obstaclesInfo: [{x: window.innerWidth/5,
                            y: - window.innerHeight/5,}],
            clickOnRight: false,
            clickOnLeft: false,
            countPatron: 0,
            countObstacle: 0,
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
                        {x: prevState.XPlane + 119,
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

    moveObstacle() {
        this.setState( prevState => { 
            const positions = prevState.obstaclesInfo.map(dict => {
                    return {
                        x: dict.x,
                        y: dict.y + 1,
                    }
                });
                return {
                    obstaclesInfo: positions,
                }
        });
    }

    createObstacle() {
        this.setState( prevState => { 
            if (prevState.countObstacle < 200){
                return {
                    countObstacle: prevState.countObstacle + 1,
                }
            }
            else {
                const randomX = window.innerWidth*(Math.random()*0.95 + 0.04)
                return {
                    obstaclesInfo: prevState.obstaclesInfo.concat([ 
                        {x: randomX ,
                        y: - window.innerHeight/5,}]),
                    countObstacle: 0,

                }
            }
        });
    }

    deleteObstacle() {
        this.setState(prevState => ({
            obstaclesInfo: prevState.obstaclesInfo.filter(dict => {
                if (dict.y < window.innerHeight * 1.5) {
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
        this.moveObstacle();
        this.createObstacle();
        this.deleteObstacle();
    }


    render() {
        const patrons = this.state.patronsInfo.map( dict =>
            <Patron 
                x = {dict.x}
                y = {dict.y}
            />
        );

        const obstacle = this.state.obstaclesInfo.map( dict =>
            <Obstacle 
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
                    {obstacle}
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
