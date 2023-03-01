import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Piece from "../components/piece.tsx"
import { Square } from "../components/square.tsx"
import { piece, team } from "../static/ts/types.ts"
import { teamOf } from "../static/ts/functions.ts"



export default function Board() {
    const [pieces, setPieces] = useState<piece[][]>([
        ['♜','♞','♝','♛','♚','♝','♞','♜'],
        ['♟','♟','♟','♟','♟','♟','♟','♟'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['♙','♙','♙','♙','♙','♙','♙','♙'],
        ['♖','♘','♗','♕','♔','♗','♘','♖']
    ])

    const squares: preact.JSX.Element[][] = []
    const [pieceHeld, setPieceHeld] = useState(false)
    const [heldPieceCoords, setHeldPieceCoords] = useState<number[]>([])
    const [turn, setTurn] = useState<team>('white')
    const [enPessant, setEnPessant] = useState(false)
    const [enPessanter, setEnPessanter] = useState([0,0])
    const [enPessantee, setEnPessantee] = useState([0,0])
    const [castlingRights, setCastlingRights] = useState<team[]>(['black', 'white'])


    const removePiece = (rank: number, file: number) => {
        pieces[rank][file] = ''
        setPieces(pieces)
    }

    const placePiece = (rank: number, file: number, pieceToPlace: piece) => {
        pieces[rank][file] = pieceToPlace
        setPieces(pieces)
    }

    const isMoveLegal = (startRank: number, startFile: number, endRank: number, endFile: number): boolean => {
        const pieceToMove = pieces[startRank][startFile]
        if(teamOf(pieceToMove) == teamOf(pieces[endRank][endFile])) return false
        switch(pieceToMove) {
            case '♙':
                if(startRank - endRank > 0) {
                    if(startFile != endFile && startRank - endRank == 1 && Math.abs(endFile - startFile) == 1) {
                        if(enPessant && enPessanter[0] == startRank && enPessanter[1] == startFile && enPessantee[1] == endFile) break
                        if(pieces[endRank][endFile] == '') return false
                    }
                    else if(startFile != endFile) return false
                    else if(pieces[endRank][endFile] != '') return false
                    if(startRank == 6 && startRank - endRank == 2 && pieces[endRank + 1][startFile] == '') break
                    if(startRank - endRank == 1) break
                    return false
                }
                return false
            case '♟':
                if(endRank - startRank > 0) {
                    if(startFile != endFile && endRank - startRank == 1 && Math.abs(endFile - startFile) == 1) {
                        if(enPessant && enPessanter[0] == startRank && enPessanter[1] == startFile && enPessantee[1] == endFile) break
                        if(pieces[endRank][endFile] == '') return false
                    }
                    else if(startFile != endFile || pieces[endRank][endFile] != '') return false
                    if(startRank == 1 && endRank - startRank == 2 && pieces[endRank - 1][startFile] == '') break
                    if(endRank - startRank == 1) break
                    return false
                }
                return false

            case '♜': case '♖':
                if(startRank != endRank && startFile != endFile) return false
                if(startRank != endRank) {
                    if(endRank - startRank > 0) {
                        for(let i = startRank + 1; i < endRank; i++) {
                            if(pieces[i][startFile] != '') return false
                        }
                    }
                    else {
                        for(let i = startRank - 1; i > endRank; i--) {
                            if(pieces[i][startFile] != '') return false
                        }
                    }
                }
                else {
                    if(endFile - startFile > 0) {
                        for(let i = startFile + 1; i < endFile; i++) {
                            if(pieces[startRank][i] != '') return false
                        }
                    }
                    else {
                        for(let i = startFile - 1; i > endFile; i--) {
                            if(pieces[startRank][i] != '') return false
                        }
                    }
                }

                break

            case '♝': case '♗':
                if(Math.abs(endRank - startRank) != Math.abs(endFile - startFile)) return false
                if(endRank - startRank > 0) {
                    if(endFile - startFile > 0) {
                        for(let i = startRank + 1; i < endRank; i++) {
                            if(pieces[i][i - startRank + startFile] != '') return false
                        }
                    }
                    else {
                        for(let i = startRank + 1; i < endRank; i++) {
                            if(pieces[i][startFile - (i - startRank)] != '') return false
                        }
                    }
                }
                else {
                    if(endFile - startFile > 0) {
                        for(let i = startRank - 1; i > endRank; i--) {
                            if(pieces[i][startFile - (i - startRank)]) return false
                        }
                    }
                    else {
                        for(let i = startRank - 1; i > endRank; i--) {
                            if(pieces[i][startFile + (i - startRank)]) return false
                        }
                    }
                }

                break
            
            case '♕': case '♛':
                if(Math.abs(endRank - startRank) != Math.abs(endFile - startFile) && startRank != endRank && startFile != endFile) return false
                if(Math.abs(endRank - startRank) == Math.abs(endFile - startFile)) {
                    if(endRank - startRank > 0) {
                        if(endFile - startFile > 0) {
                            for(let i = startRank + 1; i < endRank; i++) {
                                if(pieces[i][i - startRank + startFile] != '') return false
                            }
                        }
                        else {
                            for(let i = startRank + 1; i < endRank; i++) {
                                if(pieces[i][startFile - (i - startRank)] != '') return false
                            }
                        }
                    }
                    else {
                        if(endFile - startFile > 0) {
                            for(let i = startRank - 1; i > endRank; i--) {
                                if(pieces[i][startFile - (i - startRank)]) return false
                            }
                        }
                        else {
                            for(let i = startRank - 1; i > endRank; i--) {
                                if(pieces[i][startFile + (i - startRank)]) return false
                            }
                        }
                    }
                }
                else {
                    if(startRank != endRank) {
                        if(endRank - startRank > 0) {
                            for(let i = startRank + 1; i < endRank; i++) {
                                if(pieces[i][startFile] != '') return false
                            }
                        }
                        else {
                            for(let i = startRank - 1; i > endRank; i--) {
                                if(pieces[i][startFile] != '') return false
                            }
                        }
                    }
                    else {
                        if(endFile - startFile > 0) {
                            for(let i = startFile + 1; i < endFile; i++) {
                                if(pieces[startRank][i] != '') return false
                            }
                        }
                        else {
                            for(let i = startFile - 1; i > endFile; i--) {
                                if(pieces[startRank][i] != '') return false
                            }
                        }
                    }
                }

                break
            
            case '♔': case '♚':
                if(castlingRights.includes(teamOf(pieces[startRank][startFile])) && Math.abs(endFile - startFile) == 2 && endRank == startRank) break
                if(Math.abs(endRank - startRank) > 1 || Math.abs(endFile - startFile) > 1) return false
                break
            
            case '♘': case '♞':
                if(Math.abs(endRank - startRank) == 2 && Math.abs(endFile - startFile) == 1) break
                if(Math.abs(endRank - startRank) == 1 && Math.abs(endFile - startFile) == 2) break
                return false
        }
        return true
    }

    const movePiece = (startRank: number, startFile: number, endRank: number, endFile: number) => {
        const pieceToMove = pieces[startRank][startFile]
        console.debug(`Moving ${pieceToMove} from (${startRank},${startFile}) to (${endRank},${endFile}).`)
        console.debug(`Moving ${Math.abs(endFile - startFile)} squares horizontally`)
        if(pieceToMove === '') throw new Error('No piece on starting square')
        if(startRank == endRank && startFile == endFile) throw new Error('No suicide allowed')
        if(teamOf(pieceToMove) == teamOf(pieces[endRank][endFile])) throw new Error('Cannot capture piece of own team')

        if(!isMoveLegal(startRank, startFile, endRank, endFile)) throw new Error('Illegal move')

        pieces[endRank][endFile] = pieceToMove
        pieces[startRank][startFile] = ''
        if(enPessant && enPessanter[0] == startRank && enPessanter[1] == startFile && pieceToMove == '♟') pieces[endRank - 1][endFile] = ''
        if(enPessant && enPessanter[0] == startRank && enPessanter[1] == startFile && pieceToMove == '♙') pieces[endRank + 1][endFile] = ''
        if(Math.abs(endRank - startRank) == 2) {
            if(pieceToMove == '♙') {
                if(pieces[endRank][endFile - 1] == '♟') {
                    setEnPessant(true)
                    setEnPessanter([endRank, endFile - 1])
                    setEnPessantee([endRank, endFile])
                }
                if(pieces[endRank][endFile + 1] == '♟') {
                    setEnPessant(true)
                    setEnPessanter([endRank, endFile + 1])
                    setEnPessantee([endRank, endFile])
                } 
            }
            if(pieceToMove == '♟') {
                if(pieces[endRank][endFile - 1] == '♙') {
                    setEnPessant(true)
                    setEnPessanter([endRank, endFile - 1])
                    setEnPessantee([endRank, endFile])
                }
                if(pieces[endRank][endFile + 1] == '♙') {
                    setEnPessant(true)
                    setEnPessanter([endRank, endFile + 1])
                    setEnPessantee([endRank, endFile])
                }
            }
        }

        if((pieceToMove == '♔' || pieceToMove == '♚' || pieceToMove == '♖' || pieceToMove == '♜') && castlingRights.includes(teamOf(pieceToMove))) {
            setCastlingRights(castlingRights.filter(team => team != teamOf(pieceToMove)))
        }

        if((pieceToMove == '♔' || pieceToMove == '♚') && Math.abs(endFile - startFile) == 2) {
            if(endFile < startFile) {
                pieces[startRank][endFile + 1] = pieces[startRank][0]
                pieces[startRank][0] = ''
            }
            if(endFile > startFile) {
                pieces[startRank][endFile - 1] = pieces[startRank][7]
                pieces[startRank][7] = ''
            }
        }
        setPieces(pieces)
    }

    for(let rank = 0; rank < 8; rank++) {
        squares.push([])
        for(let file = 0; file < 8; file++) {
            const isLight = (rank + file) % 2 == 0

            squares[rank].push(
            <Square
                color={`${isLight ? 'light' : 'dark'}`}
                rank={rank}
                file={file}
                heldPieceCoords={heldPieceCoords}
                movePiece={movePiece}
                pieceHeld={pieceHeld}
                setPieceClicked={setPieceHeld}
                isMoveLegal={isMoveLegal}
                turn={turn}
                setTurn={setTurn}
            >
                <Piece
                    piece={pieces[rank][file]}
                    pieceHeld={pieceHeld}
                    setPieceHeld={setPieceHeld}
                    rank={rank}
                    file={file}
                    heldPieceCoords={heldPieceCoords}
                    setHeldPieceCoords={setHeldPieceCoords}
                    isMoveLegal={isMoveLegal}
                    turn={turn}
                />
            </Square>)
        }
    }

    return (
        <div className="container">
            <link rel="stylesheet" href="css/board.css" />
            <div className="board">
                {squares}
            </div>
            <p>Click on a piece and click on a legal space to move</p>
            <a href="https://www.github.com/ThePyroTF2/Chess" target="_blank">Source code</a>
        </div>
    )
}