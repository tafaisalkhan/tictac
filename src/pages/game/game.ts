import { Component } from '@angular/core';
import { state, group, trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { Media, MediaObject } from '@ionic-native/media';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  animations:[
    trigger('lightsOnOff',[
       // state('off',style({
        //  backgroundColor: 'wheat'
       // })),
        state('on', style({
          backgroundColor: 'white'
        })),
       /* transition('on => off', [ group([ animate('3s', style({transform: 'rotateY(179.9deg)'})),
                                          animate('3s', style({width: '50px'})) ])

      
      ]),
        transition('off => on', [animate('2s', style({transform: 'rotate(-90deg)'}))]),
        */
       /* transition('off => on', [animate('2s', style({ transform: 'rotateY(179.9deg)'}))]),
        transition('on => off', [animate('2s', style({ transform: 'rotateY(0deg)'}))]),
       */
      transition('off => on', [animate('2s', style({  fontSize:'0px' }))]),
      //transition('on => off', [animate('2s', style({ width: 15, height:15, fontSize:'72px'}))]),
    ]),
    trigger('heightTrigger',[
      state('noHeight',style({
        height: 0
      })),
      state('fullHeight', style({
        height: '*'
      })),
      transition('noHeight <=> fullHeight', [animate('3s')]),
     
  ]),
  trigger('flyInOut',[

    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('2s', keyframes([ 
        style({opacity: 1, transform:'translateX(-100%)', offset:0}),
        //style({opacity: 1, transform:'translateX(15px)', offset:0.7}),
        style({opacity: 1, transform:'rotate(180deg)', offset:0.7}),
        style({opacity: 0, transform:'translateX(0)', offset:1.0}),
      ])  )
    ]),
    transition(':leave', [
      style({transform: 'translateX(100%)'}),
      animate('1s' , keyframes([ 
        style({opacity: 1, transform:'translateX(0)', offset:0}),
        style({opacity: 1, transform:'translateX(-15px)', offset:0.7}),
        style({opacity: 0, transform:'translateX(100%)', offset:1.0})
      ]))    
    ]),
    ]),
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: 'auto',
        width: '300px'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  /*  trigger('explainerAnim', [
      transition('* => *', [
        query('.cell', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.cell', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query('.cell', [
          animate(1000, style('*'))
        ])
        
      ])
    ])*/
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
          query(':leave', stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 1, transform: 'translateX(0)', offset: 0}),
              style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])
    ]),
    trigger('listAnimationCell', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
          query(':leave', stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])
    ]),
    trigger('visibilityGameOver', [
      state('shown' , style({ opacity: 1, display: 'block' ,  transform:'translateY(0%)'})),
      state('hidden', style({ opacity: 1, display: 'none' , transform:'translateY(-800%)' })),
      transition('* => *', animate('1s'))
    ]),
  ]
})

export class GamePage {
  cells;
  winner ;
  tableRow: any[] = [];
  tableCell: any[] =[] ;
  result: Boolean = false;
  loading: Boolean = false;
  gameOverDiv: string = "hidden";
  playerTrue:Boolean = false;
  playWin: any ;
  roomState: string;
  heightState: string = "fullHeight";
  showDiv: Boolean = true;
  roomWhiteState: string = "in";
  playerOneScore: number = 0;
  playerTwoScore: number = 0;
  tie:boolean = true;
  normalGameAITrue: boolean = true;
  tieCount: number = 0;
  isPlay: boolean = false;
  file: MediaObject;
  fileTic: MediaObject;
  loader: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gameProvider:GameProvider, private media: Media, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.cells = document.querySelectorAll('.cell');
    //console.log(this.cells);
    this.startGame();
    
  }

  reStartGame(){
    this.tie = true;
    this.tableRow = [];
    this.tableCell = [];
    setTimeout(() => {
      this. startGame();
      this.playerTrue = !this.playerTrue;
    }, 1000);
    
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Computer True...",
      
    });
    this.loader.present();
  }
  ionViewWillLeave(){
    this.file.release();
    this.fileTic.release();
  }

ionViewWillEnter()
{
  
    //setTimeout(this.bestSpot(), 500);
  
}



  play(filename){
    try{
      
      this.file.release();
    }
    catch(e){

    } 
      this.file = this.media.create('/android_asset/www/assets/mp3/'+filename);
      this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
      this.file.onSuccess.subscribe(() => { console.log('Action is successful'); 
      setTimeout(() => {
        this.file.release();
      }, 3000);
    }
        );
      this.file.onError.subscribe(error => { 
        
        console.log('Error!', error); 
        this.file.stop();
        this.file.release()} 

    );
      this.file.play();
     
  }
  playTic(filename){
    try{
      
      this.file.release();
    }
    catch(e){

    } 
      this.fileTic = this.media.create('/android_asset/www/assets/mp3/'+filename);
      this.fileTic.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
      this.fileTic.onSuccess.subscribe(() => { console.log('Action is successful');
      setTimeout(() => {
        this.fileTic.release();
      }, 3000);
    });
      this.fileTic.onError.subscribe(error => { 
        
        console.log('Error!', error); 
        this.fileTic.stop()
        this.fileTic.release()} 

    );
      this.fileTic.play();
     
  }


