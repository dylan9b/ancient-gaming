import { FormControl, Validators } from "@angular/forms";

export class PostItemFormControl {
  constructor(
    public id: FormControl = new FormControl(null),
    public title: FormControl = new FormControl({ value: null, disabled: true}, [Validators.required]),
    public body: FormControl = new FormControl(null, [Validators.required]),
  ) {}
}
