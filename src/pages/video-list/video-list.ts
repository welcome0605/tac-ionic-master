import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform,MenuController } from 'ionic-angular';
import { Nav,NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SingleVideoPage } from '../../pages/singleVideo/singleVideo';

@Component({
    selector: 'page-video-list',
    templateUrl: 'video-list.html',
})
export class VideoListPage {
    @ViewChild(Nav) nav: Nav;
    css = {};
    videoList : any;
    api:any
    showIcon:any;
    menuIcon:string;
    videoShowing: boolean = false;
    currentVideoUrl: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        private youtube: YoutubeVideoPlayer,
        public sanitizer:DomSanitizer)
    {
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        var plyatlist_id;
        // start get playlist id
        if (navParams.data.value.indexOf('list=') == -1) {
            plyatlist_id = navParams.data.value;
        } else {
            plyatlist_id = navParams.data.value.split('list=')[1];
        }
        // var ampersandPosition = plyatlist_id.indexOf('&');
        // if(ampersandPosition != -1) {
        //     plyatlist_id = plyatlist_id.substring(0, ampersandPosition);
        // }
        // end get playlist id
        this.commonProvider.loadingHide();
        this.commonProvider.loadingShow();
        this.commonProvider.requestGet("https://www.googleapis.com/youtube/v3/playlistItems?playlistId="+plyatlist_id+"&key=AIzaSyCUdiQdk6UqlfmkLxR-puRdugj3j3c0vrY&part=snippet&maxResults=50") // &maxResults=5
        .then(resVideo=> {
            this.videoList = resVideo['items'];
            this.commonProvider.loadingHide();
        },
        (error) => {
            this.commonProvider.loadingHide();
            console.log("error loading youtube list");
        });
        this.css = this.navParams.data.css;
    }

    videoClicked(videoId)
    {
        // this.youtube.openVideo(videoId['snippet']['resourceId']['videoId']);
        
        this.currentVideoUrl = this.videoURL(videoId);
        this.videoShowing = true;
    }

    back()
    {
        this.videoShowing = false;
    }

    backClick()
    {
        this.navCtrl.pop();
    }

    videoURL(videoID) {
        if(videoID.indexOf("v=") != -1){
            return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoID.split("v=")[1] + "?rel=0;&autoplay=1");
        }else{
            return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoID + "?rel=0;&autoplay=1");
        }
    }
}
