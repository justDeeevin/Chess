import { useEffect } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { piece } from "../islands/board.tsx"

interface props {
    piece: piece
    pieceClicked: boolean
    setPieceClicked: (foo: boolean) => void
    rank: number
    file: number
    setClickedPieceCoords: (foo: number[]) => void
}

export default function Piece(props: props) {
    return(
        <>
            <link rel="stylesheet" href="css/piece.css"/>
            <p onClick={() => {
                props.setPieceClicked(!props.pieceClicked)
                props.setClickedPieceCoords([props.rank, props.file])
            }}
            className="piece"
            >{props.piece}</p>
        </>
    )
}