import { useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Piece from "../components/piece.tsx"
import Square from "../components/square.tsx"
import type { piece, team, coords } from "../static/ts/types.ts"
import { sum, teamOf, valueOf } from "../static/ts/functions.ts"
import Graveyard from "../components/graveyard.tsx"

export default function Board() {
    const startBoard: piece[][] = [
        ['♜','♞','♝','♛','♚','♝','♞','♜'],
        ['♟','♟','♟','♟','♟','♟','♟','♟'],
        ['','','','','♙','','♙',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['♙','♙','♙','♙','♙','♙','♙','♙'],
        ['♖','♘','♗','♕','♔','♗','♘','♖']
    ]

    const [pieces, setPieces] = useState(startBoard)

    const squares: preact.JSX.Element[][] = []
    const [pieceHeld, setPieceHeld] = useState(false)
    const [heldPieceCoords, setHeldPieceCoords] = useState<coords>({rank: 0, file: 0})
    const [turn, setTurn] = useState<team>('white')
    let enPessant = false
    let enPessanter: coords = {rank: 0, file: 0}
    let enPessantee: coords = {rank: 0, file: 0}
    let castlingRights = ['black', 'white']
	const [whiteGraveyard, setWhiteGraveyard] = useState<piece[]>([])
	const [blackGraveyard, setBlackGraveyard] = useState<piece[]>([])
    let [blackCheck, setBlackCheck] = useState(false)
    let [whiteCheck, setWhiteCheck] = useState(false)
    let whiteKingCoords: coords = {rank: 7, file: 4}
    let blackKingCoords: coords = {rank: 0, file: 4}
    const [gameOver, setGameOver] = useState(false)

    const checkCheck = (team: team, pieceArray = pieces): boolean => {
        for(let rank = 0; rank < 8; rank++) {
            for(let file = 0; file < 8; file++) {
                if(team == 'white' && isMoveLegal({rank: rank, file: file}, whiteKingCoords, pieceArray, true)) return true
                if(team == 'black' && isMoveLegal({rank: rank, file: file}, blackKingCoords, pieceArray, true)) return true
            }
        }
        return false;
    }

    const removePiece = (coords: coords) => {
        pieces[coords.rank][coords.file] = ''
        setPieces(pieces)
    }

    const placePiece = (coords: coords, pieceToPlace: piece) => {
        pieces[coords.rank][coords.file] = pieceToPlace
        setPieces(pieces)
    }

    const isMoveLegal = (start: coords, end: coords, pieceArray = pieces, checkingCheck = false, givenTurn = turn): boolean => {
        const pieceToMove = pieceArray[start.rank][start.file]
        console.debug(`Testing move of ${pieceToMove} from (${start.rank},${start.file}) to (${end.rank},${end.file}).`)
        if(pieceToMove == '') {console.debug('illegal'); return false;}
        if(start.rank == end.rank && start.file == end.file) {console.debug('illegal'); return false;}
        if(teamOf(pieceToMove) == teamOf(pieceArray[end.rank][end.file])) {console.debug('illegal'); return false;}
        switch(pieceToMove) {
            case '♙':
                if(start.rank - end.rank > 0) {
                    if(start.file != end.file && start.rank - end.rank == 1 && Math.abs(end.file - start.file) == 1) {
                        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && enPessantee.file == end.file) {console.debug('legal'); break;}
                        if(pieceArray[end.rank][end.file] == '') {console.debug('illegal'); return false;}
                    }
                    else if(start.file != end.file) {console.debug('illegal'); return false;}
                    else if(pieceArray[end.rank][end.file] != '') {console.debug('illegal'); return false;}
                    if(start.rank == 6 && start.rank - end.rank == 2 && pieceArray[end.rank + 1][start.file] == '') {console.debug('legal'
                    ); break;}
                    if(start.rank - end.rank == 1) {console.debug('legal'); break;}
                    {console.debug('illegal'); return false;}
                }
                {console.debug('illegal'); return false;}
            case '♟':
                if(end.rank - start.rank > 0) {
                    if(start.file != end.file && end.rank - start.rank == 1 && Math.abs(end.file - start.file) == 1) {
                        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && enPessantee.file == end.file) {console.debug('legal'); break;}
                        if(pieceArray[end.rank][end.file] == '') {console.debug('illegal'); return false;}
                    }
                    else if(start.file != end.file || pieceArray[end.rank][end.file] != '') {console.debug('illegal'); return false;}
                    if(start.rank == 1 && end.rank - start.rank == 2 && pieceArray[end.rank - 1][start.file] == '') {console.debug('legal'); break;}
                    if(end.rank - start.rank == 1) {console.debug('legal'); break;}
                    {console.debug('illegal'); return false;}
                }
                {console.debug('illegal'); return false;}

            case '♜': case '♖':
                if(start.rank != end.rank && start.file != end.file) {console.debug('illegal'); return false;}
                if(start.rank != end.rank) {
                    if(end.rank - start.rank > 0) {
                        for(let i = start.rank + 1; i < end.rank; i++) {
                            if(pieceArray[i][start.file] != '') {console.debug('illegal'); return false;}
                        }
                    }
                    else {
                        for(let i = start.rank - 1; i > end.rank; i--) {
                            if(pieceArray[i][start.file] != '') {console.debug('illegal'); return false;}
                        }
                    }
                }
                else {
                    if(end.file - start.file > 0) {
                        for(let i = start.file + 1; i < end.file; i++) {
                            if(pieceArray[start.rank][i] != '') {console.debug('illegal'); return false;}
                        }
                    }
                    else {
                        for(let i = start.file - 1; i > end.file; i--) {
                            if(pieceArray[start.rank][i] != '') {console.debug('illegal'); return false;}
                        }
                    }
                }

                console.debug('legal')
                break

            case '♝': case '♗':
                if(Math.abs(end.rank - start.rank) != Math.abs(end.file - start.file)) {console.debug('illegal'); return false;}
                if(end.rank - start.rank > 0) {
                    if(end.file - start.file > 0) {
                        for(let i = start.rank + 1; i < end.rank; i++) {
                            if(pieceArray[i][i - start.rank + start.file] != '') {console.debug('illegal'); return false;}
                        }
                    }
                    else {
                        for(let i = start.rank + 1; i < end.rank; i++) {
                            if(pieceArray[i][start.file - (i - start.rank)] != '') {console.debug('illegal'); return false;}
                        }
                    }
                }
                else {
                    if(end.file - start.file > 0) {
                        for(let i = start.rank - 1; i > end.rank; i--) {
                            if(pieceArray[i][start.file - (i - start.rank)]) {console.debug('illegal'); return false;}
                        }
                    }
                    else {
                        for(let i = start.rank - 1; i > end.rank; i--) {
                            if(pieceArray[i][start.file + (i - start.rank)]) {console.debug('illegal'); return false;}
                        }
                    }
                }

                console.debug('legal')
                break
            
            case '♕': case '♛':
                if(Math.abs(end.rank - start.rank) != Math.abs(end.file - start.file) && start.rank != end.rank && start.file != end.file) {console.debug('illegal'); return false;}
                if(Math.abs(end.rank - start.rank) == Math.abs(end.file - start.file)) {
                    if(end.rank - start.rank > 0) {
                        if(end.file - start.file > 0) {
                            for(let i = start.rank + 1; i < end.rank; i++) {
                                if(pieceArray[i][i - start.rank + start.file] != '') {console.debug('illegal'); return false;}
                            }
                        }
                        else {
                            for(let i = start.rank + 1; i < end.rank; i++) {
                                if(pieceArray[i][start.file - (i - start.rank)] != '') {console.debug('illegal'); return false;}
                            }
                        }
                    }
                    else {
                        if(end.file - start.file > 0) {
                            for(let i = start.rank - 1; i > end.rank; i--) {
                                if(pieceArray[i][start.file - (i - start.rank)]) {console.debug('illegal'); return false;}
                            }
                        }
                        else {
                            for(let i = start.rank - 1; i > end.rank; i--) {
                                if(pieceArray[i][start.file + (i - start.rank)]) {console.debug('illegal'); return false;}
                            }
                        }
                    }
                }
                else {
                    if(start.rank != end.rank) {
                        if(end.rank - start.rank > 0) {
                            for(let i = start.rank + 1; i < end.rank; i++) {
                                if(pieceArray[i][start.file] != '') {console.debug('illegal'); return false;}
                            }
                        }
                        else {
                            for(let i = start.rank - 1; i > end.rank; i--) {
                                if(pieceArray[i][start.file] != '') {console.debug('illegal'); return false;}
                            }
                        }
                    }
                    else {
                        if(end.file - start.file > 0) {
                            for(let i = start.file + 1; i < end.file; i++) {
                                if(pieceArray[start.rank][i] != '') {console.debug('illegal'); return false;}
                            }
                        }
                        else {
                            for(let i = start.file - 1; i > end.file; i--) {
                                if(pieceArray[start.rank][i] != '') {console.debug('illegal'); return false;}
                            }
                        }
                    }
                }

                console.debug('legal')
                break
            
            case '♔': case '♚':
                if(castlingRights.includes(teamOf(pieceArray[start.rank][start.file])) && Math.abs(end.file - start.file) == 2 && end.rank == start.rank) {console.debug('legal'); break;}
                if(Math.abs(end.rank - start.rank) > 1 || Math.abs(end.file - start.file) > 1) {console.debug('illegal'); return false;}
                console.debug('legal')
                break
            
            case '♘': case '♞':
                if(Math.abs(end.rank - start.rank) == 2 && Math.abs(end.file - start.file) == 1) {console.debug('legal'); break;}
                if(Math.abs(end.rank - start.rank) == 1 && Math.abs(end.file - start.file) == 2) {console.debug('legal'); break;}
                {console.debug('illegal'); return false;}
        }
        // const newPieces: piece[][] = []
        // for(let rank = 0; rank < 8; rank++) {
        //     newPieces.push([])
        //     for(let file = 0; file < 8; file++) {
        //         newPieces[rank].push(pieces[rank][file])
        //     }
        // }
        // newPieces[end.rank][end.file] = newPieces[start.rank][start.file]
        // newPieces[start.rank][start.file] = ''
        // if(!checkingCheck && checkCheck(givenTurn, newPieces)) {console.debug('illegal'); return false;}
        return true
    }

    const movePiece = (start: coords, end: coords) => {
        const pieceToMove = pieces[start.rank][start.file]

        console.debug(`Moving ${pieceToMove} from (${start.rank},${start.file}) to (${end.rank},${end.file}).`)

        if(!isMoveLegal(start, end)) throw new Error('Illegal move')

        if(pieces[end.rank][end.file] != '') {
            if(teamOf(pieces[end.rank][end.file]) == 'black') {
                blackGraveyard.push(pieces[end.rank][end.file])
                setBlackGraveyard(blackGraveyard)
            }
            if(teamOf(pieces[end.rank][end.file]) == 'white') {
                whiteGraveyard.push(pieces[end.rank][end.file])
                setWhiteGraveyard(whiteGraveyard)
            }
        }

        pieces[end.rank][end.file] = pieceToMove
        pieces[start.rank][start.file] = ''

        // Capture piece en pessant
        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && pieceToMove == '♟') pieces[end.rank - 1][end.file] = ''
        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && pieceToMove == '♙') pieces[end.rank + 1][end.file] = ''

        if(Math.abs(end.rank - start.rank) == 2) {
            if(pieceToMove == '♙') {
                if(pieces[end.rank][end.file - 1] == '♟') {
                    enPessant = true
                    enPessanter = {rank: end.rank, file: end.file - 1}
                    enPessantee = {rank: end.rank, file: end.file}
                }
                if(pieces[end.rank][end.file + 1] == '♟') {
                    enPessant = true
                    enPessanter = {rank: end.rank, file: end.file + 1}
                    enPessantee = {rank: end.rank, file: end.file}
                } 
            }
            if(pieceToMove == '♟') {
                if(pieces[end.rank][end.file - 1] == '♙') {
                    enPessant = true
                    enPessanter = {rank: end.rank, file: end.file - 1}
                    enPessantee = {rank: end.rank, file: end.file}
                }
                if(pieces[end.rank][end.file + 1] == '♙') {
                    enPessant = true
                    enPessanter = {rank: end.rank, file: end.file + 1}
                    enPessantee = {rank: end.rank, file: end.file}
                }
            }
        }

        if((pieceToMove == '♔' || pieceToMove == '♚' || pieceToMove == '♖' || pieceToMove == '♜') && castlingRights.includes(teamOf(pieceToMove))) {
            castlingRights = castlingRights.filter(team => team != teamOf(pieceToMove))
        }

        if(pieceToMove == '♔') whiteKingCoords = end
        if(pieceToMove == '♚') blackKingCoords = end

        // Move rook for castling
        if((pieceToMove == '♔' || pieceToMove == '♚') && Math.abs(end.file - start.file) == 2) {
            if(end.file < start.file) {
                pieces[start.rank][end.file + 1] = pieces[start.rank][0]
                pieces[start.rank][0] = ''
            }
            if(end.file > start.file) {
                pieces[start.rank][end.file - 1] = pieces[start.rank][7]
                pieces[start.rank][7] = ''
            }
        }

        blackCheck = checkCheck('black')
        whiteCheck = checkCheck('white')
        setBlackCheck(blackCheck)
        setWhiteCheck(whiteCheck)

        setPieces(pieces)

        if((turn == 'white' && blackCheck) || (turn == 'black' && whiteCheck)) {
            // for(let startRank = 0; startRank < 8; startRank++) {
            //     for(let startFile = 0; startFile < 8; startFile++) {
            //         for(let endRank = 0; endRank < 8; endRank++) {
            //             for(let endFile = 0; endFile < 8; endFile++) {
            //                 if(teamOf(pieces[startRank][startFile]) != turn && isMoveLegal({rank: startRank, file: startFile}, {rank: endRank, file: endFile}, pieces, false, turn == 'black' ? 'white' : 'black')) throw new Error()
            //             }
            //         }
            //     }
            // }
            // setGameOver(true)
            // console.log(`Checkmate! ${turn} wins.`)
        }
    }

    const reset = () => {
        setGameOver(false)
        setBlackCheck(false)
        setBlackGraveyard([])
        setWhiteCheck(false)
        setWhiteGraveyard([])
        setPieces(startBoard)
        setTurn('white')
        setPieceHeld(false)
        setHeldPieceCoords({rank: 0, file: 0})
        console.clear()
    }

    for(let rank = 0; rank < 8; rank++) {
        squares.push([])
        for(let file = 0; file < 8; file++) {
            const isLight = (rank + file) % 2 == 0

            squares[rank].push(
            <Square
                color={`${isLight ? 'light' : 'dark'}`}
                coords={{rank: rank, file: file}}
                heldPieceCoords={heldPieceCoords}
                movePiece={movePiece}
                pieceHeld={pieceHeld}
                setPieceClicked={setPieceHeld}
                isMoveLegal={isMoveLegal}
                turn={turn}
                setTurn={setTurn}
                gameOver={gameOver}
            >
                <Piece
                    piece={pieces[rank][file]}
                    pieceHeld={pieceHeld}
                    setPieceHeld={setPieceHeld}
                    heldPieceCoords={heldPieceCoords}
                    coords={{rank: rank, file: file}}
                    setHeldPieceCoords={setHeldPieceCoords}
                    isMoveLegal={isMoveLegal}
                    turn={turn}
                    whiteCheck={whiteCheck}
                    blackCheck={blackCheck}
                    gameOver={gameOver}
                />
            </Square>)
        }
    }

    return (
        <div className="board-container">
            <link rel="stylesheet" href="css/board.css" />
            <div className="row">
                <Graveyard list={whiteGraveyard} advantage={sum(whiteGraveyard.map(piece => valueOf(piece))) - sum(blackGraveyard.map(piece => valueOf(piece)))}/>
                <div className="column">
                    <div className="board">
                        {squares}
                    </div>
                    <button onClick={reset}>Restart</button>
                    <p>Click on a piece and click on a legal space to move</p>
                    <a href="https://www.github.com/ThePyroTF2/Chess" target="_blank">Source code</a>
                </div>
                <Graveyard list={blackGraveyard} advantage={sum(blackGraveyard.map(piece => valueOf(piece))) - sum(whiteGraveyard.map(piece => valueOf(piece)))}/>
            </div>
        </div>
    )
}