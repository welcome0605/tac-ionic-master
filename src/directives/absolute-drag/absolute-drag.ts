import { Directive,Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular'; 
import { Events } from 'ionic-angular';	
/**
* Generated class for the AbsoluteDragDirective directive.
*
* See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
* for more info on Angular Directives.
*/
@Directive({
	selector: '[absolute-drag]' // Attribute selector
})
export class AbsoluteDragDirective 
{
	@Input('startLeft') startLeft: any;
	@Input('startTop') startTop: any;
	constructor(public events: Events,public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) 
	{
		console.log('Hello AbsoluteDragDirective Directive');
	}
	ngAfterViewInit() 
	{
 
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
 
        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
 
        hammer.on('pan', (ev) => {
          this.handlePan(ev);
        });
        hammer.on('panend',(ev)=>{
      		this.handleclosepan(ev);
   	 	});
 
    }
 
    handlePan(ev)
    {	
        this.events.publish('component:dragged', ev.center.x, ev.center.y,false);
 		    this.domCtrl.write(() => {
        });
 
    }
    handleclosepan(ev)
    {
    	this.events.publish('component:dragged', ev.center.x, ev.center.y,true);
  	}

}
