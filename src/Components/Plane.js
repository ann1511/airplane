import React from 'react';
import {Image} from 'react-konva';
import * as constants from '../constants';

export class Plane extends React.Component {
    constructor(props) {
        super(props);
        const plane = new window.Image();
        plane.src = constants.PLANE_URL;
        this.state = {
            plane: plane,
        }
    }
    render() {
        return (
            <Image image = {this.state.plane}
            x = {this.props.x}
            y = {this.props.y}
            width = {constants.PLANE_WIDTH}
            height = {constants.PLANE_HEIGHT}
        />
        );
    }
}
