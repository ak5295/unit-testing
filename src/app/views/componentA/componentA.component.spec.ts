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

const mockMsg2Args = {
  msg: 'pretended to sleep',
  list: [
    {id: 'item1', value: 'value1'},
    {id: 'item2', value: 'value2'},
    {id: 'item3', value: 'value3'},
    {id: 'item4', value: 'value4'},
    {id: 'item5', value: 'value5'}
  ]
};
describe('ComponentAComponent with both id1, id2 queryParams set', () => {
  beforeEach(async(() => {

    const testService = jasmine.createSpyObj(
      'TestService',
      ['testMethod2Args']
      );

    testService.testMethod2Args.and.returnValue(of(mockMsg2Args));

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
    expect(compA.model.msg).toEqual(mockMsg2Args.msg);
    expect(compA.model.list).toEqual(mockMsg2Args.list);
  });

  it('should call delay service, and populate the dom msg', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent = fixture.debugElement.componentInstance;

    // vvv
    fixture.detectChanges();

    // the route element of the component DOM
    const rootElem: HTMLElement = fixture.debugElement.nativeElement;

    // make sure the message is present
    const msgDiv = rootElem.querySelector('#msg-text');
    expect(msgDiv).toBeTruthy();
    expect(msgDiv.tagName.toLowerCase()).toEqual('div');
    expect(msgDiv.textContent).toEqual(mockMsg2Args.msg);
  });

  it('should call delay service, and populate the dom item list', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent = fixture.debugElement.componentInstance;

    // vvv
    fixture.detectChanges();

    // the route element of the component DOM
    const rootElem: HTMLElement = fixture.debugElement.nativeElement;

    // make sure all the li elements are present, for the mockMsg2Args.list
    mockMsg2Args.list.forEach(elem => {
      const elemId = elem.id;
      const elemValue = elem.value;

      const item1Span = rootElem.querySelector(`#${elemId}`);
      expect(item1Span).toBeTruthy();
      expect(item1Span.tagName.toLowerCase()).toEqual('span');
      expect(item1Span.textContent).toEqual(elemValue);
    });
  });

  it('should call delay service, and populate the dom item list with correct number of elements', () => {
    const fixture = TestBed.createComponent(ComponentAComponent);
    const compA: ComponentAComponent = fixture.debugElement.componentInstance;

    // vvv
    fixture.detectChanges();

    // the route element of the component DOM
    const rootElem: HTMLElement = fixture.debugElement.nativeElement;

    // make sure the list item ul has the correct number of children
    const itemListLiChildCollection =
      rootElem.querySelectorAll('#item-list > li');
    const numListItemLis = itemListLiChildCollection.length;
    expect(numListItemLis).toEqual(mockMsg2Args.list.length);
  });
});
