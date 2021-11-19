import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IonicAuthService } from '../shared/ionic-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  isLoading: boolean;
  isLoaded: boolean;
  isEdit: boolean;
  imageUpload: AngularFireUploadTask;
  percentage: Observable<number>;
  profile: any;
  profileName: any;
  profileImageUrl: any;
  profileEmail: any;
  profileAge: any;
  profileSize: any;
  profileWeight: any;
  form: FormGroup;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private loading: LoadingController,
    private ionicAuthService: IonicAuthService,
    public fb: FormBuilder
  ) {
    this.isLoading = false;
    this.isLoaded = false;
    this.isEdit = false;
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        const result = this.db.object(
          `/profile/${this.ionicAuthService.getUID()}`
        );
        const userProfile = result.valueChanges();
        userProfile.subscribe((profile) => {
          this.profileName = profile['name'];
          this.profileImageUrl = profile['photoUrl'];
          this.profileEmail = profile['email'];
          this.profileAge = profile['age'];
          this.profileSize = profile['size'];
          this.profileWeight = profile['weight'];
        });
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      age: [''],
      size: [''],
      weight: [''],
    });
  }

  async uploadImage(event) {
    const load = await this.loading.create({
      spinner: 'bubbles',
    });
    load.present();

    const file = event.target.files;
    const fileName = file[0];

    if (fileName.type.split('/')[0] !== 'image') {
      console.error('File is not an Image');
      return;
    }
    this.isLoading = true;
    this.isLoaded = false;

    const path = `loginUploads/${new Date().getTime()}_${fileName.name}`;

    const fileRef = this.storage.ref(path);
    this.imageUpload = this.storage.upload(path, fileName);
    this.loading.dismiss();

    this.percentage = this.imageUpload.percentageChanges();
    this.imageUpload.then((response) => {
      const imageFile = response.task.snapshot.ref.getDownloadURL();
      imageFile.then((downloadableUrl) => {
        this.db.object(`profile/${this.ionicAuthService.getUID()}`).update({
          photoUrl: downloadableUrl,
        });
      });
    });
  }

  enableProfile() {
    this.isEdit = true;
    console.log(this.isEdit);
  }
  cancel() {
    this.isEdit = false;
  }
  onFormSubmit() {
    if (!this.form.valid) {
      return false;
    } else {
      this.db.object(`profile/${this.ionicAuthService.getUID()}`).update({
        name: this.form.value.name,
        age: this.form.value.age,
        size: this.form.value.size,
        weight: this.form.value.weight,
      });
    }
  }
}
