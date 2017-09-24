import { Component, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { Media, MediaObject } from '@ionic-native/media';

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
  isPlay: boolean = false;
  file: MediaObject;
  constructor( public navCtrl: NavController, public navParams: NavParams, public gameProvider:GameProvider, private media: Media) {
  }

  ionViewDidLoad() {
    
  }
  
  ionViewWillEnter(){
    this.gameOption = 'hidden';
    this.gameTypeOption = 'shown';
    this.showPlayerCard = 'hidden';
  }



  play(filename){
    try{
     
      this.file.release();
    }
    catch(e){

    } 
      this.file = this.media.create('/android_asset/www/assets/mp3/'+filename);
      this.file.onStatusUpdate.subscribe(status => {
        console.log(status +"1");
      console.log("status update")}); // fires when file status changes
      this.file.onSuccess.subscribe(() => { console.log('Action is successful');  setTimeout(() => {
        this.file.release();
      }, 1000);}
        );
      this.file.onError.subscribe(error => { console.log('Error!', error); this.file.stop(); this.file.release()} );
      this.file.play();
   
    }
    
    ionViewWillLeave(){
      this.file.release();
    }
  

  playType(type){
    this.play("tap.mp3")
      
      if(type == 1){
        this.gameProvider.type = "single";
        this.gameTypeOption = 'hidden';
        this.gameOption = 'shown';
      }
      else{
        this.gameProvider.type = "double";
        this.showPlayerCard = "shown";
      }
  }

  playOptions(type){
    this.play("tap.mp3")
    this.selectType = type;
    if(this.selectType == 1)
    {
      this.gameProvider.gameType = "easy";
      this.showPlayerCard = "shown";
    }
    else if(this.selectType == 2)
    {
      this.gameProvider.gameType = "normal";
      this.showPlayerCard = "shown";
    }
    else if(this.selectType == 3)
    {
      this.gameProvider.gameType = "hard";
      this.showPlayerCard = "shown";
    }
    else if(this.selectType == 4)
    {
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
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
    this.play("tap.mp3")
    if(this.selectType == 4)
    {
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    else {
  
      this.navCtrl.push('GamePage');
      //this.gameOption = 'hidden';
      //this.gameTypeOption = 'shown';
    }
    //this.showPlayerCard = 'hidden';

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
