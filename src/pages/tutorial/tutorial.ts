import { Component, ViewChild  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Slides, MenuController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { EmptyPage } from '../../pages/empty-page/empty-page';
import { MyApp } from '../../app/app.component';
import { KenburnsPage } from '../../pages/kenburns/kenburns';
import { LocationsDetailsPage } from '../../pages/locations-details/locations-details';
import { VideoListPage } from '../../pages/video-list/video-list';
import { SingleVideoPage } from '../../pages/singleVideo/singleVideo';
import { AlbumListPage } from '../../pages/album-list/album-list';
import { AlbumPhotoListPage } from '../../pages/album-photo-list/album-photo-list';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { ImageMappingPage } from '../../pages/image-mapping/image-mapping';
import { TextListPage } from '../../pages/text-list/text-list';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Events } from 'ionic-angular';
import { RssFeedPage } from '../../pages/rss-feed/rss-feed';
import { RssDetailsPage } from '../../pages/rss-details/rss-details';
import { ContentPage } from '../../pages/content/content';
import { ContactPage } from '../../pages/contact/contact';
import { NotificationPage } from '../../pages/notification/notification';
import { SponsorScreenPage } from '../../pages/sponsor-screen/sponsor-screen';
import { ColorMatchPage } from '../../pages/color-match/color-match';
import { ProductListPage } from '../../pages/product-list/product-list';
import { ImageMappingIosPage } from '../../pages/image-mapping-ios/image-mapping-ios';
import { ImagePage } from '../../pages/image/image';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { CustomWebFrameViewPage } from '../../pages/customweb/customweb';
import { PdfViewPage } from '../../pages/pdf-reader/pdf';
import { CustomWebViewPage } from '../../pages/custom-web-view/custom-web-view';
import { RewardLoginPage } from '../../pages/reward/reward-login/reward-login';

@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html',
})
export class TutorialPage 
{
    @ViewChild(Slides) slides: Slides;
    // @ViewChild(Nav) navCtrl: NavController;

    menuIcon:string;
    slideArray : any;
    imageUrl = "";
    css = {};
    firstElement: any;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public commonProvider:CommonProvider,
        public viewCtrl: ViewController,
        public sanitizer: DomSanitizer,
        public youtube: YoutubeVideoPlayer,
        ) 
    {	
        // debugger
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        this.slideArray = this.navParams.data.value.media_data.map(slide => {
            if (slide.type == 2) // VIDEO
                slide.url = this.videoURL(this.getId(slide.url.changingThisBreaksApplicationSecurity || slide.url));
            return slide;
        });
        this.css = this.navParams.data.css;

        try {
            this.slides.slideTo(1,50);
        } catch(e) {

        }
        //this.menuCtrl.enable(false);
    }

    slideChanged() 
    {
        let index = this.slides.getActiveIndex();
        console.log("index = ", index, "length = ", this.slideArray.length);
        if(index >= this.slideArray.length)
        {
            // this.viewCtrl.dismiss();
            this.closePage();
        } 

        else if(this.slideArray[index].type == 2) // Video 
        {
            // (<HTMLVideoElement>document.getElementById(`video_${index}`)).play();
        }
    }

    videoURL(videoID) {
        if(videoID.indexOf("v=") != -1){
            return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoID.split("v=")[1] + "?rel=0;&autoplay=1");
        }else{
            return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoID + "?rel=0;&autoplay=1");
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

    closePage()
    {
         this.commonProvider.downloadJson().then(res => {
            this.firstElement = res['menu']['sidemenu'][0];
            this.switchFirstPage(this.firstElement);
        });
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }

    switchFirstPage(page){
        if (page.type == 'web') {
            this.navCtrl.setRoot(LocationsDetailsPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'kenburns') {
            
            this.navCtrl.setRoot(KenburnsPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "tutorial") {
            this.menuCtrl.close();
            return;
        }

        if (page.type == 'productList') {
            this.navCtrl.setRoot(ProductListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'colorMatch') {
            this.navCtrl.setRoot(ColorMatchPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'video') {
            this.navCtrl.setRoot(VideoListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'notification') {
            this.navCtrl.setRoot(NotificationPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "rss"){
            this.navCtrl.setRoot(RssFeedPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "rewards") {
            this.navCtrl.setRoot(RewardLoginPage, page);
            this.menuCtrl.close();
        }

        if (page.type == "content") {
            this.navCtrl.setRoot(ContentPage, page);
            this.menuCtrl.close();
        }

        if (page.type == "contact") {
            this.navCtrl.setRoot(ContactPage, page);
            this.menuCtrl.close();
        }

        if (page.type == 'album') {
            
            this.navCtrl.setRoot(AlbumPhotoListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'singlevideo') {
            this.menuCtrl.close();
        }

        if (page.type == 'imageMapping') {
            this.navCtrl.setRoot(ImageMappingPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "pdf") {
            this.menuCtrl.close();
        }

        if (page.type=="textList") {
            this.navCtrl.setRoot(TextListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "customweb") {
            this.menuCtrl.close();
        }

        if (page.type == "imagemapping") {
            if (this.commonProvider.isPlatformAndroid()) {
                
                this.navCtrl.setRoot(ImageMappingPage,page);
                this.menuCtrl.close();
            }
            else if (this.commonProvider.isPlatformIos()) {
                
                this.navCtrl.setRoot(ImageMappingIosPage,page);
                this.menuCtrl.close();
            }
        }

        if (page.type == "image") {
            
            this.navCtrl.setRoot(ImagePage,page);
            this.menuCtrl.close();
        }

        if (page.type == "market") {
            if (this.commonProvider.isPlatform('android')) {
                var resAppPackageName = page.value['androidAppId'];
                var url = "market://details?id=" + resAppPackageName;
                window.open(url,'_system','location=yes');
            }
            else {
                var resAppPackageNamee = page.value['iosAppId'];
                var urll = "itms-apps://itunes.apple.com/us/app/apple-store/id" + resAppPackageNamee;
                window.open(urll,'_system','location=yes');
            }
            this.menuCtrl.close();
        }
    }
}