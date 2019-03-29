import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardLoginPage } from '../reward-login/reward-login';
import { AuthProvider } from '../../../providers/auth/auth';
import { RewardHistoryPage } from '../reward-history/reward-history';

@Component({
    selector: 'page-reward-messages',
    templateUrl: 'reward-messages.html'
})
export class RewardMessagesPage {

	type = "CF";
	css = {};

	constructor(private readonly navCtrl: NavController,
				private readonly navParams: NavParams) 
  	{
		let cssButtons = AuthProvider.SettingData["Buttons"];
		let cssMessages = AuthProvider.SettingData["Messages"];
		
		this.type = navParams.data['type'];
		if (cssMessages) {
			if (this.type == "CS") {
				this.css["StatusMessage"] = navParams.data['pts'] + " " + ( (navParams.data['pts'] > 1)? cssMessages["CHECKIN_SUCCESSFUL"]["Plural"] : cssMessages["CHECKIN_SUCCESSFUL"]["Singular"]);
				this.css["MessageStyle"] = cssMessages["CHECKIN_SUCCESSFUL"];
			}
			else if (this.type == "CF") {
				this.css["StatusMessage"] = cssMessages["CHECKIN_FAILED"]["Text"];
				this.css["MessageStyle"] = cssMessages["CHECKIN_FAILED"];
			}
			else if (this.type == "RS") {
				this.css["StatusMessage"] = cssMessages["REDEEM_SUCCESSFUL"]["Text"];
				this.css["MessageStyle"] = cssMessages["REDEEM_SUCCESSFUL"];
			}
			else if (this.type == "RF") {
				this.css["StatusMessage"] = cssMessages["REDEEM_FAILED"]["Text"];
				this.css["MessageStyle"] = cssMessages["REDEEM_FAILED"];
			}
		}
		if (cssButtons != undefined) {
			if (this.type == "CS" || this.type == "RS") {
				this.css["ButtonType"] = cssButtons["CONTINUE"];
			}
			else if (this.type == "CF" || this.type == "RF") {
				this.css["ButtonType"] = cssButtons["TRY_AGAIN"];
			}
		}
  	}

	onContinue() 
	{
		let isRefresh = (this.type == "CS" || this.type == "RS") ? true : false;
    	this.navCtrl.setRoot(RewardHomePage, isRefresh);
  	}

	onLogout() 
	{
		this.navCtrl.setRoot(RewardLoginPage);
	}

	onHistory() 
	{
		this.navCtrl.setRoot(RewardHistoryPage);
	}
}
