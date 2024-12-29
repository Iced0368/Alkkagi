import './App.css';
import { useEffect } from 'react';
import { GoBoard } from './components';
import { useConfigStore, useGoStore } from './stores';
import { GameManager, PhysicsManager } from './managers';

const initialStones = [
  {x: 90, y: 60, color: 'white', mass: 10, radius: 10},
  {x: 210, y: 60, color: 'white', mass: 10, radius: 10},
  {x: 330, y: 60, color: 'white', mass: 10, radius: 10},
  {x: 450, y: 60, color: 'white', mass: 10, radius: 10},
  {x: 30, y: 120, color: 'white', mass: 10, radius: 10},
  {x: 150, y: 120, color: 'white', mass: 10, radius: 10},
  {x: 270, y: 120, color: 'white', mass: 20, radius: 15},
  {x: 390, y: 120, color: 'white', mass: 10, radius: 10},
  {x: 510, y: 120, color: 'white', mass: 10, radius: 10},

  {x: 90, y: 480, color: 'black', mass: 10, radius: 10},
  {x: 210, y: 480, color: 'black', mass: 10, radius: 10},
  {x: 330, y: 480, color: 'black', mass: 10, radius: 10},
  {x: 450, y: 480, color: 'black', mass: 10, radius: 10},
  {x: 30, y: 420, color: 'black', mass: 10, radius: 10},
  {x: 150, y: 420, color: 'black', mass: 10, radius: 10},
  {x: 270, y: 420, color: 'black', mass: 20, radius: 15},
  {x: 390, y: 420, color: 'black', mass: 10, radius: 10},
  {x: 510, y: 420, color: 'black', mass: 10, radius: 10},
]

function App() {
  const { setStoneInfos } = useGoStore();
  const { enablePhysics, disablePhysics } = useConfigStore();

  useEffect(() => { setStoneInfos(initialStones); enablePhysics();}, []);

  return (
    <div className="App">
      <PhysicsManager/>
      <GameManager/>

      <GoBoard/> 
    </div>
  );
}

export default App;
