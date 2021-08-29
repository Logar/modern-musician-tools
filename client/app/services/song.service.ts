import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Song } from '../shared/models/song.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>('/api/songs');
  }

  countSongs(): Observable<number> {
    return this.http.get<number>('/api/songs/count');
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>('/api/song', song);
  }

  getSongById(song: Song): Observable<Song> {
    return this.http.get<Song>(`/api/song/${song._id}`);
  }

  editSong(song: Song): Observable<any> {
    return this.http.put(`/api/song/${song._id}`, song, {
      responseType: 'text',
    });
  }

  deleteSong(song: Song): Observable<any> {
    return this.http.delete(`/api/song/${song._id}`, { responseType: 'text' });
  }
}
