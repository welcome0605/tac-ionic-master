import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

@Component({
    selector: 'page-empty',
    templateUrl: 'empty-page.html',
})

export class EmptyPage 
{
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider:CommonProvider) 
    {
        this.commonProvider.loadingShow();
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }
}
