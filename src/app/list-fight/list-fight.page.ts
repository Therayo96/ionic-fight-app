import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { PersonFightService } from '../shared/person-fight.service';

@Component({
  selector: 'app-list-fight',
  templateUrl: './list-fight.page.html',
  styleUrls: ['./list-fight.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListFightPage implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;
  usersArray = [];

  config: SwiperOptions = {
    spaceBetween: 50,
    pagination: true
  }

  constructor(
    private apiService: PersonFightService,
    private router: Router
  ) { }
  ngAfterContentChecked(): void {
    if(this.swiper)
    {
      this.swiper.updateSwiper({});
    }
  }

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
        console.log(this.usersArray);
    });

  }

    fetchFighList() {
    this.apiService.getPersonFightList().valueChanges().subscribe(res => {
      console.log('Fetched users list!');
    });
  }


}
