import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnap } from '../model/face-snap.model';
import { FaceSnapService } from '../service/face-snap.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit,OnDestroy {
  faceSnaps!: FaceSnap[];
  private destroy$!:Subject<boolean>;
  constructor(private faceSnapService:FaceSnapService){

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    }
    ngOnInit(){
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps = this.faceSnapService.getAllFaceSnap();

    interval(1000).pipe (
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
  }
}
