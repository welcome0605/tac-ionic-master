import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the ImagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-image',
  templateUrl: 'image.html',
})
export class ImagePage {

	imageUrl : any;
	constructor(public navCtrl: NavController, 
		public commonProvider: CommonProvider,
		public navParams: NavParams) 
	{
		this.imageUrl = this.navParams.data.value;
  	}

  	ionViewDidLoad() {
    
  	}

}
