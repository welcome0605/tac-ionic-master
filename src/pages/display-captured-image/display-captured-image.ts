import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams, MenuController, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonProvider } from '../../providers/common/common';
import { ChangeDetectorRef } from '@angular/core';
import { Events } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import $ from "jquery";

@Component({
    selector: 'page-display-captured-image',
    templateUrl: 'display-captured-image.html',
})
export class DisplayCapturedImagePage 
{
    @ViewChild(Slides) slides: Slides;
    imgUrl = "";
    imageBase64 : any;
    hexColor  : any;
    canvasHeight = "0px";
    canvasWidth = "0px";
    similarProduct = [];
    base_colors : any;
    is_msg_hide = false;
    message : string;
    pixel : Object = {"1.5" : 80,"2" : 120,"2.5" : 160,"3" : 200,"3.5" : 260,"4" : 280};
    densityValue : any;
    css = {};
    type : any;
    show = true;
    showData = false;

    constructor(
        public events: Events,
        private ref: ChangeDetectorRef,
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider: CommonProvider,
        private senitizer:DomSanitizer,
        private common : CommonProvider,
        public menu: MenuController,
        public viewCtrl: ViewController,
        private crop: Crop,
        private camera: Camera) 
    {
        this.css = this.common.appSpecific['colorMatchPage'];
        this.menu.swipeEnable(false, "myMenu");
        this.densityValue = window.devicePixelRatio;
        $("#content").css('backgroud-color','#000');
        localStorage.setItem("base_colors",JSON.stringify(this.common.menu['sidemenu'][0]['value']));
        if(!localStorage.getItem("msg_show"))
        {
            this.is_msg_hide = false;
        }
        if(this.similarProduct.length == 0)
        {
            this.message = '10%';
            this.showData = false;
        }
        this.imgUrl = this.common.imgUrl;
        this.loadCanvas();
        this.type = this.navParams.get('type');
        if(this.type == "Camera")
        {
            const options: CameraOptions = 
            {
                quality: 100,
                // destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                correctOrientation: true
            }
            this.camera.getPicture(options).then((imageData) => 
            {   

                this.crop.crop(imageData, {quality: 75, targetHeight: 80, targetWidth: 80 })
                  .then((
                        newImage) =>
                        {
                            this.show = false;
                            //this.navCtrl.push(DisplayCapturedImagePage,{'image':newImage});   
                            this.imageBase64 = newImage;
                            this.canvasHeight = "80px";
                            this.canvasWidth = "80px";

                        },
                (error) => {
                    this.show = true;
                    console.error('Error cropping image', error);
                    this.navCtrl.pop();
                }
              );

                //this.navCtrl.push(DisplayCapturedImagePage,{'image':imageData});
                // this.imageBase64 = 'data:image/jpeg;base64,' + imageData;
                // console.log(this.imageBase64); 
                // this.imageBase64 = imageData;
                // this.canvasHeight = "80px";
                // this.canvasWidth = "80px";
            }, 
            (err) => 
            {
                console.log(err);
                this.show = true;
                this.navCtrl.pop();
            });
        }
        if(this.type == "Gallery")
        {
            const options: CameraOptions = {
                quality: 100,
                // destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
                correctOrientation:false
            }    

            this.camera.getPicture(options).then((imageData) => 
            {  
               
               this.crop.crop(imageData, {quality: 75, targetHeight: 80, targetWidth: 80})
                  .then((
                        newImage) =>
                        {
                            this.show = false;
                            //this.navCtrl.push(DisplayCapturedImagePage,{'image':newImage, targetHeight: 80, targetWidth: 80});   
                            this.imageBase64 = newImage;
                            this.canvasHeight = "80px";
                            this.canvasWidth = "80px";

                        },
                (error) => {
                    this.show = true;
                    console.error('Error cropping image', error);
                    this.navCtrl.pop();
                }
              );


            },(err)=>
            {
                this.show = true;
                this.navCtrl.pop();
            });
        }
        setTimeout(function(){
            var imgs=document.getElementById('scream');
            localStorage.setItem("image_height",JSON.stringify(imgs['clientHeight']));
            localStorage.setItem("image_width",JSON.stringify(imgs['clientWidth']));
        },1000);
        events.subscribe('component:dragged', (x, y, isEnd) => 
        {
            var self = this;

            self.slides.slideTo(0, 100);

            $("#slide").css("display","none");

            var img = this._('.thumbnail img'),
            canvas = this._('#cs'),
            canvas_new = this._('#myCanvas');
//            preview = this._('.preview');
            
            self.useCanvas(canvas,img,function()
            {
                var p = canvas.getContext('2d')
                    .getImageData(x, y, 1, 1).data;
                    var rgbObj = {
                        r: p[0],
                        g: p[1],
                        b: p[2]
                    } ;
                var ctx=canvas_new.getContext("2d");
                var imgs=document.getElementById('scream');

                var new_x = ((imgs['naturalWidth']*parseInt(x))/imgs['clientWidth']).toString();
                var new_y = ((imgs['naturalHeight']*parseInt(y))/imgs['clientHeight']).toString(); 
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(imgs,(parseInt(new_x)-(self.pixel[self.densityValue]/2)),(parseInt(new_y)-(self.pixel[self.densityValue]/2)),self.pixel[self.densityValue],self.pixel[self.densityValue],0,0,100,100);
                //ctx.drawImage(imgs,(parseInt(new_x)-(self.pixel[self.densityValue]/2)),(parseInt(new_y)-(self.pixel[self.densityValue]/2)),200,200,0,0,100,100);
                self.hexColor = self.rgbToHex(p[0],p[1],p[2]);
                //console.log(imgs['naturalWidth'] + "width====" + imgs['clientWidth']);
                //console.log(imgs['naturalHeight'] + "height====" + imgs['clientHeight']);

                var width = imgs['clientWidth'] - 50;
                var height = imgs['clientHeight'] - 50;
                var left = width - 10;
                var top = height - 10;

                console.log(top);
                if(x>width && y>height)
                {
                    $("#myCanvas").css({'top':top ,'left':left , 'position':'absolute','z-index':'3','display':'block','border-radius': '100%','border': '3px solid '+self.hexColor,'vertical-align':'middle','padding':'3px'});
                }
                else if(x>width)
                {
                    $("#myCanvas").css({'top':parseInt(y)-50 ,'left': left, 'position':'absolute','z-index':'3','display':'block','border-radius': '100%','border': '3px solid '+self.hexColor,'vertical-align':'middle','padding':'3px'});     
                }
                else if(y>height)
                {
                    $("#myCanvas").css({'top':top ,'left': parseInt(x)-50, 'position':'absolute','z-index':'3','display':'block','border-radius': '100%','border': '3px solid '+self.hexColor,'vertical-align':'middle','padding':'3px'});    
                }
                else if(y < 1)
                {
                    $("#myCanvas").css({'top': -55 ,'left': parseInt(x)-50, 'position':'absolute','z-index':'3','display':'block','border-radius': '100%','border': '3px solid '+self.hexColor,'vertical-align':'middle','padding':'3px'});        
                }
                else
                {
                    $("#myCanvas").css({'top':parseInt(y)-50 ,'left':parseInt(x)-50 , 'position':'absolute','z-index':'3','display':'block','border-radius': '100%','border': '3px solid '+self.hexColor,'vertical-align':'middle','padding':'3px'});
                }

                ctx.font = "20pt Times New Roman";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("+", 50, 60);

                if(isEnd == true)
                {
                    self.closestHexFromRgb(rgbObj);

                    self.getSimilarColors(rgbObj);

                    setTimeout(function()
                    {
                        $("#slide").css("display","block");
                    },150);
                }
     
            });
        });
    }
    // ionViewDidEnter() {
    //     this.navCtrl.swipeBackEnabled = false;
    //     this.menu.swipeEnable(true, "myMenu");
    // }

