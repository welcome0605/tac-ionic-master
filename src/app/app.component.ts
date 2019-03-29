import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {NgModule} from '@angular/core'
import { TruncateModule } from 'ng2-truncate';

import { Nav,Platform,MenuController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { KenburnsPage } from '../pages/kenburns/kenburns';
import { LocationsDetailsPage } from '../pages/locations-details/locations-details';
import { CommonProvider } from '../providers/common/common';
import { VideoListPage } from '../pages/video-list/video-list';
import { SingleVideoPage } from '../pages/singleVideo/singleVideo';
import { AlbumListPage } from '../pages/album-list/album-list';
import { AlbumPhotoListPage } from '../pages/album-photo-list/album-photo-list';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { ImageMappingPage } from '../pages/image-mapping/image-mapping';
import { TextListPage } from '../pages/text-list/text-list';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Events } from 'ionic-angular';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { RssFeedPage } from '../pages/rss-feed/rss-feed';
import { RssDetailsPage } from '../pages/rss-details/rss-details';
import { ContentPage } from '../pages/content/content';
import { ContactPage } from '../pages/contact/contact';
import { NotificationPage } from '../pages/notification/notification';
import { SponsorScreenPage } from '../pages/sponsor-screen/sponsor-screen';
import { SplashScreenPage } from '../pages/splash-screen/splash-screen';
import { ColorMatchPage } from '../pages/color-match/color-match';
import { ProductListPage } from '../pages/product-list/product-list';
import { ModalController } from 'ionic-angular';
import * as Constant from '../app/constant';
import { FCM } from '@ionic-native/fcm';
import { ImageMappingIosPage } from '../pages/image-mapping-ios/image-mapping-ios';
import { ImagePage } from '../pages/image/image';
import { EmptyPage } from '../pages/empty-page/empty-page';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { CustomWebFrameViewPage } from '../pages/customweb/customweb';
import { PdfViewPage } from '../pages/pdf-reader/pdf';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import $ from 'jquery'
import { CustomWebViewPage } from '../pages/custom-web-view/custom-web-view';
//import { Firebase } from '@ionic-native/firebase';
import { RewardLoginPage } from '../pages/reward/reward-login/reward-login';
import { AuthProvider } from '../providers/auth/auth';
import { pipe } from 'rxjs';
import { TruncatePipe } from '../newpipe/trunc-html/trunc-html';

//pdf plugin
declare var hello: any;
declare var cordova: any;


@Component({
    templateUrl: 'app.html'
    // pipes : [TruncatePipe],
})
export class MyApp {

    
    firstPage() {
        
    }
    @ViewChild(Nav) nav: Nav;
    @ViewChild(TruncatePipe) pipes: TruncatePipe;

    rootPage:any = null;
    selectedmenu:any;
    selectedsubmenu :any;
    contentmenu = '';
    pages: Array<{title: string, component: any,type:any,list:any,isShow:any,class:any,value:any}>;
    showSubMenu = false;
    sideMenuCss = {
        mainMenu: {
            backgroundColor:{}
        }
    };
    color = "#FF0000";

    componentArray = {
        "kenburns":KenburnsPage,
        "customweb":CustomWebViewPage,
        "tutorial":TutorialPage,
        "album":AlbumPhotoListPage,
        "rss":RssFeedPage,
        "content": ContentPage,
        "contact": ContactPage,
        "colorMatch": ColorMatchPage,//
        "productList" : ProductListPage,//
        "notification" : NotificationPage,
        "imagemapping" : ImageMappingPage,//
        "image" : ImagePage,//
        "video" : VideoListPage,
        "textList" : TextListPage,//
        "rewards": RewardLoginPage,
        "singleVideo": SingleVideoPage,
        "pdf": PdfViewPage
    };
    
    appSpecificCss:any;
    previousMenu: any;
    counter = 1;
    height : any;
    headerColor: any;
    notificationArray:any;
    ifExistNotification = false;
    borderColor : any;
    borderHeight : any;
    statusColor: any;
    homeIndex :any;
    homeType :any;
    popups : any;
    isLab : any;
    menu_location_type: number;
    tabRoots = [];
    tabMenuRoots = [];
    logoImagePath = "";
    tabSettings = [];
    subMenuClick: boolean = false;

    s3_fontfamily_link = "";

