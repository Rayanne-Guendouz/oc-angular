import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FaceSnap } from '../model/face-snap.model';
import { FaceSnapService } from '../service/face-snap.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent {
  faceSnap!:FaceSnap;
  snapped!:boolean;
  snaptxt!:string;

  constructor(private faceSnapService:FaceSnapService,
    private route:ActivatedRoute){

  }


  ngOnInit(){
    const faceSnapId = +this.route.snapshot.params['id'];
    this.snapped = false;
    this.snaptxt = "Like";
    this.faceSnap = this.faceSnapService.getFaceSnapbyId(faceSnapId);
  }
  onSnap(){
    if (this.snapped){
      this.faceSnapService.likeFaceSnapbyId(this.faceSnap.id,'-');
      this.snapped = false;
      this.snaptxt = "Like";
    }
    else {
      this.faceSnapService.likeFaceSnapbyId(this.faceSnap.id,'+');
      this.snapped = true;
      this.snaptxt = "Liked"
    }
  }
}
