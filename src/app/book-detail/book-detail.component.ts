import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Location } from '@angular/common';
import { Book } from '../book';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  today = new Date();

  role: string;

  slides = [
    { img: "assets/images/blog-slide1.jpg" },
    { img: "assets/images/blog-slide2.jpg" },
    { img: "assets/images/blog-slide3.jpg" },
    { img: "assets/images/blog-slide4.jpg" },
    { img: "assets/images/blog-slide5.jpg" },
    { img: "assets/images/blog-slide6.jpg" }
  ];
  slideConfig = { "slidesToShow": 3, "slidesToScroll": 4, "autoplay": true, "autoplay-speed": 100 };


  comments: Comment[]
  bookId: number;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private location: Location,
    public book: Book,
    private comment: Comment,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getBook();
    this.getRole();
  }

  getBook(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => this.book = book);
    this.commentService.getComments(id).subscribe(comments => {
      console.log(comments);
      this.comments = comments
    })
  }

  goBack(): void {
    this.location.back();
  }

  add(message: string): void {
    this.bookId = +this.router.snapshot.paramMap.get('id');
    this.commentService.addComment(message, this.bookId).subscribe(comment => {
      this.comments.push(comment)
    });
  }

  delete(comment: Comment): void {
    this.comments = this.comments.filter(c => c !== comment);
    this.commentService.deleteComment(comment).subscribe();
  }

  checkLogin(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getRole(){
    this.role = this.authService.getRole();
  }
}
