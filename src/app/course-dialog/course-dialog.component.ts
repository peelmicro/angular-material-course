import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Course } from '../model/course';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) {description, longDescription, category}: Course,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private fb: FormBuilder
  ) {
    this.description = description;
    this.form = this.fb.group({
      description: [description, Validators.required],
      category: [category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [longDescription, Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
