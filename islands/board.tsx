// TODO:
// DISABLE HIGHLIGHTING OF PIECES

import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Button from "../components/button.tsx"
import Piece from "../components/piece.tsx"

type piece = '♟' | '♞' | '♝' | '♜' | '♛' | '♚' | '♙' | '♘' | '♗' | '♖' | '♕' | '♔' | ''
type team = 'black' | 'white' | ''

export default function Board() {
    useEffect

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

    const squares: preact.JSX.Element[][] = [[]]
    const [pieceClicked, setPieceClicked] = useState(false)
    const [clickedPieceCoords, setClickedPieceCoords] = useState<number[]>([])

    for(let rank = 0; rank < 8; rank++) {
        for(let file = 0; file < 8; file++) {
            const isLight = (rank + file ) % 2 == 0

            squares[rank].push(
            <div
                className={`square ${isLight ? 'light' : 'dark'} ${pieceClicked ? 'clickable' : ''}`}
                onClick={() => {
                    if(!pieceClicked) return
                    setPieceClicked(false)
                    movePiece(clickedPieceCoords[0], clickedPieceCoords[1], rank, file)
                }}
            >
                <Piece
                    piece={pieces[rank][file]}
                    pieceClicked={pieceClicked}
                    setPieceClicked={setPieceClicked}
                    rank={rank}
                    file={file}
                    setClickedPieceCoords={setClickedPieceCoords}
                    />
            </div>)
        }
        squares.push([])
    }

    useEffect(() => {
        console.log(`Piece clicked. New value: ${pieceClicked}`)
    }, [pieceClicked])

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

    const movePiece = (startRank: number, startFile: number, endRank: number, endFile: number) => {
        const pieceToMove = pieces[startRank][startFile]
        if(pieceToMove === '') throw new Error('No piece on starting square')
        if(startRank == endRank && startFile == endFile) throw new Error('No suicide allowed')
        if(whichTeam(pieceToMove) == whichTeam(pieces[endRank][endFile], true)) throw new Error('Cannot capture piece of own team')

        switch(pieceToMove) {
            case '♙':
                if(startRank- endRank > 0) {
                    if(startFile != endFile && pieces[endRank][endFile] != '') {console.log('startfile != endfile'); break}
                    else if(startFile != endFile || pieces[endRank][endFile] != '') throw new Error('Pawn cannot move digonally unless capturing')
                    if(startRank == 6 && startRank - endRank <= 2) break 
                    if(startRank - endRank == 1) break
                    throw new Error('Illegal move')
                }
                throw new Error('Pawn cannot move backwards')
        }

        setPieces(pieces.map((rankArray, rankNumber) => {
            return rankArray.map((piece, fileNumber) => {
                if(rankNumber == startRank && fileNumber == startFile) return ''
                else if(rankNumber == endRank && fileNumber == endFile) return pieceToMove
                return piece
            })
        }))
    }

    const whichTeam = (piece: piece, allowBlank = false): team => {
        if(piece == '♔' || piece == '♖' || piece == '♕' || piece == '♗' || piece == '♘' || piece == '♙') return 'white'
        if(piece == '') {
            if(allowBlank) return ''
            throw new Error('No piece chosen')
        }
        return 'black'
    }

    return (
        <div className="container">
            <link rel="stylesheet" href="css/board.css" />
            <div className="board">
                {squares}
            </div>
        </div>
    )
}

export type { piece }