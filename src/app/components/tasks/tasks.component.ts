import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  allTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((resTask) => {
      return (this.allTasks = resTask);
    });
  }
}
