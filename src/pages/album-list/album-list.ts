import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { AlbumPhotoListPage } from '../../pages/album-photo-list/album-photo-list';


@Component({
    selector: 'page-album-list',
    templateUrl: 'album-list.html',
})
export class AlbumListPage 
{
    css:any;
    data : any;
    picData : any;
    menuIcon:string;
    userId:string;
    album_url:string;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider:CommonProvider) 
    {
        //this.userId = this.navParams.data.value['userId'];
        this.album_url = this.navParams.data.value['album_url'];
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        this.commonProvider.loadingShow();
        this.css = this.navParams.data.css;
        this.commonProvider.requestAlbum(this.userId)
        .then(res=>
        {	
            this.data=res['feed']['entry'];
            this.commonProvider.loadingHide();
        }); 
    }

    backClick()
    {
        this.navCtrl.pop();
    }

    itemSelected(item)
    {
        this.commonProvider.loadingShow();
        //this.commonProvider.requestPhoto(item['gphoto$id']['$t'],this.userId).then(res=>
        this.commonProvider.requestPhoto(item['gphoto$id']['$t'],this.album_url).then(res=>
        {
            this.picData=res['feed']['entry'];
            this.navCtrl.push(AlbumPhotoListPage,this.picData);
            this.commonProvider.loadingHide();
        });
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }
}
