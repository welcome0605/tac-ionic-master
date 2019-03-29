import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { CommonProvider } from '../../providers/common/common';
import * as Constant from '../../app/constant';

/**
 * Generated class for the CustomWebViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 declare var cordova: any;

@Component({
  selector: 'page-custom-web-view',
  templateUrl: 'custom-web-view.html',
})
export class CustomWebViewPage {

 	constructor(
 		public navCtrl: NavController, 
 		public navParams: NavParams,
 		public commonProvider:CommonProvider,
 		public menuCtrl: MenuController) 
 	{
        console.log("### CustomWebViewPage ======== start ");

        let logo_path = navParams.data['logo_path'];
        let menu_button_type = navParams.data['menu_button_type'];
        let data = navParams.data['object'];
        let themeBrowser = navParams.data['themeableBrowser'];

        let borderHeight = navParams.data['headerBorderHeight'];
        let borderColor = navParams.data['headerBorderColor'];

        // console.log("### CustomWebViewPage ======== " + menu_button_type + "  | " + data);
        // console.log("OKOKOKOKOKOK",data);

        let headerHeight = this.commonProvider.appSpecific['headerCss']['height'];
        let headerColor = this.commonProvider.appSpecific['headerCss']['color'];
        
        var logoHeightClient = Constant.default.logo_height;
        var logoWidthClient = Constant.default.logo_width;
        
        var densityValue = 1;
        var toolbarHeight = parseInt(headerHeight);
        
        if (this.commonProvider.isPlatform("android")) {
            densityValue = window.devicePixelRatio;
            
            borderHeight = +borderHeight * densityValue;
            toolbarHeight = +parseInt(headerHeight) + +borderHeight;
            toolbarHeight = +toolbarHeight - 4;
            if (densityValue == 0) {
                densityValue = 1;
            }
            
            if(parseInt(headerHeight) < 70) {
                headerHeight = 70;
            }
        }
        else {
            if (parseInt(headerHeight) < 64) {
                headerHeight = 64 + +borderHeight;
            }   
        }

        var backButtonObj = {};
        var closeButtonObj = {};
        var forwardButtonObj = {};
        var customButtonObj = {};

        if (menu_button_type=="back") {
            backButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.back,
                            wwwImageDensity: 4,
                            color: this.commonProvider.appSpecific['menuIconCss']['color'],
                            headerBottomHeight: borderHeight
                        };
            closeButtonObj = {
                            align: 'left',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.menu,
                            wwwImageDensity: 4,
                            color: this.commonProvider.appSpecific['menuIconCss']['color'],
                            headerBottomHeight: borderHeight
                        };
            forwardButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.forward,
                            wwwImageDensity: 4,
                            color: this.commonProvider.appSpecific['menuIconCss']['color'],
                            headerBottomHeight: borderHeight
            };
        }
        else {
            closeButtonObj = {
                            align: 'left',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.menu,
                            wwwImageDensity: 4,
                            color: this.commonProvider.appSpecific['menuIconCss']['color'],
                            headerBottomHeight: borderHeight
                        };
            backButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            image: 'back',
                            imagePressed: 'back_pressed',
                            color: this.commonProvider.appSpecific['menuIconCss']['color'],
                            headerBottomHeight: borderHeight
                        };
            forwardButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            image: 'forward',
                            imagePressed: 'forward_pressed',
                            color: this.commonProvider.appSpecific['menuIconCss']['color'],
                            headerBottomHeight: borderHeight
            };

        }

        customButtonObj = {
            align: 'center',
            event: 'closePressed',
            iconPadding: 30,
            wwwImage: logo_path,
            wwwImageDensity: 4,
            color: this.commonProvider.appSpecific['menuIconCss']['color'],
            headerBottomHeight: borderHeight
        };
        // debugger
        console.log("### CustomWebViewPage ",data);
        // debugger
        const ref: ThemeableBrowserObject = themeBrowser.create(data.value, '_blank', {
            // debugger
            statusbar: {
                 color: this.commonProvider.appSpecific['statusBarCss']['color']
            },
            toolbar:  {
                color: headerColor,
                height: parseInt(headerHeight),
                borderColor: borderColor,
                borderHeight: parseInt(borderHeight),
            },
            backButton: backButtonObj,
            closeButton: closeButtonObj,
            forwardButton: forwardButtonObj,
            customButtons: [customButtonObj],
            backButtonCanClose: true,
            disableAnimation: true
        });
        
        let self = this;
        ref.on('closePressed').subscribe(data => {
            if (menu_button_type=="back") {
            	self.navCtrl.pop();
            }

            if (menu_button_type=="menu") {
            	self.navCtrl.pop();
                self.menuCtrl.open();
            }


        });
        /*
        let themeableBrowser = cordova.ThemeableBrowser
        var ref = cordova.ThemeableBrowser.open(data.value, '_blank', {
            statusbar: {
                 color: this.commonProvider.appSpecific['statusBarCss']['color']
            },
            toolbar:  {
                color: headerColor,
                height: parseInt(headerHeight),
                alignment:"center",
                logoWidth:parseInt(logoWidthClient) * densityValue,
                logoHeight:parseInt(logoHeightClient) * densityValue,
                logoPadding:densityValue,
                wwwImage:Constant.default.logo
            },
            backButton: backButtonObj,
            closeButton: closeButtonObj,
            forwardButton: forwardButtonObj,
            customButtons: [customButtonObj],
            backButtonCanClose: true,
            disableAnimation: true
        });

        var self = this;

        ref.addEventListener('closePressed', function(e) {
            if (menu_button_type=="back") {
            	self.navCtrl.pop();
            }

            if (menu_button_type=="menu") {
            	self.navCtrl.pop();
                self.menuCtrl.open();
                // self.selectedmenu = self.previousMenu;
                // self.selectedsubmenu = null;
                // self.cdr.detectChanges();
                // self.commonProvider.loadingHide();
            }
            if (menu_button_type=="close")
            {
                self.menuCtrl.open();
                self.selectedmenu = self.previousMenu;
                self.selectedsubmenu = null;
                self.cdr.detectChanges();
                self.commonProvider.loadingHide();
            }
        });
        */
  	}

    static loadWeb(params,
                    nav : NavController,
 		           provider:CommonProvider,
 		           menuCtrl: MenuController) 
    {
        let logo_path = params['logo_path'];
        let menu_button_type = params['menu_button_type'];
        let data = params['object'];
        let themeBrowser = params['themeableBrowser'];

        let borderHeight = params['headerBorderHeight'];
        let borderColor = params['headerBorderColor'];

        console.log("### loadWeb ======== " + menu_button_type + "  | " + data);

        let headerHeight = provider.appSpecific['headerCss']['height'];
        let headerColor = provider.appSpecific['headerCss']['color'];
        
        var logoHeightClient = Constant.default.logo_height;
        var logoWidthClient = Constant.default.logo_width;
        
        var densityValue = 1;
        var toolbarHeight = parseInt(headerHeight);
        
        if (provider.isPlatform("android")) {
            densityValue = window.devicePixelRatio;
            
            borderHeight = +borderHeight * densityValue;
            toolbarHeight = +parseInt(headerHeight) + +borderHeight;
            toolbarHeight = +toolbarHeight - 4;
            if (densityValue == 0) {
                densityValue = 1;
            }
            
            if (parseInt(headerHeight) < 70) {
                headerHeight = 70;
            }
        }
        else {
            if (parseInt(headerHeight) < 64) {
                headerHeight = 64 + +borderHeight;
            }   
        }

        let btn_color = provider.appSpecific['menuIconCss']['color'];

        var backButtonObj = {};
        var closeButtonObj = {};
        var forwardButtonObj = {};
        var customButtonObj = {};

        if (menu_button_type=="back") {
            backButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.back,
                            wwwImageDensity: 4,
                            color: btn_color,
                            headerBottomHeight: borderHeight
                        };
            closeButtonObj = {
                            align: 'left',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.menu,
                            wwwImageDensity: 4,
                            color: btn_color,
                            headerBottomHeight: borderHeight
                        };
            forwardButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.forward,
                            wwwImageDensity: 4,
                            color: btn_color,
                            headerBottomHeight: borderHeight
            };
        }
        else {
            closeButtonObj = {
                            align: 'left',
                            event: 'closePressed',
                            iconPadding: 30,
                            wwwImage: Constant.default.menu,
                            wwwImageDensity: 4,
                            color: btn_color,
                            headerBottomHeight: borderHeight
                        };
            backButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            image: 'back',
                            imagePressed: 'back_pressed',
                            color: btn_color,
                            headerBottomHeight: borderHeight
                        };
            forwardButtonObj = {
                            align: 'right',
                            event: 'closePressed',
                            iconPadding: 30,
                            image: 'forward',
                            imagePressed: 'forward_pressed',
                            color: btn_color,
                            headerBottomHeight: borderHeight
            };

        }

        customButtonObj = {
            align: 'center',
            event: 'closePressed',
            iconPadding: 30,
            wwwImage: logo_path,
            wwwImageDensity: 4,
            color: btn_color,
            headerBottomHeight: borderHeight
        };

        const ref: ThemeableBrowserObject = themeBrowser.create(data.value, '_blank', {
            statusbar: {
                 color: provider.appSpecific['statusBarCss']['color']
            },
            toolbar: {
                color: headerColor,
                height: parseInt(headerHeight),
                borderColor: borderColor,
                borderHeight: parseInt(borderHeight),
            },
            backButton: backButtonObj,
            closeButton: closeButtonObj,
            forwardButton: forwardButtonObj,
            customButtons: [customButtonObj],
            backButtonCanClose: true,
            disableAnimation: true
        });

        ref.on('closePressed').subscribe(data => {
            if (menu_button_type=="back") {
            	nav.pop();
            }

            if (menu_button_type=="menu") {
                nav.pop();
                menuCtrl.open();
            }
        });
    }
}
