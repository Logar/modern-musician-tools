import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Song } from './shared/models/song.model';
import { Chord } from './shared/models/chord.model';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private _songModels: Song[];
  private _chordModels: Chord[];
  private _activeSong: Song;

  private _videoTime: BehaviorSubject<number>;
  public videoTime: Observable<number>;

  constructor() {
    this._songModels = Array();
    this._chordModels = Array();
    this._activeSong = Object();
    // Initialize video time to zero
    this._videoTime = new BehaviorSubject<number>(0);
    this.videoTime = this._videoTime.asObservable();
  }

  changeVideoTime(time: number) {
    this._videoTime.next(time);
  }

  get activeSong(): Song {
    console.log('Active Song Getter: ', this._activeSong);
    return this._activeSong;
  }
  set activeSong(song: Song) {
    console.log('Active Song Setter: ', song);
    this._activeSong = song;
  }
  get songModels(): Song[] {
    console.log('Song Models Getter: ', this._songModels);
    return this._songModels;
  }
  set songModels(songs: Song[]) {
    console.log('Song Models Setter: ', songs);
    this._songModels = songs;
  }
  get chordModels(): Chord[] {
    console.log('Chord Models Getter: ', this._chordModels);
    return this._chordModels;
  }
  set chordModels(chords: Chord[]) {
    console.log('Chord Models Setter: ', chords);
    this._chordModels = chords;
  }
}
