import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RewardSignupPage } from "../reward-signup/reward-signup";
import { AuthProvider } from "../../../providers/auth/auth";
import "rxjs/add/operator/finally";
import { CommonProvider } from '../../../providers/common/common';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardLoginPage } from '../reward-login/reward-login';
import { RewardSetotpPage } from '../reward-setotp/reward-setotp';

@Component({
    selector: 'page-forgot',
    templateUrl: 'reward-forgot.html'
})
export class RewardForgotPage {

	data = {};
	css = {};

	constructor(private readonly navCtrl: NavController,
              	private readonly authProvider: AuthProvider,
				private readonly toastCtrl: ToastController,
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
		if (this.data['email'] == undefined || this.data['email'] == "") {
			this.commonProvider.toastMessage("Please enter your email");
			return;
		}
		
		this.forgotPassword(this.data);
	}

	forgotPassword(value: any) 
	{
		this.commonProvider.loadingShow();
		this.authProvider.postForgot(value.email)
			.then (data=> {
				this.commonProvider.loadingHide();
				this.commonProvider.toastMessage("OK! Then enter your OTP");

				this.showSetotp();
			}, error => {
				this.commonProvider.loadingHide();
				this.handleError(error);
			});
	}

	showSetotp()
	{
    	this.navCtrl.setRoot(RewardSetotpPage, this.data['email']);
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
