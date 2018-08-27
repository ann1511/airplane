import React from 'react';
import {Image} from 'react-konva';
import * as constants from '../constants';

export class Plane extends React.Component {
    render() {
        const plane = new window.Image();
        plane.src = constants.PLANE_URL;
        return (
            <Image image = {plane}
            x = {this.props.x}
            y = {this.props.y}/>
        );
    }
}
