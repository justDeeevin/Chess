import { FunctionComponent } from "https://esm.sh/v106/preact@10.11.0/src/index";
import { useEffect, useState } from 'https://esm.sh/v106/preact@10.11.0/hooks'
import { team } from "../islands/board.tsx"

interface props {
    color: string
    pieceHeld: boolean
    rank: number
    file: number
    setPieceClicked: (foo: boolean) => void
    movePiece: (startRank: number, startFile: number, endRank: number, endFile: number) => void
    heldPieceCoords: number[]
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
    turn: team
    setTurn: (team: team) => void
}

export const Square: FunctionComponent<props> = ({ color, pieceHeld, rank, file, setPieceClicked, movePiece, heldPieceCoords, isMoveLegal, children, turn, setTurn }) => {
    useEffect(() => {
        if(pieceHeld) {
            if(!isMoveLegal(heldPieceCoords[0], heldPieceCoords[1], rank, file)) setLegal(false)
            return
        }
        setLegal(true)
    }, [pieceHeld])

    const [legal, setLegal] = useState(true)

    return (
        <div>
            <div
                className={`square ${color} ${!pieceHeld ? '' : (legal ? 'clickable' : 'illegal')}`}
                onClick={() => {
                    if(!pieceHeld) return
                    setPieceClicked(false)
                    if(isMoveLegal(heldPieceCoords[0], heldPieceCoords[1], rank, file)) {
                        movePiece(heldPieceCoords[0], heldPieceCoords[1], rank, file)
                        setTurn(turn == 'white' ? 'black' : 'white')
                    }
                }}
            >
                {children}
            </div>
        </div>
    )
}