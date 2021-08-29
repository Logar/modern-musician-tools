import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AbstractObserver } from '../shared/abstract/observer.abstract';

import { ToastComponent } from '../shared/toast/toast.component';

import { Song } from '../shared/models/song.model';
import { Chord } from '../shared/models/chord.model';

import { SongService } from '../services/song.service';
import { ChordService } from '../services/chord.service';
import { AppState } from '../app.state';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
  providers: [SongService, ChordService],
})
export class SongComponent extends AbstractObserver implements OnInit {
  // Access video DOM
  @ViewChild('video') video: ElementRef;

  songModels: Song[];
  chordModels: Chord[];
  activeSong: Song;

  toggleForms: string;
  videoTime: number;
  // Toggle for editing chord data
  toggleEditMode: boolean;

  public constructor(
    protected _songService: SongService,
    protected _chordService: ChordService,
    public appState: AppState,
    public toast: ToastComponent
  ) {
    // Invoke parent class constructor
    super();

    this.songModels = Array();
    this.chordModels = Array();
    this.activeSong = Object();
  }

  ngOnInit(): void {
    if (this.songModels.length === 0) {
      // Invoke retrieval, transform, and setter of all songs stream
      this._songService
        .getAllSongs()
        .subscribe(
          super.observable(
            this.setSongModels,
            this.setActiveSongModel,
            this.getChordsBySongId
          )
        );
    }
  }

  public onChangeSong(event: any) {
    // event.target.value is the song id
    this.appState.activeSong = this.activeSong = this.findSongById(
      this.songModels,
      event.target.value
    );
    // Invoke function for getting chords for selected song
    this.getChordsBySongId();
    // Stop event from bubbling
    event.stopPropagation();
  }

  public getChordsBySongId() {
    this._chordService
      .getChordsBySongId(this.activeSong._id)
      .subscribe(super.observable(this.setChordModels));
  }

  public setChordModels(httpData: Array<Object>) {
    this.appState.chordModels = this.chordModels =
      this.assignChordModels(httpData);
  }

  public assignChordModels(httpData: Array<Object>) {
    return httpData.map((element: Object) => {
      return Object.assign(new Chord(), element);
    });
  }

  public setSongModels(httpData: Array<Object>) {
    this.appState.songModels = this.songModels =
      this.assignSongModels(httpData);
  }

  public assignSongModels(httpData: Array<Object>) {
    return httpData.map((element: Object) => {
      return Object.assign(new Song(), element);
    });
  }

  public findSongById(songs: Song[], songID: string): Song {
    return songs.find((element) => element._id === songID);
  }

  public setActiveSongModel() {
    this.appState.activeSong = this.activeSong = this.findSongById(
      this.songModels,
      this.songModels[0]._id
    );
  }

  public onChangePlayback(event: any): void {
    this.video.nativeElement.playbackRate = event.target.value;
    // Stop event from bubbling
    event.stopPropagation();
  }
}
