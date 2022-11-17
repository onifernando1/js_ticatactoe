const gameBoard = (() => {
    
    let board = [
                ["-"],["-"],["-"],
                ["-"],["-"],["-"],
                ["-"],["-"],["-"]
            ]

    const printBoard = function(){
        console.log(board)
    }

    return {
        printBoard
    }

   

})();

const displayController = (() => {
    const hi = "hello"
}
)()

const Player = (name) => {
    const sayName = () => console.log(`My name is ${name} `)
    return {
        sayName
    }
}

const oni = Player("Oni")

oni.sayName()