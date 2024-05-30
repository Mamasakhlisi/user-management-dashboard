import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/auth';
import { MatListModule } from '@angular/material/list';
import { NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, NgForOf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public usersData: IUser[] = [];
  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.initData();
  }
  public initData() {
    this.usersService.getUsers().subscribe((res) => (this.usersData = res));
  }
}
