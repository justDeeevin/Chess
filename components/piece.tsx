import { useState, useEffect } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { piece, team, coords } from "../static/ts/types.ts"
import { teamOf } from "../static/ts/functions.ts"

interface props {
    piece: piece
    pieceHeld: boolean
    setPieceHeld: (foo: boolean) => void
    rank: number
    file: number
    heldPieceCoords: coords
    setHeldPieceCoords: (foo: coords) => void
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
    turn: team
}

export default function Piece(props: props) {
    const [myTurn, setMyTurn] = useState(teamOf(props.piece) == props.turn)

    useEffect(() => {
        setMyTurn(teamOf(props.piece) == props.turn)
    },[props.turn])

    return(
        <>
            <link rel="stylesheet" href="css/piece.css"/>
            <p onClick={() => {
                if(myTurn) {
                    props.setPieceHeld(!props.pieceHeld)
                    props.setHeldPieceCoords({rank: props.rank, file: props.file})
                }
            }}
            className={`${myTurn ? (!props.pieceHeld ? 'pointer' : (props.isMoveLegal(props.heldPieceCoords.rank, props.heldPieceCoords.file, props.rank, props.file) ? 'clickable' : 'illegal')) : ''} ${props.heldPieceCoords.rank == props.rank && props.heldPieceCoords.file == props.file && props.pieceHeld ? 'held' : ''}`}
            >{props.piece}</p>
        </>
    )
}