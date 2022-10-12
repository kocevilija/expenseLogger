import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async saveToLocalStorage(key: string, value: any) {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const ret = await Preferences.get({key});
    return JSON.parse(ret.value);
  }
  
  async removeFromLocalStorage(key: string): Promise<void>
  {
    return await Preferences.remove({key});
  }

  async clearLocalStorage(): Promise<void>
  {
    await Preferences.clear();
  }

}