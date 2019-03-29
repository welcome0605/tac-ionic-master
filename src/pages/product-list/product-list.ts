import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@Component({
    selector: 'page-product-list',
    templateUrl: 'product-list.html',
})
export class ProductListPage 
{
    productListData = {};
    menuIcon:string;
    imageUrl = "";
    constructor(public commonProvider:CommonProvider,public navCtrl: NavController, public navParams: NavParams) 
    {
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        this.productListData = this.navParams.data.value;
        this.imageUrl = this.commonProvider.imgUrl;
    }

    ionViewDidLoad() 
    {
        console.log('ionViewDidLoad ProductListPage');
    }
}
