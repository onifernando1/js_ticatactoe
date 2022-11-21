let moveNumber = 0
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
    // let randomMove = ""       

    //AI functions 

    const findLegalMoves = function(){
        
        for(let i = 0; i < gameBoard.board.length; i++){
            if (gameBoard.board[i] == " "){
                legalMoves.push(i)
                console.log(`legal move found ${i}`)
            }
        }
    }

    const selectRandomLegalMove = function(){
        let length = legalMoves.length
        min = Math.ceil(0);
        max = Math.floor(length - 1)
        let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        let randomMove = legalMoves[randomIndex]
        console.log(`legal moves: ${legalMoves}`)
        console.log(randomMove)
        legalMoves = []
        return randomMove
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
    let aiMode = false 



    const move = (square) =>{


            console.log("move called")
            console.log(square)
            square.innerHTML = currentPlayer.symbol
            console.log("MOVE DRAWN")
            console.log(`MOVE DRAWN BY ${currentPlayer.name}`)
            console.log(`MOVE NUMBER ${moveNumber}`)
            moveNumber = moveNumber + 1 
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
        
        console.log(`PLAYER JUST SWAPPED`)

       
        console.log(``) 
        console.log(``)
        console.log(``)
        console.log(``)


        if (aiMode == true && currentPlayer == playerOne){
            // currentPlayer = playerTwo
            // playerTwo.findLegalMoves()
            // let i = playerTwo.selectRandomLegalMove()
            // gameBoard.board[i] = currentPlayer.symbol
            // setTimeout(function(){move(squares[i])}, 300)
            //marker
            aiMove()


        } else {

            if (currentPlayer.symbol == playerOne.symbol){
                currentPlayer = playerTwo
                console.log(`current player = ${currentPlayer.name}`)
                console.log(`aiMode: ${aiMode}`)
            } else {
                currentPlayer = playerOne
                console.log(`current player = ${currentPlayer.name}`)
                console.log(`aiMode: ${aiMode}`)

            }
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

        } else if (legal == false) {
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

        // reset ai section
        let aiForm = document.getElementById("ai")
        aiForm.checked = false 
        
        let p2NameForm = document.getElementsByClassName("disabled")[0]
        p2NameForm.classList.remove("disabled")
        

        

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

    //Ai moves

        const aiMove = function(){
            currentPlayer = playerTwo //
            //
            // playerTwo.findLegalMoves()

            /// replace everything below this with minimax
            // let i = playerTwo.selectRandomLegalMove()
            let i = findBestMove()
            gameBoard.board[i] = currentPlayer.symbol
            setTimeout(function(){move(squares[i])}, 300)
            ////


        }

        const findBestMove = function(){

            let bestScore = -Infinity //ai wants max score
            let bestMove = ""
            for (let i = 0; i < gameBoard.board.length; i++){      // check empty spots
                console.log(i)
                if (gameBoard.board[i] == " "){         //check empty spots
                    let score = miniMax(gameBoard.board) // implement minimax recursive algo 
                    console.log(`score: ${score} //`)
                    gameBoard.board[i] = " "            // reset board
                    if (score > bestScore) {             // if score is better than the previous score 
                        bestScore = score                // make that score the new best Score
                        bestMove = i                     //return move that will get the best score   
                    }
                }
            }
            return bestMove

        }

        const miniMax = function(board){
            return 1 
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


