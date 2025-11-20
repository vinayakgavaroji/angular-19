import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [DecimalPipe],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {

  private totalSeconds : number = 300;
  private timer : any;
  running = false;

  get minutes(): number{
    return Math.floor(this.totalSeconds / 60);
  }

  get seconds():  number{
    return this.totalSeconds % 60;
  }

  start(){
    if(this.running || this.totalSeconds === 0) return;
    this.running = true;
    this.timer = setInterval(() => {
      if(this.totalSeconds > 0){
        this.totalSeconds--;
      }else{
        this.stop()
      }
    }, 1000)
  }

  stop(){
    clearInterval(this.timer);
    this.running = false;
  }

  reset(){
    clearInterval(this.timer);
    this.running = false;
    this.totalSeconds = 300
  }

}
