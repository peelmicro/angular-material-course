import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Course } from '../model/course';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  editCourse({description, longDescription, category}: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {description, longDescription, category};

    const dialogRef = this.dialog.open(
      CourseDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      val => console.log('Dialog output:', val)
    );
  }
}
