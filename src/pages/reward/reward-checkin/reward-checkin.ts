import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import "rxjs/add/operator/finally";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardMessagesPage } from '../reward-messages/reward-messages';
import { RewardHistoryPage } from '../reward-history/reward-history';

@Component({
    selector: 'page-reward-checkin',
    templateUrl: 'reward-checkin.html'
})
export class RewardCheckinPage {

	StampDataArray = [];

	data = {};
	css = {};
	
	constructor(private readonly navCtrl: NavController,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssButtons = AuthProvider.SettingData["Buttons"];
		let cssMsgs = AuthProvider.SettingData["Messages"];
		let cssPtChkIn = AuthProvider.SettingData["Points_Per_Check_In"];
		
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

		if (cssButtons != undefined) {
			console.log(cssButtons);
			this.css["CHECK_IN"] = cssButtons["CHECK_IN"];
			this.css["BACK"] = cssButtons["BACK"];
		}
		if (cssMsgs != undefined) {
			this.css["Cashier"] = cssMsgs["CASHIER"];
		}
		if (cssPtChkIn != undefined) {
			this.css["MinVal"] = cssPtChkIn["Minimum"];
			this.css["MaxVal"] = cssPtChkIn["Maximum"];
			this.css["IncVal"] = cssPtChkIn["Increment"];
			for (let idx = this.css["MinVal"]; idx <= this.css["MaxVal"]; idx += this.css["IncVal"])
				this.StampDataArray[this.StampDataArray.length] = "" + idx + ' ' + (idx > 1? this.css["UnitPL"] : this.css["UnitSN"]);
		}
		this.data['points'] = 1;
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

	onCheckin()
	{
		if (this.data['passcode'] == undefined || this.data['passcode'] == "") {
			this.commonProvider.toastMessage("Please input passcode");
			return;
		}
		if (this.data['points'] == undefined || this.data['points'] == "") {
			this.commonProvider.toastMessage("Please input points");
			return;
		}

		this.data['pts'] = +this.css["MinVal"] + +this.css["IncVal"] * (+this.data["points"] - 1);

		this.checkin(this.data);
	}

	checkin(value: any) 
	{
		this.commonProvider.loadingShow();
		
		this.authProvider.postCheckin(value.passcode, value.pts)
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
			param['type'] = "CS";
		}
		else {
			param['type'] = "CF";
		}
		param['pts'] = this.data["pts"];
		this.navCtrl.setRoot(RewardMessagesPage, param);
	}

}
