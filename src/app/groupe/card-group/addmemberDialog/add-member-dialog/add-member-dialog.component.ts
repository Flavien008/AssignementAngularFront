import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../login/user.model';
import { StudentService } from '../../../../shared/user.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  standalone: true,
  imports:[MatFormFieldModule,MatInputModule,MatFormField,MatLabel,MatButton,CommonModule,FormsModule,MatDialogContent,MatDialogActions,MatCheckbox  ],
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit {
  students: User[]= [];
  selectedStudents: { [key: string]: boolean } = {};
  selectAll: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groupId: string },
    private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents(this.data.groupId);
    for (let i = 0; i < 10; i++) {
        const user: User = {
          _id: `id_${i}`,
          username: `user${i}`,
          password: `password${i}`,
          name: `User Name ${i}`,
          role: 'Role',
          matricule: `Matricule ${i}`
        };
        this.students.push(user);
      }
      console.log(this.students);
      
  }

  selectAllStudents(event: any) {
    this.selectAll = event.checked;
    this.students.forEach(student => {
      this.selectedStudents[student._id] = this.selectAll;
    });
  }


  getStudents(groupId: string) {
    // this.studentService.getStudents(groupId).subscribe((students: Student[]) => {
    //   this.students = students;
    // });
  }

  addMembers() {
    // Vous pouvez implémenter ici la logique pour ajouter les étudiants sélectionnés au groupe
    this.dialogRef.close(this.selectedStudents);
  }
}

