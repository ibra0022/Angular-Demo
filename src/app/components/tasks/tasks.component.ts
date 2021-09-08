import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from './../../services/task.service';
import { Subscription } from 'rxjs';
import { UiService } from './../../services/ui.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  allTasks: Task[] = [];

  showAddTask: boolean;
  subscription: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((resTask) => {
      return (this.allTasks = resTask);
    });
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTaskService(task)
      .subscribe(
        () => (this.allTasks = this.allTasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminderService(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService
      .addTaskService(task)
      .subscribe((t) => this.allTasks.push(t));
  }
}
