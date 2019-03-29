import { NgModule } from '@angular/core';
import { AbsoluteDragDirective } from './absolute-drag/absolute-drag';
import { TouchEventsDirective } from './touch-events/touch-events';
@NgModule({
	declarations: [AbsoluteDragDirective, TouchEventsDirective],
	imports: [],
	exports: [AbsoluteDragDirective, TouchEventsDirective]
})
export class DirectivesModule {}
