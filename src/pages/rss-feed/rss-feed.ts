import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { RssDetailsPage } from '../rss-details/rss-details'

@Component({
    selector: 'page-rss-feed',
    templateUrl: 'rss-feed.html',
})
export class RssFeedPage 
{
    menuIcon:string;
    //data : any;
    data = [];
    css = {};
    btnWidth: any;
    backgroundColor = "#ffffff";
    constructor(
        public navCtrl: NavController,
        public commonProvider:CommonProvider,
        public navParams: NavParams,
        ) 
    { 	
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        this.css = this.navParams.data.css;
        if (this.css['backgroundcolor'] != undefined || this.css['backgroundcolor'] == '') {
            // console.log("this.css = ",this.css['buttonCss']['fontSize']);
            var str = "";
            str += this.css['buttonCss']['fontSize'];
            str += "";
            var nbr = parseInt(str.substring(0,2))*3.4+31;
            str = "";
            str += nbr + "px";
            console.log("str",this.css['buttonCss']['fontSize']);
            this.backgroundColor = this.css['backgroundcolor'];
        }
        // this.btnWidth = this.css[]
        this.commonProvider.requestRssFeed(this.navParams.data.value).then(res=>
        {	
            this.data=res['items'];
            console.log("rss-feed",this.data);
        });
    }
    itemSelected(item)
    {
        this.navCtrl.push(RssDetailsPage,item);
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }
}
