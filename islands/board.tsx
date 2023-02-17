import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import Button from "../components/button.tsx"

export default function Board() {
    type piece = '♟' | '♞' | '♝' | '♜' | '♛' | '♚' | '♙' | '♘' | '♗' | '♖' | '♕' | '♔' | ''

    // const [pieceCoords, setPieceCoords] = useState<number[][][]>([
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    //     [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    // ])

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

    for(let rank = 0; rank < 8; rank++) {
        for(let file = 0; file < 8; file++) {
            const isLight = (rank + file ) % 2 == 0

            squares[rank].push(<div className={`square ${isLight ? 'light' : 'dark'}`}><p className="piece">{pieces[rank][file]}</p></div>)
        }
        squares.push([])
    }



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
        setPieces(pieces.map((rankArray, rankNumber) => {
            return rankArray.map((piece, fileNumber) => {
                if(rankNumber == startRank && fileNumber == startFile) return ''
                else if(rankNumber == endRank && fileNumber == endFile) return pieceToMove
                return piece
            })
        }))
    }

    return (
        <div className="container">
            <link rel="stylesheet" href="css/board.css" />
            <div className="board">
                {squares}
            </div>
            <Button onClick={(event) => {
                movePiece(0, 0, 2, 0)
            }}>push me</Button>
        </div>
    )
}