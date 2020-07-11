import { Injectable } from '@angular/core';

export class LoggingService {
  log: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.log);
    this.log = message;
  }
}
