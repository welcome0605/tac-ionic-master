import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';

@Component({
    selector: 'page-setpwd',
    templateUrl: 'reward-setpwd.html'
})
export class RewardSetpwdPage {

	data = {};
	css = {};

	constructor(private readonly navCtrl: NavController,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssLogin = AuthProvider.SettingData["Login_Register"];
		if (cssLogin != undefined) {
			this.css["ResetPwd"] = cssLogin["Title_Reset_Password"];
			this.css["Logo_Image"] = cssLogin["Icon_Image"];
			if (this.css["Logo_Image"] == undefined || this.css["Logo_Image"] == "")
				this.css["Logo_Image"] = "./assets/rewards/logo-full.png";

			this.css["LoginButton"] = cssLogin["Login_Button"];
			this.css["NewAccButton"] = cssLogin["New_Account_Button"];

			this.css["BackColor"] = cssLogin["Background_Color"];
			if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
				this.css["BackColor"] = "#ffffff";
		}
  	}

	onBack() 
	{
    	this.navCtrl.setRoot(RewardLoginPage);
  	}

	onSubmit()
	{		
		if (this.data['password'] == undefined || this.data['password'] == "") {
			this.commonProvider.toastMessage("Please input password");
			return;
		}

		if (this.data['confirm'] == undefined || this.data['password'] != this.data['confirm']) {
			this.commonProvider.toastMessage("Password does not match!");
			return;
		}
		
		this.setOtp(this.data);
	}

	setOtp(value: any) 
	{
		this.commonProvider.loadingShow();
		this.authProvider.postReset(value.password)
			.then (data=> {
				this.commonProvider.loadingHide();
				this.commonProvider.toastMessage("Password has been successfully changed");
				this.onBack();
			}, error => {
				this.commonProvider.loadingHide();
				this.handleError(error);
			});
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
