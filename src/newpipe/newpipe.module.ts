import { NgModule } from '@angular/core';
import { TruncatePipe } from './trunc-html/trunc-html';
@NgModule({
	declarations: [TruncatePipe],
	imports: [],
	exports: [TruncatePipe]
})
export class TruncModule {}
