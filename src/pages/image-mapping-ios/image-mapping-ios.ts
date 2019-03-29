import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ImageMappingIosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-mapping-ios',
  templateUrl: 'image-mapping-ios.html',
})
export class ImageMappingIosPage {

	imageUrl = "";
	image : any;
	masterCoords = [];
    coords:any;
	deviceWidth : any;
	deviceHeight : any;
    mainData : any;
  	
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public commonProvider:CommonProvider,
  		public events: Events) 
  	{
        
        this.deviceWidth = window.screen.width * window.devicePixelRatio;
        this.deviceHeight = window.screen.height * window.devicePixelRatio;
        
        this.imageUrl = this.commonProvider.imgUrl;
        this.image = this.imageUrl+""+this.deviceWidth+"_"+this.deviceHeight+".png";
        this.coords = "coords_"+this.deviceWidth+"_"+this.deviceHeight;

        let exist_coords = JSON.parse(localStorage.getItem("masterCoords"));

        if(exist_coords != null && exist_coords.length > 0)
        {
            this.masterCoords = exist_coords;
        }
        else
        {
            let masterCoords = navParams.data.value.area; 

            for(let i = 0; i < masterCoords.length; i++)
            {
                console.log(masterCoords[i][this.coords]);
                var data = masterCoords[i][this.coords].split(",");
                var coordsArr = [];
                for(let j = 0; j < data.length; j++)
                {
                    coordsArr.push(Math.round(data[j]/window.devicePixelRatio));
                }
                masterCoords[i][this.coords] = coordsArr.toString();
            }
            localStorage.setItem("masterCoords",JSON.stringify(masterCoords));
            this.masterCoords = masterCoords;
        }

        
  	}

  	ionViewDidEnter(){
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
