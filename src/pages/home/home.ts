import { Component, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations:[
    trigger('visibilityGameTypeChanged', [
      state('shown' , style({ opacity: 1, display: 'block' ,  transform:'translateX(0%)'})),
      state('hidden', style({ opacity: 0, display: 'none' , transform:'translateX(-100%)' })),
      transition('* => *', animate('1s'))
    ]),
    trigger('visibilityGameOptionChanged', [
      state('shown' , style({ opacity: 1, display: 'block',  transform:'translateX(0)'  })),
      state('hidden', style({ opacity: 0, display: 'none', transform:'translateX(100%)' })),
      transition('* => *', animate('1s'))
    ]),
    trigger('visibilityPlayer', [
      state('shown' , style({ opacity: 1, display: 'block' ,  transform:'translateY(-50%)'})),
      state('hidden', style({ opacity: 1, display: 'none' , transform:'translateY(-800%)' })),
      transition('* => *', animate('1s'))
    ]),
  ]
})
export class HomePage {
  gameOption;// = 'hidden';
  gameTypeOption = 'shown';
  showPlayerCard = "hidden"
  selectedPlayer: number = 0;
  selectType: number = 0;
  constructor( public navCtrl: NavController, public navParams: NavParams, public gameProvider:GameProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //this.navCtrl.push('GamePage');
    //this.navCtrl.push(GamePage);
  }

  playType(type){
      this.gameTypeOption = 'hidden';
      this.gameOption = 'shown';
      if(type == 1){
        this.gameProvider.type = "single";
      }
      else{
        this.gameProvider.type = "double";
      }
  }

  playOptions(type){
    this.showPlayerCard = "shown";
    this.selectType = type;
    if(this.selectType == 1)
    {
      this.gameProvider.gameType = "easy";
    }
    else if(this.selectType == 2)
    {
      this.gameProvider.gameType = "normal";
    }
    else if(this.selectType == 3)
    {
      this.gameProvider.gameType = "hard";
    }
  /*  if(type == 4)
    {
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    else if(type == 1){
      this.navCtrl.push('GamePage');
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    */
    //this.navCtrl.push('GamePage');
    //this.gameTypeOption = 'show';
  }
  startGame(){
    if(this.selectType == 4)
    {
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    else {
  
      this.navCtrl.push('GamePage');
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    this.showPlayerCard = 'hidden';

    if(this.selectedPlayer == 0){
      this.gameProvider.huPlayer = "O";
      this.gameProvider.aiPlayer = "X";
    }
    else{
      this.gameProvider.huPlayer = "X";
      this.gameProvider.aiPlayer = "O";
    }
     

  }
}
