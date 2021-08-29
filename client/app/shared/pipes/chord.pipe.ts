import { Pipe, PipeTransform } from '@angular/core';

import { Chord } from '../models/chord.model';

@Pipe({
  name: 'formatChord',
})
export class ChordPipe implements PipeTransform {
  transform(chord: Chord): string {
    const numeral = chord.numeral ? `<div>${chord.numeral}</div>` : '';
    const bass = chord.bass ? `/${chord.bass}` : '';
    return `<div>${chord.root}${chord.quality}${bass}</div>${numeral}`;
  }
}
