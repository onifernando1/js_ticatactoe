const gameBoard = (() => {
    
    let board = [
                "-","-","-",
                "-","-","-",
                "-","-","-"
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

        let squares = document.getElementsByClassName("individual_square")
        const showPlayerSymbol = (square) => {
            square.innerHTML = "O"
        };

     
        
      


   
    return {
        name, symbol
    }
}

const game = (() => {
    
    let playerOne = ''
    let playerTwo = ''
    let currentPlayer = ''
    let squares = document.getElementsByClassName("individual_square")
    let legal = ''
    let full = ''


    const move = (square) =>{

            square.innerHTML = game.currentPlayer.symbol
            swapPlayer()

        
    }



    const clickToMove = () => {

        for (let i = 0; i < squares.length; i++){
            
            squares[i].addEventListener("click", function(){
                checkFull()
                legalMove(squares[i])
                if (legal == true){
                    gameBoard.board[i] = game.currentPlayer.symbol
                    move(squares[i])
                    

            } 
                else if (legal == false) {
                    alert("Invalid move")
                }
            })
        }  

    }

    const swapPlayer = function(){

        if (game.currentPlayer.symbol == game.playerOne.symbol){
            game.currentPlayer = game.playerTwo
        } else {
            game.currentPlayer = game.playerOne

        }
    }

    const legalMove = function(square){
        if (square.textContent != "-"){
            legal = false
        } else {
            legal = true
        }
    }

    const checkFull = function(){
        full = gameBoard.board.includes("-")

    }

    return {
        playerOne, playerTwo, clickToMove,legalMove
    }

   

})(); 




// oni.sayName()
displayController.drawBoard()



const playerOne = Player("Oni","X")
const playerTwo = Player("Bob","O")
game.playerOne = playerOne
game.playerTwo = playerTwo
game.currentPlayer = playerOne
game.clickToMove()
console.log(game.currentPlayer)



