import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit {

  @Input() cast : Cast[] | undefined;

  swiper: Swiper | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        '@0.75': {
          slidesPerView: 3
        },
        '@1.00': {
          slidesPerView: 4
        },
        '@1.50': {
          slidesPerView: 5
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
