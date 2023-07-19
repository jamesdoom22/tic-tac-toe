import React, { useEffect, useRef, useState } from 'react'
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
        let { session, history } = request.data.session;
        console.log("🚀 ~ file: App.js:29 ~ sessionData ~ session, history:", session, history, request.data.session)
        if (!storedID || storedID === 'undefined') localStorage.setItem('session_id', request.data.session?._id);
        if (history) setHistory([request.data.session?.history])
        console.log("🚀 ~ file: App.js:21 ~ useEffect ~ data:", request)
    }

    return (
        <div className='main'>
            <button onClick={switchPage}>Start New Game</button>
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
    )
}
