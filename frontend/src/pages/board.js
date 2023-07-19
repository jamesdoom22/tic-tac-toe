import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { postHttp } from '../axios';

export default function Board({ info, switchPage }) {
    const [information, setInformation] = useState(info)
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
    const [hasWinner, setHasWinner] = useState(false);

    const stopGame = async () => {
        console.log("stop game");
        await postHttp(`/session/${localStorage.getItem('session_id')}`, information)
        switchPage();
        setModal({ ...modal, show: false });
    }

    useEffect(() => {
        console.log("here2");
        console.log(information);
        setTemplate(defaultTile);
        setHasWinner(false);
        setTurn('o')
    }, [information.records])

    const rematchGame = () => {
        setModal({ ...modal, show: false });
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

            setInformation({ ...information, player1: p1, player2: p2, records: [...information.records, roundInfo] });
            console.log("🚀 ~ file: board.js:100 ~ checkBoard ~ { ...information, player1: p1, player2: p2, records: [...information.records, roundInfo] }:", { ...information, player1: p1, player2: p2, records: [...information.records, roundInfo] })
            showDetails({ ...information, player1: p1, player2: p2, records: [...information.records, roundInfo] }, message, status, roundInfo)
            return
        }
        setTurn(() => turn === 'x' ? 'o' : 'x');
        setInformation(prev => ({ ...prev, play: information.play === 1 ? 2 : 1, turn: information.play === 1 ? information.player2.name : information.player1.name }))
    }

    const showDetails = (data, message, status) => {
        console.log("🚀 ~ file: board.js:113 ~ showDetails ~ data:", data, message, status)

        setModal({ ...modal, show: true, message, status });
    }
    useEffect(() => {
        checkBoard()
    }, [template])

    const [modal, setModal] = useState({ show: false, status: '', message: '', proceed: () => rematchGame, stop: () => stopGame })

    const confettis = () => {
        let display = [];
        for (let i = 0; i < 150; i++) {
            display.push(<div key={i} className={`confetti-${i}`} />)
        }
        return display;
    }
    return (
        <>
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
                        <button className='red' onClick={stopGame}>Stop</button>
                        <button onClick={rematchGame}>Continue</button>
                        {/* <button onClick={stopGame}>Cancel</button> */}
                    </div>
                </div>
            </div>
            <div className='board column'>
                {/* <div className='row end'>
                    <span>Switch first move every round?</span>
                    <label className="switch" htmlFor="checkbox">
                        <input type="checkbox" id="checkbox" checked={information.shuffle} onChange={(e) => setInformation(prev => ({ ...prev, shuffle: e.target.checked }))} />
                        <div className="slider round"></div>
                    </label>
                </div> */}
                <h2 className='row center'>Round {information.records.length + 1}</h2>
                <p> Player 1 : <strong>{`${information.player1.name} W(${information.player1.win}) L(${information.player1.lose})`}</strong> </p>
                <p> Player 2 : <strong>{`${information.player2.name} W(${information.player2.win}) L(${information.player2.lose})`} </strong> </p>
                <p className='row center'>{template.every(index => index.trim() === '') ? <>First move</> : hasWinner ? <>The WINNER is</> : <>Turn</>}<strong> {information.turn}</strong></p>
                <div className='tiles'>
                    {renderDivs()}
                </div>
            </div>
        </>
    )
}