    tabPos = 2; // top - 1, bottom - 2, right - 3, left - 4
    moreDlgFlag = false;
    moreDlgContent = false;
    isSplashScreenFlag = 0 ; // 0: no, 1: yeah
    flagShowed: any;
    flagChecked: any;
    tempUrl: any;
    tempTime: any;
    constructor(
        public menuCtrl: MenuController,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public authProvider: AuthProvider,
        public commonProvider:CommonProvider,
        private youtube: YoutubeVideoPlayer,
        private themeableBrowser: ThemeableBrowser,
        public events: Events,
        public modalCtrl: ModalController,
        private cdr:ChangeDetectorRef,
        private fcm: FCM,
        private ga: GoogleAnalytics,
        public alertCtrl:AlertController,
        public push: Push,
        private transfer: FileTransfer,
        private file: File, 
        // private firebase: Firebase,
    )
    {
        let sponsorModal,splashModal ;
        var start_flag = false;
        var delayTime;
        // var s = "abcdfghijklmnopqrstuv";
        
        
        
        console.log("pages truncate", this.pages);
        //     console.log("checkflag = ",res['appInfo']['tutorial_start']['data']['css_string_json'][1]['value']);
        //     console.log("isAccessed = ",res['appInfo']['tutorial_start']['data']['show_tutorial']);

        this.isSplashScreenFlag = 0;
        this.selectedmenu = 0;
        this.isLab = this.commonProvider.isPlatformCore();
        
        this.splashScreen.hide();

        localStorage.setItem("updateFlag", "0");
        this.commonProvider.downloadJson().then(res => {
            //  
            this.selectedmenu = 0;
            if (res['appInfo'] != undefined) {
                //  
                if (res['appInfo']['appID'] != undefined) {
                    AuthProvider.AppID = res['appInfo']['appID'];
                }
            }
            this.authProvider.getSettings();

            this.popups = res['popups'];
            this.pages = res['menu']['sidemenu'];
            var trunc = this.pages['title'] ;
            // console.log("pages truncate",);
            // console.log("this.pages",this.pages);
            //  
            this.menu_location_type = parseInt(res['menu_location_type']);
            this.s3_fontfamily_link = res['s3_font_family_url'];
            
            if (res["appSpecific"] != undefined &&
                res["appSpecific"]["tabMenuCss"] != undefined &&
                res["appSpecific"]["tabMenuCss"]["tabMenu"] != undefined)
            {
                //  
                let tabCss = res["appSpecific"]["tabMenuCss"]["tabMenu"];
                this.tabSettings = tabCss;
                // this.tabPos = this.tabSettings["tab-position"];
                for (let i = 0; i < this.pages.length; i++) {
                    if (typeof(this.pages[i]) == 'undefined')
                        continue;
                    if (this.pages[i]["tab_show"] == true)
                    {
                        this.pages[i]["nIndex"] = i;
                        this.tabRoots[this.tabRoots.length] = this.pages[i];
                        // this.pages[i] = this.tabRoots[this.tabRoots.length];
                    }
                    // if(this.pages[i])
                }
            }
            // for(let i=0;i< this.pages.length;i++)
            // console.log(this.tabRoots.length);
            //  
            if(this.menu_location_type == 2)
            {
                this.pages = [];
                for(let i=0;i< this.tabRoots.length;i++)
                    this.pages[i] = this.tabRoots[i];
            }
            
            // console.log(this.menu_location_type);
            //  
           
            if (this.popups['updateApp'] != null) {
                //  
                if (this.popups['updateApp']['isShow'] == "true") {
                    this.commonProvider.checkForUpdate();
                }
            }

            //Notification for Phase 1
            if (this.ifExistNotification == true) {
                //  
                if (this.popups['notification'] != null) {
                    if (this.popups['notification']['isShow'] == "true") {
                        this.commonProvider.notificationDialog().then(res => {
                            if (res == 1) {
                                console.log("1");
                                 ;
                                this.nav.setRoot(this.componentArray['notification'],this.notificationArray);
                                this.selectedmenu = this.notificationArray['title'];
                            }
                        });
                    }

                    var notification_array = this.notificationArray.value;
                    var auto_subscribe = JSON.parse(localStorage.getItem("auto_subscribe"));
                    //test commented by KJH start
                    // if (auto_subscribe != true) {
                    //     for (var xx in notification_array) {
                    //         notification_array[xx]['is_allow'] = true;
                    //         this.fcm.subscribeToTopic(notification_array[xx].title).then(res=> {

                    //         });
                    //     }
                    //     localStorage.setItem("notification_array",JSON.stringify(notification_array));
                    //     localStorage.setItem("auto_subscribe", "true");
                    // }
                    //test commented by KJH end
                }
            }

            if (this.popups['rateApp'] != null) {
                //  
                if (this.popups['rateApp']['isShow'] == "true"){
                    this.commonProvider.rateAppDialog();
                }
            }

            this.appSpecificCss = res['appSpecific'];
            this.sideMenuCss = this.appSpecificCss['sideMenuCss'];
            // this.homeIndex = res['appInfo']['homePageIndex'];
            console.log("appSpecificCss ============== " , this.appSpecificCss);
            Constant.default.logo = this.appSpecificCss['headerCss']['headerIcon'];
            // $('#logoSideMenu').attr('src',this.appSpecificCss['sideMenuCss']['mainMenu']['sideMenuImg']);

            this.initializeApp();

            this.height = res['appSpecific']['headerCss']['height'].toString();
            this.height = this.height.substring(0, this.height.length - 2);
            this.headerColor = res['appSpecific']['headerCss']['color'];

            var start = res['appSpecific']['headerCss']['borderBottom'].indexOf('#');
            this.borderColor = res['appSpecific']['headerCss']['borderBottom'].substr(start);

            var end = res['appSpecific']['headerCss']['borderBottom'].indexOf('px');
            this.borderHeight = res['appSpecific']['headerCss']['borderBottom'].substr(0,end);
            //gjc 0426 menu header empty side 
            let menu_header_bottom_height_index = this.sideMenuCss['mainMenu']['borderBottom'].indexOf('px');
            let menu_header_bottom_h = this.sideMenuCss['mainMenu']['borderBottom'].substr(0, menu_header_bottom_height_index);
            menu_header_bottom_h = parseInt(menu_header_bottom_h);
            // this.height = "" + (parseInt(this.height) + parseInt(menu_header_bottom_h));

            var menuHeight = parseInt(this.height);/*
            if (this.commonProvider.isPlatformAndroid()) {
                if (parseInt(this.height) < 70) {
                    this.height = 70;
                }
                menuHeight = parseInt(this.height) - 2;
            }
            else {
                if (parseInt(this.height) < 64) {
                    this.height = 64;
                }
                menuHeight = parseInt(this.height);
            }*/

            var marginTop = +this.borderHeight + +parseInt(this.height);
            let menuHeaderColor = this.sideMenuCss['mainMenu']['backgroundColor'].toString().substring(0, 7);
            var headerCss = '.toolbar-background-md,.toolbar-background-ios{background:'+res['appSpecific']['headerCss']['color']+';}';
            headerCss+='#menuHeader {border-bottom-color:'+menuHeaderColor+';background-color:'+menuHeaderColor+'}';
            //headerCss+='\nspan.button-inner {color: '+this.appSpecificCss['menuIconCss']['color']+'}';
            //headerCss+=".scroll-content { overflow-x: hidden !important; overflow-y: hidden !important;}";
            headerCss+='.select {background-color : '+this.sideMenuCss['mainMenu']['selectedColor']+' !important; color:'+this.sideMenuCss['mainMenu']['selectedFontColor']+' !important;}';
            headerCss+='.nonselect {background-color : '+this.sideMenuCss['mainMenu']['nonSelectedColor']+' !important; color:'+this.sideMenuCss['mainMenu']['nonSelectedFontColor']+' !important;}';
            headerCss+='.selectSub {background-color : '+this.sideMenuCss['subMenu']['selectedColor']+' !important; color:'+this.sideMenuCss['subMenu']['selectedFontColor']+' !important;}';
            headerCss+='.nonselectSub {background-color : '+this.sideMenuCss['subMenu']['nonSelectedColor']+' !important; color:'+this.sideMenuCss['subMenu']['nonSelectedFontColor']+' !important;}';
            //headerCss+='.list-md .item-block .item-inner,.list-ios .item-block .item-inner {border-bottom: 1px solid '+this.sideMenuCss['mainMenu']['lineDividerColor']+';}';
            headerCss+='.back-button {color: '+this.appSpecificCss['menuIconCss']['color']+' !important;}';
            headerCss+='.toolbar-md,.toolbar-ios {height: '+ parseInt(this.height) +'px !important;}';
            headerCss+='ion-header.header.header-ios,.header-md {border-bottom: '+res['appSpecific']['headerCss']['borderBottom']+' !important;}';
            headerCss+='.toggle-ios.toggle-checked .toggle-icon,.toggle-md.toggle-checked .toggle-icon {background-color: green !important;}';
            headerCss+='.toggle-ios.toggle-checked .toggle-inner, .toggle-md.toggle-checked .toggle-inner{background-color: '+res['appSpecific']['toggleIcon']['innerBackgroundColor']+' !important;}';
            headerCss+='.list-ios, .list-md{background-color: '+ this.sideMenuCss['mainMenu']['backgroundColor'] +'; margin-top: ' + menu_header_bottom_h + 'px;}';
            headerCss+='ion-header.cst_header.header.header-ios,ion-header.cst_header.header-md {border-bottom: '+this.sideMenuCss['mainMenu']['borderBottom']+' !important;}';
            //headerCss+='.toolbar-title.toolbar-title-ios, .toolbar-title.toolbar-title-md {padding-top: '+ Constant.default.title_padding_top +' !important;}';
            headerCss+='.toolbar-title.toolbar-title-ios, .toolbar-title.toolbar-title-md {margin-bottom: '+ Constant.default.title_margin_bottom +' !important; padding: 0 44px; }';
            headerCss+='.bar-button-menutoggle-ios ion-icon {padding-top: '+ Constant.default.icon_padding_top +' !important;}';
            //headerCss+='.bar-button-menutoggle-md ion-icon {padding-top: '+ Constant.default.icon_padding_top_md +' !important;}';
            headerCss+='.back-button-icon-md  {padding-top: '+ Constant.default.icon_padding_top_md +' !important;}';
            headerCss+='.back-button-icon-ios{padding-top: '+ Constant.default.icon_padding_top +' !important;}';
            headerCss+= '.cst_menu_label.label-ios, .cst_menu_label.label-ios{ padding-left: '+ this.sideMenuCss['mainMenu']['paddingLeft'] +' !important;}';

            if (parseInt(this.borderHeight) > 3) {
                //  
                headerCss+= 'ion-content > .scroll-content{ margin-top : ' + (25 + marginTop) +'px !important;}';
            }

            headerCss+= 'page-kenburns > ion-content > .scroll-content{ margin-top : ' + (25 + marginTop) +'px !important;}';

            headerCss+= 'page-video-list > ion-content > .scroll-content{ margin-top : ' + (25 + marginTop) +'px !important;}';

            headerCss+= 'page-tutorial > ion-content > .scroll-content{ margin-top : 25px !important;}';

            headerCss+= 'page-image-mapping-ios > ion-content > .scroll-content{ margin-top : 25px !important;}';

            headerCss+= '.menu-inner > ion-content > .scroll-content{ margin-top : ' + (25 + menuHeight) +'px !important;}';

            let deviceWidth = window.screen.width * window.devicePixelRatio;
            let deviceHeight = window.screen.height * window.devicePixelRatio;

            if (deviceWidth == 1125 && deviceHeight == 2436) {
                headerCss+= 'page-image-mapping-ios > ion-content > .scroll-content{ margin-top : 0px !important;}';
            }
            //  

            // if((res['appInfo'].hasOwnProperty('tutorial'))) {
            //     if((res['appInfo']['tutorial'].hasOwnProperty('flag'))) {
            //         if (res['appInfo']['tutorial']['flag'] == 1)  {
            //             var index = res['appInfo']['tutorial']['index'] - 1;
            //             headerCss+='.swiper-pagination-bullet{background: '+this.pages[index]['css']['pagerCss']['background']+' !important;}';
            //             headerCss+='.swiper-pagination-bullet{height: '+this.pages[index]['css']['pagerCss']['height']+' !important;}';
            //             headerCss+='.swiper-pagination-bullet{width: '+this.pages[index]['css']['pagerCss']['width']+' !important;}';
            //             headerCss+='.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{{bottom: 2% !important;}';
            //         }
            //     }
            // }

            var htmlDiv = document.createElement('div');
            htmlDiv.innerHTML = '<p>foo</p><style>' + headerCss + '</style>';
            document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);
            
            if (this.commonProvider.appSpecific['splash_Screen'] != undefined) {
                console.log(this.commonProvider.appSpecific['splash_Screen']['url']);

                this.tempUrl = this.commonProvider.appSpecific['splash_Screen']['url'];
                this.loadSpalshScreen();
            }

            this.tempTime = 0;
            if (this.commonProvider.appSpecific['sponsorSplash_screen'] != undefined) {
                // if (this.commonProvider.appSpecific['sponsorSplash_screen']['time'] != undefined) {
     
                    // console.log("AAAAAAAAAAAAAAAA",this.commonProvider.appSpecific['sponsorSplash_screen']['url']);
                    if(this.commonProvider.appSpecific['sponsorSplash_screen']['url'].indexOf("default.png") == -1)
                        this.tempTime = this.commonProvider.appSpecific['sponsorSplash_screen']['time'];
                    else this.tempTime = 0;
                    console.log("tempTime",this.tempTime);
                    this.loadSponsorScreen();
                // }
            }
           

            
            if(this.pages.length == 0 || this.pages[0].type == 'subMenu') {
                //  
                
                this.nav.setRoot(EmptyPage,"");
                return;
            }
            
            var show = localStorage.getItem("isTutorialShow");
            this.flagShowed = localStorage.getItem("isTutorialShow");
            this.flagChecked = res['appInfo']['tutorial']['first_view'];
            console.log(res['appInfo']['tutorial']['first_view']);

            this.first();

            events.subscribe('component:clicked', (componentType, data) => {
                //  ;
                var data = JSON.parse(data);
                if (this.commonProvider.googleTrackId != undefined && this.commonProvider.googleTrackId != "") {
                    this.platform.ready().then(() => {
                        this.ga.startTrackerWithId(this.commonProvider.googleTrackId)
                        .then(() => {
                            this.ga.trackView(data.type);
                        })
                        .catch(e => console.log('Error starting GoogleAnalytics', e));
                    });
                }
                this[componentType](data);
            });
            this.selectedmenu = this.pages[0]['id'];
        });
        
    }
    setSplashBlank()
    {
        // $("#k1").attr("style.width","0");
        $("#k1").remove();
        // var myFlag = false;
        //     for (var i = 0; i < this.pages.length; i++) {
        //         if (this.pages[i]['type'] == 'tutorial' && this.flagChecked == true)
        //         {
        //             myFlag = true;
        //             break;
        //         }
        //     }
        // setTimeout( () => {
        //     if(this.flagShowed =="1" || this.flagChecked == false){
        //         if(myFlag == false){
        //         if (this.pages[0].type == 'web') {
        //             this.nav.setRoot(LocationsDetailsPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'kenburns') {
                    
        //             this.nav.setRoot(KenburnsPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "tutorial") {
        //             this.menuCtrl.close();
        //             return;
        //         }
        
        //         if (this.pages[0].type == 'productList') {
        //             this.nav.setRoot(ProductListPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'colorMatch') {
        //             this.nav.setRoot(ColorMatchPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'video') {
        //             this.nav.setRoot(VideoListPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'notification') {
        //             this.nav.setRoot(NotificationPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "rss"){
        //             this.nav.setRoot(RssFeedPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "rewards") {
        //             this.nav.setRoot(RewardLoginPage, this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "content") {
        //             this.nav.setRoot(ContentPage, this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "contact") {
        //             this.nav.setRoot(ContactPage, this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'album') {
                    
        //             this.nav.setRoot(AlbumPhotoListPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'singlevideo') {
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == 'imageMapping') {
        //             this.nav.setRoot(ImageMappingPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "pdf") {
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type=="textList") {
        //             this.nav.setRoot(TextListPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "customweb") {
        //             this.nav.setRoot(CustomWebViewPage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        
        //         if (this.pages[0].type == "imagemapping") {
        //             if (this.commonProvider.isPlatformAndroid()) {
                        
        //                 this.nav.setRoot(ImageMappingPage,this.pages[0]);
        //                 this.menuCtrl.close();
        //             }
        //             else if (this.commonProvider.isPlatformIos()) {
                        
        //                 this.nav.setRoot(ImageMappingIosPage,this.pages[0]);
        //                 this.menuCtrl.close();
        //             }
        //         }
        
        //         if (this.pages[0].type == "image") {
                    
        //             this.nav.setRoot(ImagePage,this.pages[0]);
        //             this.menuCtrl.close();
        //         }
        //         }
        
        //     }

        // },this.tempTime*1000);
        
            

    }
    setSponsorBlank()
    {
        // $("#sponsorSplashScreen").attr("opacity",'0');
        $("#k2").remove();

    }
    loadSpalshScreen()
    {
        $("#splashScreen").attr("src",this.tempUrl);
        setTimeout(() => {
            console.log("--------- splash screen remove ----------");
            this.setSplashBlank()
        }, 7000);
        this.isSplashScreenFlag = 1;
        
    }
    loadSponsorScreen()
    {
        // console.log("src",this.commonProvider.appSpecific['sponsorSplash_screen']['url']);
        //
        setTimeout(() =>{
            console.log("--------- sponsor splash screen load ----------");
            $("#sponsorSplashScreen").attr("src",this.commonProvider.appSpecific['sponsorSplash_screen']['url']);
        }, 4000 * this.isSplashScreenFlag);

        setTimeout(() =>{
            console.log("--------- sponsor splash screen remove ----------");
            this.setSponsorBlank()
        },7000 * this.isSplashScreenFlag +this.tempTime*1000);
        
    }
    
    
    first()
    {
        setTimeout(() => {
            this.hello();
        }, 4000 * this.isSplashScreenFlag + 1000 +this.tempTime*1000)
        setTimeout(()=>{
            console.log("------- first --------");
            // this.hello();
            let i;
            console.log("flagShowed = ",this.flagShowed);
            console.log("flagChecked = ",this.flagChecked);
            //  
            for (i = 0; i < this.pages.length; i++) {

                if (this.pages[i]['type'] == 'tutorial' && this.flagChecked == true)
                {
                    // this.flagShowed = true;
                    // localStorage.setItem("isTutorialShow","1");
                     
                     
                this.nav.push(this.componentArray['tutorial'],this.pages[i]);
                break;
                }
            }
            // console.log("gaesu",i);
            //  
             
            if(i == this.pages.length-1 && this.pages[i]['type'] != 'tutorial' && this.flagShowed =="1" && this.flagChecked == false) {
                // this.nav.setRoot(EmptyPage,"");
                // this.hello();
                // return;
            }

        },4000 * this.isSplashScreenFlag + 1200 +this.tempTime*1000) ;
    }

    hello() 
    {
        console.log("------------ hello ----------");
        if(this.componentArray[this.pages[0]['type']] ==  PdfViewPage)
        {
            //  
            //        
            this.pdf(this.pages[0],this.pages[0].value);
            return;
        }
        if(this.componentArray[this.pages[0]['type']] ==  CustomWebViewPage)
        {
            this.customweb(this.pages[0],this.pages[0].value);
            return;
        }
        if(this.componentArray[this.pages[0]['type']] !=  PdfViewPage && this.componentArray[this.pages[0]['type']] !=  CustomWebViewPage)
        {
            // console.log("this.pages[0].value",this.pages[0].value);
            //  
            this.nav.setRoot(this.componentArray[this.pages[0]['type']],this.pages[0]);
        }
    }
    pushsetup() 
    {
        //  
        const options: PushOptions = {
            android: {
                senderID: '1085102169198'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            windows: { }
        };

        const pushObject: PushObject = this.push.init(options);
        console.log(pushObject);
        pushObject.on('notification').subscribe((notification: any) => {
            if (notification.additionalData.foreground) {
                let youralert = this.alertCtrl.create({
                    title: 'New Push notification',
                    message: notification.message
                });
                youralert.present();
            }
        });

        pushObject.on('registration').subscribe((registration: any) => {
            console.log(registration);
            //do whatever you want with the registration ID
        });

        pushObject.on('error').subscribe(error => {
            alert('Error with Push plugin' + error);
        });
    }

    initializeApp() 
    {
        
        this.platform.ready().then(() => {
            var self = this;
            this.platform.resume.subscribe(() => {
                if (self.popups['updateApp'] != null) {
                    if (self.popups['updateApp']['isShow'] == "true") {
                        self.commonProvider.checkForUpdate();
                    }
                }
            });

            if (localStorage.getItem("counter")) {
                let c = parseInt(localStorage.getItem("counter"));
                if (c >= parseInt(this.commonProvider.popups['rateApp']['uses_until_prompt'])) {
                    c = 0;
                }
                c ++;
                localStorage.setItem("counter", c.toString());
            }
            else {
                this.counter = +this.counter + +1;
                localStorage.setItem("counter", (this.counter).toString());
            }
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString(this.appSpecificCss['statusBarCss']['color']);
            this.statusColor = this.appSpecificCss['statusBarCss']['color'];
            
            if ((<any>window).cordova && (<any>window).cordova.plugins.Keyboard) {
                (<any>window).cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            }

            Constant.default.logo = this.appSpecificCss['headerCss']['headerIcon'];
            console.log("Constant.default.logo",Constant.default.logo);
            //  
            this.logoImagePath = "";
            var storageDirectory = "";
            if (this.platform.is('ios')) {
                storageDirectory =  this.file.documentsDirectory;
            }
            else if (this.platform.is('android')) {
                storageDirectory =  this.file.externalRootDirectory;
            }
            if (storageDirectory != null && storageDirectory != "") {
                                 
                let fileTransfer = this.transfer.create();
                fileTransfer.download(this.appSpecificCss['headerCss']['headerIcon'], storageDirectory + 'logo.png').then((entry) => {
                    console.log('download complete: ' + entry.toURL());
                    this.logoImagePath = entry.toURL();
                }, (error) => {
                    // handle error
                });
            }

            
        });
        //  
    }

    
    productList(data)
    {
        //  
        this.nav.setRoot(ProductListPage, data);
    }

    //for innner page events
    kenburns(data)
    {
        //  ;
        this.nav.push(KenburnsPage, data);
    }

    web(data)
    {
        //  
        this.nav.push(LocationsDetailsPage, data);
    }

    singlevideo(data)
    {
        
        this.nav.setRoot(SingleVideoPage, data);

        // if (data.value != null) {
        //     let url = data.value
        //     var videoid = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        //     if (videoid != null) {
        //         console.log("video id = ", videoid[1]);
        //         this.youtube.openVideo(videoid[1]);
        //     } else { 
        //         console.log("The youtube url is not valid.");
        //     }
        // }
    }

    imagemapping(data)
    {
        if (this.commonProvider.isPlatformAndroid()) {
            this.nav.push(ImageMappingPage,data);
        }
        else if (this.commonProvider.isPlatformIos()) {
            this.nav.push(ImageMappingIosPage,data);
        }
    }

    image(data)
    {
        this.nav.push(ImagePage, data);
    }
    
    customweb(object, menu_button_type = "back")
    {
        if (this.commonProvider.isPlatformAndroid() || this.commonProvider.isPlatformIos()) {
             
            this.platform.ready().then(() => {
                if (menu_button_type == "back")
                    this.nav.push(CustomWebFrameViewPage, object);
                else {
                    this.nav.setRoot(CustomWebFrameViewPage, object);
                }
            });
        }
        else {
            if (menu_button_type == "back")
                this.nav.push(CustomWebFrameViewPage, object);
            else {
                this.nav.setRoot(CustomWebFrameViewPage, object);
            }
        }
            /*
            // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
            if (this.commonProvider.isPlatformCore()) {
                this.nav.push(CustomWebFrameViewPage,object.value);
                return;
            } else {
                var tempData = [];
                tempData['logo_path'] = this.logoImagePath;
                tempData['menu_button_type'] = menu_button_type;
                tempData['object'] = object;
                tempData['themeableBrowser'] = this.themeableBrowser;
                this.nav.push(CustomWebViewPage, tempData);
            }
            */
        
    }

    tutorial(data)
    {
        this.nav.push(TutorialPage, data);
    }

    colorMatch(data)
    {
        this.nav.push(ColorMatchPage, data);
    }

    rss(data)
    {
        this.nav.push(RssFeedPage, data);
    }

    content(data)
    {
        this.nav.push(ContentPage, data);
    }

    contact(data)
    {
        this.nav.push(ContactPage, data);
    }

    textList(data)
    {
        this.nav.push(TextListPage, data);
    }

    market(data)
    {
        let resAppPackageName = '';
        let url = '';
        if (this.commonProvider.isPlatform('android')) {
            resAppPackageName = data.value['androidAppId'];
            url = "market://details?id=" + resAppPackageName;
            window.open(url,'_system','location=yes');
        }
        else {
            resAppPackageName = data.value['iosAppId'];
            url = "itms-apps://itunes.apple.com/us/app/apple-store/id" + resAppPackageName;
            window.open(url,'_system','location=yes');
        }
    }

    pdf(data, button_type="back")
    {
        console.log(data.value);

        if (String(data.value).indexOf("http://") == -1) {
            data.value = "http://" + data.value;
        }
        
        if (this.commonProvider.isPlatformAndroid() || this.commonProvider.isPlatformIos()) {
            this.nav.push(PdfViewPage, data.value);
        } else {
            if (String(data.value).indexOf("http://docs.google.com/gview?embedded=true&url=") == -1) {
                data.value = "http://docs.google.com/gview?embedded=true&url=" + data.value;
            }
            this.customweb(data, button_type);
        }
    }

    video(data)
    {
        this.nav.push(VideoListPage, data);
    }

    notification(data)
    {
        this.nav.push(NotificationPage, data);
    }

    album(data)
    {
        this.nav.push(AlbumPhotoListPage, data);
    }
    //  

    openPage(page, index, title, sub_flag, parent_index = -1)
    {
        // console.log(page," ",index," ",title," ",sub_flag," ",parent_index);
        // console.log("33333333333333333=>sidemenucss ", this.sideMenuCss);
        this.subMenuClick = false;
        if (this.commonProvider.googleTrackId != undefined && this.commonProvider.googleTrackId != "") {
            this.platform.ready().then(() => {
                this.ga.startTrackerWithId(this.commonProvider.googleTrackId)
                .then(() => {
                    this.ga.trackView(page.type);
                })
                .catch(e => console.log('Error starting GoogleAnalytics', e));
            });
        }

        if (page.type == 'web') {
            
            this.nav.setRoot(LocationsDetailsPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'kenburns') {
            //  ;
            this.nav.setRoot(KenburnsPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "tutorial") {
            // console.log(page);
            //  
            this.tutorial(page);
            // this.nav.setRoot(TutorialPage,page);
            this.menuCtrl.close();
            return;
        }

        if (page.type == 'productList') {
            
            this.nav.setRoot(ProductListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'colorMatch') {
            this.nav.setRoot(ColorMatchPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'video') {
            
            this.nav.setRoot(VideoListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'notification') {
            
            this.nav.setRoot(NotificationPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "rss"){
            this.nav.setRoot(RssFeedPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "rewards") {
            
            this.nav.setRoot(RewardLoginPage, page);
            this.menuCtrl.close();
        }

        if (page.type == "content") {
            
            this.nav.setRoot(ContentPage, page);
            this.menuCtrl.close();
        }

        if (page.type == "contact") {
            
            this.nav.setRoot(ContactPage, page);
            this.menuCtrl.close();
        }

        if (page.type == 'album') {
            
            this.nav.setRoot(AlbumPhotoListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == 'singlevideo') {
            
            this.singlevideo(page);
            this.menuCtrl.close();
        }

        if (page.type == 'imageMapping') {
            
            this.nav.setRoot(ImageMappingPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "pdf") {
            if (page.id != this.selectedmenu) {
                this.previousMenu = this.selectedmenu;
            }
            this.pdf(page,"menu");
            this.menuCtrl.close();
        }

        if (page.type=="textList") {
            
            this.nav.setRoot(TextListPage,page);
            this.menuCtrl.close();
        }

        if (page.type == "customweb") {
            if (page.value == undefined)
            {
                let alert = this.alertCtrl.create({
                  title: "You didn't seelect site url.",
                  subTitle: 'Please check again if you picked site url.',
                  buttons: ['OK']
                });
                alert.present();
                this.menuCtrl.close();
                return;
            }
            if (page.id != this.selectedmenu) {
                this.previousMenu = this.selectedmenu;
            }
            console.log("PAGE",page);
            this.customweb(page,"menu");
            this.menuCtrl.close();
        }

        if (page.type == "imagemapping") {
            if (this.commonProvider.isPlatformAndroid()) {
                
                this.nav.setRoot(ImageMappingPage,page);
                this.menuCtrl.close();
            }
            else if (this.commonProvider.isPlatformIos()) {
                
                this.nav.setRoot(ImageMappingIosPage,page);
                this.menuCtrl.close();
            }
        }

        if (page.type == "image") {
            
            this.nav.setRoot(ImagePage,page);
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
        
        if (sub_flag != 'child' ) {
             
            for(let i = 0; i < this.pages.length; i++) {
                if (i != index) {
                    this.pages[i].isShow = false;
                }
            }
        }

        if (sub_flag != 'child' ) {
            // console.log(index);
            //  
             
            this.pages[index].isShow = !this.pages[index].isShow;
        }

        if (sub_flag == 'child' && page.type == 'subMenu') {
            // case of level 2.
             
            this.pages[parent_index]['value'][index].isShow = !this.pages[parent_index]['value'][index].isShow;
            if(this.menu_location_type == 2){
                this.subMenuClick = true;
            }
        }

        if (page.type != 'subMenu') {
            this.selectedmenu = page.id;
            this.selectedsubmenu = page.id;
            this.menuCtrl.close();
        }
    }

    getTabMenyFontStyle() {
        //  
        
      return ``;
    }
}
