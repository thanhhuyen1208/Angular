import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'primeng/components/common/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<Message|Message[]>();
  private clearSource = new Subject<string>();

  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();

  message: string[] = [];

  add(message: string) {
    this.message.push(message);
  }
  
  clear() {
    this.message = [];
  }

  addPopup(message: Message) {
    if(message) {
        this.messageSource.next(message);
    }
}

addAll(messages: Message[]) {
    if(messages && messages.length) {
        this.messageSource.next(messages);
    } 
}

clearPopup(key?: string) {
    this.clearSource.next(key||null);
}
}
