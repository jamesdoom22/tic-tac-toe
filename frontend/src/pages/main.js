import React, { useEffect, useState } from 'react'
import { getHttp } from '../axios';

export default function Main({ switchPage }) {
    //Main
    const storedID = localStorage.getItem('session_id');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        sessionData();
    }, [])

    const sessionData = async () => {
        console.log("🚀 ~ file: App.js:25 ~ data ~ storedValue:", storedID)
        let request = await getHttp(`/session/${storedID}`)
        console.log("🚀 ~ file: App.js:29 ~ sessionData ~ session, history:", request.data.session)
        if (!storedID || storedID === 'undefined' || storedID === null) localStorage.setItem('session_id', request.data.session._id);
        if (request.data.session.history) setHistory(request.data.session.history)
    }

    return (
        <div className='main'>
            <button onClick={switchPage}>Start New Game</button>
            {(history.length!==0) &&
                <div className='history column'>
                    {history.map((item, index) => (
                        <div key={index} className='column'>
                            <p className='row'>
                                <span>Player 1: <strong> {item.player1.name}</strong> </span>
                                <span>Player 2: <strong> {item.player2.name}</strong></span>
                                <span>Rounds: <strong> {item.records.length}</strong></span>
                            </p>
                            <ul>
                                {item.records?.map((item2, index2) => (
                                    <li key={index2} >
                                        <p className='row'>
                                            Round <strong>{index2 + 1}</strong>Winner: <strong>{item2.winner}</strong>  Moves: <strong>{item2.turns}</strong>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
