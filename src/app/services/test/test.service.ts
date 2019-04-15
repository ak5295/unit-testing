import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TestService {

  public constructor(private http: HttpClient) {}

  public getCurrentTime(): Observable<Date> {
    return this.http.get('http://worldclockapi.com/api/json/est/now')
      .pipe(map(res => new Date()));
  }

  public testMethod2Args(arg1, arg2): Observable<any> {

    const retVal = {
      msg: 'pretended to sleep',
      list: [
        {id: 'item1', value: 'value1'},
        {id: 'item2', value: 'value2'},
        {id: 'item3', value: 'value3'},
        {id: 'item4', value: 'value4'},
        {id: 'item5', value: 'value5'}
      ]
    };

    return from(this.sleep(5000, retVal));
  }

  public testMethod1Args(arg1): Observable<any> {

    const retVal = {};
    return from(this.sleep(5000, retVal));
  }

  public testMethodNoArgs(): Observable<any> {

    const retVal = {value: 3};
    return from(this.sleep(5000, retVal));
  }

  private sleep(ms, retVal): Promise<any> {
    return new Promise(resolve => setTimeout(() => resolve(retVal), ms));
  }
}
