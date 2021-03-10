import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookclubService } from 'src/app/services/bookclub.service';

@Component({
  selector: 'app-aviablebooks',
  templateUrl: './aviablebooks.component.html',
  styleUrls: ['./aviablebooks.component.scss']
})
export class AviablebooksComponent implements OnInit {

  books: Book[] = [];
  columns = ['name', 'author', 'id'];
  listLimit: number = 0;

  constructor(private bcs: BookclubService) { }

  ngOnInit(): void {
    this.bcs.getAviableBooks()
      .subscribe(res => {
        this.books = res
      })
    this.bcs.bookListLimit().subscribe(
      (res: number) => { this.listLimit = res; });
  }

  add(book: Book) {
    if (this.listLimit > 0){
      this.bcs.addToList(book)
        .subscribe(res => {
          this.books = this.books.filter(b => b != res);
          this.ngOnInit();
        })
    } else {
      alert("Can't add more books");
    }
  }

}
