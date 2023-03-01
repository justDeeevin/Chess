import { piece } from "../static/ts/types.ts"
import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"

interface props {
    list: piece[]
}

export default function Graveyard(props: props) {
    console.debug('foo')

    const pieces = props.list.map(piece => {
        return <p className="corpse">{piece}</p>
    })

    return (
        <div className="graveyard-container">
            <link rel="stylesheet" href="../static/css/graveyard.css" />
            {pieces}
        </div>
    )
}