import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardRedeemPage } from '../reward-redeem/reward-redeem';
import { RewardHistoryPage } from '../reward-history/reward-history';

@Component({
    selector: 'page-reward-lists',
    templateUrl: 'reward-lists.html'
})
export class RewardListsPage {

	totalPoints = 0;
	rewardLists = [];
	css = {};
	

	constructor(private readonly navCtrl: NavController,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssRewardsList = AuthProvider.SettingData["Rewards_List"];
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
		if (cssRewardsList != undefined) {
			this.css["Reward_Title"] = cssRewardsList["Reward_Title"];
			this.css["Reward_Description"] = cssRewardsList["Reward_Description"];
			this.css["Reward_Cost"] = cssRewardsList["Reward_Cost"];
			if (this.css["IsPunchSystem"] == true) {
				if (this.totalPoints > 1)
					this.css["UnusedUnit"] = cssRewardsList["Total_Points"]["Punch_Message_Plural"];
				else
					this.css["UnusedUnit"] = cssRewardsList["Total_Points"]["Punch_Message_Singular"];
			}
			else {
				if (this.totalPoints > 1)
					this.css["UnusedUnit"] = cssRewardsList["Total_Points"]["Point_Message_Plural"];
				else
					this.css["UnusedUnit"] = cssRewardsList["Total_Points"]["Point_Message_Singular"];
			}
			this.css["Arrow"] = cssRewardsList["Arrow"];
			this.css["BackColor"] = cssRewardsList["Background_Color"];
			if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
				this.css["BackColor"] = "#ffffff";
		}
		
		if (cssButtons != undefined) {
			this.css["Back_Button"] = cssButtons["BACK"];
		}
		
		this.getRewardList();
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

	onSelect(index) 
	{
		if (this.rewardLists[index].cost <= this.totalPoints) {
			var temp = {
				'redeem_count': this.rewardLists[index].cost,
				'bonus_id': this.rewardLists[index].id
			};
			this.navCtrl.setRoot(RewardRedeemPage, temp);
		}
	}

	getRewardList() 
	{
		this.commonProvider.loadingShow();
		
		this.authProvider.getBonuses()
			.then (data=> {
				this.commonProvider.loadingHide();
				if (data['status'] != undefined && data['status'] == 1) {
					this.rewardLists = data['data'];
				}
			}, error => {
				this.commonProvider.loadingHide();
			});		
	}
}
