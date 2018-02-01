import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../../core/services/logging/log.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 * Low level service for retrieving and caching Eve static data.
 */
@Injectable()
export class EveStaticDataService {
  private cache = new Map<string, Observable<any>>();

  constructor(public log: LogService,
              private http: HttpClient) {
  }

  /**
   * Retrieves a static data file caching it for any future requests.
   * @param {string} path relative path to JSON export file
   * @returns {Observable<any>} static data
   */
  get(path: string): Observable<any> {
    let retval = this.cache[path];
    if (!retval) {
      retval = new ReplaySubject<any>(1);
      this.http.get(`assets/sde/${path}`)
        .subscribe(data => {
          this.cache[path] = data;
          retval.next(data);
        }, err => {
          retval.error(err);
        });
    }
    return retval;
  }
}
