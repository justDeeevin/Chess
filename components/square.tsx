import { FunctionComponent, ComponentChildren } from "https://esm.sh/v106/preact@10.11.0/src/index";
import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { team, coords } from "../static/ts/types.ts"

interface props {
    color: string
    pieceHeld: boolean
    coords: coords
    setPieceClicked: (foo: boolean) => void
    movePiece: (start: coords, end: coords) => void
    heldPieceCoords: coords
    isMoveLegal: (start: coords, end: coords) => boolean
    turn: team
    setTurn: (team: team) => void
    children: ComponentChildren
}

export const Square: FunctionComponent<props> = (props: props) => {
    const [legal, setLegal] = useState(true)

    useEffect(() => {
        if(props.pieceHeld) {
            setLegal(props.isMoveLegal(props.heldPieceCoords, props.coords))
            return
        }
        setLegal(true)
    }, [props.pieceHeld])

    return (
        <div>
            <div
                className={`square ${props.color}${props.pieceHeld && legal ? '-highlighted' : ''} ${!props.pieceHeld ? '' : (legal ? 'clickable' : 'illegal')}`}
                onClick={() => {
                    if(!props.pieceHeld) return
                    props.setPieceClicked(false)
                    if(props.isMoveLegal(props.heldPieceCoords, props.coords)) {
                        props.movePiece(props.heldPieceCoords, props.coords)
                        props.setTurn(props.turn == 'white' ? 'black' : 'white')
                    }
                }}
            >
                {props.children}
            </div>
        </div>
    )
}