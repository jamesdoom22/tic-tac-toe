import './App.scss';
import { useEffect, useRef, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getHttp } from './axios';

function App() {

  //Main
  const storedID = localStorage.getItem('session_id');
  const [page, setPage] = useState('main');
  const [history, setHistory] = useState([])
  const nextPage = () => {
    if (page === 'main') {
      setPage(() => 'player')
    } else if (page === 'player') {
      setPage(() => 'board')
    }
  }

  useEffect(() => {
    sessionData();
  }, [])

  const sessionData = async () => {

    console.log("🚀 ~ file: App.js:25 ~ data ~ storedValue:", storedID)
    let request = await getHttp(`/session/${storedID}`)
    let { session, history } = request.data.session;
    console.log("🚀 ~ file: App.js:29 ~ sessionData ~ session, history:", session, history)
    if (!storedID) localStorage.setItem('session_id', session?._id);
    if (history) setHistory([history])

    console.log("🚀 ~ file: App.js:21 ~ useEffect ~ data:", request)
  }

  //Player's
  const player1 = useRef();
  const player2 = useRef();
  const [information, setInformation] = useState({ player1: { name: '', win: 0, lose: 0 }, player2: { name: '', win: 0, lose: 0 }, shuffle: false, firstMove: '', records: [], turn: '', play: 1 })

  const [disabled, setDisabled] = useState(false)
  const startGame = async (event) => {
    event.preventDefault();
    setDisabled(true)
    setInformation(prev => ({ ...prev, player1: { ...player1, name: player1.current.value, win: 0, lose: 0 }, player2: { ...player2, name: player2.current.value, win: 0, lose: 0 } }))
    if (information.shuffle) {
      shuffleTurn([player1.current.value, player2.current.value])
    } else {
      startCountdown();
      await delay(3000);
      setInformation(prev => ({ ...prev, turn: player1.current.value }))
      nextPage();
    }
  }

  const [isPicking, setIsPicking] = useState(false);

  const [countDown, setCount] = useState(3);

  const shuffleTurn = async (names) => {
    setIsPicking(true);
    await delay(2000);
    const randomIndex = Math.floor(Math.random() * names.length);
    setInformation(prev => ({ ...prev, turn: names[randomIndex], firstMove: names[randomIndex], shuffle: true }))
    await delay(2000);
    startCountdown();
    await delay(3000);
    nextPage();
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [starting, setStarting] = useState(false)
  const startCountdown = () => {
    setStarting(true)
    if (countDown > 0) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount === 0) {
            clearInterval(interval);
          }
          return newCount;
        });
      }, 1000);
    }
  };

  //Board
  const defaultTile = ['', '', '', '', '', '', '', '', '']
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [template, setTemplate] = useState(defaultTile)
  const [turn, setTurn] = useState('o')
  const renderDivs = () => {
    const divs = [];
    for (let i = 0; i < 9; i++) {
      divs.push(<div className={template[i] ? `tile ${template[i]}` : 'tile'} key={i} onClick={template[i] ? null : () => handleClick(i)} />);
    }
    return divs;
  };
  const handleClick = (index) => {
    if (hasWinner) return
    setTemplate([...template.slice(0, index), turn, ...template.slice(index + 1)])
  }

  const checkBoard = () => {
    console.log("here board");
    let winner = combinations.some(combination => {
      return combination.every(index => {
        return template[index] === turn;
      })
    })

    let draw = [...template].every(index => index.trim() !== '');

    let turns = template.reduce((count, currentValue) => {
      if (currentValue !== '') {
        return count + 1;
      }
      return count;
    }, 0);
    if (winner || turns === 9) {
      setHasWinner(true)
      let roundInfo = { winner: information.turn, turns: turns };
      let message, status = '';
      if (winner) {
        message = `<h1>WINNER ${information.turn}!!!</h1>`;
        status = 'winner'
      }
      if (draw) {
        message = `<h1>This round is tie!</h1>`;
        status = 'draw'
      }

      let p1 = { ...information.player1 }
      let p2 = { ...information.player2 }
      if (information.turn === information.player1.name) {
        p1 = { ...p1, win: p1.win + 1 }
        p2 = { ...p2, lose: p2.lose + 1 }
      } else {
        p2 = { ...p2, win: p2.win + 1 }
        p1 = { ...p1, lose: p1.lose + 1 }
      }

      setInformation({ ...information, player1: p1, player2: p2, records: [...information.records, roundInfo] })
      setModal({ ...modal, show: true, message, status });
      return
    }
    setTurn(() => turn === 'x' ? 'o' : 'x');
    setInformation(prev => ({ ...prev, play: information.play === 1 ? 2 : 1, turn: information.play === 1 ? information.player2.name : information.player1.name }))
  }

  const [hasWinner, setHasWinner] = useState(false)

  useEffect(() => {
    checkBoard()
    console.log("here");
  }, [template])

  const [modal, setModal] = useState({ show: false, status: '', message: '', proceed: () => rematchGame, stop: () => stopGame })

  const confettis = () => {
    let display = [];
    for (let i = 0; i < 150; i++) {
      display.push(<div key={i} className={`confetti-${i}`} />)
    }
    return display;
  }

  const stopGame = () => {
    console.log("stop");
    setModal({ ...modal, show: false });
    setPage('main');
    setHistory([...history, information]);
  }

  useEffect(() => {
    console.log("here2");
    console.log(information, history);
    setHistory([...history, information]);
    setTemplate(defaultTile);

  }, [information.records])


  const rematchGame = () => {
    console.log("rematch", information);
    setModal({ ...modal, show: false });
    setHasWinner(false);
    setTemplate(defaultTile);
    if (information.shuffle) setInformation({ ...information, firstMove: information.firstMove === information.player1.name ? information.player2.name : information.player1.name })
  }

  const shuffleTurn2 = async (names) => {

    // setIsPicking(true);
    // await delay(2000);
    // const randomIndex = Math.floor(Math.random() * names.length);
    // setInformation(prev => ({ ...prev, turn: names[randomIndex], shuffle: true }))
    // await delay(2000);
    // startCountdown();
    // await delay(3000);
    // nextPage();
  }
  return (
    <div className="App background">
      <div className={modal.show ? 'modal open' : 'modal'}>
        {modal.status === 'winner' &&
          <div className='confetti'>
            {confettis()}
          </div>
        }
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={() => setModal({ ...modal, show: false, status: '', message: '' })} className="close">&times;</span>
          </div>
          <div className="modal-body">
            <div>{ReactHtmlParser(modal.message)}</div>
            <i className={`icon ${modal.status}`}></i>
          </div>
          <div className="modal-footer">
            <button className='red' onClick={modal.stop()}>Stop</button>
            <button onClick={modal.proceed()}>Continue</button>
          </div>
        </div>

      </div>
      <div className='Nav'>
        <span>Session ID: <strong>{storedID}</strong></span>
      </div>
      <div className='Game'>
        {page === 'main' &&
          <div className='main'>
            <button onClick={nextPage}>Start New Game</button>
            <div>
              {history.length}
              {history.map((item, index) => (
                <div key={index}>
                  <span>Player 1: {item.player1?.name}</span>
                  <span>Player 2: {item.player2?.name}</span>
                  <span>Rounds: {item.records?.length}</span>
                  {item.records?.map((item2, index2) => (
                    <p key={index2}>
                      Winner: {item2.winner} Moves: {item2.turns}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        }
        {page === 'player' &&
          <div className='player'>
            <form className='column' onSubmit={startGame}>
              <div className='column'>
                <h3>Player 1</h3>
                <input type='text' ref={player1} minLength="2" required />
              </div>
              <div className='column'>
                <h3>Player 2</h3>
                <input type='text' ref={player2} minLength="2" required />
              </div>
              <div className='row'>
                <span>Shuffle first move every round?</span>
                <label className="switch" htmlFor="checkbox">
                  <input type="checkbox" id="checkbox" checked={information.shuffle} onChange={(e) => setInformation(prev => ({ ...prev, shuffle: e.target.checked }))} />
                  <div className="slider round"></div>
                </label>
              </div>
              {information.shuffle &&
                <>
                  {(isPicking && !information.turn) && <span>Choosing who moves first...</span>}
                  <p>{information.turn && <><strong>{information.turn}</strong> will make the first turn.</>}</p>
                </>
              }
              <button disabled={disabled} type="submit" data-content={(disabled && !starting) ? 'Preparing match' : starting ? `Game will start in ${countDown}` : 'Start'} />
            </form>
          </div>

        }
        {page === 'board' &&
          <>
            <div className='board column'>
              <div className='row end'>
                <span>Random first move every round?</span>
                <label className="switch" htmlFor="checkbox">
                  <input type="checkbox" id="checkbox" checked={information.shuffle} onChange={(e) => setInformation(prev => ({ ...prev, shuffle: e.target.checked }))} />
                  <div className="slider round"></div>
                </label>
              </div>
              <h2 className='row center'>Round {information.records.length + 1}</h2>
              <p> Player 1 : <strong>{`${information.player1.name} W(${information.player1.win}) L(${information.player1.lose})`}</strong> </p>
              <p> Player 2 : <strong>{`${information.player2.name} W(${information.player2.win}) L(${information.player2.lose})`} </strong> </p>
              <p className='row center'>{template.every(index => index.trim() === '') ? <>First move</> : hasWinner ? <>The WINNER is</> : <>Turn</>}<strong> {information.turn}</strong></p>
              <div className='tiles'>
                {renderDivs()}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
