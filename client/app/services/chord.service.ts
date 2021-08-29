import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chord } from '../shared/models/chord.model';

@Injectable()
export class ChordService {
  constructor(private http: HttpClient) {}

  getChordsBySongId(songID: String): Observable<Chord[]> {
    return this.http.get<Chord[]>(`/api/chords/${songID}`);
  }

  countChords(): Observable<number> {
    return this.http.get<number>('/api/chords/count');
  }

  addChord(chord: Chord): Observable<Chord> {
    return this.http.post<Chord>('/api/chord', chord);
  }

  getChord(chord: Chord): Observable<Chord> {
    return this.http.get<Chord>(`/api/chord/${chord._id}`);
  }

  editChord(chord: Chord): Observable<any> {
    return this.http.put(`/api/chord/${chord._id}`, chord, {
      responseType: 'text',
    });
  }

  deleteChord(id: number): Observable<any> {
    return this.http.delete(`/api/chord/${id}`, { responseType: 'text' });
  }
}
