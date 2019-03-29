import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardSetpwdPage } from '../reward-setpwd/reward-setpwd';

@Component({
    selector: 'page-setotp',
    templateUrl: 'reward-setotp.html'
})
export class RewardSetotpPage {

	data = {};
	css = {};

	constructor(private readonly navCtrl: NavController,
				private readonly navParams: NavParams,
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
		this.data['email'] = navParams.data;
  	}

	onBack() 
	{
		this.navCtrl.setRoot(RewardLoginPage);
	}

	onSubmit()
	{		
		if (this.data['otp'] == undefined || this.data['otp'] == "") {
			this.commonProvider.toastMessage("Please input otp");
			return;
		}
		
		this.Setotp(this.data);
	}

	Setotp(value: any) 
	{
		this.commonProvider.loadingShow();
		this.authProvider.postOtp(value.otp, value.email)
			.then (data=> {
				this.commonProvider.loadingHide();
				this.commonProvider.toastMessage("Good! Then enter your password");

				this.showPwd();
			}, error => {
				this.commonProvider.loadingHide();
				this.handleError(error);
			});
	}

	showPwd() 
	{
		this.navCtrl.setRoot(RewardSetpwdPage);
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
