import { useEffect } from 'react';
import { useGoStore, useConfigStore } from '../stores';

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

const PhysicsManager = () => {
    const {getStoneInfos, setStoneInfos} = useGoStore();
    const {physicsEnabled} = useConfigStore();

    useEffect(() => {
        const physicsInterval = setInterval(() => {
            if (physicsEnabled) {
                const stoneInfos = getStoneInfos();

                stoneInfos.forEach(element => {
                    if (element !== null) {
                        element.dx = friction * (element.dx || 0);
                        element.dy = friction * (element.dy || 0);
                        element.x += forceMultiplier * element.dx;
                        element.y += forceMultiplier * element.dy;
                    }
                });

                for(let i = 0; i < stoneInfos.length; i++) {
                    if (stoneInfos[i] === null) continue;

                    for(let j = i+1; j < stoneInfos.length; j++) {
                        if (stoneInfos[j] === null) continue;

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

                setStoneInfos(stoneInfos);
            }
        }, frameInterval);

        return () => clearInterval(physicsInterval);
    }, [physicsEnabled]);
}

export {frameInterval};
export default PhysicsManager;