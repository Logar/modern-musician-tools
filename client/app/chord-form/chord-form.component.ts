import { Component, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { AbstractObserver } from '../shared/abstract/observer.abstract';
import { ToastComponent } from '../shared/toast/toast.component';

import { Chord } from '../shared/models/chord.model';
import { Song } from '../shared/models/song.model';

import { SongService } from '../services/song.service';
import { ChordService } from '../services/chord.service';
import { AppState } from '../app.state';

@Component({
  selector: 'chord-form',
  templateUrl: './chord-form.component.html',
  styleUrls: ['./chord-form.component.scss'],
  providers: [SongService, ChordService],
})
export class ChordFormComponent extends AbstractObserver {
  // Declare model types
  chordModel: Chord;
  activeSong: Song;

  submitted: boolean;
  showAlias: boolean;
  formType: string;
  videoTime: number;
  videoTimeSubscription: Subscription;

  public constructor(
    protected _songService: SongService,
    protected _chordService: ChordService,
    public appState: AppState,
    public element: ElementRef,
    public toast: ToastComponent
  ) {
    // Invoke parent class constructor
    super();

    // Initialize form type to determine if add or edit form
    this.formType = element.nativeElement.getAttribute('data-formtype');
    // Reset form submitted to false
    this.submitted = false;
    this.showAlias = false;

    if (this.formType === 'add') {
      this.chordModel = new Chord(
        null,
        this.appState.activeSong._id,
        this.videoTime
      );
    } else if (this.formType === 'edit') {
      // @todo implement
    }
  }

  ngOnInit() {
    this.videoTimeSubscription = this.appState.videoTime.subscribe(
      (time) => (this.videoTime = time)
    );
  }

  ngOnDestroy() {
    this.videoTimeSubscription.unsubscribe();
  }

  public onSubmitChord(): void {
    this.submitted = true;
    // Update chord model to current timestamp
    this.chordModel = Object.assign(this.chordModel, {
      timestamp: this.videoTime,
    });
    switch (this.formType) {
      case 'add':
        this._chordService
          .addChord(this.chordModel)
          .subscribe(
            super.observable(
              this.addChordCallback,
              this.toast.setMessage.bind(
                this.toast,
                'Added your new chord.',
                'success'
              )
            )
          );
        break;
    }
  }

  public addChordCallback() {
    console.log('After Submit', this.chordModel);
  }
}