startGame(){
    this.tie = true;
    
    this.tableRow.push(0);
    this.tableRow.push(1);
    this.tableRow.push(2);

    this.tableCell.push(0);
    this.tableCell.push(1);
    this.tableCell.push(2);
    
   
   // document.querySelector(".endgame").style.display = "none";
   this.result = false;
   this.loading = false 
   this.gameOverDiv = "hidden";
    this.gameProvider.origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].innerText = '';
      this.cells[i].style.removeProperty('background-color');
      //this.cells[i].addEventListener('click', this.turnClick, false);
    }
    
      
}

helloWord(event){
  console.log(event);
}

turnClick(id, element){
    if(!this.result && !this.loading){
      this.playTic("tap.mp3")
      if (typeof this.gameProvider.origBoard[id] == 'number') {
        if (!this.checkWin(this.gameProvider.origBoard, this.gameProvider.huPlayer)) {
         
          if(this.gameProvider.type == "double"){
              if(this.playerTrue){
                this.turn(id, this.gameProvider.huPlayer,element.srcElement )
                this.playerTrue = !this.playerTrue;

              }
            else {           
                this.turn(id, this.gameProvider.aiPlayer, element.srcElement)
                this.playerTrue = !this.playerTrue;
               
              }
           }
           else  {
             if(this.gameProvider.gameType == "hard"){
            
              this.presentLoading();
              this.turn(id, this.gameProvider.huPlayer,element.srcElement );
             
              this.checkTieWhenTic();
             
             }
             else if (this.gameProvider.gameType == "normal"){
                this.turn(id, this.gameProvider.huPlayer,element.srcElement );
                if(this.playerOneScore % 2 == 0  && this.playerOneScore > 0 && this.tieCount % 2 == 0 ){
                  this.presentLoading();
                  this.checkTieWhenTic();
                }
                else{
                    if(this.normalGameAITrue){
                      this.presentLoading();
                      this.checkTieWhenTic();
                      this.normalGameAITrue = !this.normalGameAITrue;
                    }
                    else{
                      
                      //this.turn(this.gameProvider.origBoard[this.generateRandomNo()], this.gameProvider.aiPlayer, element.srcElement)
                      this.presentLoading();
                      this.checkTieWhenTic();
                      this.normalGameAITrue = !this.normalGameAITrue
                    }
                }
                //this.aiTrunClick();
             }
             else{
                this.turn(id, this.gameProvider.huPlayer,element.srcElement );    
                //this.turn(this.generateRandomNo(), this.gameProvider.aiPlayer, element.srcElement)
                this.presentLoading();
                setTimeout(() => {
                  this.turn(this.generateRandomNo(), this.gameProvider.aiPlayer, element.srcElement)
                  if(this.emptySquares().length == 0 && this.tie){
                    this.checkTie();
                  }
                  else if  (this.emptySquares().length == 0){
                    this.checkTie();
                  }
                  this.loader.dismiss();
                }, 1000);
                //if (typeof this.gameProvider.origBoard[id] == 'number'))
                //this.aiTrunClick();
             }
           }
            if(this.emptySquares().length == 0 && this.tie){
              this.checkTie();
            }
            else if  (this.emptySquares().length == 0){
              this.checkTie();
            }
           
        }
      }
    }
}

checkTieWhenTic(){
  setTimeout(() => {
    this.aiTrunClick();
    if(this.emptySquares().length == 0 && this.tie){
      this.checkTie();
    }
    else if  (this.emptySquares().length == 0){
      this.checkTie();
    }
    this.loader.dismiss();
  }, 1000);
}
/*turnClick(id, element) {
	if (typeof this.gameProvider.origBoard[id] == 'number') {
		this.turn(id, this.gameProvider.huPlayer, null)
		if (!this.checkWin(this.gameProvider.origBoard, this.gameProvider.huPlayer) && !this.checkTie()) this.turn(this.bestSpot(), this.gameProvider.aiPlayer, null);
	}
}*/

 aiTrunClick() {

		if (!this.checkWin(this.gameProvider.origBoard, this.gameProvider.huPlayer) && !this.checkTie()) this.turn(this.bestSpot(), this.gameProvider.aiPlayer, null);
	
}

generateRandomNo(){
  let ramArray = [];
  for (var i = 0 ; i<= this.gameProvider.origBoard.length; i++ ){
    if (typeof this.gameProvider.origBoard[i] == 'number'){
      ramArray.push(this.gameProvider.origBoard[i]);
    }
        
  } 
  var ran = Math.floor((Math.random() * ramArray.length));
  var tmp = ramArray[ran]
  return tmp;
}


