import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { AbstractObserver } from '../shared/abstract/observer.abstract';
import { ToastComponent } from '../shared/toast/toast.component';

import { Song } from '../shared/models/song.model';
import { Chord } from '../shared/models/chord.model';

import { ChordService } from '../services/chord.service';
import { AppState } from '../app.state';

@Component({
  selector: 'chord-slider',
  templateUrl: './chord-slider.component.html',
  styleUrls: ['./chord-slider.component.scss'],
  providers: [ChordService],
})
export class ChordSliderComponent extends AbstractObserver {
  // Retrieve input parameters
  @Input() chordModels: Chord[];
  @Input() activeSong: Song;
  @Input() toggleEditMode: boolean;

  // Access video DOM
  @ViewChild('video') video: ElementRef;
  @ViewChild('chordSlider') chordSlider: ElementRef;

  activeChord: any;
  videoTime: number;
  videoTimeSubscription: Subscription;

  public constructor(
    protected _chordService: ChordService,
    public toast: ToastComponent,
    public appState: AppState
  ) {
    // Invoke parent class constructor
    super();
  }

  ngOnInit() {
    this.videoTimeSubscription = this.appState.videoTime.subscribe(
      (time) => (this.videoTime = time)
    );
  }

  ngOnDestroy() {
    this.videoTimeSubscription.unsubscribe();
  }

  public onChangeVideoTime(event: any): void {
    // Stop event from bubbling
    event.stopPropagation();

    const videoTime = event.srcElement.currentTime;
    this.appState.changeVideoTime(videoTime);

    const domElements: any = Array.from(
      this.chordSlider.nativeElement.children
    );
    if (domElements.length > 0) {
      // Sort by closest timestamp to video time
      domElements.sort((a: any, b: any) => {
        const prev = a.getAttribute('data-timestamp');
        const current = b.getAttribute('data-timestamp');
        return Math.abs(videoTime - prev) - Math.abs(videoTime - current);
      });
      // Compensate closest timestamp by substracting by 0.3
      if (domElements[0].getAttribute('data-timestamp') - 0.3 <= videoTime) {
        // Scroll to current chord and center horizontally
        domElements[0].scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'center',
        });
        // Active chord is initialized to closest
        this.activeChord = domElements[0];
      }
    }
  }

  public onDeleteChord(event: any): void {
    // Stop event from bubbling
    event.stopPropagation();
    const chord = event.currentTarget.parentElement;
    const message = 'This will permanently delete the chord. Are you sure?';

    if (confirm(message)) {
      this._chordService
        .deleteChord(chord.getAttribute('id'))
        .subscribe(
          super.observable(
            this.toast.setMessage.bind(this.toast, 'Deleted chord.', 'success')
          )
        );
      chord.remove();
    }
  }
}
