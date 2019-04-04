import { TestService } from '../../services/test/test.service';

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

  constructor(private testService: TestService, private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {

    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {

        const id1 = params.id1;
        const id2 = params.id2;

        if (id1 && id1.length > 0) {

          this.model.id1 = id1;

          if (id2 && id2.length > 0) {
            this.model.id2 = id2;

            this.testService.testMethod2Args(this.model.id1, this.model.id2)
              .subscribe(
                (res) => {
                  this.model.msg = res.msg;
                  this.model.list = res.list;
                }
              );
          } else {
            this.testService.testMethod1Args(this.model.id1)
              .subscribe(
                (res) => {
                  this.model.msg = res.msg;
                  this.model.list = res.list;
                }
              );
          }
        }
      }
    );
  }
}



