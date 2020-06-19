import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Good } from 'src/app/interfaces/good.interface';
import { NgForm } from '@angular/forms';
import { GoodService } from 'src/app/services/good.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  @ViewChild('image', { static: true }) image: ElementRef;


  constructor(private gs: GoodService) { }

  ngOnInit() {
  }

  addNewGood(form: NgForm) {
    let name = (<Good>form.value).name,
      price = (<Good>form.value).price,
      image = (<HTMLInputElement>this.image.nativeElement).files[0];
    this.gs.addNewGood(name, price, image).then(msg => console.log(msg))
  }

}
