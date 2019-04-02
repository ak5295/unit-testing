import { Injectable } from '@angular/core';
import { Observable, from} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DelayService {

  public delay2(arg1, arg2): Observable<void> {

    return from(this.sleep(5000));
  }

  public delay1(arg1): Observable<void> {

    return from(this.sleep(5000));
  }

  public delay(): Observable<void> {

    return from(this.sleep(5000));
  }

  private sleep(ms): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
