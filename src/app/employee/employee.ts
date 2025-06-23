export interface Employee {
    id : number
    name:string,
    address:string,
    salary:number,
    gender:string,
    dob:string,
    departmentName : string
    inTime : string
    outTime : string
    totalHrs : string
    reportingName : string
    roleType : string
 
    department:Department,
}

export interface Department {
id:number,
name:string
}
