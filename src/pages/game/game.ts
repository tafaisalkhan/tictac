import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

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
})

export class GamePage {
  cells;
  winner;
  result: Boolean = false;
  playerTrue:Boolean = false;
  playWin: any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gameProvider:GameProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.cells = document.querySelectorAll('.cell');
    //console.log(this.cells);
    this.startGame();
  }

  startGame(){
   // document.querySelector(".endgame").style.display = "none";
   this.result = false;
  
    this.gameProvider.origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i].innerText = '';
      this.cells[i].style.removeProperty('background-color');
      //this.cells[i].addEventListener('click', this.turnClick, false);
    }
  }

  turnClick(id){
    if(!this.result){
      if (typeof this.gameProvider.origBoard[id] == 'number') {
        if (!this.checkWin(this.gameProvider.origBoard, this.gameProvider.huPlayer)) {
          if(this.playerTrue){
              this.turn(id, this.gameProvider.huPlayer)
              this.playerTrue = !this.playerTrue;
            }
          else { 
            this.turn(id, this.gameProvider.aiPlayer)
            this.playerTrue = !this.playerTrue;
             // this.turn(this.bestSpot(), this.gameProvider.aiPlayer);
            }
            this.checkTie();
        }
        else{

        }
       
      }
    }
  }
  turn(squareId, player) {
    this.gameProvider.origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = this.checkWin(this.gameProvider.origBoard, player)
    if (gameWon) this.gameOver(gameWon)
  }

  checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
  for (let  winIndex in this.gameProvider.winCombos) {
   // console.log(win);
   let win = this.gameProvider.winCombos[winIndex];
   console.log((win.every(elem => plays.indexOf(elem) )))
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
    
    this.declareWinner(gameWon.player == this.gameProvider.huPlayer ? "You win!" : "You lose.");
  }

 isBigEnough(element, index, array) { 
    console.log(array);
    //console.log(this.playWin.indexOf(element));
    //return 0
 }
   declareWinner(who) {
     this.winner = who
     this.result = true;
    
  }

  emptySquares() {
    return this.gameProvider.origBoard.filter(s => typeof s == 'number');
  }
  
 checkTie() {
    if (this.emptySquares().length == 0) {
      for (var i = 0; i < this.cells.length; i++) {
        this.cells[i].style.backgroundColor = "green";
        this.cells[i].removeEventListener('click', this.turnClick, false);
      }
     this.declareWinner("Tie Game!")
      return true;
    }
    return false;
  }

  bestSpot() {
    //return 3;
    return this.minimax(this.gameProvider.origBoard, this.gameProvider.aiPlayer).index;
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
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
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
