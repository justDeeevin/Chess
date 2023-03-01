import { FunctionComponent, ComponentChildren } from "https://esm.sh/v106/preact@10.11.0/src/index";
import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { team } from "../static/ts/types.ts"

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
    children: ComponentChildren
}

export const Square: FunctionComponent<props> = (props: props) => {
    const [legal, setLegal] = useState(true)

    useEffect(() => {
        if(props.pieceHeld) {
            setLegal(props.isMoveLegal(props.heldPieceCoords[0], props.heldPieceCoords[1], props.rank, props.file))
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
                    if(props.isMoveLegal(props.heldPieceCoords[0], props.heldPieceCoords[1], props.rank, props.file)) {
                        props.movePiece(props.heldPieceCoords[0], props.heldPieceCoords[1], props.rank, props.file)
                        props.setTurn(props.turn == 'white' ? 'black' : 'white')
                    }
                }}
            >
                {props.children}
            </div>
        </div>
    )
}