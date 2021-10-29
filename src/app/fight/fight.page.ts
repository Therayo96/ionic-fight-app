import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonFightService } from '../shared/person-fight.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.page.html',
  styleUrls: ['./fight.page.scss'],
})
export class FightPage implements OnInit {

  id: any;
  usersArray = [];


  constructor(private actRoute: ActivatedRoute, private apiService: PersonFightService) {
    this.id = this.actRoute.snapshot.paramMap.get('id');


    this.apiService.getPersonFight(this.id).valueChanges().subscribe(res => {
        this.usersArray.push(res);
    });
  }

  ngOnInit() {
  }

}
