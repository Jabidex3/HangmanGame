var wordbank = ["SPIDERMAN", "THOR", "BATMAN", "SUPERMAN", "WONDER WOMAN", "BLACK WIDOW", "GREEN LANTERN", "FLASH", "AQUAMAN", "IRON MAN", "CAPTAIN AMERICA"];
var gameStart = false;
var randomNum = 0;
var actualWord ="";
var word="";
var changes = 0;
var ctr =0;
var lettersSelected=[];
var numletters=0;
var uniqueletters= "";

function startGame(){
    document.getElementById("three").style.display="none";
    document.getElementById("one").style.display="none";
    document.getElementById("two").style.display="block";
    gameStart  = true;

    randomNum = Math.floor(Math.random() * wordbank.length);
    actualWord =wordbank[randomNum].toUpperCase();
    for(let i =0;i<wordbank[randomNum].length;i++){
        if(wordbank[randomNum][i] != " "){
            //word+=wordbank[randomNum][i];
            if(uniqueletters.indexOf(wordbank[randomNum][i])==-1)
            {
                uniqueletters +=wordbank[randomNum][i];  
                numletters+=1;
            }
            word+="-";
        }
        else{
            word+=" "; 
        }
        
    }
    document.getElementById("word").innerHTML=word;
}

function check(char){
    if(char.length!=1){
        document.getElementById("msg").innerHTML="Invalid Input! Try Again!"
    }
    else if(checkUsed(char)){
        document.getElementById("msg").innerHTML="You have already selected that letter earlier on in the game!"
    }
    else{
        var x = char.toUpperCase();
        if(x.match(/[A-Z]/)){
           // document.getElementById("msg2").innerHTML=actualWord+" "+ uniqueletters+ " "+numletters
            for(let j=0;j<actualWord.length;j++){
                if(actualWord[j]==x){
                    word=word.substr(0, j)+char+word.substr(j+1);
                    changes+=1;
                }
            }
            if(changes>0){//picked a letter that the name possessess
                lettersSelected.push(char);
                document.getElementById("word").innerHTML=word;
                document.getElementById("msg").innerHTML="";
                numletters-=1;
                changes=0;
                checkGame();
            }
            else{//name doesnt possess letter
                ctr+=1;
                lettersSelected.push(char);
                document.getElementById("msg").innerHTML="There is no letter "+char + " in this name!"
                changePic(ctr);
                checkGame();
            }
            
        }
        else{//did not input a letter
            document.getElementById("msg").innerHTML="Invalid Input! Try Again!"
        }
    }
}

function changePic(num){
    if(num==1){
        document.getElementById("hang").src="imgs/1.png";
    }
    else if(num==2){
        document.getElementById("hang").src="imgs/2.png";
    }
    else if(num==3){
        document.getElementById("hang").src="imgs/3.png";
    }
    else if(num==4){
        document.getElementById("hang").src="imgs/4.png";
    }
    else if(num==5){
        document.getElementById("hang").src="imgs/5.png";
    }
    else{
        document.getElementById("hang").src="imgs/6.png";
    }
}

function checkGame(){
    if(ctr==6){
        document.getElementById("two").style.display="none";
        document.getElementById("three").style.display="block";
        document.getElementById("decision").src="imgs/6.png";
        document.getElementById("endGame").innerHTML ="You Lost! Play Again?"
    }

    if(numletters==0){
        document.getElementById("two").style.display="none";
        document.getElementById("three").style.display="block";
        document.getElementById("decision").src="imgs/7.png";
        document.getElementById("endGame").innerHTML ="You Won!!! Play Again?"
    }
}

function checkUsed(char){
    for(let k=0;k<lettersSelected.length;k++){
        if(lettersSelected[k]==char){
            return true;
        }
    }
    return false;
}

function newGame(){
    randomNum = 0;
    actualWord ="";
    word="";
    changes = 0;
    ctr =0;
    lettersSelected=[];
    numletters=0;
    uniqueletters= "";
    document.getElementById("hang").src="imgs/initial.png";
    document.getElementById("msg").innerHTML="";
    document.getElementById("guess").value="";
    startGame();
}