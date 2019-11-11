import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'cart.component.html',
    styleUrls: ['./cart-list.component.css']
})
export class CartComponent implements OnInit {

    private items:any [];
    private total: number = 0;

    constructor(private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            let title = params['title'];
            let description = params['description'];
            let image = params['image'];
            let price = params['price'];
            let item = {
                id: id,
                title: title,
                description: description,
                image: image,
                price: price
            };
            if (id) {
                if (localStorage.getItem('cart') == null) {
                    let cart: any = [];
                    cart.push(JSON.stringify(item));
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    let cart: any = JSON.parse(localStorage.getItem('cart'));
                    let index: number = -1;
                    for (var i = 0; i < cart.length; i++) {
                        let item:any = JSON.parse(cart[i]);
                        if (item.id == id) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        cart.push(JSON.stringify(item));
                        localStorage.setItem('cart', JSON.stringify(cart));
                    } else {
                        let item: any = JSON.parse(cart[index]);
                        cart[index] = JSON.stringify(item);
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                }
                this.loadCart();
            } else {
                this.loadCart();
            }
        });
    }

    loadCart(): void {
        this.total = 0;
        this.items = [];
        let cart = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < cart.length; i++) {
            let item = JSON.parse(cart[i]);
            this.items.push({
                product: item,
            });
        }
    }

    remove(id: string): void {
        debugger;
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
            let item: any = JSON.parse(cart[i]);
            if (item.id == id) {
                cart.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.loadCart();
    }
}