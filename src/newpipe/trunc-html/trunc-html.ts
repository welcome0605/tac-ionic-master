import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({ name: 'truncate' })
// export class SafeHtmlPipe implements PipeTransform {
//   constructor(private sanitized: DomSanitizer) {}
//   transform(value) {
//     return this.sanitized.bypassSecurityTrustHtml(value);
//   }
// }




export class TruncatePipe implements PipeTransform{
  constructor(private sanitized: DomSanitizer) {}
	transform(value: string, args: number): any {
		// debugger
		// console.log("this is truncate", value,"   ",args);

		if (value.length <= args ) {
			// return this.sanitized.bypassSecurityTrustHtml(value);
			return value;
		}
		else {
			return value.substring(0,args)+'...';
		}
		
	}
}