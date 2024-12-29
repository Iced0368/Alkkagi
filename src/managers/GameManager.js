import { useEffect } from 'react';
import { useGoStore, useConfigStore } from '../stores';
import { frameInterval } from './PhysicsManager';

const [minX, minY] = [-15, -15];
const [maxX, maxY] = [555, 555];

const GameManager = () => {
    const {getStoneInfos, setStoneInfos, getTeamCount} = useGoStore();
    const {physicsEnabled} = useConfigStore();

    useEffect(() => {
        const physicsInterval = setInterval(() => {
            if (physicsEnabled) {
                const stoneInfos = getStoneInfos();

                stoneInfos.forEach((element, i) => {
                    if (element !== null && (element.x < minX || element.y < minY || element.x > maxX || element.y > maxY))
                        stoneInfos[i] = null;
                });
                setStoneInfos(stoneInfos);
            }
        }, frameInterval);

        return () => clearInterval(physicsInterval);
    }, [physicsEnabled]);
}

export default GameManager;