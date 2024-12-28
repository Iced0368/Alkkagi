import { useEffect } from 'react';
import { useGoStore } from './stores';

const frameInterval = 10;
const friction = 0.95;
const repulsion = 100;
const collsionDeceleration = 0.9;
const forceMultiplier = 1.5;

const epsilon = 1;

const getDistance = (a, b) => {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}

const getPosDiff = (a , b) => {
    return {x: a.x - b.x, y: a.y - b.y};
}

const GoPhysics = ({enabled}) => {
    const {getStoneInfos, setStoneInfos} = useGoStore();

    useEffect(() => {
        const physicsInterval = setInterval(() => {
            if (enabled) {
                const stoneInfos = getStoneInfos();

                for(let i = 0; i < stoneInfos.length; i++) {
                    stoneInfos[i].dx = stoneInfos[i].dx || 0;
                    stoneInfos[i].dy = stoneInfos[i].dy || 0;

                    for(let j = i+1; j < stoneInfos.length; j++) {
                        stoneInfos[j].dx = stoneInfos[j].dx || 0;
                        stoneInfos[j].dy = stoneInfos[j].dy || 0;

                        const distance = getDistance(stoneInfos[i], stoneInfos[j]);

                        if (distance < stoneInfos[i].radius + stoneInfos[j].radius){
                            const force = getPosDiff(stoneInfos[i], stoneInfos[j]);
                            const r2 = distance ** 2;

                            force.x *= repulsion / (r2 + epsilon);
                            force.y *= repulsion / (r2 + epsilon);

                            stoneInfos[i].dx = collsionDeceleration * (stoneInfos[i].dx + force.x / stoneInfos[i].mass);
                            stoneInfos[i].dy = collsionDeceleration * (stoneInfos[i].dy + force.y / stoneInfos[i].mass);

                            stoneInfos[j].dx = collsionDeceleration * (stoneInfos[j].dx - force.x / stoneInfos[j].mass);
                            stoneInfos[j].dy = collsionDeceleration * (stoneInfos[j].dy - force.y / stoneInfos[j].mass);
                        }
                    }
                }

                stoneInfos.forEach(element => {
                    if (!isNaN(element.dx) && !isNaN(element.dy)) {
                        element.x += forceMultiplier * element.dx;
                        element.y += forceMultiplier * element.dy;
                        element.dx = friction * element.dx;
                        element.dy = friction * element.dy;
                    }
                });
                setStoneInfos(stoneInfos);
            }
        }, frameInterval);

        return () => clearInterval(physicsInterval);
    }, [enabled]);
}

export default GoPhysics;