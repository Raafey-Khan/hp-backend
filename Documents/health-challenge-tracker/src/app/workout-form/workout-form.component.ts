import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User } from '../models/workout.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  onSubmit(): void {
    const newUser: User = {
      id: new Date().getTime(), // Simple ID generation
      name: this.userName,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
    };
    this.workoutService.saveUser(newUser);
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
