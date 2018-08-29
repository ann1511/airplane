import React from 'react';
import {Image} from 'react-konva';
import * as constants from '../constants';

export class Obstacle extends React.Component {
    render() {
        const obstacle = new window.Image();
        obstacle.src = constants.OBSTACLE_URL;
        return (
            <Image image = {obstacle}
            x = {this.props.x}
            y = {this.props.y}
            isGameOver={this.props.isGameOver}
            width = {constants.OBSTACLE_WIDTH}
            height = {constants.OBSTACLE_HEIGHT}/>
        );
    }
}