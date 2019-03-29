import { Component, ViewChildren, ViewChild, QueryList, OnDestroy, AfterViewChecked } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { AuthProvider } from "../../providers/auth/auth";
import { CommonProvider } from '../../providers/common/common';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html';
import * as $ from 'jquery';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from '../../components/gallery-modal/gallery-modal';

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})
export class ContentPage implements AfterViewChecked, OnDestroy
{
    content_json = [];
    parts = [];
    background = 'white';
    fullSlideShow=-1;
    slideSubscription: Subscription;
    // @ViewChildren('nSlider') nSliders:QueryList<Slides>;
    // @ViewChildren('fSlider') fSliders:QueryList<Slides>;

    @ViewChild('nSlider') slides: Slides;

    constructor(private readonly navCtrl: NavController,
                private readonly authProvider: AuthProvider,
                private readonly commonProvider: CommonProvider,
                private readonly modalCtrl: ModalController,
                private readonly navParams: NavParams) 
    { 	
        // this.css = this.navParams.data.css;
        this.getContentByMenuId(this.navParams.data.id);
        this.slideSubscription = this.commonProvider.getCurrentSlideInfo().subscribe(slideInfo => {
            if (this.slides) {
                this.slides.slideTo((slideInfo.index + 2) % this.slides.length(), 10);
                this.slides.startAutoplay();
            }
        });
    }

    ngOnDestroy() {
        this.slideSubscription.unsubscribe();
    }
    
    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }

    ngAfterViewChecked() {
        setTimeout(() => {
            if ($('div.backpanel-inner')[0]) {
                for (let backpanel_inner of $('div.backpanel-inner')) {
                    $(backpanel_inner).parent().height(Math.max($(backpanel_inner).height(), $(backpanel_inner).siblings('img.backpanel').height()));
                }
                
            }
            if ($('div.fixed')[0]) {
                for (let fixed_div of $('div.fixed')) {
                    $(fixed_div).width($(fixed_div).siblings('img.fixed').width());
                    $(fixed_div).height($(fixed_div).siblings('img.fixed').height());
                }
            }
        }, 500);
        
    }

    backClick()
    {
        this.navCtrl.pop();
    }

    picselect(images, index)
    {
        
        let photos = images.map(image => {
            return image.source
        });
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: images.map(image => {
                return {url: image.source};
            }),
            initialSlide: index,
            displayIndex: true
        });
        modal.present();
        if (this.slides) {
            this.slides.stopAutoplay();
        }
    }

    getContentByMenuId(menu_id) {
        
        this.commonProvider.loadingShow();

        this.authProvider.getMenuDataById(menu_id)
            .then(data => {
                var items;
                try {
                    items = JSON.parse(JSON.parse(data['menu_type_json_data'])["css_string_json"]);
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

                this.background = JSON.parse(data['menu_type_json_data']).background || '#ffffff';

                for (let i = 0; i < items.length; i ++)
                {
                    let tempItem = items[i];
                    tempItem.innerVal = [];

                    items[i].fixed = false;
                    if (items[i].kind == "backpanel") {
                        for (i ++; i < items.length; i ++) {
                            let usedFlag = false;

                            if (items[i].kind == "backpanel-inner") {
                                usedFlag = true;
                                tempItem.innerVal[tempItem.innerVal.length] = items[i];
                            }
                            
                            if (usedFlag == false)
                            {
                                i --;
                                break;
                            }
                        }
                    }
                    else if (items[i].kind == "fixed")
                    {
                        items[i].fixed = true;
                        // for (i ++; i < items.length; i ++)
                        //     tempItem.innerVal[tempItem.innerVal.length] = items[i];
                    }
                    
                    this.content_json.push(tempItem);
                }
                //this.content_json = items;
                this.commonProvider.loadingHide();
                setTimeout(() => {
                    if (this.slides) {
                        this.slides.autoplayDisableOnInteraction = false;    
                    }
                });
            }, error => {
                this.commonProvider.loadingHide();
            });
    } 
}