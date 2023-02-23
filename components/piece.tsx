import { useEffect } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { piece } from "../islands/board.tsx"

interface props {
    piece: piece
    pieceClicked: boolean
    setPieceClicked: (foo: boolean) => void
    rank: number
    file: number
    clickedPieceCoords: number[]
    setClickedPieceCoords: (foo: number[]) => void
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
}

export default function Piece(props: props) {
    return(
        <>
            <link rel="stylesheet" href="css/piece.css"/>
            <p onClick={() => {
                props.setPieceClicked(!props.pieceClicked)
                props.setClickedPieceCoords([props.rank, props.file])
            }}
            className={!props.pieceClicked ? 'pointer' : (props.isMoveLegal(props.clickedPieceCoords[0], props.clickedPieceCoords[1], props.rank, props.file) ? 'clickable' : 'illegal')}
            >{props.piece}</p>
        </>
    )
}