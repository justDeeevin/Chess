import type { piece } from "../static/ts/types.ts"
import { valueOf } from "../static/ts/functions.ts"

interface props {
    list: piece[]
    advantage: number
}

export default function Graveyard(props: props) {
    const pieces = props.list.map(piece => <p className="corpse" title={`Value: ${valueOf(piece)}`}>{piece}</p>)

    return (
        <div className="graveyard-container">
            <link rel="stylesheet" href="../static/css/graveyard.css" />
            <p className="corpse">{props.advantage > 0 ? `+${props.advantage}` : ''}</p>
            {pieces}
        </div>
    )
}