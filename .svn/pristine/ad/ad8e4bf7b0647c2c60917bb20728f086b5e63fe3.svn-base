import {Injectable, Pipe} from '@angular/core';

/*
 Generated class for the Conversion pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'cardHide'
})
@Injectable()
export class cardHide {
    transform(str: string):string {
        if(str){
            let len=str.length;
            return str.substring(0,4)+'****'+str.substring(len-4,len)
        }
    }
}
