import { useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Piece from "../components/piece.tsx"
import Square from "../components/square.tsx"
import type { piece, team, coords } from "../static/ts/types.ts"
import { sum, teamOf, valueOf } from "../static/ts/functions.ts"
import Graveyard from "../components/graveyard.tsx"

const startBoard: piece[][] = [
    ['♜','♞','♝','♛','♚','♝','♞','♜'],
    ['♟','♟','♟','♟','♟','♟','♟','♟'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['♙','♙','♙','♙','♙','♙','♙','♙'],
    ['♖','♘','♗','♕','♔','♗','♘','♖']
]

export default function Board() {
    const [pieces, setPieces] = useState(JSON.parse(JSON.stringify(startBoard)))

    const squares: preact.JSX.Element[][] = []
    const [pieceHeld, setPieceHeld] = useState(false)
    const [heldPieceCoords, setHeldPieceCoords] = useState<coords>({rank: 0, file: 0})
    const [turn, setTurn] = useState<team>('white')
    const [enPessant, setEnPessant] = useState(false)
    const [enPessanter, setEnPessanter] = useState<coords>({rank: 0, file: 0})
    const [enPessantee, setEnPessantee] = useState<coords>({rank: 0, file: 0})
    const [castlingRights, setCastlingRights] = useState<team[]>(['black', 'white'])
	const [whiteGraveyard, setWhiteGraveyard] = useState<piece[]>([])
	const [blackGraveyard, setBlackGraveyard] = useState<piece[]>([])
    const [blackCheck, setBlackCheck] = useState(false)
    const [whiteCheck, setWhiteCheck] = useState(false)
    let whiteKingCoords: coords = {rank: 7, file: 4}
    let blackKingCoords: coords = {rank: 0, file: 4}
    const [gameOver, setGameOver] = useState(false)

    const checkCheck = (team: team, pieceArray = pieces): boolean => {
        for(let rank = 0; rank < 8; rank++) {
            for(let file = 0; file < 8; file++) {
                if(team == 'white' && teamOf(pieceArray[rank][file]) == 'black' && isMoveLegal({rank: rank, file: file}, whiteKingCoords, pieceArray, true)) {
                    // console.debug(`Move from (${rank},${file}) to (${whiteKingCoords.rank},${whiteKingCoords.file}) is legal. White is in check.`)
                    return true
                }
                if(team == 'black' && teamOf(pieceArray[rank][file]) == 'white' && isMoveLegal({rank: rank, file: file}, blackKingCoords, pieceArray, true)) {
                    // console.debug(`Move from (${rank},${file}) to (${blackKingCoords.rank},${blackKingCoords.file}) is legal. Black is in check.`)
                    return true
                }
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

    const isMoveLegal = (start: coords, end: coords, pieceArray = pieces, checkingCheck = false): boolean => {
        const pieceToMove = pieceArray[start.rank][start.file]
        // console.debug(`Testing move of ${pieceToMove} from (${start.rank},${start.file}) to (${end.rank},${end.file}).`)
        if(pieceToMove == '') return false
        if(start.rank == end.rank && start.file == end.file) return false
        if(teamOf(pieceToMove) == teamOf(pieceArray[end.rank][end.file])) return false
        switch(pieceToMove) {
            case '♙':
                if(start.rank - end.rank > 0) {
                    if(start.rank - end.rank == 1 && Math.abs(end.file - start.file) == 1) {
                        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && enPessantee.file == end.file) break
                        if(pieceArray[end.rank][end.file] == '') return false
                    }
                    else if(start.file != end.file) return false
                    else if(pieceArray[end.rank][end.file] != '') return false
                    if(start.rank == 6 && start.rank - end.rank == 2 && pieceArray[end.rank + 1][start.file] == '') break
                    if(start.rank - end.rank == 1) break
                    return false
                }
                return false
            case '♟':
                if(end.rank - start.rank > 0) {
                    if(end.rank - start.rank == 1 && Math.abs(end.file - start.file) == 1) {
                        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && enPessantee.file == end.file) break
                        if(pieceArray[end.rank][end.file] == '') return false
                    }
                    else if(start.file != end.file || pieceArray[end.rank][end.file] != '') return false
                    if(start.rank == 1 && end.rank - start.rank == 2 && pieceArray[end.rank - 1][start.file] == '') break
                    if(end.rank - start.rank == 1) break
                    return false
                }
                return false
            
            case '♘': case '♞':
                if(Math.abs(end.rank - start.rank) == 2 && Math.abs(end.file - start.file) == 1) break
                if(Math.abs(end.rank - start.rank) == 1 && Math.abs(end.file - start.file) == 2) break
                return false

            case '♝': case '♗':
                if(Math.abs(end.rank - start.rank) != Math.abs(end.file - start.file)) return false
                if(end.rank - start.rank > 0) {
                    if(end.file - start.file > 0) {
                        for(let i = start.rank + 1; i < end.rank; i++) {
                            if(pieceArray[i][i - start.rank + start.file] != '') return false
                        }
                    }
                    else {
                        for(let i = start.rank + 1; i < end.rank; i++) {
                            if(pieceArray[i][start.file - (i - start.rank)] != '') false
                        }
                    }
                }
                else {
                    if(end.file - start.file > 0) {
                        for(let i = start.rank - 1; i > end.rank; i--) {
                            if(pieceArray[i][start.file - (i - start.rank)]) return false
                        }
                    }
                    else {
                        for(let i = start.rank - 1; i > end.rank; i--) {
                            if(pieceArray[i][start.file + (i - start.rank)]) return false
                        }
                    }
                }

                break
            
            case '♜': case '♖':
                if(start.rank != end.rank && start.file != end.file) return false
                if(start.rank != end.rank) {
                    if(end.rank - start.rank > 0) {
                        for(let i = start.rank + 1; i < end.rank; i++) {
                            if(pieceArray[i][start.file] != '') return false
                        }
                    }
                    else {
                        for(let i = start.rank - 1; i > end.rank; i--) {
                            if(pieceArray[i][start.file] != '') return false
                        }
                    }
                }
                else {
                    if(end.file - start.file > 0) {
                        for(let i = start.file + 1; i < end.file; i++) {
                            if(pieceArray[start.rank][i] != '') return false
                        }
                    }
                    else {
                        for(let i = start.file - 1; i > end.file; i--) {
                            if(pieceArray[start.rank][i] != '') return false
                        }
                    }
                }

                break

            case '♕': case '♛':
                if(Math.abs(end.rank - start.rank) != Math.abs(end.file - start.file) && start.rank != end.rank && start.file != end.file) return false
                if(Math.abs(end.rank - start.rank) == Math.abs(end.file - start.file)) {
                    if(end.rank - start.rank > 0) {
                        if(end.file - start.file > 0) {
                            for(let i = start.rank + 1; i < end.rank; i++) {
                                if(pieceArray[i][i - start.rank + start.file] != '') return false
                            }
                        }
                        else {
                            for(let i = start.rank + 1; i < end.rank; i++) {
                                if(pieceArray[i][start.file - (i - start.rank)] != '') false
                            }
                        }
                    }
                    else {
                        if(end.file - start.file > 0) {
                            for(let i = start.rank - 1; i > end.rank; i--) {
                                if(pieceArray[i][start.file - (i - start.rank)]) return false
                            }
                        }
                        else {
                            for(let i = start.rank - 1; i > end.rank; i--) {
                                if(pieceArray[i][start.file + (i - start.rank)]) return false
                            }
                        }
                    }
                }
                else {
                    if(start.rank != end.rank) {
                        if(end.rank - start.rank > 0) {
                            for(let i = start.rank + 1; i < end.rank; i++) {
                                if(pieceArray[i][start.file] != '') return false
                            }
                        }
                        else {
                            for(let i = start.rank - 1; i > end.rank; i--) {
                                if(pieceArray[i][start.file] != '') return false
                            }
                        }
                    }
                    else {
                        if(end.file - start.file > 0) {
                            for(let i = start.file + 1; i < end.file; i++) {
                                if(pieceArray[start.rank][i] != '') return false
                            }
                        }
                        else {
                            for(let i = start.file - 1; i > end.file; i--) {
                                if(pieceArray[start.rank][i] != '') return false
                            }
                        }
                    }
                }

                break
            
            case '♔': case '♚':
                if(castlingRights.includes(teamOf(pieceArray[start.rank][start.file])) && Math.abs(end.file - start.file) == 2 && end.rank == start.rank) break
                if(Math.abs(end.rank - start.rank) > 1 || Math.abs(end.file - start.file) > 1) return false
                break
        }

        const newPieceArray: piece[][] = JSON.parse(JSON.stringify(pieceArray))
        newPieceArray[end.rank][end.file] = pieceToMove
        newPieceArray[start.rank][start.file] = ''

        if(!checkingCheck && checkCheck(teamOf(pieceToMove), pieceArray)) return false

        return true
    }

    const movePiece = (start: coords, end: coords) => {
        const pieceToMove: piece = pieces[start.rank][start.file]

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

        if(Math.abs(end.rank - start.rank) == 2) {
            if(pieceToMove == '♙') {
                if(pieces[end.rank][end.file - 1] == '♟') {
                    setEnPessant(true)
                    setEnPessanter({rank: end.rank, file: end.file - 1})
                    setEnPessantee({rank: end.rank, file: end.file})
                }
                if(pieces[end.rank][end.file + 1] == '♟') {
                    setEnPessant(true)
                    setEnPessanter({rank: end.rank, file: end.file + 1})
                    setEnPessantee({rank: end.rank, file: end.file})
                } 
            }
            if(pieceToMove == '♟') {
                if(pieces[end.rank][end.file - 1] == '♙') {
                    setEnPessant(true)
                    setEnPessanter({rank: end.rank, file: end.file - 1})
                    setEnPessantee({rank: end.rank, file: end.file})
                }
                if(pieces[end.rank][end.file + 1] == '♙') {
                    setEnPessant(true)
                    setEnPessanter({rank: end.rank, file: end.file + 1})
                    setEnPessantee({rank: end.rank, file: end.file})
                }
            }
        }

        // Capture piece en pessant
        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && pieceToMove == '♟') pieces[end.rank - 1][end.file] = ''
        if(enPessant && enPessanter.rank == start.rank && enPessanter.file == start.file && pieceToMove == '♙') pieces[end.rank + 1][end.file] = ''

        if((pieceToMove == '♔' || pieceToMove == '♚' || pieceToMove == '♖' || pieceToMove == '♜') && castlingRights.includes(teamOf(pieceToMove))) {
            setCastlingRights(castlingRights.filter(team => team != teamOf(pieceToMove)))
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

        setBlackCheck(checkCheck('black'))
        setWhiteCheck(checkCheck('white'))

        setPieces(pieces)
    }

    const reset = () => {
        setPieces(JSON.parse(JSON.stringify(startBoard)))
        setGameOver(false)
        setBlackCheck(false)
        setBlackGraveyard([])
        setWhiteCheck(false)
        setWhiteGraveyard([])
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
    )
}