import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardHistoryPage } from '../reward-history/reward-history';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardMessagesPage } from '../reward-messages/reward-messages';

@Component({
    selector: 'page-reward-redeem',
    templateUrl: 'reward-redeem.html'
})
export class RewardRedeemPage {

	totalPoints = 0;
	redeemCount = 0;
	bonusId = 0;
	data = [];
	css = {};
	
	constructor(private readonly navCtrl: NavController,
				private readonly navParams: NavParams,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssMessages = AuthProvider.SettingData["Messages"];
		let cssButtons = AuthProvider.SettingData["Buttons"];
		let cssRewardsList = AuthProvider.SettingData["Rewards_List"];

		this.css["Total_Remaining_Balance"] = cssRewardsList["Total_Remaining_Balance"];

		if (cssMessages != undefined)
		{
			this.css["CashierLabel"] = cssMessages["CASHIER"];
		}
		if (cssButtons != undefined)
		{
			this.css["RedeemButton"] = cssButtons["REDEEM"];
			this.css["BackButton"] = cssButtons["BACK"];
		}
		this.totalPoints = RewardHomePage.totalPoints;
		this.redeemCount = navParams.data['redeem_count'];
		this.bonusId = navParams.data['bonus_id'];
  	}

	onLogout() 
	{
		this.navCtrl.setRoot(RewardLoginPage);
	}

	onHistory() 
	{
		this.navCtrl.setRoot(RewardHistoryPage);
	}
	  
	onBack() 
	{
		this.navCtrl.setRoot(RewardHomePage);
	}

	onRedeem()
	{
		if (this.data['passcode'] == undefined || this.data['passcode'] == "") {
			this.commonProvider.toastMessage("Please input passcode");
			return;
		}

		this.redeem(this.data['passcode']);
	}

	redeem(passcode: string) 
	{
		this.commonProvider.loadingShow();
		
		this.authProvider.postRedeem(passcode, this.bonusId)
			.then (data=> {
				this.commonProvider.loadingHide();
				this.showMessage();
			}, error => {
				this.commonProvider.loadingHide();
				this.showMessage(false);
			});		
	}

	showMessage(isSuccess = true) 
	{
		var param = [];
		if (isSuccess) {
			param['type'] = "RS";
		}
		else {
			param['type'] = "RF";
		}
		this.navCtrl.setRoot(RewardMessagesPage, param);
	}
}
