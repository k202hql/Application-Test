import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  userForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    item: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userForm.valid) {
      let userObj: any = {
        id: this.userForm.value.id,
        name: this.userForm.value.name,
        state: this.userForm.value.state,
        zip: this.userForm.value.zip,
        amount: this.userForm.value.amount,
        qty: this.userForm.value.qty,
        item: this.userForm.value.item,
      }
      //console.log(userObj);

      this.itemService.createItem(userObj).subscribe(res => {
        if (res.msg == "Successfully Added") {
          console.log('Item Added successfully!');
          alert('Item Added successfully!');
          this.router.navigate(['/home']);
        }
      })
    }
  }

}
