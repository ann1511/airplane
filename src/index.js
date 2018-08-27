import React from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';

class Airplane extends React.Component {
    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Text text="Hello!" fontSize={36}/>
                </Layer>
            </Stage>
        );
    }
}

ReactDOM.render(<Airplane />, document.getElementById('root'));
