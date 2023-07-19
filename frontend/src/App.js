import './App.scss';
import { useState } from 'react';

import Main from './pages/main';
import Board from './pages/board';
import Player from './pages/player';

function App() {

  //Main
  const storedID = localStorage.getItem('session_id');
  const [information, setInformation] = useState({});
  const [page, setPage] = useState('main');

  const nextPage = () => {
    if (page === 'main') {
      setPage(() => 'player')
    } else if (page === 'player') {
      setPage(() => 'board')
    } else if (page === 'board') {
      setPage(() => 'main')
    }
  }

  const updateInformation = (info) => {
    setInformation(info);
  }

  return (
    <div className="App background">
      <div className='Nav'>
        {storedID && <span>Session ID: <strong>{storedID}</strong></span>}
      </div>
      <div className='Game'>
        {page === 'main' &&
          <Main switchPage={nextPage} />
        }
        {page === 'player' &&
          <Player switchPage={nextPage} updateInformation={updateInformation} />
        }
        {page === 'board' &&
          <Board switchPage={nextPage} info={information} />
        }
      </div>
    </div>
  );
}

export default App;
