import { Component,OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaceSnap } from '../model/face-snap.model';
import { FaceSnapService } from '../service/face-snap.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!:FaceSnap;
  snapped!:boolean;
  snaptxt!:string;

  constructor(private faceSnapService:FaceSnapService,
    private route:Router){

  }


  ngOnInit(){
    this.snapped = false;
    this.snaptxt = "Like";
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

  onViewFaceSnap() {
    this.route.navigateByUrl(`facesnap/${this.faceSnap.id}`);
  }
}
