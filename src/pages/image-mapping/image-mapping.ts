import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { Events } from 'ionic-angular';
 
/**
 * Generated class for the ImageMappingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-mapping',
  templateUrl: 'image-mapping.html',
})
export class ImageMappingPage {

	imageUrl = "";
	image : any;
	masterCoords : any;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public commonProvider:CommonProvider,
  		public events: Events) 
  	{
  		this.masterCoords = this.navParams.data.value.area;
  	}

  	ionViewDidEnter()
  	{
  		this.imageUrl = this.commonProvider.imgUrl;
  		this.image = this.imageUrl+""+this.navParams.data.value.url;
  		for(let i = 0; i < this.masterCoords.length; i++)
  		{
  			var data = this.masterCoords[i].android.split(",");

  			this.masterCoords[i].x = data[0];
  			this.masterCoords[i].y = data[1];
  			this.masterCoords[i].width = data[2];
  			this.masterCoords[i].height = data[3];
  		}
  	}

  	ionViewDidLoad() {

  	}
  	

  	openPage(data)
  	{
  		if(data.type!=undefined)
        {
            if(data.value != null)
            {
                this.events.publish('component:clicked', data.type, JSON.stringify(data));  
            }
        }
  	}
}	
