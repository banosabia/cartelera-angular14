import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string | null, size: number = 154): string {
    if (poster) {
      return `https://image.tmdb.org/t/p/w${ size }${ poster }`;
    } else {
      return './assets/no-image.jpg';
    }
    
  }

}
