import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import {ReplaySubject} from "rxjs";
import {Storage} from "@ionic/storage";
import {JwtHelper, AuthHttp} from "angular2-jwt";

import { environment } from '../../environment/environment';
//
// if compile error occurs, please copy "environmen_example.ts" to "environment.ts"
//

@Injectable()
export class AuthProvider 
{
    authUser = new ReplaySubject<any>(1);
    public static TOKEN = "";

    public static RewardBaseUrl = `${environment.BaseUrl}/rewards/` ;
    public static MenuUrl = `${environment.BaseUrl}/appmenu`;
    public static AppID = 0;

    public static SettingData = [];

    constructor(private readonly http: Http,
            private readonly storage: Storage,
            private readonly authHttp: AuthHttp,
            private readonly jwtHelper: JwtHelper,
    ) 
    {
    }

    requestPost(apiName, jsonParam, requiredToken=true)
    {
        return new Promise(resolve => {
            var url = AuthProvider.RewardBaseUrl + apiName + "?app_id=" + AuthProvider.AppID
            if (requiredToken) {
                url += "&token=" + AuthProvider.TOKEN;
            }
            console.log("### requestPost " + url)
            
            let headers = new Headers({
                'Content-Type': 'application/json'
            });

            let options = new RequestOptions({
                headers: headers
            });

            this.http.post(url, jsonParam, options).timeout(10000).subscribe(data => { 
                resolve(JSON.parse(data['_body']));               
            },
            error => {
                resolve({"status": "0", "error": error, "message" : "Network connection issue."});
            });
        });
    }

    requestGet(apiName, requiredToken=true)
    {
        return new Promise(resolve => {
            var url = AuthProvider.RewardBaseUrl + apiName + "?app_id=" + AuthProvider.AppID
            if (requiredToken) {
                url += "&token=" + AuthProvider.TOKEN;
            }
            console.log("### requestGet " + url)
            
            let headers = new Headers({
                'Content-Type': 'application/json'
            });

            let options = new RequestOptions({
                headers: headers
            });

            this.http.get(url, options).timeout(10000).subscribe(data => { 
                resolve(JSON.parse(data['_body']));               
            },
            error => {
                resolve({"status": "0", "error": error, "message" : "Network connection issue."});
            });
        });
    }

    requestGetUrl(url)
    {
        return new Promise(resolve => {
            console.log("### requestGet " + url)
            
            let headers = new Headers({
                'Content-Type': 'application/json'
            });

            let options = new RequestOptions({
                headers: headers
            });

            this.http.get(url, options).timeout(10000).subscribe(data => { 
                resolve(JSON.parse(data['_body']));               
            },
            error => {
                resolve({"status": "0", "error": error, "message" : "Network connection issue."});
            });
        });
    }

    getSettings()
    {
        let url = AuthProvider.RewardBaseUrl + "settings?app_id=" + AuthProvider.AppID;

        this.requestGet("settings", false)
        .then(data=> {
            if (data['status'] != null && data['status'] == 1) {
                AuthProvider.SettingData = data["settings"];
            }
            else {
                this.getLocalSettings();
            }
        },
        (error)=> {
            this.getLocalSettings();
        });
    }

    getLocalSettings() 
    {
        this.requestGetUrl("./assets/reward.json")
            .then(data => {
                AuthProvider.SettingData = data["settings"];
            });
    }


    postLogin(email: string, password: string)
    {
        return new Promise((resolve, reject) => {
            let param = {"email": email, "password": password, "type":"1"};

            this.requestPost("members/login", param, false)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    AuthProvider.TOKEN = data['token'];
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    postSignup(firstName: string, lastName: string, email: string, password: string)
    {
        return new Promise((resolve, reject) => {
            let param = {"first_name": firstName, "last_name": lastName, 
                         "email": email, "password": password};

            this.requestPost("members", param, false)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    postForgot(email: string)
    {
        return new Promise((resolve, reject) => {
            let param = {"email": email};

            this.requestPost("members/forgot", param, false)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    postOtp(otp: string, email: string)
    {
        return new Promise((resolve, reject) => {
            let param = {"otp": otp, "email": email};

            this.requestPost("members/otp", param, false)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    AuthProvider.TOKEN = data['token'];
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    postReset(password: string)
    {
        return new Promise((resolve, reject) => {
            let param = {"new_password": password};

            this.requestPost("members/reset", param)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    postCheckin(passcode: string, points)
    {
        return new Promise((resolve, reject) => {
            let param = {"passcode": passcode, "points": points};

            this.requestPost("checkin", param)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    getPoints()
    {
        return new Promise((resolve, reject) => {
            
            this.requestGet("points")
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    getBonuses()
    {
        return new Promise((resolve, reject) => {
            
            this.requestGet("bonuses")
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    postRedeem(passcode: string, bonusId)
    {
        return new Promise((resolve, reject) => {
            let param = {"passcode": passcode, "bonus_id": bonusId};

            this.requestPost("redeems", param)
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    getRedeems()
    {
        return new Promise((resolve, reject) => {
            
            this.requestGet("redeems")
            .then(data=> {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            (error)=> {
                reject(error);
            });
        });
    }

    logout() {
    

    }


    getMenuDataById(menu_id)
    {
        return new Promise((resolve, reject) => {
            console.log(`${AuthProvider.MenuUrl}/${menu_id}`);
            this.requestGetUrl(`${AuthProvider.MenuUrl}/${menu_id}`)
            .then(data => {
                if (data['status'] != null && data['status'] == 1) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            },
            error => {
                reject(error);
            });
        });
    }
}
