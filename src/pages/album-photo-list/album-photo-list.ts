import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { PhotoDetailsPage } from '../../pages/photo-details/photo-details';
import $ from 'jquery'
//import { MasonryLayoutDirective } from 'ngx-masonry-layout/components';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from '../../components/gallery-modal/gallery-modal';
@Component({
    selector: 'page-album-photo-list',
    templateUrl: 'album-photo-list.html',
})

export class AlbumPhotoListPage {
    css:any;
    showIcon:any;
    picData:any;
    url:string;
    data = [];
    menuIcon:string;
    desc_status:any;
    loadingbar:any
    items = [];
    photos=[];
    
    constructor(
        public navCtrl: NavController,
        public loadingCtrl:LoadingController,
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        public modalCtrl: ModalController)
    {
        //this.picData =  navParams.data;
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        this.url = navParams.data.value['selected_complete_album_url'];
        this.css = navParams.data.css;
        this.desc_status = navParams.data.value['caption_check'];

        this.commonProvider.loadingHide();

        this.commonProvider.loadingShow();
        this.commonProvider.requestPhoto_url(this.url).then(res => {
            var i = 0;

            this.picData = res['feed']['entry'];
            for (var x of this.picData) {
                var temp = [];
                temp['image'] = x['media$group']['media$content'][0]['url'];
                if (this.desc_status == "true") {
                    temp['description'] = x['summary']['$t'];
                }
                if (i < 30) {
                    this.items[i] = temp;
                    this.photos.push({'url':temp['image']});
                }
                this.data[i++] = temp;
            
            }
            
            setTimeout(() => {
                this.commonProvider.loadingHide();
                $('#first-photo-col').css('visibility','visible');
            }, 3000);
        },
        (error) => {
            this.commonProvider.loadingHide();
            console.error("error loading albumn");
        });
    }

    backClick()
    {
        this.navCtrl.pop();
    }

    picselect(index)
    {
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: this.photos,
            initialSlide: index,
            displayIndex: true,
        });
        modal.present();
    }

    ionViewDidLoad() 
    {                                                                                 
    }

    doInfinite(infiniteScroll)
    {
        console.log('begin async operation');
        setTimeout(() => {
            var lastIndex = this.items.length;
            for (var i = 0; i < 12; i ++, lastIndex++) {
                if (lastIndex >= this.data.length) {
                    break;
                }
                this.items.push(this.data[lastIndex])
                this.photos.push({'url': this.data[lastIndex]['image']});
            }
            
            console.log('ended async operation');
            infiniteScroll.complete();
        }, 1000);
    }

}