    // ionViewDidLeave() {
    //     this.navCtrl.swipeBackEnabled = true;
    //     this.menu.swipeEnable(true, "myMenu");
    //     this.imageBase64 = '';
    // }
    sanitize(url:string)
    {    
        return this.senitizer.bypassSecurityTrustUrl(url);
    }
    closeMessage()
    {
        this.is_msg_hide = true;
    }
    closePage()
    {
        this.navCtrl.pop();
    }
    loadCanvas()
    {
        var self = this;
        setTimeout(function()
        {
            var img = self._('.thumbnail img'),
            canvas = self._('#cs'),
            canvas_new = self._('#myCanvas'),
            preview = self._('.preview'),x = '',y = '';

            img.addEventListener('click', function(e)
            {
                $("#slide").css("display","none");

                if(e.offsetX) 
                {
                    x = e.offsetX;
                    y = e.offsetY; 
                }
                else if(e.layerX) 
                {
                    x = e.layerX;
                    y = e.layerY;
                }

                self.useCanvas(canvas,img,function()
                {
                    var p = canvas.getContext('2d')
                    .getImageData(x, y, 1, 1).data;
                    var rgbObj = {
                        r: p[0],
                        g: p[1],
                        b: p[2]
                    } ;

                    var ctx=canvas_new.getContext("2d");
                    var imgs=document.getElementById('scream');

                    var new_x = ((imgs['naturalWidth']*parseInt(x))/imgs['clientWidth']).toString();
                    var new_y = ((imgs['naturalHeight']*parseInt(y))/imgs['clientHeight']).toString(); 
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(imgs,(parseInt(new_x)-(self.pixel[self.densityValue]/2)),(parseInt(new_y)-(self.pixel[self.densityValue]/2)),self.pixel[self.densityValue],self.pixel[self.densityValue],0,0,100,100);

                    self.hexColor = self.rgbToHex(p[0],p[1],p[2]);
                    $("#myCanvas").css({'top':parseInt(y)-50 ,'left':parseInt(x)-50 , 'position':'absolute','z-index':'3','display':'block','border-radius': '100%','border': '3px solid '+self.hexColor,'vertical-align':'middle','padding':'3px'});
                    ctx.font = "20pt Times New Roman";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "white";
                    ctx.fillText("+", 50, 60);
                       
                    self.closestHexFromRgb(rgbObj);

                    self.getSimilarColors(rgbObj);
                   
                    setTimeout(function()
                    {
                       $("#slide").css("display","block");
                    },150);
                    
                    self.slides.slideTo(0, 100);
                    document.body.style.background = self.rgbToHex(p[0],p[1],p[2]);
                //     var data = "rgb("+
                //     p[0]+","+
                //     p[1]+","+
                //     p[2]+")";

                 });
            },false);

            img.addEventListener('mousemove', function(e)
            {
                if(e.offsetX) 
                {
                    x = e.offsetX;
                    y = e.offsetY; 
                }
                else if(e.layerX) 
                {
                    x = e.layerX;
                    y = e.layerY;
                }

                self.useCanvas(canvas,img,function(){

                    var p = canvas.getContext('2d')
                    .getImageData(x, y, 1, 1).data;
                    preview.style.background = self.rgbToHex(p[0],p[1],p[2]);
                });
            },false);
        },1000);
    }
    ngOnChange(val: number) 
    {
        console.log(val);
    }

