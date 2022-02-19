console.log("Dev console")
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FFFF00";
var width  = 400 
var height = 400 

var figure = '0'

var board = [
    ['','',''],
    ['','',''],
    ['','',''],
]
/* Drawing lines 

*/
result_arr = {
    'X':-10,
    '0':10,
    '':0,
}
function check_result(){
    for(var i = 0 ;i < 3;i++){
       if(board[i][0] == board[i][1] &&  board[i][1] == board[i][2] && board[i][0] != '' ){

            return board[i][0]
       }
    }
    for(var j= 0 ;j < 3;j++){
        if(board[0][j] == board[1][j] &&  board[1][j] == board[2][j] && board[0][j] != '' ){


            return board[0][j]
        }
    }
    if(board[0][0] == board[1][1]  && board[1][1] == board[2][2] && board[1][1] != ''){


        return board[0][0]
    }
    if(board[0][2] == board[1][1]  && board[1][1] == board[2][0] && board[1][1] != ''){

        return board[0][2]
    }
    for(var i = 0;i < 3;i++){
        for(var j = 0;j < 3;j++){
            if(board[i][j] == ''){
                return null
            }
        }
    }
    return '';

}
check_result();

var length= 400/3

function nextMove(){
    let bestScore = -Infinity;
    let bestMove;
    for(var  i = 0;i < 3;i++){
        for(let j = 0;j < 3;j++){
            if(board[i][j] == ''){
                board[i][j] = '0';
                score = minMax(3,false);
                board[i][j] = '';
                if(score < 0){
                    console.log(i,j);
                }
                if(score > bestScore){
                    bestMove = {i,j}
                    console.log(bestMove)
                    bestScore = score;
                }

            }
        }
    }
    draw(bestMove.i+1,bestMove.j+1);
    return bestMove
}
function minMax(depth,isAI){
    // console.log("running")
    res = check_result(board)
    if(res != null){
        // if(res == 'X'){
        //     console.log(board);asdf
        // }
        // console.log(board);
        
        return result_arr[res]
    }
    
    if(isAI){
        let bestScore = -Infinity;

        for(var i = 0;i <3;i++){
            for(var j = 0;j < 3;j++){
                if(board[i][j] == ''){
                    board[i][j] = '0'
                    

                    score = minMax(depth-1,false);
                    board[i][j] = ''

                   bestScore = Math.max(score, bestScore)
                } 
            }
        }  
        return bestScore 
    }
    else{
        let bestScore = Infinity;
        for(var i = 0;i <3;i++){
            for(var j = 0;j < 3;j++){
                if(board[i][j] == ''){
                    board[i][j] = 'X'
                    score = minMax(depth-1,true);
                    board[i][j] = ''

                    bestScore= Math.min(score, bestScore);
                } 
            }
        }  
        return bestScore 
    }
}



function draw(x,y){
    if(figure == '0'){
        if(board[x-1][y-1]){
            return
        }
        var X = x * length   - length/2
        var Y = y * length - length/2
        ctx.beginPath();
        ctx.arc(X, Y, 40, 0, 2 * Math.PI, false);
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000300';
        ctx.stroke();
        board[x-1][y-1] = figure;
        figure  = 'X'
       
    }
    else{
        if(board[x-1][y-1]){
            return
        }
        var M_ = (length)/2 -30
        var X = (x * length) - (length)/2
        var Y =( y * length ) - (length)/2

         
        ctx.moveTo(X    - 30  , Y    - 30 );
        ctx.lineTo(X + 30 , Y    +30 );
        ctx.stroke();

        ctx.moveTo(X    + 30  , Y    - 30 );
        ctx.lineTo(X - 30 , Y    +30 );
        ctx.stroke();


        // ctx.moveTo(length* 2, 0);
        // ctx.lineTo(length* 2, 400);
        // ctx.stroke();
        board[x-1][y-1] = figure;

        figure = '0'
        
        nextMove();
    }
    

}

ctx.beginPath();

var length= 400/3

ctx.moveTo(length* 1, 0);
ctx.lineTo(length* 1, 400);
ctx.stroke();


ctx.moveTo(length* 2, 0);
ctx.lineTo(length* 2, 400);
ctx.stroke();


ctx.moveTo(0,length* 1);
ctx.lineTo(400,length* 1);
ctx.stroke();


ctx.moveTo(0,length* 2);
ctx.lineTo(400,length* 2);
ctx.stroke();


// draw(2,2)

document.querySelector("#canvas").addEventListener("mousedown",(e)=>{
    if(!e.which){return};
    var x = parseInt(e.offsetX /length) + 1
    var y = parseInt(e.offsetY/length) + 1
    draw(x,y);
    
})
nextMove();
