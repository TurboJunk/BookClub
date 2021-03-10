import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookclubService } from 'src/app/services/bookclub.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  columns = ['id', 'name', 'author'];

  constructor(private bc: BookclubService) { }

  ngOnInit(): void {
    this.bc.getCatalog()
      .subscribe(res => {
        this.books = res
      })
  }

}
