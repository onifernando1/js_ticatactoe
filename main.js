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
        printBoard,
        board
    }

   

})();

const displayController = (() => {
    
    let currentBoardLength = gameBoard.board.length
    const boardContainer = document.getElementsByClassName("board_container")

    let drawBoard = function(){

        for(let i = 0; i < currentBoardLength; i++){
             let square = document.createElement("div")
            square.classList.add("individual_square")
            square.innerHTML = gameBoard.board[i]
             boardContainer[0].appendChild(square)
            
         }

    }



    return {
        drawBoard
    }
}
)()

const Player = (name, symbol) => {

        const squares = document.getElementsByClassName("individual_square")
        const showPlayerSymbol = (square) => {
            square.innerHTML = "O"
        };

        const move = (square) =>{
            square.innerHTML = "X"
        }

        const clickToMove = () => {

            for (let i = 0; i < squares.length; i++){
                
                squares[i].addEventListener("click", function(){
                    move(squares[i])
                })
            }  

        }
        
      


   
    return {
        name, symbol, clickToMove
    }
}




// oni.sayName()
displayController.drawBoard()



const playerOne = Player("Oni","X")
const playerTwo = Player("Bob","O")

playerOne.addEvent()
