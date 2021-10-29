import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { PersonFight } from './person-fight';


@Injectable({
  providedIn: 'root'
})
export class PersonFightService {
   personFightList: AngularFireList<any>;
   personFightRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  createPersonFight(person: PersonFight) {
    return this.personFightList.push({
      name: person.name,
      age: person.age,
      size: person.size,
      weight: person.weight
    });
  }


  getPersonFightList(){
      this.personFightList = this.db.list('/personFight');
      return this.personFightList;
  }

  getPersonFight(id: string){
    this.personFightRef = this.db.object('/personFight/' + id);
    return this.personFightRef;
  }

}
