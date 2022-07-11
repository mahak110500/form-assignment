import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserdataService } from '../userdata.service';




@Component({
	selector: 'template-edit-root',
	templateUrl: './template-edit.component.html',
	styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent implements OnInit {

	genders = ['male', 'female'];
	hobbies = [{ name: 'sports', selected: false }, { name: 'dancing', selected: false }, { name: 'painting', selected: false }, { name: 'hiking', selected: false }, { name: 'cooking', selected: false }];
	signupForm: FormGroup;

	contactperson = [];

	dropdownList = [];
	dropdownSettings: IDropdownSettings = {};
	

	constructor(private modalService: NgbModal, private router: ActivatedRoute, private userData: UserdataService,private Onrouter: Router ) { 

	}

	 dataFetched;
	idFetched: any;

	ngOnInit(): void {
		this.dropdownList = [
			"B.E.",
			"B.tech",
			"B.C.A.",
			"M.C.A."
		];

		this.dropdownSettings = {};

		const objIndex = this.userData.getUserdata.findIndex((obj => obj.id == this.router.snapshot.params.id));

		 this.dataFetched = (this.userData.getUserdata[objIndex].data)
		 this.idFetched = (this.userData.getUserdata[objIndex].id)

		 console.log(this.dataFetched)

				
	}
	
	
	updateData(updatedData){
		console.log(updatedData);
		console.log(updatedData.value);

		// this.userData.updateData(this.router.snapshot.params.id);
		const objIndex1 = this.userData.getUserdata.findIndex((obj => obj.id == this.router.snapshot.params.id));
		
		console.log(this.userData.getUserdata[objIndex1])
		this.userData.getUserdata[objIndex1].data.firstPage.name= updatedData.value.firstPage.name;
		this.userData.getUserdata[objIndex1].data.firstPage.email= updatedData.value.firstPage.email;
		this.userData.getUserdata[objIndex1].data.firstPage.gender= updatedData.value.firstPage.gender;
		this.userData.getUserdata[objIndex1].data.firstPage.dob= updatedData.value.firstPage.dob;

		this.userData.getUserdata[objIndex1].data.secondPage.hobbies= updatedData.value.secondPage.hobbies;
		this.userData.getUserdata[objIndex1].data.secondPage.phnno1= updatedData.value.secondPage.phnno1;
		this.userData.getUserdata[objIndex1].data.secondPage.phnno2= updatedData.value.secondPage.phnno2;
		this.userData.getUserdata[objIndex1].data.secondPage.phnno3= updatedData.value.secondPage.phnno3;
		
		this.userData.getUserdata[objIndex1].data.thirdPage.qualification= updatedData.value.thirdPage.qualification;
		this.userData.getUserdata[objIndex1].data.thirdPage.profession= updatedData.value.thirdPage.profession;
		this.userData.getUserdata[objIndex1].data.thirdPage.answer= updatedData.value.thirdPage.answer;


		console.log(this.userData.getUserdata);
		this.Onrouter.navigate(['']);

	} 

	onSubmit(form: NgForm) {
		console.log(form.value)

		// this.submitted= true; 

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



}
