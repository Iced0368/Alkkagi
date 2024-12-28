import './GoBoard.css';
import GoStone from './GoStone';

const GoBoard = ({stones}) => {
    return (
        <div className='board-container'>
            <div className='grid'>
                {[...Array(18*18)].map((_, i) => {return (<div className="grid-item" key={i}></div>);})}
            </div>
            <div className='coord'>
                {stones.map(({x, y, color, mass, radius}, i) => (
                    <GoStone 
                        x={x} y={y} color={color} 
                        mass={mass} radius={radius}
                        key={i} index={i}
                    />
                ))}
            </div>
        </div>
    )
};

export default GoBoard;