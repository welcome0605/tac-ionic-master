import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import * as Constant from '../../app/constant';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import $ from 'jquery';
import { leave } from '@angular/core/src/profile/wtf_impl';
/**
 * Generated class for the CustomWebFrameViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 declare var self: any;

@Component({
  selector: 'custom-web-frame',
  templateUrl: 'customweb.html',
})
export class CustomWebFrameViewPage implements AfterViewInit {
    @ViewChild('menuContent') iframeData: ElementRef;

    iFrameUrl : any;
    data : any;
    loading:any;
    kind: string;
    history_depth: number;
    history_current: number;
    backable: boolean;
    forwardable: boolean;
    id: string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        private _sanitizer: DomSanitizer,
        public menuCtrl: MenuController,
        public loadingCtrl: LoadingController
    ) 
    {
        self = this;
        this.data = 0;
        this.id = `menuContent${navParams.data.id}`;
        //this.loadingShow();

        console.log("framedata",navParams.data.value);
        if (navParams.data.value.includes("facebook.com")) {
            navParams.data.value = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(navParams.data.value)}&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
        } else if (navParams.data.value.includes("twitter.com")) {
            navParams.data.value = `https://twitframe.com/show?url=${ encodeURIComponent(navParams.data.value) }`;
        }
        
        this.iFrameUrl = this._sanitizer.bypassSecurityTrustResourceUrl(navParams.data.value);
        
        console.log("frameurl",this.iFrameUrl);
        if (String(navParams.data.value).substr(String(navParams.data.value).lastIndexOf('.')+1) == 'pdf') {
            this.kind = "pdf";
            setTimeout(function() {
                $(`#${this.id}`).css('transform','scale(1)');
            }, 1000);
        } else {
            this.kind = "website";
            $(`#${this.id}`).css('transform','scale(1)');
        }

        setTimeout(() => {
            $('#menu_left').on('click',function() {
                self.backClick();
            });
        }, 1000);
        this.history_current = 0;
        this.history_depth = 0;
        this.backable = false;
        this.forwardable = false;
    }

    safeUrl() 
    {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.iFrameUrl);
    }

    backClick()
    {
        this.navCtrl.pop();
    }

    back() {
        // this.iframeData.nativeElement.contentWindow.history.back();
        if (this.history_current > 1) {
            history.back(); // used anchor work feature
            this.history_current--;
            this.updateHistoryValues();
            this.history_current--; // to compensate onFrameLoad's current addition
        }
    }

    forward() {
        // this.iframeData.nativeElement.contentWindow.history.forward();
        if (this.history_current < this.history_depth) {
            history.forward();
            this.history_current++;    
            this.updateHistoryValues();
            this.history_current--;
        }
    }

    ngAfterViewInit() {
        // debugger;
        // var myConfObj = {
        //   iframeMouseOver : false
        // }
        // window.addEventListener('blur',() => {
        //   if(myConfObj.iframeMouseOver){
        //     console.log('Wow! Iframe Click!');
        //     this.updateHistoryValues();
        //   }
        //   return true;
        // });

        // (<any>document.getElementById(this.id)).contentDocument.addEventListener('click', function() {
        //     console.log("clicked");
        // });

        // document.getElementById(this.id).addEventListener('mouseover',function(){
        //    myConfObj.iframeMouseOver = true;
        // });
        // document.getElementById(this.id).addEventListener('mouseout',function(){
        //     myConfObj.iframeMouseOver = false;
        // });

        this.history_current = 0;
        this.history_depth = 0;
    }

    updateHistoryValues() {
        this.backable = (this.history_current > 1);
        this.forwardable = (this.history_current < this.history_depth);
    }

    onFrameLoad(event)
    {
        // let iframe = event.srcElement;
        // let doc = iframe.contentDocument || iframe.contentWindow.document;
        // doc.addEventListener('click',() => {
        //     this.updateHistoryValues();
        // });

        let iframe = event.srcElement;
        console.log(iframe);
        
        this.history_current++;
        if (this.history_current > this.history_depth) {
            this.history_depth = this.history_current;
        }

        this.updateHistoryValues();

        setTimeout(function() {
            $(`#${this.id}`).removeClass('load');
            //this.loadingHide();
        },2000);
    }

    loadingShow(spinner="ios",content="Loading...",showBackdrop=true)
    {
        //Possible value of spinner argument => ios,ios-small,bubbles,circles,crescent,dots

        try {
            this.loading = this.loadingCtrl.create({
                spinner: spinner,
                content: content,
                showBackdrop: showBackdrop
            }); 
            this.loading.present();
        } catch (error) {
            console.error(error);
        }
        
    }

    loadingHide()
    {
        try {
            this.loading.dismiss();
        } catch (error) {
            console.error(error);
        }
        
    }
}