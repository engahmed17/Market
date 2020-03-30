import { Component, OnInit, OnDestroy } from '@angular/core';
import { Good } from 'src/app/interfaces/good.interface';
import { GoodService } from 'src/app/services/good.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  goods: Good[] = []
  goodsObservable: Subscription
  add: number = -1

  constructor(private gs: GoodService, private cs: CartService, private as: AuthService, private router: Router) { }

  ngOnInit() {
    this.goodsObservable = this.gs.getAllGoods().subscribe(data => {
      this.goods = data.map(element => {
        return {
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          price: element.payload.doc.data()['price'],
          photoUrl: element.payload.doc.data()['photoUrl']
        }
      })
    })
  }
  ngOnDestroy() {
    this.goodsObservable.unsubscribe()
  }
  addToCart(index: number) {
    if (this.as.userId) this.add = +index;
    else this.router.navigate(['/login']);
  }
  buy(amount: number) {
    let selectedGood = this.goods[this.add]
    let data = {
      name: selectedGood.name,
      price: selectedGood.price,
      amount: +amount
    }
    this.cs.addToCart(data).then(() => this.add = -1)
  }
}
