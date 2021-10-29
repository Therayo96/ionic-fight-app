import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonFightService } from '../shared/person-fight.service';

@Component({
  selector: 'app-list-fight',
  templateUrl: './list-fight.page.html',
  styleUrls: ['./list-fight.page.scss'],
})
export class ListFightPage implements OnInit {

  usersArray = [];

  constructor(
    private apiService: PersonFightService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchFighList();
    const listFight = this.apiService.getPersonFightList();
    listFight.snapshotChanges().subscribe(res => {
        this.usersArray = [];
        res.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.usersArray.push(a as 'User');
        });
    });

  }

    fetchFighList() {
    this.apiService.getPersonFightList().valueChanges().subscribe(res => {
      console.log('Fetched users list!');
    });
  }


}
