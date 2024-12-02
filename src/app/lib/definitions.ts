export type User = {
	id: string,
	dob: Date,
	nric: string,
	fullname: string,
	email: string,
	phone: string,
	preferredcontact: number
}

export type Intent = User & {
	id: string,
	userid: string,
	type: string,
	status: string,
	description: string,
	time: string, // ISO date format

	ownerid: string
}