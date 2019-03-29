import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { CommonProvider } from '../../providers/common/common';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage 
{
    contact_json = [];
    recipients = [];
    parts = [];
    background = 'white';

    constructor(private readonly navCtrl: NavController,
                private readonly alertCtrl: AlertController,
                private readonly authProvider: AuthProvider,
                public commonProvider: CommonProvider,
                private readonly navParams: NavParams) 
    {     
        
        // this.css = this.navParams.data.css;
        this.getContactByMenuId(this.navParams.data.id);
    }
    
    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }

    submit() {
        let alert = this.alertCtrl.create({
            title: 'Warning!',
            subTitle: `
                You can't test email sending on emulator.\n
                Please test on real device.
            `,
            buttons: [{
                text: 'Got it',
                handler: () => {
                  // user has clicked the alert button
                  // begin the alert's dismiss transition
                  alert.dismiss();
                  return false;
                }
            }]
        });
        alert.present();
    }

    getContactByMenuId(menu_id) {
        this.commonProvider.loadingShow();

        this.authProvider.getMenuDataById(menu_id)
            .then(data => {
                var items;
                try {
                    items = JSON.parse(JSON.parse(data['menu_type_json_data'])["css_string_json"]);

                    this.recipients = [];
                    let recipients_array = JSON.parse(JSON.parse(data['menu_type_json_data'])['recipients_string_json']);
                    recipients_array.forEach(recipient => {
                        this.recipients.push(recipient.email);
                    });

                } catch(e) {
                    items = [];
                }
                items.forEach( t => {
                    if (t.className == undefined)
                        t.className = "";
                    let innerCls = t.className.split(' ');
                    t.color = "black";
                    t.background = 'initial';
                    innerCls.forEach(cls => {
                        if (cls.startsWith("color-"))
                            t.color = cls.substring(6);
                        if (cls.startsWith("background-"))
                            t.background = cls.substring(11);
                    });
                    

                });

                for (let i = 0; i < items.length; i ++)
                {
                    let tempItem;
                    if (items[i].type == "hidden" && items[i].name == "page-background" ) {
                        this.background = items[i].value;
                    } else {
                    if (items[i].className == undefined)
                        items[i].className = "";
                    let clsViw = items[i].className.split(' ');
                    tempItem = items[i];
                    tempItem.innerVal = [];
                    clsViw.forEach(clv => {
                        items[i].fixed = false;
                        if (clv == "backpanel") {
                            for (i ++; i < items.length; i ++) {
                                let innerCls = items[i].className.split(' ');
                                let usedFlag = false;
                                innerCls.forEach(cls => {
                                    if (cls == "backpanel-inner") {
                                        usedFlag = true;
                                        tempItem.innerVal[tempItem.innerVal.length] = items[i];
                                    }
                                });
                                if (usedFlag == false)
                                {
                                    i --;
                                    break;
                                }
                            }
                        }
                        else if (clv == "fixed")
                        {
                            items[i].fixed = true;
                            // for (i ++; i < items.length; i ++)
                            //     tempItem.innerVal[tempItem.innerVal.length] = items[i];
                        }
                    });
                    
                        this.contact_json.push(tempItem);
                    }
                }
                //this.content_json = items;
                this.commonProvider.loadingHide();
            }, error => {
                this.commonProvider.loadingHide();
            });
    } 
}