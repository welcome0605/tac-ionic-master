import { Component } from '@angular/core';
import { CommonProvider } from '../../providers/common/common';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'menu-back',
  templateUrl: 'menu-back.html'
})
export class MenuBackComponent {

    text: string;
    css = {};
    constructor(
        public common : CommonProvider,
        public navCtrl : NavController) 
    {
        this.css = this.common.appSpecific['menuIconCss'];
    }
}
