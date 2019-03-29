import {  TruncatePipe }   from './truncate';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FCM } from '@ionic-native/fcm';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { KenburnsPage } from '../pages/kenburns/kenburns';
import { LocationsDetailsPage } from '../pages/locations-details/locations-details';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import { VideoListPage } from '../pages/video-list/video-list';
import { SingleVideoPage } from '../pages/singleVideo/singleVideo';
import { AlbumListPage } from '../pages/album-list/album-list';
import { AlbumPhotoListPage } from '../pages/album-photo-list/album-photo-list';
import { PhotoDetailsPage } from '../pages/photo-details/photo-details';
import { ImageMappingPage } from '../pages/image-mapping/image-mapping';
import { CustomWebFrameViewPage } from '../pages/customweb/customweb';
import { PdfViewPage } from '../pages/pdf-reader/pdf';
import { TextListPage } from '../pages/text-list/text-list';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { RssFeedPage } from '../pages/rss-feed/rss-feed';
import { RssDetailsPage } from '../pages/rss-details/rss-details';
import { NotificationPage } from '../pages/notification/notification';
import { Dialogs } from '@ionic-native/dialogs';
import { AppVersion } from '@ionic-native/app-version';
import { Toast } from '@ionic-native/toast';
import { SponsorScreenPage } from '../pages/sponsor-screen/sponsor-screen';
import { SplashScreenPage } from '../pages/splash-screen/splash-screen';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Camera } from '@ionic-native/camera';
import { ProductListPage } from '../pages/product-list/product-list';
import { ColorMatchPage } from '../pages/color-match/color-match';
import { DisplayCapturedImagePage } from '../pages/display-captured-image/display-captured-image';
import { AbsoluteDragDirective } from '../directives/absolute-drag/absolute-drag';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { TruncModule } from '../newpipe/newpipe.module';
import { Crop } from '@ionic-native/crop';
import { CustomWebViewPage } from '../pages/custom-web-view/custom-web-view';
import { ImageMappingIosPage } from '../pages/image-mapping-ios/image-mapping-ios';
import { ImagePage } from '../pages/image/image';
import { EmptyPage } from '../pages/empty-page/empty-page';
import { Vibration } from '@ionic-native/vibration';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Push } from '@ionic-native/push';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GalleryModalHammerConfig } from '../overrides/gallery-modal-hammer-config';
//import { Firebase } from '@ionic-native/firebase';
import { AuthProvider } from '../providers/auth/auth';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth, JwtHelper } from 'angular2-jwt';
import { RewardLoginPage } from '../pages/reward/reward-login/reward-login';
import { RewardSignupPage } from '../pages/reward/reward-signup/reward-signup';
import { RewardForgotPage } from '../pages/reward/reward-forgot/reward-forgot';
import { RewardHomePage } from '../pages/reward/reward-home/reward-home';
import { RewardCheckinPage } from '../pages/reward/reward-checkin/reward-checkin';
import { RewardRedeemPage } from '../pages/reward/reward-redeem/reward-redeem';
import { RewardListsPage } from '../pages/reward/reward-lists/reward-lists';
import { RewardMessagesPage } from '../pages/reward/reward-messages/reward-messages';
import { RewardHistoryPage } from '../pages/reward/reward-history/reward-history';
import { RewardSetotpPage } from '../pages/reward/reward-setotp/reward-setotp';
import { RewardSetpwdPage } from '../pages/reward/reward-setpwd/reward-setpwd';

import { ContentPage } from '../pages/content/content';
import { ContactPage } from '../pages/contact/contact';

import { AngularMasonry,AngularMasonryBrick } from 'angular2-masonry';

@NgModule({
	declarations: [
		MyApp,
		KenburnsPage,
		LocationsDetailsPage,
		AbsoluteDragDirective,
		VideoListPage,
		SingleVideoPage,
		AlbumListPage,
		AlbumPhotoListPage,
		PhotoDetailsPage,
		ImageMappingPage,
		CustomWebFrameViewPage,
		PdfViewPage,
		TextListPage,
		TutorialPage,
		RssFeedPage,
		RssDetailsPage,
		NotificationPage,
		SponsorScreenPage,
		SplashScreenPage,
		ColorMatchPage,
		ProductListPage,
		DisplayCapturedImagePage,
		CustomWebViewPage,
		ImageMappingIosPage,
		ImagePage,
		RewardLoginPage,
		RewardSignupPage,
		RewardForgotPage,
		RewardHomePage,
		RewardCheckinPage,
		RewardRedeemPage,
		RewardListsPage,
		RewardMessagesPage,
		RewardHistoryPage,
		RewardSetotpPage,
		RewardSetpwdPage,
		ContentPage,
		ContactPage,
		EmptyPage,
		AngularMasonry,
		AngularMasonryBrick,
		// TruncatePipe
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp,{
			backButtonText: '',
			iconMode: 'ios',
			backButtonIcon: "ios-arrow-back"
		}),
		ComponentsModule,
		PipesModule,
		TruncModule,
		IonicImageViewerModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		KenburnsPage,
		LocationsDetailsPage,
		VideoListPage,
		SingleVideoPage,
		AlbumListPage,
		AlbumPhotoListPage,
		PhotoDetailsPage,
		ImageMappingPage,
		CustomWebFrameViewPage,
		PdfViewPage,
		TextListPage,
		TutorialPage,
		RssFeedPage,
		RssDetailsPage,
		NotificationPage,
		SponsorScreenPage,
		SplashScreenPage,
		ColorMatchPage,
		ProductListPage,
		DisplayCapturedImagePage,
		CustomWebViewPage,
		ImageMappingIosPage,
		ImagePage,
		RewardLoginPage,
		RewardSignupPage,
		RewardForgotPage,
		RewardHomePage,
		RewardCheckinPage,
		RewardRedeemPage,
		RewardListsPage,
		RewardMessagesPage,
		RewardHistoryPage,
		RewardSetotpPage,
		RewardSetpwdPage,
		ContentPage,
		ContactPage,
		EmptyPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		CommonProvider,
		YoutubeVideoPlayer,
		ThemeableBrowser,
		InAppBrowser,
		FCM,
		Dialogs,
		AppVersion,
		Toast,
		Camera,
		Crop,
		Vibration,
		GoogleAnalytics,
		Push,
		FileTransfer,
		File,
		FileOpener,
		Transfer,
		AuthProvider,
		AuthHttp,
		JwtHelper,
		{
		    provide: HAMMER_GESTURE_CONFIG,
		    useClass: GalleryModalHammerConfig,
		},
		provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('id_token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        })
		//Firebase,
	]
})
export class AppModule {}
