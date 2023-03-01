type piece = '♟' | '♞' | '♝' | '♜' | '♛' | '♚' | '♙' | '♘' | '♗' | '♖' | '♕' | '♔' | ''
type team = 'black' | 'white' | ''

interface coords {
    rank: number
    file: number
}

export type { piece, team, coords }