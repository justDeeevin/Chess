import type {piece, team} from './types.ts'

const teamOf = (piece: piece): team => {
    if(piece == '♔' || piece == '♖' || piece == '♕' || piece == '♗' || piece == '♘' || piece == '♙') return 'white'
    if(piece == '') {
        console.warn('No piece chosen. This could be dangerous.')
        return ''
    }
    return 'black'
}

const valueOf = (piece: piece): number => {
    switch(piece) {
        case '♙': case '♟':
            return 1
        case '♘': case '♞': case '♗': case '♝':
            return 3
        case '♖': case '♜':
            return 5
        case '♕': case '♛':
            return 9
    }
    return 0
}

const sum = (arr: number[]): number => {
    let sum = 0;
    for(const n of arr) {
        sum += n
    }
    return sum
}

const numberOf = <T>(item: T, array: T[]): number => {
    return sum(array.map(foo => foo == item ? 1 : 0))
}

export {teamOf, valueOf, sum, numberOf}