// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// Services
import { AppState } from './app.state';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { SongService } from './services/song.service';
import { ChordService } from './services/chord.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

// Components
import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { SongFormComponent } from './song-form/song-form.component';
import { ChordFormComponent } from './chord-form/chord-form.component';
import { ChordSliderComponent } from './chord-slider/chord-slider.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Pipes
import { VideoTimePipe } from './shared/pipes/video-time.pipe';
import { ChordPipe } from './shared/pipes/chord.pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    SongFormComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    ChordFormComponent,
    ChordSliderComponent,
    VideoTimePipe,
    ChordPipe,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      },
    }),
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    SongService,
    ChordService,
    AppState,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
