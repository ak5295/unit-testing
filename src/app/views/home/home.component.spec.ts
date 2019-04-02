import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from './home.component';

import { TestBed, async } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes =[
  {path: '', component: HomeComponent}
];

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        HomeComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag with id pageTitle', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1#pageTitle').textContent).toContain('Home Component');
  });

  it('should render "SSA Claimant Identity Information" in a h3 tag with class claimantHeader', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3.claimantHeader').textContent).toContain('SSA Claimant Identity Information');
  });
});
