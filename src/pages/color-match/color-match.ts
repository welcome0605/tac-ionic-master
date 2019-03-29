import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonProvider } from '../../providers/common/common';
import { DisplayCapturedImagePage } from '../../pages/display-captured-image/display-captured-image';


@Component({
    selector: 'page-color-match',
    templateUrl: 'color-match.html',
})
export class ColorMatchPage 
{
    imgUrl = "";
    imageBase64 : any;
    hexColor  : any;
    canvasHeight = "0px";
    canvasWidth = "0px";
    similarProduct = [];
    base_colors : any;
    menuIcon:any;
    constructor(
        public navCtrl: NavController,
        private senitizer:DomSanitizer,
        private common : CommonProvider,
        public menu: MenuController)
    {
        localStorage.setItem("base_colors",JSON.stringify(this.common.menu['sidemenu'][1]['value']));
        
        this.imgUrl = this.common.imgUrl;
        this.menuIcon = this.common.appSpecific['menuIconCss'];
        // this.loadCanvas();
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(true, "myMenu");
    }
    sanitize(url:string)
    {    
        return this.senitizer.bypassSecurityTrustUrl(url);
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
                    
                    var ctx=canvas_new.getContext("2d");
                    var img=document.getElementById("scream");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img,(parseInt(x)-25),(parseInt(y)-25),700,700,0,0,200,200);
                  
                    self.hexColor = self.rgbToHex(p[0],p[1],p[2]);

                    document.body.style.background = self.rgbToHex(p[0],p[1],p[2]);
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

                self.useCanvas(canvas,img,function()
                {
                    var p = canvas.getContext('2d')
                    .getImageData(x, y, 1, 1).data;
                    preview.style.background = self.rgbToHex(p[0],p[1],p[2]);
                });
            },false);
        },2000);
    }

    openCamera()
    {
        this.navCtrl.push(DisplayCapturedImagePage,{'type':'Camera'}); 
        // const options: CameraOptions = 
        // {
        //     quality: 100,
        //     // destinationType: this.camera.DestinationType.DATA_URL,
        //     encodingType: this.camera.EncodingType.JPEG,
        //     mediaType: this.camera.MediaType.PICTURE,
        //     correctOrientation: true
        // }
        // this.camera.getPicture(options).then((imageData) => 
        // {   

        //     this.crop.crop(imageData, {quality: 100})
        //       .then((
        //             newImage) =>
        //             {
        //                  this.navCtrl.push(DisplayCapturedImagePage,{'image':newImage});   
        //                  this.imageBase64 = newImage;
        //             this.canvasHeight = "80px";
        //         this.canvasWidth = "80px";

        //             },
        //     error => console.error('Error cropping image', error)
        //   );

        //     //this.navCtrl.push(DisplayCapturedImagePage,{'image':imageData});
        //     // this.imageBase64 = 'data:image/jpeg;base64,' + imageData;
        //     // console.log(this.imageBase64); 
        //     // this.imageBase64 = imageData;
        //     // this.canvasHeight = "80px";
        //     // this.canvasWidth = "80px";
        // }, 
        // (err) => 
        // {
        //     console.log(err);
        // });
    }
    openGallery()
    {
        this.navCtrl.push(DisplayCapturedImagePage,{'type':'Gallery'});
        // const options: CameraOptions = {
        //     quality: 100,
        //     // destinationType: this.camera.DestinationType.DATA_URL,
        //     encodingType: this.camera.EncodingType.JPEG,
        //     mediaType: this.camera.MediaType.PICTURE,
        //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        //     correctOrientation:false
        // }

        // this.camera.getPicture(options).then((imageData) => 
        // {  
           
        //    this.crop.crop(imageData, {quality: 100})
        //       .then((
        //             newImage) =>
        //             {
        //                  this.navCtrl.push(DisplayCapturedImagePage,{'image':newImage});   
        //                  this.imageBase64 = newImage;
        //                 this.canvasHeight = "80px";
        //                 this.canvasWidth = "80px";

        //             },
        //     error => console.error('Error cropping image', error)
        //   );


        // },(err)=>
        // {
        // });
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

    ionViewDidLoad() {
        this.common.loadingHide();
    }
}