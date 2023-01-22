import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[] | undefined;

  swiper: Swiper | undefined;
  
  constructor() { } 
   
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        '@0.75': {
          slidesPerView: 1
        },
        '@1.00': {
          slidesPerView: 2
        },
        '@1.50': {
          slidesPerView: 3
        }
      }
    });
  }

  ngOnInit(): void {
  }

  onSlidePrevious() {
    this.swiper?.slidePrev();
  }

  onSlideNext() {
    this.swiper?.slideNext();
  }

}
