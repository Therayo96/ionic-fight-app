import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonFightService } from '../shared/person-fight.service';

@Component({
  selector: 'app-make',
  templateUrl: './make.page.html',
  styleUrls: ['./make.page.scss'],
})
export class MakePage implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private personService: PersonFightService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
        name: [''],
        age: [''],
        size: [''],
        weight: [''],
    });
  }

  onFormSubmit() {
    if (!this.form.valid) {
        return false;
    } else {
        this.personService.createPersonFight(this.form.value).then(res => {
            this.form.reset();
            this.router.navigate(['list-fight']);
        }).catch(error => console.log(error));
    }
  }
}
