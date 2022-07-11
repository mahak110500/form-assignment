import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserdataService } from '../userdata.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
	selector: 'reactive-forms-root',
	templateUrl: './reactive-edit.component.html',
	styleUrls: ['./reactive-edit.component.css']
})
export class ReactiveEditComponent implements OnInit {
	genders = ['male', 'female'];
	hobbies = [{ name: 'sports', selected: false }, { name: 'dancing', selected: false }, { name: 'painting', selected: false }, { name: 'hiking', selected: false }, { name: 'cooking', selected: false }];
	signupForm: FormGroup;

	dataInfo: any;

	dataFetched;
	idFetched: any;


	constructor(private modalService: NgbModal, private router: ActivatedRoute, private userData: UserdataService, private Onrouter: Router) { }


	contactDetails = new FormArray([
		new FormControl('contactName'),
		new FormControl('contactNo'),
	]);

	dropdownList = [];
	dropdownSettings: IDropdownSettings = {};


	ngOnInit(): void {


		const objIndex = this.userData.getUserdata.findIndex((obj => obj.id == this.router.snapshot.params.id));

		this.dataFetched = (this.userData.getUserdata[objIndex].data)
		this.idFetched = (this.userData.getUserdata[objIndex].id)

		
		this.signupForm = new FormGroup({
			
			'name': new FormControl(this.dataFetched.firstPage.name, [Validators.required, Validators.pattern("^[A-Za-z ]+$")]),
			'email': new FormControl(this.dataFetched.firstPage.email, [Validators.required, Validators.email]),
			'gender': new FormControl(this.dataFetched.firstPage.gender, Validators.required),
			'dob': new FormControl(this.dataFetched.firstPage.dob, Validators.required),
			'profilepic': new FormControl(null, Validators.required),
			// 'hobbies': new FormControl(this.dataFetched.secondPage.hobbies, Validators.required),
			// 'phnno': new FormControl(this.dataFetched.secondPage.phnno, [Validators.required, Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]),
			'qualification': new FormControl(this.dataFetched.thirdPage.qualification, Validators.required),
			'profession': new FormControl(this.dataFetched.thirdPage.profession, Validators.required),
			'description': new FormControl(this.dataFetched.thirdPage.description, Validators.required),

			phnno: new FormGroup({
				'phnno1': new FormControl(this.dataFetched.secondPage.phnno.phnno1, [Validators.required, Validators.maxLength(3)]),
				'phnno2': new FormControl(this.dataFetched.secondPage.phnno.phnno2, Validators.required),
				'phnno3': new FormControl(this.dataFetched.secondPage.phnno.phnno3, Validators.required),
			}),

			hobbies: new FormGroup({
				sports: new FormControl(),
				dancing: new FormControl(),
				painting: new FormControl(),
				hiking: new FormControl(),
				cooking: new FormControl(),

			}),
			'ContactDetails': new FormGroup({
				'contactname': new FormControl(this.dataFetched.thirdPage.contactname, [Validators.required, Validators.pattern("^[A-Za-z ]+$")]),
				'contactno': new FormControl(this.dataFetched.thirdPage.contactno, [Validators.required, Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]),
			})
		});


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

	updateData(updatedData: FormGroup) {
		console.log(updatedData);
		// this.userData.updateData(this.router.snapshot.params.id);
		const objIndex1 = this.userData.getUserdata.findIndex((obj => obj.id == this.router.snapshot.params.id));

		console.log(this.userData.getUserdata[objIndex1])
		this.userData.getUserdata[objIndex1].data.firstPage.name = updatedData.value.name;
		this.userData.getUserdata[objIndex1].data.firstPage.email = updatedData.value.email;
		this.userData.getUserdata[objIndex1].data.firstPage.gender = updatedData.value.gender;
		this.userData.getUserdata[objIndex1].data.firstPage.dob = updatedData.value.dob;

		this.userData.getUserdata[objIndex1].data.secondPage.hobbies = updatedData.value.hobbies;
		this.userData.getUserdata[objIndex1].data.secondPage.phnno.phnno1 = updatedData.value.phnno.phnno1;
		this.userData.getUserdata[objIndex1].data.secondPage.phnno.phnno2 = updatedData.value.phnno.phnno2;
		this.userData.getUserdata[objIndex1].data.secondPage.phnno.phnno3 = updatedData.value.phnno.phnno3;

		this.userData.getUserdata[objIndex1].data.thirdPage.qualification = updatedData.value.qualification;
		this.userData.getUserdata[objIndex1].data.thirdPage.profession = updatedData.value.profession;
		this.userData.getUserdata[objIndex1].data.thirdPage.description = updatedData.value.description;

		console.log(this.userData.getUserdata);
		this.Onrouter.navigate(['']);

	}

	idval = 1;
	onSubmit() {
		console.log(this.signupForm);


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
