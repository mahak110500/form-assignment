import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserdataService } from '../userdata.service';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


@Component({
	selector: 'template-driven-root',
	templateUrl: './template-driven.component.html',
	styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
	goBack(stepper: MatStepper){
		stepper.previous();
	}
	
	goForward(stepper: MatStepper){
		stepper.next();
	}
	
	
	genders = ['male', 'female'];
	hobbies = [{ name: 'sports', selected: false }, { name: 'dancing', selected: false }, { name: 'painting', selected: false }, { name: 'hiking', selected: false }, { name: 'cooking', selected: false }];
	signupForm: FormGroup;

	user = {
		username: '',
		email: '',
		gender: '',
		dob: '',
		hobbies: '',
		phonno1: '',
		phonno2: '',
		phonno3: '',

	}
	// submitted: false;
	submitted: boolean = false;

	dataInfo = []

	contactperson = [];

	dropdownList = [];
	dropdownSettings: IDropdownSettings = {};


	constructor(private modalService: NgbModal, private userData: UserdataService, private router: ActivatedRoute) { }


	ngOnInit(): void {
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

	

	idval = 1;
	onSubmit(form: NgForm) {


		this.userData.getUserdata.push({ id: this.idval++, form: 'template', data: form.value });
		console.log(this.userData.getUserdata);

		this.submitted = true;

	}

	// deleteRow(d){
	// 	console.log(d)
	// 	const index = this.userData.getUserdata.indexOf(d);
	// 	this.userData.getUserdata.splice(index, 1);
	// }


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
