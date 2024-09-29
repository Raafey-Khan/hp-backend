import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { WorkoutService } from '../workout.service';
import { User } from '../models/workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  filterType: string = '';
  workoutTypes: string[] = [];
  paginatedUsers: User[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.workoutService.getUsers();
    this.workoutTypes = [...new Set(this.users.flatMap(user => user.workouts.map(workout => workout.type)))];
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredUsers = this.users;

    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    if (this.filterType) {
      filteredUsers = filteredUsers.filter(user => user.workouts.some(workout => workout.type === this.filterType));
    }

    this.paginatedUsers = filteredUsers.slice(0, 5); // Example for pagination
  }

  onPageChange(event: any): void {
    this.paginatedUsers = this.users.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }
}
