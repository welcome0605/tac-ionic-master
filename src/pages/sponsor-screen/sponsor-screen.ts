import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the SponsorScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-sponsor-screen',
    templateUrl: 'sponsor-screen.html',
})

export class SponsorScreenPage 
{
    imageName:any;
    imageUrl:any;

	constructor(
  		public navCtrl: NavController, 
 		public navParams: NavParams,
         public commonProvider:CommonProvider,
   ) 
	{
        this.imageUrl = this.commonProvider.imgUrl + "images/";
        
        this.imageName = navParams.data['url'];
        let TIME = navParams.data['time'] * 1000;
        // console.log(TIME);
        // debugger
        

       	setTimeout( () => {
       		this.navCtrl.pop();
           }, TIME); 
  	}
    //   closeModal() {
    //     this.viewCtrl.dismiss();
    //   }
    ionViewDidLoad() {
        console.log('sponsor splash screen','ionViewDidLoad SplashScreenPage');
      this.commonProvider.loadingHide();
    } 
}
