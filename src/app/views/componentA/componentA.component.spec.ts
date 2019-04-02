import { ComponentAComponent } from 'src/app/views/componentA/componentA.component';
import { AppComponent } from 'src/app/app.component';

import { TestBed, async } from '@angular/core/testing';
import { Routes, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [
  {path: '', component: ComponentAComponent}
];

describe('ComponentAComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        ComponentAComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('model should start as empty', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent =
      fixture.debugElement.componentInstance;

    const activatedRoute: any =
      fixture.debugElement.injector.get(ActivatedRoute) as any;

    activatedRoute.testQueryParamMap = {
      id1: 123,
      id2: 124
    };
    expect(compA.model.id1).toBeNull();
    expect(compA.model.id2).toBeNull();
    expect(compA.model.list).toEqual([]);
  });

  it('model should start as empty', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent =
      fixture.debugElement.componentInstance;

    const activatedRoute: any =
      fixture.debugElement.injector.get(ActivatedRoute) as any;

    activatedRoute.testQueryParamMap = {
      id1: 123,
      id2: 124
    };
    expect(compA.model.id1).toBeNull();
    expect(compA.model.id2).toBeNull();
    expect(compA.model.list).toEqual([]);
  });

});
