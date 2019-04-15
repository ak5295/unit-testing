import { TestService } from './test.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('testing the test service', () => {

  let testService: TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService],
      imports: [HttpClientTestingModule]
    });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    inject([HttpTestingController, TestService],
      (httpMock: HttpTestingController, service: TestService) => {

        // call the service
        service.getCurrentTime()
          .subscribe(
            res => {
              // any expects for the res
              return null;
            }
          );

        // create the mock expectation
        const req = httpMock.expectOne('http://worldclockapi.com/api/json/est/now');
        expect(req.request.method).toEqual('GET');

        // specify the output we are going to return
        req.flush({data: {}});
      }
    );
  });

  it('testMethodNoArgs returns an Observable', () => {
    const retValue = testService.testMethodNoArgs();

    expect(retValue).toBeTruthy();
  });

  it('no wait - testMethodNoArgs returns an Observable object with a key of value whose value is 3', () => {
    const retValue = testService.testMethodNoArgs();
    let value;

    retValue.subscribe(res => {
      value = res.value;
    });

    expect(value).toEqual(3);
  });

  it('testMethodNoArgs returns an Observable object with a key of value whose value is 3',
    (done: DoneFn) => {
      const retValue = testService.testMethodNoArgs();

      retValue.subscribe(res => {
        expect(res.value).toEqual(3);
        done();
      });
    }, 10000
  )
});
