import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserdataService } from '../userdata.service';


@Component({
	selector: 'reactive-forms-root',
	templateUrl: './reactive-forms.component.html',
	styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
	genders = ['male', 'female'];
	hobbies = [{ name: 'sports', selected: false }, { name: 'dancing', selected: false }, { name: 'painting', selected: false }, { name: 'hiking', selected: false }, { name: 'cooking', selected: false }];
	signupForm: FormGroup;
	
	dataInfo: any;
	

	constructor(private modalService: NgbModal,private userData: UserdataService) { }


	contactDetails = new FormArray([
		new FormControl('contactName'),
		new FormControl('contactNo'),
	]);

	dropdownList = [];
	dropdownSettings: IDropdownSettings = {};


	ngOnInit(): void {
		this.signupForm = new FormGroup({

			firstPage: new FormGroup({
				'name': new FormControl(null, [Validators.required, Validators.pattern("^[A-Za-z ]+$")]),
				'email': new FormControl(null, [Validators.required, Validators.email]),
				'gender': new FormControl(null, Validators.required),
				'dob': new FormControl(null, Validators.required),
			}),
			secondPage: new FormGroup({
				'profilepic': new FormControl(null, Validators.required),
				// 'hobbies': new FormControl(null, Validators.required),
				hobbies: new FormGroup({
					sports: new FormControl(),
					dancing: new FormControl(),
					painting: new FormControl(),
					hiking: new FormControl(),
					cooking: new FormControl(),
	
				}),
				// 'phnno': new FormControl(null, [Validators.required,Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]),
				phnno:  new FormGroup({
				'phnno1': new FormControl(null, [Validators.required,Validators.maxLength(3)]),
				'phnno2': new FormControl(null,  [Validators.required,Validators.maxLength(3)]),
				'phnno3': new FormControl(null,  [Validators.required,Validators.maxLength(4)]),
				})
			}),
			thirdPage: new FormGroup({
				'qualification': new FormControl(null, Validators.required),
			'profession': new FormControl(null, Validators.required),
			'description': new FormControl(null, Validators.required),
			// 'contactname': new FormControl(null,[Validators.required, Validators.pattern("^[A-Za-z ]+$")]),
			// 'contactno': new FormControl(null, [Validators.required,Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]),
			'ContactDetails': new FormGroup({
				'contactname': new FormControl(null, Validators.required),
				'contactno': new FormControl(null, Validators.required),
			})
			}),
			
						
			
			
		});

		//  const user = {
		// 	username: '',
		// 	email: '',
		// 	gender: '',
		// 	dob: '',
		// 	hobbies: '',
		// 	phoneno: '',
		// }

		this.dropdownList = [
			"B.E.",
			"B.tech",
			"B.C.A.",
			"M.C.A."
		];


		this.dropdownSettings = {};

		//to get the data to auto fill in input fields
		this.dataInfo = this.userData.getUserdata;
	}

	idval = 10000;
	onSubmit() {
		console.log(this.signupForm);

		// this.user.username = this.signupForm.value.name;
		// this.user.email = this.signupForm.value.email;
		// this.user.gender =this.signupForm.value.gender;
		// this.user.dob =this.signupForm.value.dob;
		// this.user.hobbies = this.signupForm.value.hobbie;
		// this.user.phoneno = this.signupForm.value.phnno;

		//to fetch data with the help of id
		this.userData.getUserdata.push({ id: this.idval++, form: 'reactive', data: this.signupForm.value });
		console.log(this.userData.getUserdata);


	}

	public addresses: any[] = [{
		id: 1,
		address: '',
		street: '',
	}];


	addAddress() {
	
		this.addresses.push({
			id: this.addresses.length + 1,
			address: '',
			street: '',
		});
	}

	removeAddress(i: number) {
		this.addresses.splice(i, 1);
	}

	logValue() {
		console.log(this.addresses);
	}


	closeResult = '';

	open(content) {
		this.modalService.open(content,
			{ ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult =
					`Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
