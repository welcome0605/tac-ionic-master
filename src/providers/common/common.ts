import { Injectable } from '@angular/core';
import { LoadingController, Platform, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as xml2js from "xml2js"
import { Dialogs } from '@ionic-native/dialogs';
import { ViewChild } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { Toast } from '@ionic-native/toast';
import { Nav } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { ReturnStatement } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../environment/environment';

@Injectable()
export class CommonProvider 
{
    @ViewChild(Nav) nav: Nav;

    loading:any = null;
    url = {};
    menu = {};
    popups = {};
    frameworkCss = {};
    frameworkConfig = {};
    appSpecific = {};
    language : {};
    jsonUrl:any;
    appname: String;
    env: String;
    jsonfilename: String;
    serverRoot: String;
    apiRoot: String;
    projectRoot: String;
    imgUrl:any;
    appInfo:any;
    googleTrackId : any;
    tutoFlag: boolean = false;
    private slideSubject = new Subject<any>();

    constructor(
        public loadingCtrl:LoadingController,
        public http: Http,
        private storage: Storage,
        public platform: Platform,
        private dialogs: Dialogs,
        private appVersion: AppVersion,
        private toastCtrl: ToastController
        ) 
    {
        //local developement
        
    //    this.serverRoot = "http://theappcompany.com/hybrid/taccms/";

        //this.serverRoot = "http://theappcompany.com/hybrid/";

        // this.serverRoot = "http://127.0.0.1/ionic-v3/";

    //    this.serverRoot = "http://192.168.100.112:1204/api";

        // this.serverRoot = "http://35.163.93.93/projects/";
        // this.apiRoot = "http://35.163.93.93/api/";

        this.serverRoot = environment.ServerRoot;
        this.apiRoot = environment.BaseUrl + "/";

        //this.appname = "hope_wine20"; //Folder name must be with same name in server
        
        //this.appname = "joes_ice19";

        this.appname = `${environment.AppName}/assets`;

        //this.appname = "balaji_namkeen30";

        //this.appname = "balaji_namkeen30";

        //this.appname = "joes_nick_test9";

        //this.appname = "liberty_school_paso_robles2";

        //this.appname = "leandro_nick_test10";

        //this.appname = "cosmo-hair";
        
        //this.appname = "rational-ionic3";

        //this.appname = "allmenuapp4";

        
        this.env = ""; // when you go live change it production.
        
        //this.env = "development"; // when you go live change it production.
        

        this.jsonfilename = "setting.json";
        
        this.projectRoot = this.serverRoot+""+this.appname+"/"+this.env;
        
        this.jsonUrl = environment.production ? "./assets/" + this.jsonfilename :this.projectRoot+""+this.jsonfilename;
    }
    /*
    toastMessage(message,duration="2000")
    {
        this.toast.show(message, duration,'bottom')
        .subscribe(toast => 
        {
            console.log(toast);
        });
    }
    */
    toastMessage(message, duration=4000)
    {
        //  
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'bottom'
        });

        toast.present();
    }

    sendCurrentSlideInfo(slide_index: number) {
        this.slideSubject.next({index: slide_index});
    }

    getCurrentSlideInfo(): Observable<any> {
        return this.slideSubject.asObservable();
    }

    loadingShow(spinner="ios",content="Please wait...",showBackdrop=true)
    {
        //  
        //Possible value of spinner argument => ios,ios-small,bubbles,circles,crescent,dots
        try {
            if (this.loading == null) {
                this.loading = this.loadingCtrl.create({
                    spinner: spinner,
                    // content: content,
                    showBackdrop: showBackdrop
                });
            }
            this.loading.present();
        } catch (error) {
            console.error(error);
        }
        
    }

    loadingHide()
    {
        //  
        try {
            console.log("## loadingHide ");
            if (this.loading != null) {
                this.loading.dismiss();
                this.loading = null;
            }
        } catch (error) {
            console.log("## loadingHide error ");
            console.error(error);
        }
        
    }
    
    requestGet(url) 
    {
        return new Promise((resolve , reject) => {
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control' : 'no-cache'
            });

            let options = new RequestOptions({
                headers: headers
            });

            this.http.get(url,options).map(res => res.json())
            .subscribe(
                data => { resolve(data); },
                err => { reject(err); } 
            );
        });
    }

    notificationDialog()
    {
         
        return new Promise(resolve => 
        {
            if (localStorage.getItem("notificationDialogShownAlready")==undefined) {
                var notificationObj = this.popups['notification'];
                this.dialogs.confirm(notificationObj['message'], notificationObj['title'], [notificationObj['button2'], notificationObj['button1']])
                .then(res =>  {
                    localStorage.setItem("notificationDialogShownAlready","true");
                    if (res == 1) {
                        resolve(res);
                    }   
                    else {
                        resolve({"error":"404"});
                    }            
                })
                .catch(e => console.log('Error displaying dialog', e));
            }
        });
    }
    
    getAppVersion()
    {
        //  
        return new Promise(resolve => {
            if (this.platform.is('cordova')) {
                resolve(this.appVersion.getVersionNumber());
            }
            else {
                resolve(0);
            }
        });
    }

    checkForUpdate()
    {
         
        this.getAppVersion()
        .then(resApp=> {
            let updatePoupObj = this.popups['updateApp'];
            let resAppPackageName = '';
            let url = '';
            var flag = JSON.parse(localStorage.getItem("updateFlag"));
            try {
                if (this.isPlatform("android")) {
                    if (parseFloat(updatePoupObj['application']['android']['version']) > resApp) {
                        if (flag == 0 || flag == undefined) {
                            localStorage.setItem("updateFlag", "1");

                            this.dialogs.alert(updatePoupObj['message'],updatePoupObj['title'],updatePoupObj['buttonName'])
                            .then(res =>  {
                                localStorage.setItem("updateFlag", "0");
                                resAppPackageName = updatePoupObj['application']['android']['id'];
                                url = "market://details?id="+resAppPackageName;
                                window.open(url,'_system','location=yes');
                            })
                            .catch(e => console.log('Error displaying dialog', e));   
                        }
                    }
                }
                else {
                    if (parseFloat(updatePoupObj['application']['ios']['version']) > resApp) {
                        if (flag == undefined || flag == 0) {
                            localStorage.setItem("updateFlag", "1");

                            this.dialogs.alert(updatePoupObj['message'],updatePoupObj['title'],updatePoupObj['buttonName'])
                            .then(res => {
                                localStorage.setItem("updateFlag", "0");
                                resAppPackageName = updatePoupObj['application']['ios']['id'];
                                url = "itms-apps://itunes.apple.com/us/app/apple-store/id"+resAppPackageName;                                
                                window.open(url,'_system','location=yes');
                            })
                            .catch(e => console.log('Error displaying dialog', e));
                        }
                    }
                }
            } catch (e) {
                console.log('Error happend', e);
            }
            
        });
    }

    requestPost(url, data, showProgress)
    {
         
        return new Promise(resolve => {
            console.log("### requestPost " + url)
            if (showProgress == true) {
                this.loadingShow();
            }
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });

            let options = new RequestOptions({
                headers: headers
            });

            var body = "";
            for (var key in data) {
                body += key+"="+data[key]+"&";
            }
            this.http.post(url, body, options).subscribe(data => { 
                if (showProgress == true) {
                    this.loadingHide();
                }
                resolve(JSON.parse(data['_body']));               
            },
            error => {
                if (showProgress == true) {
                    this.loadingHide();
                }
                resolve({"error":"404"});
            });
        });
    }

    downloadJson()
    {
         
        let masterCoords = [];
        localStorage.setItem("masterCoords",JSON.stringify(masterCoords));
        return new Promise(resolve => {
            console.log("#### downloadJson : " +this.jsonUrl);

            this.loadingShow();
            
            // this.requestGet("http://192.168.100.125:8000/projects/test119/assets/setting.json")
            // this.requestGet("./assets/setting.json")
            this.requestGet(this.jsonUrl)
            .then(data => {
                this.url = data['url'];
                
                var langUrl = environment.production ? "./assets/language.json" : this.projectRoot+""+data['frameworkConfig']['language-json-name'];
                // langUrl = "./assets/language.json";
                // console.log("#### downloadJson requestGet [" + langUrl + "]");
                //this.requestGet("http://192.168.100.112/joes_italian_ice1/language.json")
                // this.requestGet("./assets/language.json").then(langData=> {
                this.requestGet(langUrl).then(langData=> {
                    console.log("#### downloadJson requestGet langData ");
                    
                    var language = langData;
                    var default_lang = "";
                    if (localStorage.getItem("lang")==undefined) {
                        default_lang = language["defaultLanguage"];
                        localStorage.setItem("lang",default_lang);
                    }
                    else {
                        default_lang = localStorage.getItem("lang");
                    }
                    
                    this.language = language['language'][default_lang];
                    this.menu = data['menu'];
                    this.popups = data['popups'];
                    this.frameworkCss = data['frameworkCss'];
                    this.frameworkConfig = data['frameworkConfig'];
                    this.appSpecific = data['appSpecific'];
                    this.imgUrl = "";
                    this.appInfo = data['appInfo'];
                    this.googleTrackId = data['appInfo']['googleAnalyticId'];
                    //this.googleTrackId = 'UA-110861999-1'
                    resolve(data);
                    console.log("#### downloadJson exit ");
                    this.loadingHide();
                },
                (error) => {
                    this.loading.dismiss();
                    console.error("error loading Language");
                });
            },
            (error) => {
                this.loading.dismiss();
                console.error("error loading Setting.json");
            })
        });
    }

    retrieve(key)
    {
         
        return new Promise(resolve => {
            this.storage.get(key).then((val) => {
                resolve(val);
            });
        });
    }
    
    requestRssFeed(url) 
    {    
        let rss_url = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url);
        return new Promise(resolve => {            
            this.http.get(rss_url).subscribe(data => { 
                // xml2js.parseString(data['_body'], function (err, result) 
                // {
                //    resolve(result);
                // });
                resolve(JSON.parse(data['_body']));
            }, 
            error => {
                console.log(JSON.stringify(error.json()));                                  
            });    
        });
    }
    

    
    requestAlbum(userId) 
    {   
         
        return new Promise(resolve => 
        {
            this.http.get("http://photos.googleapis.com/data/feed/api/user/"+userId+"?alt=json")
            .subscribe(data => 
            { 
                resolve(JSON.parse(data['_body']));
            }, 
            error => 
            {
                console.log(JSON.stringify(error.json()));                                  
            });

        });        
    }

    requestPhoto_url(url) 
    {   
         
        return new Promise(resolve => 
        {            
            this.http.get(url)
            .subscribe(data => 
            {
               resolve(JSON.parse(data['_body']));
            }, error => 
            {
                console.log(JSON.stringify(error.json()));                                  
            });

        });        
    }

    requestPhoto(albumId,album_url) 
    {   
        return new Promise(resolve => 
        {            
            this.http.get(album_url.substr(0,album_url.indexOf("/albumid/"))+"/albumid/"+albumId+"?alt=json")
            .subscribe(data => 
            {
            resolve(JSON.parse(data['_body']));
            }, error => 
            {
                console.log(JSON.stringify(error.json()));                                  
            });

        });        
    }

    isPlatform(type)
    {
         
        let current = this.platform.is("core");
        console.log("core device " + current);
        if (type == "android" && current) {
            console.log("change device");
            return true;
        }

        return this.platform.is(type);
    }

    isBrowser() {
         
        if (this.platform.is("core") || this.platform.is("mobileweb")) {
            return true;
        }
        return false;
    }

    isPlatformIos() {
         
        if (this.isBrowser()) {
            return false;
        }
        
        return this.isPlatform("ios");
    }

    isPlatformAndroid() {
         
        if (this.isBrowser()) {
            return false;
        }
        
        return this.isPlatform("android");
    }

    isPlatformCore()
    {
         
        if (this.platform.is("core")) {
            return true;
        } else {
            return false;
        }
    }

    rateAppDialog()
    {
         
        let rateAppObj = this.popups['rateApp'];
        let data = JSON.parse(localStorage.getItem("rateAppDialogShownAlready"));
        let resAppPackageName = '';
        let url = '';
        
        if (data != true)
        {
            if (JSON.parse(localStorage.getItem("counter")) >= parseInt(rateAppObj['uses_until_prompt']))
            {
                this.dialogs.confirm(rateAppObj['message'],rateAppObj['title'],[rateAppObj['rateThisButton'],rateAppObj['cancelButton'],rateAppObj['remindLaterButton']])
                .then(res => 
                {
                    if (res == 1)
                    {
                        localStorage.setItem("rateAppDialogShownAlready","true");
                        if (this.isPlatform("android"))
                        {
                            resAppPackageName = rateAppObj['application']['android']['id'];
                            url = "market://details?id="+resAppPackageName;
                            window.open(url,'_system','location=yes');
                        }
                        else
                        {
                            resAppPackageName = rateAppObj['application']['ios']['id'];
                            url = "itms-apps://itunes.apple.com/us/app/apple-store/id"+resAppPackageName;                                
                            window.open(url,'_system','location=yes');
                        }    
                    }
                    else if (res == 2)
                    {
                        localStorage.setItem("rateAppDialogShownAlready","true");
                    }
                    
                })
                .catch(e => console.log('Error displaying dialog', e));
            }  
        } 
    }
    
    addMathRandomString(fileName: string){
        let perfectName = fileName + '?' + (Math.random()).toString();
        return perfectName;
    }
}