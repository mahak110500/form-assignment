import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserdataService {
	updateData(arg0: any) {
		//throw new Error('Method not implemented.');
	}

	getUserdata = []

	constructor() { }

getCurrentData(id){
	
}

}
// {
// 	"id": 1,
// 	"name": "XYZ",
// 	"Email": "example@gmail.com",
// 	"Gender": "female",
// 	"DOB": "DD-MM-YYYY",
// 	"Profile Pic": "xyz.jpg",
// 	"Hobiies": ["singing", "Cooking", "Reading"],
// 	"PhoneNumber": "019889",
	
// 	"Contact Person": [{
// 		"name": " contact person1",
// 		"phone Number": "0214536"
// 	 },
// 	{
// 		"name": " contact person2",
// 		"phone Number": 0214536
// 	}]

// },

// {
// 	"id": 2,
// 	"name": "PQR",
// 	"Email": "example@gmail.com",
// 	"Gender": "female",
// 	"DOB": "DD-MM-YYYY",
// 	"Profile Pic": "xyz.jpg",
// 	"Hobiies": ["singing", "Cooking", "Reading"],
// 	"PhoneNumber": 019889,
// 	"Qualifiation": ["Graduation", "Post-Graduate"],
// 	"Profession": "Working",
// 	"Shortdescription": "descriptionabout ur self",
	
// 	"Contact Person": [{
// 		"name": " contact person1",
// 		"phone Number": 02145369875,
 
// 	{
// 		"name": " contact person2",
// 		"phone Number": 02145369875
// 	 }]

// // }