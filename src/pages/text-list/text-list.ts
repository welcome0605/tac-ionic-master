import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@Component({
	selector: 'page-text-list',
	templateUrl: 'text-list.html',
})
export class TextListPage 
{
	menuIcon:string;
	list:any;
	css = {};
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public events: Events,
		public commonProvider:CommonProvider
		) 
	{
		this.list = this.navParams.data.value;
		this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
		this.css = this.navParams.data.css;
  	}

  	openPageInner(type,data)
	{
		if(type!=undefined)
		{
			if(data.value != null)
			{
                if(type == "subMenu")
					type = "textList";
				this.events.publish('component:clicked', type, JSON.stringify(data));	
			}
		}
	}

	ionViewDidLoad() {
		this.commonProvider.loadingHide();
	}
}