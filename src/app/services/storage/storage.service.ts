import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

// JSON "set" example
  async setObject(key: string, value: any) {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  // JSON "get" example
  async getObject(key: string): Promise<{value: any}> {
    const ret = await Preferences.get({key});
    return JSON.parse(ret.value);
  }
  
  async removeItem(key: string)
  {
    await Preferences.remove({key});
  }

  async clear()
  {
    await Preferences.clear();
  }

}