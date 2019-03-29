import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pipe } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { CommonProvider } from '../../providers/common/common';

@Pipe({ name: 'safe' })
@Component({
  selector: 'page-rss-details',
  templateUrl: 'rss-details.html',
})
export class RssDetailsPage 
{
	detail:any;
	url : any;
	menuIcon:string;
	constructor(
		public sanitizer: DomSanitizer,
		public navCtrl: NavController,
		public navParams: NavParams,
		public commonProvider:CommonProvider) 
	{
		this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
		this.detail = navParams.data;
		this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.detail.link);
	}

	ionViewDidLoad() {
		this.commonProvider.loadingHide();
	}
}