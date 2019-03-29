import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardCheckinPage } from '../reward-checkin/reward-checkin';
import { RewardListsPage } from '../reward-lists/reward-lists';
import { RewardHistoryPage } from '../reward-history/reward-history';

@Component({
    selector: 'page-reward-home',
    templateUrl: 'reward-home.html'
})
export class RewardHomePage {

	TenArray = [1,2,3,4,5,6,7,8,9,10];

	StampDataArray = ["1 STAMP", "2 STAMPS", "3 STAMPS", "4 STAMPS", "5 STAMPS", 
					"6 STAMPS" , "7 STAMPS", "8 STAMPS", "9 STAMPS", "10 STAMPS"];

	data = {};
	css = {};

	public static totalPoints = 0;
	reward = 0;
	remain = 0;

	cashier_stamp = 1;

	selectedRedeem = 3;

	productMessage = "";

	isRefresh = true;
	
	constructor(private readonly navCtrl: NavController,
				private readonly navParams: NavParams,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssPunchSystem = AuthProvider.SettingData["Punch_Card_System"];
		let cssButtons = AuthProvider.SettingData["Buttons"];

		if (cssPunchSystem != undefined) {
			this.css["PunchStyle"] = cssPunchSystem["Style"];
			if (this.css["PunchStyle"]["Type"] == "1")
				this.css["PunchStyle"]["BorderRadius"] = "0px";
			else if (this.css["PunchStyle"]["Type"] == "2")
				this.css["PunchStyle"]["BorderRadius"] = "50%";
			this.css["IsPunchSystem"] = (cssPunchSystem["User_Punch_Card_System"]["Type"] == "1");
		}

		if (cssButtons != undefined) {
			this.css["CHECK_IN"] = cssButtons["CHECK_IN"];
			this.css["REDEEM"] = cssButtons["REDEEM"];
		}

		if (navParams.data != undefined) {
			this.isRefresh = navParams.data;
		}
		else {
			this.isRefresh = false;
		}
	
		this.getPoints();
  	}

	onLogout() 
	{
    	this.navCtrl.setRoot(RewardLoginPage);
  	}
	
	onHistory() 
	{
		this.navCtrl.setRoot(RewardHistoryPage);
	}
  
	onCheckin() 
	{
		this.navCtrl.setRoot(RewardCheckinPage);
	}

	onRedeem()
	{
		if (this.remain != 0)
		this.navCtrl.setRoot(RewardListsPage);
	}
	
	getPoints() 
	{
		if (this.isRefresh == true) {
			this.commonProvider.loadingShow();
			let tempStore;
			this.authProvider.getPoints()
				.then (data=> {
					this.commonProvider.loadingHide();
					this.setTotalPoint(data['point']);
				}, error => {
					this.commonProvider.loadingHide();
					RewardHomePage.totalPoints = 0;
					this.remain = 0;
					this.reward = 0;
					this.handleError(error);
				});
		}
		else {
			this.setTotalPoint(RewardHomePage.totalPoints);
		}

		let cssRewardsCard = AuthProvider.SettingData["Rewards_Card"];	
		if (cssRewardsCard != undefined) {
			this.css["RewardsUnit"] = cssRewardsCard["Rewards_Earned_Message"];
			if (this.reward <= 1)
				this.css["RewardsUnit"]["Text"] = cssRewardsCard["Rewards_Earned_Message"]["Singular"];
			else
				this.css["RewardsUnit"]["Text"] = cssRewardsCard["Rewards_Earned_Message"]["Plural"];
			if (this.css["IsPunchSystem"])
				this.css["CardMsg"] = cssRewardsCard["Punch_Card_Message"];
			else 
				this.css["CardMsg"] = cssRewardsCard["Point_Card_Message"];

			this.css["BackColor"] = cssRewardsCard["Background_Color"];
			this.css["BackImg"] = cssRewardsCard["Background_Image"];
			this.css["HeaderImg"] = cssRewardsCard["Header_Image"];
			this.css["IconImg"] = cssRewardsCard["Icon_Image"];
			if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
				this.css["BackColor"] = "#ffffff";
			if (this.css["HeaderImg"] == undefined || this.css["HeaderImg"] == "")
				this.css["HeaderImg"] = "./assets/rewards/freebie-card.png";
			if (this.css["IconImg"] == undefined || this.css["IconImg"] == "")
				this.css["IconImg"] = "./assets/rewards/logo-world.png";

			this.css["PointPunchTextFormat"] = cssRewardsCard["Points_Punch_Text"];
		}
	}

	setTotalPoint(points) {
		RewardHomePage.totalPoints = +points;
		if (RewardHomePage.totalPoints < 0)
			RewardHomePage.totalPoints = 0;

		this.remain = RewardHomePage.totalPoints % 10;
		this.reward = (RewardHomePage.totalPoints - this.remain) / 10;

		let rewardUnit;
		var rewardCount = 10 - this.remain;
		let cssRewardsCard = AuthProvider.SettingData["Rewards_Card"];	
		if (this.css["IsPunchSystem"] == true) {
			if (rewardCount > 1)
				rewardUnit = cssRewardsCard["Punch_Card_Check_In_Name"]["Plural"];
			else
				rewardUnit = cssRewardsCard["Punch_Card_Check_In_Name"]["Singular"];
		}
		else {
			rewardCount = RewardHomePage.totalPoints;
			if (rewardCount > 1)
				rewardUnit = cssRewardsCard["Points_Card_Check_In_Name"]["Plural"];
			else
				rewardUnit = cssRewardsCard["Points_Card_Check_In_Name"]["Singular"];
		}
		this.productMessage = "" + rewardCount + " " + rewardUnit;
	}

	handleError(error: any) 
	{
		let message: string;
		if (error.status && error.status === 1) {
			message = error.message;
		} else {
			message = `${error.message}`;
		}

		this.commonProvider.toastMessage(message);		
	}

}
