import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { AuthProvider } from "../../../providers/auth/auth";
import { RewardLoginPage } from '../reward-login/reward-login';
import { CommonProvider } from '../../../providers/common/common';
import { RewardHomePage } from '../reward-home/reward-home';

// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { RewardSignupPage } from "../reward-signup/reward-signup";
// import { AuthProvider } from "../../../providers/auth/auth";
// import { CommonProvider } from '../../../providers/common/common';
// import { RewardHomePage } from '../reward-home/reward-home';
// import { RewardForgotPage } from '../reward-forgot/reward-forgot';


@Component({
  selector: 'page-signup',
  templateUrl: 'reward-signup.html'
})
export class RewardSignupPage {

    @ViewChild('username')
    usernameModel: NgModel;

    data = {};
    css = {};

    constructor(private readonly navCtrl: NavController,
                private readonly authProvider: AuthProvider,
                private readonly loadingCtrl: LoadingController,
				private readonly commonProvider: CommonProvider) 
    {
        let cssLogin = AuthProvider.SettingData["Login_Register"];
        if (cssLogin != undefined) {
            this.css["Register_Button"] = cssLogin["Register_Button"];
            this.css["Back_Button"] = cssLogin["Back_To_Login_Button"];
            this.css["Logo_Image"] = cssLogin["Icon_Image"];
            // this.css["Logo_Image"] = "https://lambda-s3-tac-bucket.s3.us-west-2.amazonaws.com/2153887934498946.png"
            ;
            console.log("zxcvzxcvzxcvzcxv",cssLogin["Icon_Image"]);


            this.css["Title_Register"] = cssLogin["Title_Register"];
            if (this.css["Logo_Image"] == undefined || this.css["Logo_Image"] == "")
                this.css["Logo_Image"] = "./assets/rewards/logo-full.png";
                
            this.css["BackColor"] = cssLogin["Background_Color"];
            if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
                this.css["BackColor"] = "#ffffff";    
        }

        // if (cssLogin != undefined)
		// {
		// 	this.css["Title_Login"] = cssLogin["Title_Login"];
        //     this.css["Login_Button"] = cssLogin["Login_Button"];
        //     this.css["New_Account_Button"] = cssLogin["New_Account_Button"];
		// 	this.css["Logo_Image"] = cssLogin["Icon_Image"];
		// 	if (this.css["Logo_Image"] == undefined || this.css["Logo_Image"] == "")
		// 		this.css["Logo_Image"] = "./assets/rewards/logo-full.png";

		// 	this.css["BackColor"] = cssLogin["Background_Color"];
		// 	if (this.css["BackColor"] == undefined || this.css["BackColor"] == "")
		// 		this.css["BackColor"] = "#ffffff";
		// }
    }

    signup(value: any) {

        this.commonProvider.loadingShow();
		
		this.authProvider.postSignup(value.fname, value.lname, value.email, value.password)
			.then (data=> {
				this.commonProvider.toastMessage("Succeed to register new user");
		
                this.authProvider.postLogin(value.email, value.password)
                    .then (data=> {
                        this.commonProvider.loadingHide();
                        this.commonProvider.toastMessage("Succeed to login");
                        this.navCtrl.setRoot(RewardHomePage, true);
                    }, error => {
                        this.commonProvider.loadingHide();
                        this.handleError(error);
                    });

				this.commonProvider.loadingHide();
			}, error => {
				this.commonProvider.loadingHide();
				this.handleError(error);
            });
    }

    onBack() {
    	this.navCtrl.setRoot(RewardLoginPage);
    }

    onSignup() {
		
        if (this.data['fname'] == undefined || this.data['fname'] == "" ||
            this.data['lname'] == undefined || this.data['lname'] == "") {
			this.commonProvider.toastMessage("Please enter your name");
			return;
		}
		if (this.data['email'] == undefined || this.data['email'] == "" || this.data['password'] == undefined || this.data['password'] == "") {
			this.commonProvider.toastMessage("Please enter your email and password");
			return;
        }
        // if (this.data['password'] == undefined || this.data['password'] == "") {
        //     this.commonProvider.toastMessage("Please input password");
		// 	return;
        // }
        if (this.data['repass'] == undefined || (this.data['password'] != this.data['repass'])) {
			this.commonProvider.toastMessage("The passwords do not match");
			return;
		}

        this.signup(this.data);
        
    }

    handleError(error: any) {
        let message: string;
		if (error.status && error.status === 1) {
			message = error.message;
		} else {
			message = `${error.message}`;
		}

		this.commonProvider.toastMessage(message);
    }

}
