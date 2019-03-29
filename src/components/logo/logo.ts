import { Component } from '@angular/core';
import * as Constant from '../../app/constant';
import {CommonProvider} from "../../providers/common/common";

@Component({
	selector: 'logo',
	templateUrl: 'logo.html'
})
export class LogoComponent 
{
	url = Constant.default.logo;
	logoSize;
	constructor(public common: CommonProvider)
	{
		this.logoSize = this.common.appSpecific['headerCss']['height'].toString();
		this.logoSize = parseInt(this.logoSize.substring(0, this.logoSize.length - 2)) - 10;
	}
}