    useCanvas(el,image,callback)
    {
        el.width = image.width;
        el.height = image.height; 
        el.getContext('2d')
        .drawImage(image, 0, 0, image.width, image.height);
        return callback();
    }

    componentToHex(c) 
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    rgbToHex(r, g, b) 
    {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    _(el)
    {
        return document.querySelector(el);
    };
    findPos(obj) 
    {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) 
        {
            do 
            {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }
    getSimilarColors (color) 
    {
        //base_colors
        var te = JSON.parse(localStorage.getItem("base_colors"));
        this.similarProduct = [];
        
        let color_r : number;
        let color_g : number;
        let color_b : number;
        
        color_r = color['r'];
        color_g = color['g'];
        color_b = color['b'];

        //Create an emtyp array for the difference betwwen the colors
        var differenceArray=[];
        var self = this;
        //Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
        $.each(te, function(index, value) 
        {
            let base_colors_r : number;
            let base_colors_g : number;
            let base_colors_b : number;

            var base_color_rgb = self.hex2rgb(value.hexvalue);
            base_colors_r = parseInt(base_color_rgb.split(',')[0]);
            base_colors_g = parseInt(base_color_rgb.split(',')[1]);
            base_colors_b = parseInt(base_color_rgb.split(',')[2]);

            //Add the difference to the differenceArray
            differenceArray.push(Math.sqrt((color_r-base_colors_r)*(color_r-base_colors_r)+(color_g-base_colors_g)*(color_g-base_colors_g)+(color_b-base_colors_b)*(color_b-base_colors_b)));
        });

        for(var i=0;i<this.common.menu['sidemenu'][0]['numbersOfSuggestion'];i++)
        {
            var lowest = Math.min.apply(Math,differenceArray);
            var index = differenceArray.indexOf(lowest);

            te[index]['hexvalue'] = te[index]['hexvalue']

            this.similarProduct.push(te[index]);
            
            if(this.similarProduct.length > 0)
            {
                this.message = '19%';
                this.showData = true;
            }

            differenceArray.splice(index,1);
            
            //te.splice(index,1);

            delete te[index];

            var temp = {};
            var ind = 0;
            $.each(te, function(index, value) 
            {
                temp[ind] = value;
                ind++;
            });
            te = temp;
        }
    }
    hex2rgb( colour ) 
    {
        var r,g,b;
        if ( colour.charAt(0) == '#' ) 
        {
            colour = colour.substr(1);
        }

        r = colour.charAt(0) + colour.charAt(1);
        g = colour.charAt(2) + colour.charAt(3);
        b = colour.charAt(4) + colour.charAt(5);

        r = parseInt( r,16 );
        g = parseInt( g,16 );
        b = parseInt( b ,16);
        return r+','+g+','+b;
    }
    closestHexFromRgb(rgbObj) 
    {
        $("#slide").css("display","block");
        var self= this;
        self.ref.detectChanges();
        if (!rgbObj) {
            throw new Error("The hex you provided is not formatted correctly. Please try in a format such as '#FFF' or '#DDFFDD'.");
        };
        var te = JSON.parse(localStorage.getItem("base_colors"));
        var colors = $.map(te,function(value,index)
        {
            return value;
        });
        var minDistance = Number.MAX_SAFE_INTEGER;
//        var nearestHex = [];
//        var diff = [];
        self.similarProduct = [];
        $.each(te, function(index, value) 
        {
            let base_colors_r : number;
            let base_colors_g : number;
            let base_colors_b : number;

            var base_color_rgb = self.hex2rgb(value.hexvalue);
            base_colors_r = parseInt(base_color_rgb.split(',')[0]);
            base_colors_g = parseInt(base_color_rgb.split(',')[1]);
            base_colors_b = parseInt(base_color_rgb.split(',')[2]);
            var distance = Math.sqrt(
                Math.pow((rgbObj.r - base_colors_r), 2) +
                Math.pow((rgbObj.g - base_colors_g), 2) +
                Math.pow((rgbObj.b - base_colors_b), 2)
                );
            
            if (distance < minDistance) 
            {
                minDistance = distance;
                value.hexvalue = value.hexvalue;
                self.similarProduct.push(value);
                self.similarProduct.reverse();
            }

            //console.log(self.similarProduct);
        });

        var diffi = $(colors).not(self.similarProduct).get();
        
        $.each(diffi,function(index,value)
        {
            self.similarProduct.push(value);
        });
        
        if(self.similarProduct.length > 0)
        {
            self.message = '22%';
        }

        this.sortArray();
    }
    displayProduct(itemType,data)
    {
        if(itemType!=undefined)
            this.events.publish('component:clicked', itemType, JSON.stringify(data));
    }



    sortArray()
    {
    }

    ionViewDidLoad() {
        this.common.loadingHide();
    }
}
