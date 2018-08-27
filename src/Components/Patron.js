import React from 'react';
import {Image} from 'react-konva';
import * as constants from '../constants';

export class Patron extends React.Component {
    render() {
        const patron = new window.Image();
        patron.src = constants.PATRON_URL;
        return (
            <Image image = {patron}
            x = {this.props.x}
            y = {this.props.y}/>
        );
    }
}