import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ImageComponent } from './components/image.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'avi-root',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly images;

  constructor(private http: HttpClient) {
    this.images = toSignal(
      this.http.get<string[]>('/images-data.json').pipe(
        map((names) => names.map((name) => `/images/${name}`)),
        map((urls) => {
          const blocks: string[][] = [];

          const isNextAlone = (
            lastBlock?: string[],
            prevLastBloack?: string[]
          ) => lastBlock?.length === 2 && prevLastBloack?.length === 2;

          urls.forEach((url) => {
            const lastBlock = blocks.at(-1);

            const prevLastBloack = blocks.at(-2);
            const prevPrevLastBloack = blocks.at(-3);

            if (
              !lastBlock ||
              lastBlock.length === 2 ||
              isNextAlone(prevPrevLastBloack, prevLastBloack)
            ) {
              blocks.push([url]);
            } else {
              lastBlock.push(url);
            }
          });

          return blocks;
        })
      )
    );
  }
}
