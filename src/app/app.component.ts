import { Component} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ TaskComponent, RouterModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task Frontend';
}
