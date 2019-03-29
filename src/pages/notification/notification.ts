import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { FCM } from '@ionic-native/fcm';
import { Vibration } from '@ionic-native/vibration';

@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage 
{
    notification_array:any;
    menuIcon:string;
    css:any;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        private fcm: FCM,
        private vibration: Vibration) 
    {
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];

        this.notification_array = this.navParams.data.value;
        this.css = this.navParams.data.css;

        // if(localStorage.getItem("notification_array")==undefined)
        // {            
        //     localStorage.setItem("notification_array",JSON.stringify(this.notification_array));
        // }
        // else
        // {
        //     var exist_notification_array = JSON.parse(localStorage.getItem("notification_array"));	

        //     if(this.notification_array.length==exist_notification_array.length)
        //     {
        //         this.notification_array = exist_notification_array;
        //     }
        //     else
        //     {
        //         console.log(this.notification_array);
        //     }
        // }
    }

    settingChange(topic,index)
    {
        // console.log();
        // this.vibration.vibrate(100);
        // if(this.notification_array[index]['is_allow'])
        // {
        //     //this.commonProvider.toastMessage("Subscribed to "+this.notification_array[index]['title']);
        //     this.fcm.subscribeToTopic(topic)
        //     .then(res=>
        //     {
        //         console.log(res);
        //         this.commonProvider.toastMessage("Subscribed to "+this.notification_array[index]['title'])
        //     });
        // }
        // else
        // {
        //     this.fcm.unsubscribeFromTopic(topic)
        //     .then(res=>
        //     {
        //         console.log(res);
        //         this.commonProvider.toastMessage("Unsubscribed from "+this.notification_array[index]['title'])
        //     });
        //     //this.commonProvider.toastMessage("Unsubscribed from "+this.notification_array[index]['title']);
        // }

        // localStorage.setItem("notification_array",JSON.stringify(this.notification_array));
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }
}