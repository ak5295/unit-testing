import { Injectable } from '@angular/core';
import { Observable, from} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestService {

  public testMethod2Args(arg1, arg2): Observable<any> {

    return from(this.sleep(5000));
  }

  public testMethod1Args(arg1): Observable<any> {

    return from(this.sleep(5000));
  }

  public testMethodNoArgs(): Observable<any> {

    return from(this.sleep(5000));
  }

  private sleep(ms): Promise<string> {
    return new Promise(resolve => setTimeout(() => resolve('completed sleeping'), ms));
  }
}
