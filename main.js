
//ai
// underscore private methods



const gameBoard = (() => {

    
    let board = [
                " "," "," ",
                " "," "," ",
                " "," "," "
            ]


    return {
        board
    }

   

})();

const displayController = (() => {

    
    

    let drawBoard = function(){

        let currentBoardLength = gameBoard.board.length
        let bodyContainer = document.getElementsByClassName("body_container")[0]
        let boardContainer = document.createElement("div")
        boardContainer.classList.add("board_container")
        bodyContainer.appendChild(boardContainer)

        for(let i = 0; i < currentBoardLength; i++){
             let square = document.createElement("div")
            square.classList.add("individual_square")
            square.innerHTML = gameBoard.board[i]
             boardContainer.appendChild(square)
            
         }

    }



    return {
        drawBoard
    }
}
)()

const Player = (name, symbol) => {

    let legalMoves = []
    let randomMove = ""       

    //AI functions 

    const findLegalMoves = function(){
        
        for(let i = 0; i < gameBoard.board.length; i++){
            if (gameBoard.board[i] == " "){
                legalMoves.push(i)
            }
        }
    }

    const selectRandomLegalMove = function(){
        let length = legalMoves.length
        min = Math.ceil(0);
        max = Math.floor(length)
        randomMove = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(randomMove)
    }


    return {
        name, symbol, findLegalMoves, selectRandomLegalMove
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
    aiMode = false 



    const move = (square) =>{

            square.innerHTML = currentPlayer.symbol
            checkWin()
            if (win == false ){
                checkFull()
                if(full == true){
                    drawSequence()
                }
                swapPlayer()
            } 
        
    }


    const clickToMove = () => {

        for (let i = 0; i < squares.length; i++){
            
            squares[i].addEventListener("click", function(){
            round(i)

            })
        }  

    }

    const swapPlayer = function(){

        if (currentPlayer.symbol == playerOne.symbol){
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne

        }
    }

    const legalMove = function(square){
        if (square.textContent != " "){
            legal = false
        } else {
            legal = true
        }
    }

    const checkFull = function(){
        if(gameBoard.board.includes(" ")){
            full = false 
        } else {
            full = true 
        }

    }

    const drawSequence = function(){
        let boardContainer = document.getElementsByClassName("board_container")[0]
        let container = document.getElementsByClassName("body_container")[0]
        let winMessage = document.createElement("div")
        winMessage.className = "win_message"
        winMessage.innerText = `It is a draw!`
        container.appendChild(winMessage)
        container.removeChild(boardContainer); 

    }

    const checkWin = function(){
        let horizontalWins =  [[0,1,2],[3,4,5],[6,7,8]]
        let verticalWins = [[0,3,6],[1,4,7],2,5,8]
        let diagonalWins = [[0,4,8],[2,4,6]]


        horizontalWins.forEach(combination =>{

            if (gameBoard.board[combination[0]] == currentPlayer.symbol && gameBoard.board[combination[1]] == currentPlayer.symbol && gameBoard.board[combination[2]] == currentPlayer.symbol){
                console.log("WIN")
                win = true 
                congratulateWinner(currentPlayer)
            }

        })

        verticalWins.forEach(combination =>{

            if (gameBoard.board[combination[0]] == currentPlayer.symbol && gameBoard.board[combination[1]] == currentPlayer.symbol && gameBoard.board[combination[2]] == currentPlayer.symbol){
                console.log("WIN")
                win = true 
                congratulateWinner(currentPlayer)

            }

        })

        diagonalWins.forEach(combination =>{

            if (gameBoard.board[combination[0]] == currentPlayer.symbol && gameBoard.board[combination[1]] == currentPlayer.symbol && gameBoard.board[combination[2]] == currentPlayer.symbol){
                console.log("WIN")
                win = true 
                congratulateWinner(currentPlayer)

            }

        })

    }

    const congratulateWinner = function (winner){
        let boardContainer = document.getElementsByClassName("board_container")[0]
        let container = document.getElementsByClassName("body_container")[0]
        let winMessage = document.createElement("div")
        winMessage.className = "win_message"
        winMessage.innerText = `You won ${winner.name}`
        container.appendChild(winMessage)
        container.removeChild(boardContainer); 
        
    }

    const round = function(i){
        legalMove(squares[i])
        if (legal == true){
            gameBoard.board[i] = currentPlayer.symbol
            move(squares[i])
            

    } 
        else if (legal == false) {
            alert("Invalid move")
        }
    }

    const getNamesSetup = function(){
        
        let name_form = document.getElementsByClassName("names_form")[0]

        name_form.addEventListener("submit", (event)=>{
            event.preventDefault()
            getNamesFunction()
            
            })
    }


    const getNamesFunction = function(){
        
        createPlayers()
        playGame()
    }



    const createPlayers = function(){
        p1_name = document.getElementById("p1_name")
        p2_name = document.getElementById("p2_name")
         
        if(p1_name.value != undefined && p1_name.value != ""){
            playerOne = Player(p1_name.value,"X") 
        } else {
            playerOne = Player("Player One","X")
        }

        if (aiMode == false ){
            if(p2_name.value != undefined && p2_name.value != ""){
                playerTwo = Player(p2_name.value,"O") 
            } else {
                playerTwo = Player("Player Two","O")
            }
        } else {
            playerTwo = Player("AI","O")
        }

        currentPlayer = playerOne // top delete 




    }

    const playGame = function(){
        if (document.getElementsByClassName("board_container").length == 0){
            
            let getNames = document.getElementsByClassName("get_names")[0]
            getNames.classList.toggle('show');
            let resetButton = document.getElementsByClassName("restart")[0]
            resetButton.classList.toggle("show")

            displayController.drawBoard()
            clickToMove()
        } 
    }

    const restartSetUp = function(){
        restartButton = document.getElementsByClassName("restart")[0]
        restartButton.addEventListener("click", function(){
            restart()
        })
    }

    const restart = function(){

       
        // Remove Board


        let boardContainer = document.getElementsByClassName("board_container")[0]
        let bodyContainer = document.getElementsByClassName("body_container")[0]
        if(boardContainer != undefined){
            bodyContainer.removeChild(boardContainer)
        }

        //Reset players

        p1_name = document.getElementById("p1_name")
        p2_name = document.getElementById("p2_name")
        p1_name.value = ""
        p2_name.value = ""
        playerOne = ''
        playerTwo = ''
        currentPlayer = ''
        aiMode = false 

        //Reset board 

        gameBoard.board = [
            " "," "," ",
            " "," "," ",
            " "," "," "
        ]
     

        //reset legal, full, win  
      
        legal = ''
        full = ''
        win = false

        
        //Remove win message
        winMessage = document.getElementsByClassName("win_message")[0]
        
        if(winMessage != undefined){
            bodyContainer.removeChild(winMessage)
        }

        //Hide Reset Button
        let resetButton = document.getElementsByClassName("restart")[0]
        resetButton.classList.toggle("show")

        //show get name form 
        let getNames = document.getElementsByClassName("get_names")[0]
        getNames.classList.toggle('show');

        

    }

    const removePlayerTwo = function(){
        let aiCheckbox = document.getElementById("ai")
        aiCheckbox.addEventListener("click", function(){
            disablePlayerTwo()

        })
    }

    const disablePlayerTwo = function(){
        playerTwoNameForm = document.getElementsByClassName("player_two_name_form")[0]
        playerTwoNameForm.classList.toggle("disabled")
        if (aiMode == false) {
            aiMode = true 
        } else {
            aiMode = false
        }
    }

    const startGame = function(){
        restartSetUp()
        getNamesSetup()
        removePlayerTwo()
    }



    return {
        startGame
    }

   

})(); 


game.startGame()
