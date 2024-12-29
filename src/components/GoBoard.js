import './GoBoard.css';
import { useGoStore } from '../stores';
import GoStone from './GoStone';

const GoBoard = () => {
    const { stoneInfos } = useGoStore();
    return (
        <div className='board-container'>
            <div className='grid'>
                {[...Array(18*18)].map((_, i) => {return (<div className="grid-item" key={i}></div>);})}
            </div>
            <div className='coord'>
                {stoneInfos.map((info, i) => {
                    if (info === null) return null;
                    const {x, y, color, mass, radius} = info;
                    return (
                        <GoStone 
                            x={x} y={y} color={color} 
                            mass={mass} radius={radius}
                            key={i} index={i}
                        />
                    );
                })}
            </div>
        </div>
    )
};

export default GoBoard;