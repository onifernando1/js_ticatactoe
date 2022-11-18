// draw function 
// Clean up the interface to allow players to put in their names, 
// include a button to start/restart the game
//  and add a display element that congratulates the winning player!
//organize code 

//style everything 

//ai



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
    let win = false


    const move = (square) =>{

            square.innerHTML = game.currentPlayer.symbol
            checkWin()
            if (win == false ){
                checkFull()
                if(full == true){
                    drawSequence()
                }
                swapPlayer()
            } else {
                console.log("YOU HAVE WON")
            }


        
    }



    const clickToMove = () => {

        for (let i = 0; i < squares.length; i++){
            
            squares[i].addEventListener("click", function(){
                // checkFull()
                // if (full==true){
                    // alert("Draw")
                // } else {
                legalMove(squares[i])
                if (legal == true){
                    gameBoard.board[i] = game.currentPlayer.symbol
                    move(squares[i])
                    

            } 
                else if (legal == false) {
                    alert("Invalid move")
                }
            // }
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
        if(gameBoard.board.includes("-")){
            full = false 
        } else {
            full = true 
        }

        // if (full == true ){
        //     checkWin()
        // }

    }

    const drawSequence = function(){
        let boardContainer = document.getElementsByClassName("board_container")[0]
        let container = document.getElementsByClassName("body_container")
        container[0].removeChild(boardContainer); 
        
        let winScreen = document.getElementsByClassName("win_screen")[0]
        winScreen.textContent = `It is a draw!`

    }

    const checkWin = function(){
        let horizontalWins =  [[0,1,2],[3,4,5],[6,7,8]]
        let verticalWins = [[0,3,6],[1,4,7],2,5,8]
        let diagonalWins = [[0,4,8],[2,4,6]]


        horizontalWins.forEach(combination =>{

            if (gameBoard.board[combination[0]] == game.currentPlayer.symbol && gameBoard.board[combination[1]] == game.currentPlayer.symbol && gameBoard.board[combination[2]] == game.currentPlayer.symbol){
                console.log("WIN")
                win = true 
                congratulateWinner(game.currentPlayer)
            }

        })

        verticalWins.forEach(combination =>{

            if (gameBoard.board[combination[0]] == game.currentPlayer.symbol && gameBoard.board[combination[1]] == game.currentPlayer.symbol && gameBoard.board[combination[2]] == game.currentPlayer.symbol){
                console.log("WIN")
                win = true 

            }

        })

        diagonalWins.forEach(combination =>{

            if (gameBoard.board[combination[0]] == game.currentPlayer.symbol && gameBoard.board[combination[1]] == game.currentPlayer.symbol && gameBoard.board[combination[2]] == game.currentPlayer.symbol){
                console.log("WIN")
                win = true 

            }

        })

    }

    congratulateWinner = function (winner){
        console.log(`You won ${winner.name}`)
        let boardContainer = document.getElementsByClassName("board_container")[0]
        let container = document.getElementsByClassName("body_container")
        container[0].removeChild(boardContainer); 
        
        let winScreen = document.getElementsByClassName("win_screen")[0]
        winScreen.textContent = `Well Done! ${winner.name} wins!`
        
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





