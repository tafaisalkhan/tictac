import { Component, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    ])
  ]
})
export class HomePage {
  gameOption;// = 'hidden';
  gameTypeOption = 'shown';
  constructor( public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //this.navCtrl.push('GamePage');
    //this.navCtrl.push(GamePage);
  }

  playType(type){
      this.gameTypeOption = 'hidden';
      this.gameOption = 'shown';
  }

  playOptions(type){
    if(type == 4)
    {
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    else if(type == 1){
      this.navCtrl.push('GamePage');
      this.gameOption = 'hidden';
      this.gameTypeOption = 'shown';
    }
    //this.navCtrl.push('GamePage');
    //this.gameTypeOption = 'show';
  }
}
