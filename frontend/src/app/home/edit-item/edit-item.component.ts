import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  data: string | undefined;

  constructor(public fb: FormBuilder, private itemService: ItemService) {

  }
  datas: any;
  alldata: [] = [];

  @Input() getuid: number | undefined;

  updateItem = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    item: ['', [Validators.required]],
  });

  ngOnInit(): void { }
  ngOnChanges() {
    this.itemService.getbyId(this.getuid).subscribe(res => {
      this.datas = res;
    })
  }

  onSubmit() {
    if (this.updateItem.valid) {
      let updateObj: any = {
        id: this.updateItem.value.id,
        name: this.updateItem.value.name,
        state: this.updateItem.value.state,
        zip: this.updateItem.value.zip,
        amount: this.updateItem.value.amount,
        qty: this.updateItem.value.qty,
        item: this.updateItem.value.item,
      }
      // console.log(updateObj);

      this.itemService.updateItem(updateObj).subscribe(res => {
        if (res.msg == "Successfully Added") {
          console.log('Item Updated successfully!');
          alert('Item Updated successfully!');
        }
      })
    }
  }

}
