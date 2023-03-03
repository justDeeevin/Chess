import { useState, useEffect } from "https://esm.sh/v106/preact@10.11.0/hooks"
import type { piece, team, coords } from "../static/ts/types.ts"
import { teamOf } from "../static/ts/functions.ts"

interface props {
    piece: piece
    pieceHeld: boolean
    setPieceHeld: (foo: boolean) => void
    heldPieceCoords: coords
    coords: coords
    setHeldPieceCoords: (foo: coords) => void
    isMoveLegal: (start: coords, end: coords) => boolean
    turn: team
    whiteCheck: boolean
    blackCheck: boolean
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
                    props.setHeldPieceCoords({rank: props.coords.rank, file: props.coords.file})
                }
            }}
            className={`${myTurn ? (!props.pieceHeld ? 'pointer' : (props.isMoveLegal(props.heldPieceCoords, props.coords) ? 'clickable' : 'illegal')) : ''} ${props.heldPieceCoords.rank == props.coords.rank && props.heldPieceCoords.file == props.coords.file && props.pieceHeld ? 'held' : ''} ${(props.piece == '♔' && props.whiteCheck) || (props.piece == '♚' && props.blackCheck) ? 'check' : ''}`}
            >{props.piece}</p>
        </>
    )
}