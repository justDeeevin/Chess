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

export {sum, numberOf}