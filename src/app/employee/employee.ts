export interface Employee {
    name:string,
    address:string,
    salary:number,
    gender:string,
    dob:string,
    department:Department,
}

export interface Department {
id:number,
name:string
}
