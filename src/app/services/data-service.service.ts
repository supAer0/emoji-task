import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';
import { Emoji } from '../models/emoji';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const LIKED_STORAGE = 'liked';
const DELETED_STORAGE = 'delete';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private httpClient: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {}

  gitApiUrl: string = 'https://api.github.com';

  public getEmojis(type: string){
    switch(type) {
      case 'like': return new Observable<Emoji[]> ((observer) => observer.next(this.storage.get(LIKED_STORAGE)));
      case 'delete': return new Observable<Emoji[]> ((observer) => observer.next(this.storage.get(DELETED_STORAGE)));
      default: return this.httpClient.get<Emoji[]>(`${this.gitApiUrl}/emojis`).pipe(map(e => this.parseData(e)));
    }
  }

  public parseData(e) {
    let emojis: Emoji[] = [];
    for(let key in e) {
      let emoji = new Emoji(key, e[key], false, false);
      if (this.checkEmojiOnStorage(DELETED_STORAGE, emoji.name)) {
        continue;
      }
      if (this.checkEmojiOnStorage(LIKED_STORAGE, emoji.name)) {
        emoji.isLike = true;
      }
      emojis.push(emoji);
    }
    return emojis;
  }

  public likeEmoji(emoji: Emoji) {
    emoji.isLike = true;
    this.addEmojiToStorage(LIKED_STORAGE, emoji);
  }

  public unLikeEmoji(emoji: Emoji) {
    emoji.isLike = false;
    this.removeEmojiFromStorage(LIKED_STORAGE, emoji);
  }

  public deleteEmoji(emoji: Emoji) {
    emoji.isDelete = true;
    this.addEmojiToStorage(DELETED_STORAGE, emoji);
  }

  public unDeleteEmoji(emoji: Emoji) {
    emoji.isDelete = false;
    this.removeEmojiFromStorage(DELETED_STORAGE, emoji);
  }

  public addEmojiToStorage(key: string, emoji: Emoji) {
    if (!this.storage.has(key)){
      this.storage.set(key, [emoji]);
      return;
    }
    let storageArray = this.storage.get(key);
    if (!storageArray.some((e: Emoji) => e.name === emoji.name)) {
      storageArray.push(emoji);
      this.storage.set(key, storageArray);
    }
  }

  public removeEmojiFromStorage(key: string, emoji: Emoji) {
    let storageArray = this.storage.get(key);
    for (let i = 0; i < storageArray.length; i++) {
      if (storageArray[i].name === emoji.name) {
        storageArray.splice(i,1);
        this.storage.set(key, storageArray);
        return;
      }
    }
  }

  public checkEmojiOnStorage(key: string, emojiName: string) {
    if (this.storage.has(key)){
      return this.storage.get(key).some((e: Emoji) => e.name === emojiName)
    }
  }
}
