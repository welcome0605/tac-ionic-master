import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardRedeemPage } from '../reward-redeem/reward-redeem';

@Component({
    selector: 'page-reward-history',
    templateUrl: 'reward-history.html'
})
export class RewardHistoryPage {

	totalPoints = 0;
	rewardHistory = [];
	css = {};
	

	constructor(private readonly navCtrl: NavController,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssRewardsHistory = AuthProvider.SettingData["Redemption_History"];
		let cssButtons = AuthProvider.SettingData["Buttons"];
		this.totalPoints = RewardHomePage.totalPoints;
		let cssRewardsCard = AuthProvider.SettingData["Rewards_Card"];	
		let cssPunchSystem = AuthProvider.SettingData["Punch_Card_System"];		
		if (cssPunchSystem != undefined) 
			this.css["IsPunchSystem"] = (cssPunchSystem["User_Punch_Card_System"]["Type"] == "1");
		else
			this.css["IsPunchSystem"] = false;
		if (this.css["IsPunchSystem"] == true) {
			this.css["UnitPL"] = cssRewardsCard["Punch_Card_Check_In_Name"]["Plural"];
			this.css["UnitSN"] = cssRewardsCard["Punch_Card_Check_In_Name"]["Singular"];
		}
		else {
			this.css["UnitPL"] = cssRewardsCard["Points_Card_Check_In_Name"]["Plural"];
			this.css["UnitSN"] = cssRewardsCard["Points_Card_Check_In_Name"]["Singular"];
		}
		if (cssRewardsHistory != undefined) {
			this.css["Reward_Title"] = cssRewardsHistory["Reward_Title"];
			this.css["Reward_Description"] = cssRewardsHistory["Reward_Description"];
			this.css["Reward_Cost"] = cssRewardsHistory["Reward_Cost"];
			this.css["Reward_Date"] = cssRewardsHistory["Redeem_Date"];
			this.css["BackColor"] = cssRewardsHistory["Background_Color"];
			if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
				this.css["BackColor"] = "#ffffff";
		}
		
		if (cssButtons != undefined) {
			this.css["Back_Button"] = cssButtons["BACK"];
		}
		
		this.getRewardHistory();
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

	getRewardHistory() 
	{
		this.commonProvider.loadingShow();
		
		this.authProvider.getRedeems()
			.then (data=> {
				this.commonProvider.loadingHide();
				if (data['status'] != undefined && data['status'] == 1) {
					this.rewardHistory = data['redeems'];
				}
			}, error => {
				this.commonProvider.loadingHide();
			});	
	}
}
