import { FunctionComponent } from "https://esm.sh/v106/preact@10.11.0/src/index";
import { useEffect, useState } from 'https://esm.sh/v106/preact@10.11.0/hooks'

interface props {
    color: string
    pieceClicked: boolean
    rank: number
    file: number
    setPieceClicked: (foo: boolean) => void
    movePiece: (startRank: number, startFile: number, endRank: number, endFile: number) => void
    clickedPieceCoords: number[]
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
}

export const Square: FunctionComponent<props> = ({ color, pieceClicked, rank, file, setPieceClicked, movePiece, clickedPieceCoords, isMoveLegal, children }) => {
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
                    movePiece(clickedPieceCoords[0], clickedPieceCoords[1], rank, file)
                }}
            >
                {children}
            </div>
        </div>
    )
}