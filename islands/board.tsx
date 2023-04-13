import { useState, useEffect } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Graveyard from "../components/graveyard.tsx"
import { Board, GetNewBoard } from "../../chess-enforcer/lib/chess-enforcer.ts"
import type { Square } from "../../chess-enforcer/lib/chess-enforcer.ts"

export default function Board() {
    const [board, setBoard] = useState<Board>()

    useEffect(() => {
        const getBoard = async () => {
            setBoard(await GetNewBoard())
        }
        getBoard()
    }, [])

    console.debug(board)

    return (
        <div className="board-container">
            <link rel="stylesheet" href="css/board.css" />
                {/* <Graveyard list={whiteGraveyard} advantage={sum(whiteGraveyard.map(piece => valueOf(piece))) - sum(blackGraveyard.map(piece => valueOf(piece)))}/> */}
                <div className="column">
                    <div className="board">
                        {/* {squares} */}
                    </div>
                    {/* <button onClick={reset}>Restart</button> */}
                    {/* <p>{notYetStarted ? 'Click on a piece and click on a legal space to move' : (gameOver ? `Game over! ${turn} wins.` : `It is ${turn}'s turn.`)}</p> */}
                    <a href="https://www.github.com/ThePyroTF2/Chess" target="_blank">Source code</a>
                </div>
                {/* <Graveyard list={blackGraveyard} advantage={sum(blackGraveyard.map(piece => valueOf(piece))) - sum(whiteGraveyard.map(piece => valueOf(piece)))}/> */}
        </div>
    )
}