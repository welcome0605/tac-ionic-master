import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { clamp } from 'ionic-angular/util/util';

@Component({
    selector: 'page-singleVideo',
    templateUrl: 'singleVideo.html'
})

export class SingleVideoPage implements OnInit {

    videoID: string;
    vPlayer = true;
    player:any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        public sanitizer:DomSanitizer,
        )
    {
        let data = this.navParams.data;
        
        if (data.value != null) {
            let url = data.value;
            this.videoID = this.getId(url);
        }
    }

    ngOnInit() {
      // debugger;
      // if (!window['YT']){
      //   var tag = document.createElement('script');
      //   tag.src = "//www.youtube.com/player_api";
      //   var firstScriptTag = document.getElementsByTagName('script')[0];
      //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // }

      // window['onYouTubeIframeAPIReady'] = () => {
      //   this.player = new window['YT'].Player('video', {
      //     height: '390',
      //     width: '640',
      //     videoId: this.videoID,
      //     events: {
      //       'onReady': this.onPlayerReady
      //     }
      //   });
      // }
    }

    onPlayerReady(event)
    {
      this.player.playVideo();
    }

    backClick()
    {
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }

    videoURL() {
        if(this.videoID.indexOf("v=") != -1){
            return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.videoID.split("v=")[1] + "?rel=0;&autoplay=1");
        }else{
            return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.videoID + "?rel=0;&autoplay=1");
        }

    }

    getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    baseUrl:string = 'https://www.youtube.com/embed/';
    playVideo(id){
      this.player.launchPlayer("tgbNymZ7vqY")
      this.vPlayer = true;
    }


}
