import './GoStone.css';
import { useGoStore, useMouseStore } from '../stores';
import { useState } from 'react';

const GoStone = ({x, y, color, index, mass, radius}) => {
    const {getSelected, setSelected, setStoneInfo, getStoneInfos} = useGoStore();
    const {setMouseDown, setMouseUp, getStartPos} = useMouseStore();

    const applyForce = (force) => {
        const info = getStoneInfos()[index];
        const [dx, dy] = [info.dx || 0, info.dy || 0];

        const newInfo = {
            ...info,
            dx: dx + force.x / mass,
            dy: dy + force.y / mass,
        };
        setStoneInfo(index, newInfo);
    }

    return (
        <div>
            <div className={`stone-container ${getSelected() === index ? 'emphasized' : ''}`}
                style={{
                    left: x, top: y, backgroundColor: color,
                    width: `${2*radius-1}px`, height: `${2*radius-1}px`,
                    borderRadius: `${radius}px`
                }}
                onMouseDown={(e) => { 
                    setSelected(index);
                    setMouseDown(e.clientX, e.clientY);
                }}
            >
            </div>
            <div className={`stone-outer ${getSelected() === index ? '': 'hidden'}`}
                onMouseUp={(e) => {
                    setSelected(null);
                    setMouseUp(e.clientX, e.clientY);

                    const startPos = getStartPos();
                    const endPos = {x: e.clientX, y: e.clientY};
                
                    const force = {x: startPos.x - endPos.x, y: startPos.y - endPos.y};
                    applyForce(force);
                }}
            >
            </div>
        </div>
    )
}

export default GoStone;