turn(squareId, player, element) {
  try{
    this.gameProvider.origBoard[squareId] = player;
    //element.innerText = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = this.checkWin(this.gameProvider.origBoard, player)
    if (gameWon) this.gameOver(gameWon)
  }
  catch(e){

  }
}

  checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
  for (let  winIndex in this.gameProvider.winCombos) {
   // console.log(win);
   let win = this.gameProvider.winCombos[winIndex];
  // console.log((win.every(elem => plays.indexOf(elem) )))
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        this.playWin = plays;
      //  if (win.every( this.isBigEnough )) {
        gameWon = {index: winIndex, player: player};
        break;
      }
    }
    return gameWon;
}

gameOver(gameWon) {
    for (let index of this.gameProvider.winCombos[gameWon.index]) {
      let i: number = index;
      console.log(index);
      document.getElementById(index+"").style.backgroundColor =
        gameWon.player == this.gameProvider.huPlayer ? "blue" : "red";

    }
    this.tie = false;
    this.gameOverDiv = "shown";
    this.declareWinner(gameWon.player == this.gameProvider.huPlayer ? "You win!" : "You lose.");
  }

isBigEnough(element, index, array) { 
    console.log(array);
    //console.log(this.playWin.indexOf(element));
    //return 0
 }
declareWinner(who) {
  
     if(who == "You win!"){
      if(this.gameProvider.type == "double"){
        this.play("win.mp3")
        who = "Player 1 Win";
       
      }
      else{
        this.play("win.mp3")
       
    }
        this.playerOneScore = this.playerOneScore + 1;
        this.tie = false;
     }
     else if(who == "You lose."){
      if(this.gameProvider.type == "double"){
        this.play("win.mp3")
        who = "Player 2 Win";
      }
      else{
        this.play("loss.mp3")
      }
        
        this.playerTwoScore = this.playerTwoScore + 1;
        this.tie = false;
     }
     
    
     this.winner = who
     this.result = true;
    
  }

  emptySquares() {
    return this.gameProvider.origBoard.filter(s => typeof s == 'number');
  }
  
checkTie() {
    //if(this.tie){
        if (this.emptySquares().length == 0) {
          for (var i = 0; i < 9; i++) {
            document.getElementById(i+"").style.backgroundColor = "green";
            //document.getElementById(i+"").removeEventListener('click', this.turnClick, false);
          // this.cells[i].style.backgroundColor = "green";
            //this.cells[i].removeEventListener('click', this.turnClick, false);
            this.tie = true;
          }
        this.declareWinner("Tie Game!")
       this.play("loss.mp3")
        this.tieCount = this.tieCount + 1; 
        this.gameOverDiv = "shown";
          return true;
        }
        return false;
   // }
  }

toggleLights(){
      //this.roomState = (this.roomState == "off") ? "on" : "off";
      this.roomState = "on";
  }

toggleHeight(){
    this.heightState = (this.heightState == "noHeight") ? "fullHeight" : "noHeight";
}

flyInOut()
{
  this.showDiv = this.showDiv? false: true;
}

roomWhite(){
  this.roomWhiteState = this.roomWhiteState  === 'out' ? 'in' : 'out';
}
bestSpot() {
    //return 3;
    
    return this.minimax(this.gameProvider.origBoard, this.gameProvider.aiPlayer).index;
  }

animationDone(event){
    console.log(event.fromState);
    console.log(event.toState);
    console.log(event.totalTime);
    console.log("Animation Done");
    // this.roomState = (this.roomState == "off") ? "on" : "off";
}

animationStarted(event){
  console.log("Animation Start");
  console.log(event.fromState);
  console.log(event.toState);
  console.log(event.totalTime);
  
}

listAnimationDone(event){
  console.log(event.toState);
  if(this.gameProvider.type != "double"){
    if(event.toState == 3 && this.playerTrue){
      this.turn(2, this.gameProvider.aiPlayer,null );
    }
  }

  //
}
explainerAnimStarted(event){
  //this.loading = true;
}
explainerAnimDone(event){
  //this.loading = false;
}
 minimax(newBoard, player) {
  var availSpots = this.emptySquares();

  if (this.checkWin(newBoard, this.gameProvider.huPlayer)) {
    return {score: -10};
  } else if (this.checkWin(newBoard, this.gameProvider.aiPlayer)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {index:'' , score: ''};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == this.gameProvider.aiPlayer) {
      var result = this.minimax(newBoard, this.gameProvider.huPlayer);
      move.score = result.score;
    } else {
      var result = this.minimax(newBoard, this.gameProvider.aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if(player === this.gameProvider.aiPlayer) {
    var bestScore = -1000;
    for(var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 1000;
    for(var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

    return moves[bestMove];
  }
 
}
