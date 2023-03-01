import {piece, team} from './types.ts'

const teamOf = (piece: piece): team => {
    if(piece == '♔' || piece == '♖' || piece == '♕' || piece == '♗' || piece == '♘' || piece == '♙') return 'white'
    if(piece == '') {
        console.warn('No piece chosen. This could be dangerous.')
        return ''
    }
    return 'black'
}

export {teamOf}