import { TestService } from './../../services/test/test.service';
import { ComponentAComponent } from 'src/app/views/componentA/componentA.component';
import { AppComponent } from 'src/app/app.component';

import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ComponentAComponent no queryParams', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([
        {path: '', component: ComponentAComponent}
      ])],
      declarations: [
        AppComponent,
        ComponentAComponent
      ],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not call testService.testMethod2Args, and model should be empty', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    expect(compA.model.id1).not.toBeTruthy();
    expect(compA.model.id2).not.toBeTruthy();
    expect(compA.model.list).toEqual([]);
  });

});

const mockMsg = {
  msg: 'pretended to sleep',
  list: []
};
describe('ComponentAComponent with both id1, id2 queryParams set', () => {
  beforeEach(async(() => {

    const testService = jasmine.createSpyObj(
      'TestService',
      ['testMethod2Args']
      );

    const testMethod2ArgsSpy = testService.testMethod2Args.and.returnValue(of(mockMsg));

    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([
        {path: '', component: ComponentAComponent}
      ])],
      declarations: [
        AppComponent,
        ComponentAComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {
          queryParams: of({id1: '123', id2: '245'})
        }}
        ,{provide: TestService, useValue: testService}
      ]
    }).compileComponents();
  }));

  it('should call delay service, and populate the model', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent = fixture.debugElement.componentInstance;

    // vvv
    fixture.detectChanges();

    // right after ngOninit called
    expect(compA.model.id1).toMatch('123');
    expect(compA.model.id2).toMatch('245');
    expect(compA.model.msg).toEqual(mockMsg.msg);
    expect(compA.model.list).toEqual(mockMsg.list);
  });
});
