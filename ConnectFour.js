var player1 = prompt("Player One: Enter your name, you will be the color Blue");
var player1Color = 'rgb(65, 105, 255)';

var player2 = prompt("Player Two: Enter your name, you will be the color Red");
var player2Color = 'rgb(255, 69, 0)';

var gameOn = true;
var table = $('table tr');

function gameWon(rowNumber, colNumber){
    console.log("You won at" + rowNumber + ", " + colNumber);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReport = returnColor(5, colIndex);
    for (let row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);     
        if(colorReport === 'rgb(128, 128, 128)'){
            return row
        }
    }
}

function colorMatchCheck(one, two, three, four){
    console.log(one);
    console.log(two);
    console.log(three);
    console.log(four);
    console.log();

    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck(){
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 4; column++) {
            if (colorMatchCheck(returnColor(row,column), returnColor(row, column + 1), returnColor(row, column + 2), returnColor(row, column + 3))){
                console.log("horizontal win");
                gameWon(row, column);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    console.log("vertical check");
    for (let column = 0; column < 7; column++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row,column), returnColor(row + 1, column), returnColor(row + 2, column), returnColor(row + 3, column))){
                console.log("vertical win");
                gameWon(row, column);
                return true;
            }
            else{
                continue
            }
        }
    }

}

function diagonalWinCheck(){
    for (let column = 0; column < 5; column++) {
        for (let row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row,column), returnColor(row +1, column + 1), returnColor(row + 2, column + 2), returnColor(row + 3, column + 3))){
                console.log("positive diagonal win");
                gameWon(row, column);
                return true;
            }
            else if (colorMatchCheck(returnColor(row,column), returnColor(row - 1, column + 1), returnColor(row - 2, column + 2), returnColor(row - 3, column + 3))) {
                console.log("negative diagonal win");
                gameWon(row, column);
                return true;
            } 
            else{
                continue
            }
        }
    }
}


var currentPlayer = 1; 
var currentName = player1;
var currentColor = player1Color; 

$('h3').text(player1 + ": it is your turn, please pick a column to drop your chip");

$('.board button').on('click', function(){
    var col = $(this).closest('td').index();

    var availableBelow = checkBottom(col); 

    changeColor(availableBelow, col, currentColor); 

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 7; row++) {
                $('h1').text(currentName + " has won! Refresh the browser to play again.").css("fontSize", "40px")
                
                $('h2').fadeOut('fast');
                $('h3').fadeOut('fast');
                alert(currentName + " has won! Refresh the browser to play again.");

            }
        }
    }

    currentPlayer = currentPlayer * -1 ; 
  

    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
      }else {
        currentName = player2
        $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color;
      }

})