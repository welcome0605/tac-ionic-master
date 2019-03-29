import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LogoComponent } from './logo/logo';
import { MenuBackComponent } from './menu-back/menu-back';
import { SettingBarComponent } from './setting-bar/setting-bar';
import { FittedImage } from './fitted-image/fitted-image';
import { GalleryModal } from './gallery-modal/gallery-modal';
import { ZoomableImage } from './zoomable-image/zoomable-image';

import { TouchEventsDirective } from '../directives/touch-events/touch-events';

@NgModule({
	declarations: [LogoComponent, MenuBackComponent, SettingBarComponent, TouchEventsDirective, FittedImage, GalleryModal, ZoomableImage],
	imports: [
		IonicModule
	],
	schemas: [
    	CUSTOM_ELEMENTS_SCHEMA
  	],
	exports: [LogoComponent, MenuBackComponent, SettingBarComponent, FittedImage, GalleryModal, ZoomableImage],
	entryComponents: [
		GalleryModal
	],
})
export class ComponentsModule {}