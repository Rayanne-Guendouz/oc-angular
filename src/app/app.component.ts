import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { __values } from 'tslib';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  interval$!: Observable<string>;

  ngOnInit(){
    this.interval$ = interval(1000).pipe(
      filter(value=>value%3===0),
      map(value=> value%2===0?
      `je suis ${value} et je suis paire` :
      `je suis ${value} et je suis impair`
      ),
      tap(text => this.logger(text))

      )

  }
  logger(text: string): void {
    console.log(`Log: ${text}`);
  }


}
