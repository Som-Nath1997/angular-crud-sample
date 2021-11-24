export interface Post {
  map(arg0: (address: any) => any): any[];
  id: number;
  firstname: string;
  lastname: string;
  jobtitle: string;
  address: string;
  email: string;
  hobbies : Hobbie[]; 
}
export interface Hobbie {
  hobby?: '',
  interst: ''
}
