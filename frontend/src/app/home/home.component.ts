import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ItemList: any;
  public Item: any;
  uid: number | undefined;

  constructor(private itemserviice: ItemService) { }

  ngOnInit(): void {
    this.itemserviice.GetItems().subscribe(res => {
      this.Item = res;
      this.ItemList = this.Item;
      // console.log(this.ItemList);
    })
  }

  delete(userid: any) {
    this.itemserviice.DeleteItem(userid).subscribe(res => {
      if (res) {
        console.log('User Deleted successfully!');
        this.ngOnInit();
      }
    })
  }

  edit(userid: number) {
    this.uid = userid;
    // console.log(this.uid);
  }

}
