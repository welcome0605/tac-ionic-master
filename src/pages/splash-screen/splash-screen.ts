import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the SplashScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-splash-screen',
  templateUrl: 'splash-screen.html',
})
export class SplashScreenPage {
  imageName:any;
  imageUrl:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public commonProvider:CommonProvider) {
    this.imageUrl = this.commonProvider.imgUrl + "images/";
        
        this.imageName = navParams.data['url'];
        let TIME = navParams.data['time'] * 1000;

       	setTimeout( () => {
       		this.navCtrl.pop();
       	}, TIME); 
  }

  ionViewDidLoad() {
    console.log('splash screen','ionViewDidLoad SplashScreenPage');
    this.commonProvider.loadingHide();    
  }

}
