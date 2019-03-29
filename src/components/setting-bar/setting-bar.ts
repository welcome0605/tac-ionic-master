import { Component, Output, EventEmitter } from '@angular/core';
import { CommonProvider } from '../../providers/common/common';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'setting-bar',
  templateUrl: 'setting-bar.html'
})
export class SettingBarComponent {

    @Output() logoutClicked = new EventEmitter();
    @Output() historyClicked = new EventEmitter();

    css = {};
    settingAnim = "";

    constructor(
        public navCtrl : NavController,
        private readonly authProvider: AuthProvider,
        private readonly commonProvider: CommonProvider) 
    {
        let cssSettings = AuthProvider.SettingData["Settings"];
		if (cssSettings != undefined) {
			this.css["HistoryButton"] = cssSettings["Redemption_History_Button"];
			this.css["LogoutButton"] = cssSettings["Logout_Button"];
			if (cssSettings["Gear_Icon"] != undefined)
				this.css["GearIconColor"] = cssSettings["Gear_Icon"]["Color"];
			else
				this.css["GearIconColor"] = "'#000000'";
			if (cssSettings["Background_Color"] != undefined)
				this.css["SettingBackColor"] = cssSettings["Background_Color"];
			else
				this.css["SettingBackColor"] = "'#FFFFFF'";
		}
    }

	onLogout() 
	{
    	this.logoutClicked.emit();
  	}
	
	onHistory() 
	{
        this.historyClicked.emit();
    }
    
	toggleSetting(flag = true)
	{
		if (this.settingAnim == "") {
			if (flag == true)
				this.settingAnim = "Fadein";
			return;
		}
		if (flag == true) {
			if (this.settingAnim == "Fadein")
				return;
			this.settingAnim = "Fadein";
		}
		else {
			if (this.settingAnim == "Fadeout")
				return;
			this.settingAnim = "Fadeout";
		}
	}
}
