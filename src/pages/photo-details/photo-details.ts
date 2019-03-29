import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides} from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageViewerController } from 'ionic-img-viewer';
import $ from 'jquery'
@Component({
    selector: 'page-photo-details',
    templateUrl: 'photo-details.html',

})
export class PhotoDetailsPage {
    @ViewChild(Slides) slides: Slides;
    css:any;
    showIcon:any;
    picName : any;
    description : any;
    data:any;
    menuIcon:string;
    jQuery: any;
    // ZoomAreaProvider: Provider;
    // onScroll$: Observable;
    // notifyScroll(): void;
    _imageViewerCtrl: ImageViewerController;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public commonProvider:CommonProvider,
        imageViewerCtrl: ImageViewerController) 
    {
        this.data = navParams.data['data'];
        this.picName = navParams.data['data'][navParams.data['currentIndex']]['image'];
        this.description = navParams.data['data'][navParams.data['currentIndex']]['description'];
        this.menuIcon = this.commonProvider.appSpecific['menuIconCss'];
        this._imageViewerCtrl = imageViewerCtrl;
        this.css = navParams.data.css;
       
     
    }
    
    

    backClick()
    {
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        this.commonProvider.loadingHide();
    }

    zoomImage(){
        try {
            $('.swiper-zoom-container').css('width','500px');    
        } catch (error) {
            console.log(error);
        }
                
    }

    presentImage(myImage) {
        try {
            const imageViewer = this._imageViewerCtrl.create(myImage);
            imageViewer.present();
        
            setTimeout(() => imageViewer.dismiss(), 1000);
            imageViewer.onDidDismiss(() => alert('Viewer dismissed'));    
        } catch (error) {
            console.log(error);        
        }
        
    }

    ionViewDidEnter() 
    {
        this.slides.slideTo(this.navParams.data['currentIndex']+1, 0);
    }

}
