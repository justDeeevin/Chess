import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Piece from "../components/piece.tsx"
import { Square } from "../components/square.tsx"

type piece = '♟' | '♞' | '♝' | '♜' | '♛' | '♚' | '♙' | '♘' | '♗' | '♖' | '♕' | '♔' | ''
type team = 'black' | 'white' | ''

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
    const [pieceClicked, setPieceClicked] = useState(false)
    const [clickedPieceCoords, setClickedPieceCoords] = useState<number[]>([])

    const removePiece = (rank: number, file: number) => {
        setPieces(pieces.map((rankArray, rankNumber) => {
            return rankArray.map((piece, fileNumber) => {
                if(rankNumber == rank && fileNumber == file) return ''
                return piece
            })
        }))
    }

    const placePiece = (rank: number, file: number, pieceToPlace: piece) => {
        setPieces(pieces.map((rankArray, rankNumber) => {
            return rankArray.map((piece, fileNumber) => {
                if(rankNumber == rank && fileNumber == file) return pieceToPlace
                return piece
            })
        }))
    }

    const isMoveLegal = (startRank: number, startFile: number, endRank: number, endFile: number): boolean => {
        const pieceToMove = pieces[startRank][startFile]
        if(whichTeam(pieceToMove) == whichTeam(pieces[endRank][endFile], true)) return false
        switch(pieceToMove) {
            case '♙':
                if(startRank - endRank > 0) {
                    if(startFile != endFile && startRank - endRank == 1 && pieces[endRank][endFile] != '') break
                    else if(startFile != endFile) return false
                    else if(pieces[endRank][endFile] != '') return false
                    if(startRank == 6 && startRank - endRank <= 2) break 
                    if(startRank - endRank == 1) break
                    return false
                }
                return false
            case '♟':
                if(endRank - startRank > 0) {
                    if(startFile != endFile && endRank - startRank == 1 && pieces[endRank][endFile] != '') break
                    else if(startFile != endFile || pieces[endRank][endFile] != '') return false
                    if(startRank == 1 && endRank - startRank <= 2) break 
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
        if(pieceToMove === '') throw new Error('No piece on starting square')
        if(startRank == endRank && startFile == endFile) throw new Error('No suicide allowed')
        if(whichTeam(pieceToMove) == whichTeam(pieces[endRank][endFile], true)) throw new Error('Cannot capture piece of own team')

        // Check move legality
        if(!isMoveLegal(startRank, startFile, endRank, endFile)) throw new Error('Illegal move')

        pieces[endRank][endFile] = pieceToMove
        pieces[startRank][startFile] = ''
        setPieces(pieces)
    }

    const whichTeam = (piece: piece, allowBlank = false): team => {
        if(piece == '♔' || piece == '♖' || piece == '♕' || piece == '♗' || piece == '♘' || piece == '♙') return 'white'
        if(piece == '') {
            if(allowBlank) return ''
            throw new Error('No piece chosen')
        }
        return 'black'
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
                clickedPieceCoords={clickedPieceCoords}
                movePiece={movePiece}
                pieceClicked={pieceClicked}
                setPieceClicked={setPieceClicked}
                isMoveLegal={isMoveLegal}
            >
                <Piece
                    piece={pieces[rank][file]}
                    pieceClicked={pieceClicked}
                    setPieceClicked={setPieceClicked}
                    rank={rank}
                    file={file}
                    clickedPieceCoords={clickedPieceCoords}
                    setClickedPieceCoords={setClickedPieceCoords}
                    isMoveLegal={isMoveLegal}
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

export type { piece }