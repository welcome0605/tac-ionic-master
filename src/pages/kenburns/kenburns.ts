import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SponsorScreenPage } from '../../pages/sponsor-screen/sponsor-screen';

@Component({
	selector: 'page-kenburns',
	templateUrl: 'kenburns.html',
})
export class KenburnsPage 
{
	pages: Array<{title: string, component: any}>;
	css:any;
	x:any;
	imageUrl:any;
	menuIcon:string;
	headerCss = "";
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public modalCtrl: ModalController,

		public commonProvider:CommonProvider,
		public events: Events) 
	{
		// console.log("asdfasdfasdfasdfasdfasdfasdfasdfafd");
		this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
		var passed_object = this.navParams.data;
		this.pages = passed_object.value;
		this.css = passed_object.css;
		if (this.css == undefined) {
			// debugger
			this.css = {
				'kenburnHeader': {
					'textAlignment':'right',
					'color':'',
					'bottomBorder':'2px solid #ffffff7d'
				},
				'kenburnListBanner': {
					'radius':'0px',
					'background':'#ffffff7d',
					'border':'2px solid #ffffff7d',
					'margin':'0px 0px 0px 0px',
					'width':'calc(100%)',
					'padding':'1px 4px 1px 4px'
				},
				'kenburnListTitle': {
					'bottom':'0px',
					'height':'23px',
					'color':'#ffffff',
					'size':'24px',
					'alignment':'right',
					'backgroundColor':'#0000007d',
					'display':'block',
					'fontName':'Alegreya',
					'lineHeight':'20px'
				},
				'kenburnAnimation': {
					'name':'zoom',
					'duration':'6s',
					'from':'1.3',
					'to':'1'
				},
				'kenburnIcon': {
					'fontSize':'24px',
					'verticalAlign':'middle',
					'margin':'0px 5px 0px 5px'
				}
			};	
		}
		this.imageUrl = this.commonProvider.imgUrl;
		this.x = this.css['kenburnAnimation'];
		if (this.x == undefined) {
			// debugger
			this.x = {
				'name':'zoom',
				'duration':'6s',
				'from':'1.3',
				'to':'1'
			};
		}
	}

	openPageInner(type,data)
	{

		// debugger;
		// if (this.commonProvider.appSpecific['sponsorSplash_screen'] != undefined) {
		// 	if (this.commonProvider.appSpecific['sponsorSplash_screen']['time'] != undefined) {
		// 		let screenTime = this.commonProvider.appSpecific['sponsorSplash_screen']['time']
				console.log("@@@@@@");
		// 		// debugger;
		// sponsorModal.onDidDismiss(data => {
		// 	    console.log(data);
		// 	    debugger;
		// 	  });

		// 		if (screenTime > 0) {
		// 			var param = {   "url" : this.commonProvider.appSpecific['sponsorSplash_screen']['url'],
		// 							"time": this.commonProvider.appSpecific['sponsorSplash_screen']['time'] };
		// 			let sponsorModal = this.modalCtrl.create(SponsorScreenPage, param);
		// 			sponsorModal.present();
		// 		}
		// 	}
		// }
		// if(type == u)
		if (type!=undefined) {
			if (data.value != null) {
			
				this.events.publish('component:clicked', type, JSON.stringify(data));	
			}

		}
	}

	ionViewDidEnter()
	{
		
		var css2 = '.modal-content {-webkit-animation-name:'+this.x['name']+'; -webkit-animation-duration: '+this.x['duration']+';} @-webkit-keyframes '+this.x['name']+' { from {-webkit-transform:scale('+this.x['from']+')} to {-webkit-transform:scale('+this.x['to']+')}}'; 		 
		var htmlDiv = document.createElement('div');
		htmlDiv.innerHTML = '<p>foo</p><style>' + css2 + '</style>';
		document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
	}

	ionViewDidLoad() {
		// debugger;
		this.commonProvider.loadingHide();
		
	}
}
