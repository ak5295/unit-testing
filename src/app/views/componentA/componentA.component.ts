import { DelayService } from '../../services/delay/delay.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-views-componenta',
  templateUrl: './componentA.component.html',
  styleUrls: ['./componentA.component.css']
})
export class ComponentAComponent implements OnInit {

  model: any = {
    id1: null,
    id2: null,
    list: []
  };

  constructor(private delayService: DelayService, private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {

        this.model.id1 = params['id1'];
        this.model.id2 = params['id2'];

        if (this.model.id1 && this.model.id1.length() > 0) {
          if (this.model.id2 && this.model.id2.length() > 0) {
            this.delayService.delay2(this.model.id1, this.model.id2)
              .subscribe(
                () => {
                  this.model.list = [
                    {id: 'item1', val: 'this is item1'},
                    {id: 'item1', val: 'this is item1'},
                    {id: 'item1', val: 'this is item1'}
                  ];
                }
              );
          } else {
            this.delayService.delay1(this.model.id1)
              .subscribe(
                () => {
                  this.model.list = [
                    {id: 'item1', val: 'this is item1'},
                    {id: 'item1', val: 'this is item1'},
                    {id: 'item1', val: 'this is item1'}
                  ];
                }
              );
          }
        }
      }
    );
  }
}



