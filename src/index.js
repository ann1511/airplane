import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';
import {Plane} from './Components/Plane'
import * as constants from './constants';
import KeyHandler, {KEYPRESS, KEYDOWN, KEYUP} from 'react-key-handler';
import {Patron} from './Components/Patron';
import { Obstacle } from './Components/Obstacle';
import {GameOver} from './Components/GameOver';

const imageGameOverText = new window.Image();
imageGameOverText.src = constants.GAME_OVER_TEXT_URL;
const imageGameOverButton = new window.Image();
imageGameOverButton.src = constants.GAME_OVER_BUTTON_URL;

const newGame = {
    patronsInfo: [
        {x: window.innerWidth/2 + 119,
        y: window.innerHeight/2 + 200,
    }],
    XPlane: window.innerWidth/2,
    YPlane: window.innerHeight/2 + 200,
    obstaclesInfo: [{x: window.innerWidth/5,
                    y: - window.innerHeight/5,
                    isGameOver: false}],
    clickOnRight: false,
    clickOnLeft: false,
    countPatron: 0,
    countObstacle: 0,
    gameOver: false,
    imageGameOverText: imageGameOverText,
    imageGameOverButton: imageGameOverButton,
    Score: 0,
    countFail: 0,
}

class Airplane extends React.Component {
    constructor(props) {
        super(props);
        this.state = newGame;
        this.timer = setInterval(() => this.gameLoop(), 1);
    };

    gameOverClick = () => {
        this.setState(newGame);
        this.timer = setInterval(() => this.gameLoop(), 5);
    }

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
                const randomX = window.innerWidth*(Math.random()*0.9 + 0.04)
                return {
                    obstaclesInfo: prevState.obstaclesInfo.concat([ 
                        {x: randomX ,
                        y: - window.innerHeight/5,
                        isGameOver: false,}]),
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

    gameOverBecouseOfAirplane() {
        this.state.obstaclesInfo.forEach( dict => {
            if (
                dict.x < this.state.XPlane + constants.PLANE_WIDTH - 30 &&
                dict.x + constants.OBSTACLE_WIDTH - 20 > this.state.XPlane &&
                dict.y < this.state.YPlane + constants.PLANE_HEIGHT - 50 &&
                dict.y + constants.OBSTACLE_HEIGHT - 30 > this.state.YPlane
            )
            {
                clearInterval(this.timer);
                this.setState({
                    gameOver: true,
                })
            }
        });
    }
    
    gameOverBecouseOfObstacle() {
        let count = 0;
        this.setState(prevState => {
            prevState.obstaclesInfo.forEach(dict => {
                if (!dict.isGameOver && dict.y > window.innerHeight ) {
                    count += 1;
                    return {
                        isGameOver: true,
                    };
                }
            });
            if (prevState.countFail === 3){
                clearInterval(this.timer)
                return {
                    gameOver: true,
                }
            }
            else { 
                return {
                    countFail: count,
                }
            }
        });
    }

    deleteObstacleOfAirplane() {
        this.setState(prevState => {
            let obstaclesInfo = [...prevState.obstaclesInfo];
            let patronsInfo = [...prevState.patronsInfo];

            prevState.obstaclesInfo.forEach((obstacle, obstacleIndex) => {
                prevState.patronsInfo.forEach((patron, patronIndex) => {
                    if (
                        obstacle.x < patron.x + constants.PATRON_WIDTH &&
                        obstacle.x + constants.OBSTACLE_WIDTH > patron.x &&
                        obstacle.y < patron.y + constants.PATRON_HEIGHT &&
                        obstacle.y + constants.OBSTACLE_HEIGHT > patron.y
                        )
                    
                    {
                        obstaclesInfo[obstacleIndex] = null;
                        patronsInfo[patronIndex] = null;
                    }
                });
            });
            let score = 0;
            const obstacles = obstaclesInfo.filter(item => {
                if (item) {
                    return true;
                } else {
                    score += 1;
                    return false;
                }
            });
            return {
                Score: prevState.Score + score,
                obstaclesInfo: obstacles,
                patronsInfo: patronsInfo.filter(item => !!item),
            };
        });
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
        // this.gameOverBecouseOfAirplane();
        this.deleteObstacleOfAirplane();
        this.gameOverBecouseOfObstacle();
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
                isGameOver={dict.isGameOver}
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
                    {this.state.gameOver && 
                        <GameOver 
                            imageGameOverText={this.state.imageGameOverText}
                            imageGameOverButton={this.state.imageGameOverButton}
                            onClick={this.gameOverClick}  

                        />
                    }
                    <Text text={'Score: ' + this.state.Score.toString()}
                            y={100}
                            x={window.innerWidth - 300}
                            fontSize={36}
                    />
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
