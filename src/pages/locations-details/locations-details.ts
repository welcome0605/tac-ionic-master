import { Component, ElementRef, ViewChild  } from '@angular/core';
import { NavController, NavParams, Navbar,MenuController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import $ from "jquery";

@Component({
    selector: 'page-locations-details',
    templateUrl: 'locations-details.html',
})
export class LocationsDetailsPage 
{
    @ViewChild('menuContent') iframeData: ElementRef;
    @ViewChild(Navbar) navBar: Navbar;
	css:any;
	url:SafeResourceUrl;
    videoList : any;
    api:any;
    menuIcon:string;
    data = 0;
    showBack = false;

    constructor(
        private domSanitizer: DomSanitizer, 
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        public menuCtrl: MenuController) 
    {
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];      
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(navParams.data.value); 
    }

    ionViewWillEnter()
    {
        var self = this;
        this.data = 0;
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent,function(e) 
        {
            self.menuCtrl.open();
        });
    }

    backClick()
    {
        if(this.data == 1)
        {
            this.navCtrl.pop();
        }
        else
        {
            this.iframeData['nativeElement']['contentWindow'].history.back();  
            if(this.data > 1)
            {
                this.data = this.data - 2;
            }  
        }    
    }

    onFrameLoad(iframe)
    {
        this.data++;
        if(this.data > 1)
        {
           this.showBack = this.navParams.data.backShow;
           if(this.showBack == undefined)
           {
               this.showBack = true;
           }
        }
        else
        {
            this.showBack = false;
        }
        setTimeout(function(){
            $('#menuContent').removeClass('load');
        },2000);
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }
}
