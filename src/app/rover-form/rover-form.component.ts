import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// jared doesn't import router.
import { Observable } from 'rxjs/Observable';
import { MarsRoverApiPhotosService } from '../mars-rover-api-photos.service';
import { PhotoService } from '../photo.service';


@Component({
  selector: 'app-rover-form',
  templateUrl: './rover-form.component.html',
  styleUrls: ['./rover-form.component.css'],
  providers: [ MarsRoverApiPhotosService, PhotoService ]
})

export class RoverFormComponent implements OnInit {
  photos: any[] = null;
  noPhotos: boolean = false;

  constructor(
    private router: Router,
    private marsRoverPhotos: MarsRoverApiPhotosService
  ) { }
  saveRoverImages(date, camera) {
    this.marsRoverPhotos.saveImages(date, camera);
    alert(`The images from ${date} taken by the ${camera} camera have been saved to the database.`);
  };


  getRoverImages(date: string, camera: string) {
    this.noPhotos = false;
    this.marsRoverPhotos.getByDateAndCamera(date, camera).subscribe(response => {
      if (response.json().photos.length) {
        this.photos = response.json();
      } else {
        this.noPhotos = true;
      }
    });
  }

  ngOnInit() {
  }

}
