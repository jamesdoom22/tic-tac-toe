import React, { useRef, useState } from 'react'

export default function Player({ switchPage, updateInformation }) {
    const player1 = useRef();
    const player2 = useRef();
    const [information, setInformation] = useState({ player1: { name: '', win: 0, lose: 0 }, player2: { name: '', win: 0, lose: 0 }, shuffle: false, firstMove: '', records: [], turn: '', play: 2 })
    const [disabled, setDisabled] = useState(false)
    const startGame = async (event) => {
        event.preventDefault();
        setDisabled(true);
        let infos = { ...information, player1: { ...information.player1, name: player1.current.value, win: 0, lose: 0 }, player2: { ...information.player2, name: player2.current.value, win: 0, lose: 0 } }
        // if (information.shuffle) {
        //     shuffleTurn([player1.current.value, player2.current.value], infos)
        // } else {
        // }
        startCountdown();
        await delay(3000);
        updateInformation({ ...infos, turn: player2.current.value, })
        switchPage();
    }

    const [isPicking, setIsPicking] = useState(false);

    const [countDown, setCount] = useState(3);

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
    const shuffleTurn = async (names, info) => {
        setIsPicking(true);
        await delay(2000);
        const randomIndex = Math.floor(Math.random() * names.length);
        setInformation(prev => ({ ...prev, turn: names[randomIndex], firstMove: names[randomIndex], shuffle: true }))
        await delay(2000);
        startCountdown();
        await delay(3000);
        switchPage();
        updateInformation(info);
    }
    return (
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
                    <span>Switch first move every round?</span>
                    <label className="switch" htmlFor="checkbox">
                        <input type="checkbox" id="checkbox" checked={information.shuffle} onChange={(e) => setInformation(prev => ({ ...prev, shuffle: e.target.checked }))} />
                        <div className="slider round"></div>
                    </label>
                </div>
                {/* {(isPicking && !information.turn) && <span>Choosing who moves first...</span>}
                <p>{information.turn && <><strong>{information.turn}</strong> will make the first turn.</>}</p> */}
                <button disabled={disabled} type="submit" data-content={(disabled && !starting) ? 'Preparing match' : starting ? `Game will start in ${countDown}` : 'Start'} />
            </form>
        </div>
    )
}
