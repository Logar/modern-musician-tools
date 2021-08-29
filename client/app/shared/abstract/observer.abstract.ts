import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';

@Injectable()
export abstract class AbstractObserver {
  constructor() {}

  public observable(...callbacks: Array<Function>): Observer<Object> {
    // Create observer object
    return {
      next: (response) => {
        callbacks.forEach((f) => f.call(this, response));
      },
      error: (error) => console.error('HTTP Error: ', error),
      complete: () => console.log(),
    };
  }
}
