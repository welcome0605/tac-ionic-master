import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RewardSignupPage } from "../reward-signup/reward-signup";
import { AuthProvider } from "../../../providers/auth/auth";
import { CommonProvider } from '../../../providers/common/common';
import { RewardHomePage } from '../reward-home/reward-home';
import { RewardForgotPage } from '../reward-forgot/reward-forgot';

@Component({
    selector: 'page-login',
    templateUrl: 'reward-login.html'
})
export class RewardLoginPage {

	data = {};
	css = {};

	constructor(private readonly navCtrl: NavController,
              	private readonly authProvider: AuthProvider,
				private readonly commonProvider: CommonProvider) 
  	{
		let cssLogin = AuthProvider.SettingData["Login_Register"];
		if (cssLogin != undefined)
		{
			this.css["Title_Login"] = cssLogin["Title_Login"];
            this.css["Login_Button"] = cssLogin["Login_Button"];
            this.css["New_Account_Button"] = cssLogin["New_Account_Button"];
			this.css["Logo_Image"] = cssLogin["Icon_Image"];
			console.log(cssLogin["Icon_Image"]);
			if (this.css["Logo_Image"] == undefined || this.css["Logo_Image"] == "")
				this.css["Logo_Image"] = "./assets/rewards/logo-full.png";

			this.css["BackColor"] = cssLogin["Background_Color"];
			if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
				this.css["BackColor"] = "#ffffff";
		}
  	}

	onSignup() 
	{
    	this.navCtrl.push(RewardSignupPage);
  	}

	onLogin()
	{
		//this.showHome();
		
		if (this.data['email'] == undefined || this.data['email'] == "") {
			this.commonProvider.toastMessage("Please input email");
			return;
		}
		if (this.data['password'] == undefined || this.data['password'] == "") {
			this.commonProvider.toastMessage("Please input password");
			return;
		}

		this.login(this.data);
		
	}

	showHome() 
	{
		this.navCtrl.setRoot(RewardHomePage, true);
	}

	showForgot() 
	{
		this.navCtrl.setRoot(RewardForgotPage);
	}

	showSignup() 
	{
		this.navCtrl.setRoot(RewardSignupPage);
	}

	login(value: any) 
	{
		this.commonProvider.loadingShow();
		
		this.authProvider.postLogin(value.email, value.password)
			.then (data=> {
				this.commonProvider.loadingHide();
				// this.commonProvider.toastMessage("Succeed to login");

				this.showHome();
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
