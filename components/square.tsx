import { FunctionComponent } from "https://esm.sh/v106/preact@10.11.0/src/index";
import { useEffect, useState } from 'https://esm.sh/v106/preact@10.11.0/hooks'
import { team } from "../islands/board.tsx"

interface props {
    color: string
    pieceClicked: boolean
    rank: number
    file: number
    setPieceClicked: (foo: boolean) => void
    movePiece: (startRank: number, startFile: number, endRank: number, endFile: number) => void
    clickedPieceCoords: number[]
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
    turn: team
    setTurn: (team: team) => void
}

export const Square: FunctionComponent<props> = ({ color, pieceClicked, rank, file, setPieceClicked, movePiece, clickedPieceCoords, isMoveLegal, children, turn, setTurn }) => {
    useEffect(() => {
        if(pieceClicked) {
            if(!isMoveLegal(clickedPieceCoords[0], clickedPieceCoords[1], rank, file)) setLegal(false)
            return
        }
        setLegal(true)
    }, [pieceClicked])

    const [legal, setLegal] = useState(true)

    return (
        <div>
            <div
                className={`square ${color} ${!pieceClicked ? '' : (legal ? 'clickable' : 'illegal')}`}
                onClick={() => {
                    if(!pieceClicked) return
                    setPieceClicked(false)
                    if(isMoveLegal(clickedPieceCoords[0], clickedPieceCoords[1], rank, file)) {
                        movePiece(clickedPieceCoords[0], clickedPieceCoords[1], rank, file)
                        setTurn(turn == 'white' ? 'black' : 'white')
                    }
                }}
            >
                {children}
            </div>
        </div>
    )
}