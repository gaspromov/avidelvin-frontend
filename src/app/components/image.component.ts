import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'avi-image',
  template: `
    <div class="artboard" (contextmenu)="$event.preventDefault()"></div>
    <img
      [ngSrc]="imgUrl()"
      loading="lazy"
      fill
      alt=""
      (contextmenu)="$event.preventDefault()"
    />
  `,
  styles: `
    :host{
      @apply tw-grid tw-relative tw-min-h-[200px];
    }
    img{
      user-select: none;
      @apply tw-object-cover tw-w-full tw-h-full;
    }
    .artboard{
      @apply tw-absolute tw-h-full tw-w-full tw-opacity-100 tw-top-0 tw-left-0 tw-z-10;
    }
  `,
  imports: [NgOptimizedImage],
  standalone: true,
})
export class ImageComponent implements AfterViewInit {
  readonly canvasTmpl = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly imgUrl = input.required<string>();

  ngAfterViewInit(): void {
    // const ctx = this.canvasTmpl()?.nativeElement.getContext('2d');
    // const img = new Image();
    // img.src = this.imgUrl();
    // img.onload = function () {
    //   ctx?.drawImage(img, 0, 0, 600, 400);
    // };
  }
}
