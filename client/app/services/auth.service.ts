import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { User } from '../shared/models/user.model';
import { ToastComponent } from '../shared/toast/toast.component';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    public toast: ToastComponent
  ) {
    this.currentUser = new User();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    this.userService.login(emailAndPassword).subscribe(res => {
      localStorage.setItem('token', res.token);
      const decodedUser = this.decodeUserFromToken(res.token);
      this.setCurrentUser(decodedUser);
      this.router.navigate(['/']);
    },
    (error) => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin'
      ? (this.isAdmin = true)
      : (this.isAdmin = false);
  }
}
