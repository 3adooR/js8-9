import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  source = localStorage;

  constructor() {
  }

  /**
   * Get from LocalStorage
   * @param key
   */
  get(key: string): string {
    return this.source.getItem(key);
  }

  /**
   * Set to LocalStorage
   * @param key
   * @param val
   */
  set(key: string, val: string) {
    this.source.setItem(key, val);
  }

  /**
   * Clear LocalStorage
   */
  clear(): void {
    this.source.clear();
  }
}
