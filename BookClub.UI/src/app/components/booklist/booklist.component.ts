import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookclubService } from 'src/app/services/bookclub.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {

  books: Book[] = [];
  columns = ['name', 'author', 'id'];
  
  constructor(private bcs: BookclubService) { }

  ngOnInit(): void {
    this.bcs.getBooks()
      .subscribe(res => {
        this.books = res
      })
  }
  
  remove(book: Book) {
    this.bcs.removeFromList(book)
      .subscribe(res => {
        this.books = this.books.filter(b => b != res);
        this.ngOnInit();
      })
  }
}
