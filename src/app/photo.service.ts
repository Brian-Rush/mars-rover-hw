import { Injectable } from '@angular/core';
import { Photo } from './photo.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class PhotoService {
  savedPhotos: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) {
    this.savedPhotos = af.list('savedPhotos');
  }

  addPhoto(newPhoto: Photo) {
    this.savedPhotos.push(newPhoto);
  }

  getPhotos() {
    return this.savedPhotos;
  }
  deletePhoto(selectedPhoto) {
    let foundPhoto = this.getPhotoById(selectedPhoto.$key);
    foundPhoto.remove();
  }
  getPhotoById(photoId: string) {
    return this.af.object('photos/' + photoId);
  }

}
