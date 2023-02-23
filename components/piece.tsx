import { useState, useEffect } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { piece, team } from "../islands/board.tsx"

interface props {
    piece: piece
    pieceClicked: boolean
    setPieceClicked: (foo: boolean) => void
    rank: number
    file: number
    clickedPieceCoords: number[]
    setClickedPieceCoords: (foo: number[]) => void
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
    turn: team
    whichTeam: (piece: piece, allowBlank?: boolean) => team
}

export default function Piece(props: props) {

    const [myTurn, setMyTurn] = useState(props.whichTeam(props.piece, true) == props.turn)

    useEffect(() => {
        setMyTurn(props.whichTeam(props.piece, true) == props.turn)
    },[props.turn])

    return(
        <>
            <link rel="stylesheet" href="css/piece.css"/>
            <p onClick={() => {
                if(myTurn) {
                    props.setPieceClicked(!props.pieceClicked)
                    props.setClickedPieceCoords([props.rank, props.file])
                }
            }}
            className={myTurn ? (!props.pieceClicked ? 'pointer' : (props.isMoveLegal(props.clickedPieceCoords[0], props.clickedPieceCoords[1], props.rank, props.file) ? 'clickable' : 'illegal')) : ''}
            >{props.piece}</p>
        </>
    )
}