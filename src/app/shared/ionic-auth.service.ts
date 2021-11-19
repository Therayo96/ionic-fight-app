import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class IonicAuthService {

  private user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  createUser(value) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth
          .signOut()
          .then(() => {
            console.log('Sign out');
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return this.angularFireAuth.user;
  }


  setUser(userPro: User){
    return this.user = userPro;
  }

  getUID(): string {
    return this.user.uid;
  }

}
