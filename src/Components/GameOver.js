import React from "react";
import {Image, Group } from "react-konva";
import * as constants from "../constants";

export class GameOver extends React.Component {

  render() {
    
    return(
      <Group
        x = {constants.GAME_OVER_X} 
        y = {constants.GAME_OVER_Y} 
        height={constants.GAME_OVER_HEIGHT}
        width={constants.GAME_OVER_WIDTH}>
        <Image 
            image={this.props.imageGameOverText} 
            // x={0}
            // y={0}
            // width={this.props.width}
            // height={this.props.height}
        />
        <Image 
            image={this.props.imageGameOverButton} 
            x={175}
            y={55}
            width={50}
            height={50}
            onClick={this.props.onClick}
        />
      </Group>
        
    );
  } 
}