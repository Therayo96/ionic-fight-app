import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicAuthService } from '../shared/ionic-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg: string;
  errorMsg: string;
  url = 'dashboard';

  error_msg = {
    'email': [
      {
        type: 'required',
        message: 'Provide email.'
      },
      {
        type: 'pattern',
        message: 'Email is not valid.'
      }
    ],
    'password': [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      }
    ]
  };


  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((resp) => {
        this.errorMsg = '';
        console.log(resp.user);

        if(resp.user){
            this.ionicAuthService.setUser({
                username: resp.user.displayName,
                uid: resp.user.uid
            });
        }

        const userProfile = this.db.object(`profile/${this.ionicAuthService.getUID()}`);
        userProfile.valueChanges().subscribe(result => {
          if(!result){
            this.db.object(`profile/${this.ionicAuthService.getUID()}`).set({
                name: resp.user.displayName,
                email: resp.user.email
            });
            this.url = 'user-profile';
          }
          this.router.navigateByUrl(this.url);
        });
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });
  }

  goToSignup() {
    this.router.navigateByUrl('register');
  }
}
