import './App.css';
import { useEffect, useState } from 'react';
import { GoBoard } from './components';
import { useGoStore } from './stores';
import GoPhysics from './GoPhysics';

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
  const {stoneInfos, setStoneInfos} = useGoStore();
  const [physicsEnabled, setPhysicsEnabled] = useState(false);

  useEffect(() => { setStoneInfos(initialStones); setPhysicsEnabled(true);}, []);

  return (
    <div className="App">
      <GoPhysics enabled={physicsEnabled}/>
      <GoBoard stones={stoneInfos}/> 
    </div>
  );
}

export default App;
