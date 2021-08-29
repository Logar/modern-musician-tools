import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import * as cloneDeep from 'lodash/cloneDeep';

import { ToastComponent } from '../shared/toast/toast.component';
import { AbstractObserver } from '../shared/abstract/observer.abstract';

import { SongService } from '../services/song.service';
import { AppState } from '../app.state';

import { Song } from '../shared/models/song.model';

@Component({
  selector: 'song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
  providers: [SongService],
})
export class SongFormComponent extends AbstractObserver {
  // Declare model types
  songModel: Song;
  videoFile: any;

  // Access video DOM
  @ViewChild('inputVideo') inputVideo: ElementRef;
  @Input() videoTime: number;

  submitted: boolean;
  formType: string;
  bgColor: string;

  public constructor(
    protected _songService: SongService,
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

    if (this.formType === 'add') {
      this.songModel = new Song();
      this.bgColor = 'var(--light-purple)';
    } else if (this.formType === 'edit') {
      this.songModel = cloneDeep(this.appState.activeSong);
      this.bgColor = 'var(--light-pink)';
    }
  }

  public setBgColor(): Object {
    return {
      'background-color': `${this.bgColor}`,
    };
  }

  public videoFileChanged(event: any) {
    // Prevent event bubbling
    event.stopPropagation();

    let self = this;

    // Initialize fileReader
    let fileReader = new FileReader();

    fileReader.readAsDataURL(this.inputVideo.nativeElement.files[0]);

    // try to read file
    fileReader.onload = (file) => {
      this.songModel = Object.assign(this.songModel, {
        videoSrc: file.target.result,
      });
    };

    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  }

  public onSubmitSong(): void {
    this.submitted = true;
    switch (this.formType) {
      case 'add':
        this._songService
          .addSong(this.songModel)
          .subscribe(
            super.observable(
              this.toast.setMessage.bind(
                this.toast,
                'Added your new chord.',
                'success'
              )
            )
          );
        break;
      case 'edit':
        this._songService
          .editSong(this.songModel)
          .subscribe(
            super.observable(
              this.toast.setMessage.bind(
                this.toast,
                'Your changes were saved.',
                'success'
              )
            )
          );
        break;
    }
  }
}
