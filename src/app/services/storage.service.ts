import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }


  
  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  clear(): void {
    localStorage.clear();
  }

}