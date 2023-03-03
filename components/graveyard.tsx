import type { piece } from "../static/ts/types.ts"
import { numberOf, valueOf } from "../static/ts/functions.ts"

interface props {
    list: piece[]
    advantage: number
}

export default function Graveyard(props: props) {
    const realList: piece[] = []
    for(const piece of props.list) {
        if(!realList.includes(piece)) realList.push(piece)
    }
    const pieces = realList.map(piece => <div className="grave"><p className="corpse" title={`Value: ${valueOf(piece) * numberOf<piece>(piece, props.list)}`}>{piece}</p><p className="counter">{piece != '' && numberOf<piece>(piece, props.list) > 1 ? `x${numberOf<piece>(piece, props.list)}` : ''}</p></div>
)

    return (
        <div className="graveyard-container">
            <p className="corpse">{props.advantage > 0 ? `+${props.advantage}` : ''}</p>
            {pieces}
        </div>
    )
}