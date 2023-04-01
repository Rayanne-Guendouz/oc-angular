import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FaceSnap } from '../model/face-snap.model';
import { FaceSnapService } from '../service/face-snap.service';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapsForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!:RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private faceSnapService:FaceSnapService,
    private rooter: Router) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapsForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
        },
        {
          updatOn:'blur'
        }
        );
        this.faceSnapPreview$ = this.snapsForm.valueChanges.pipe(
          map(formValues =>({
            ...formValues,
            createdDate: new Date(),
            id:0,
            snaps:0,
          }) )
        );

  }

  onSubmitForm(): void {
    this.faceSnapService.addFaceSnap(this.snapsForm.value);
    this.rooter.navigateByUrl('/facesnaps');
  }
}
