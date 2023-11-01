const createUser = (email, password) => {
  if (!email.includes("@") && password.length < 4) {
    console.log("error");
    return;
  }
  const user = { email, password };
  database.insert(user);
};

/* refactor */
/* ________________________________________________________query command seperation */
const areEmailAndPasswordvalida = (email, password) => {
  return email.includes("@") && password.length < 4;
};

const errorHandling = (errorMessage: string) => {
  throw new Error(errorMessage);
};

const saveNewUser = (email, password) => {
  const userData = { email, password };
  database.save(userData);
};

const createUser = (email, password) => {
  if (!inputValidator(email, password)) {
    errorHandling("invalid input");
  }
  saveNewUser(email, password);
};
/* ________________________________________________________________________________ */
/* _____________________________________________________________________error and handling  */
export const login = (userInfo, naviagte) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const {
      data: { user, token },
    } = await axios.post(`${baseUrl}/login`, userInfo);
    dispatch({ type: LOGIN, payload: { user, token } });
    if (user.role === "company") {
      naviagte("/company-space/dashboard");
    } else if (user.role === "client") {
      naviagte("/client-space/home");
    } else {
      naviagte("/admin-space/dashboard");
    }
  } catch (error) {
    if (error.response.status === 403) {
      return dispatch({ type: LOGIN_FAILED_BANNED_USER });
    }
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.msg,
    });
  }
};
/* _________________________________________________________________________ */
const dispatch = ({ type }) => {};

class Error {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

class LoginFailedError extends Error {
  constructor() {
    super("Login failed");
  }
}

class BannedUserError extends Error {
  constructor() {
    super("User is banned");
  }
}

class WrongPasswordError extends Error {
  constructor() {
    super("Wrong password");
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
  }
}

function redirectUser(role: string, navigate: (path: string) => void) {
  if (role === "company") {
    navigate("/company-space/dashboard");
  } else if (role === "client") {
    navigate("/client-space/home");
  } else if (role === "admin") {
    navigate("/admin-space/dashboard");
  } else {
    throw new Error("Unknown role");
  }
}

const handleLoginError = (error, dispatch) => {
  if (error.response) {
    const statusCode = error.response.status;
    if (statusCode === 403) {
      throw new BannedUserError();
    } else if (statusCode === 401) {
      throw new WrongPasswordError();
    } else if (statusCode === 404) {
      throw new UserNotFoundError();
    }
  } else {
    throw new LoginFailedError();
  }
};

export const login = async (userInfo, navigate) => {
  dispatch({ type: LOADING });
  try {
    const response = await axios.post(`${baseUrl}/login`, userInfo);
    const { user } = response.data;
    navigateBasedOnRole(user.role, navigate);
  } catch (error) {
    handleLoginError(error, dispatch);
  }
};
/* _____________________________________________________ flag argument */

export const banOrVerifyUser = async (id) => {
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  try {
    const { user } = await axios.get(`${baseUrl}/admin_clients/${id}`, config);
    await axios.put(
      `${baseUrl}/admin_clients/${id}`,
      { status: !user.banned },
      config
    );
  } catch (error) {
    console.log(error);
  }
};
/* Refactor */
enum HttpMethod {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

export const handleRequest = async <T>(
  url: string,
  method: HttpMethod,
  body?: any,
  token?: string | null
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method: method,
    headers: headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, options);
  const responseData: T = await response.json();
  return responseData;
};

export const isUserBanned = async (id: string): Promise<boolean> => {
  const { user } = await handleRequest(
    `${baseUrl}/admin_clients/${id}`,
    HttpMethod.GET,
    null,
    localStorage.getItem("token")
  );
  return user.banned;
};

export const banUser = async (id: string): Promise<void> => {
  if (await isUserBanned(id)) {
    return;
  }
  await handleRequest(
    `${baseUrl}/admin_clients/${id}`,
    "PUT",
    { ban: true },
    localStorage.getItem("token")
  );
};

export const verifyUser = async (id: string): Promise<void> => {
  if (!(await isUserBanned(id))) {
    return;
  }
  await handleRequest(
    `${baseUrl}/admin_clients/${id}`,
    "PUT",
    true,
    localStorage.getItem("token")
  );
};

/* _________________________Abstract Factory design pattern.  */
interface ShapeFactory {
  execute(): void;
}

class ShapeFactoryImp implements ShapeFactory {
  execute(): void {
    /* logic */
  }
}
type PatientInfo = {};
/*    ___________________________Problem Domain Names  */
class PatientRecordsManager {
  addPatientRecord(patientInfo: PatientInfo): void {
    // Logic to add a patient record
    // ...
  }
}

/* ______________solution domain name */
class Databse {
  mysql: Databse;
  insertOne(user): void {
    this.mysql.insertOne(user);
  }
}
class QuickSort {
  sort(data: number[]): number[] {
    // QuickSort algorithm implementation
    // ...
  }
}

/* _____________________________meaningful context */

class Address {
  street: string;
  houseNumber: string;
  city: string;
  state: string;
  zipcode: string;

  constructor(
    street: string,
    houseNumber: string,
    city: string,
    state: string,
    zipcode: string
  ) {
    this.street = street;
    this.houseNumber = houseNumber;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  }
}

// Usage
const userAddress = new Address(
  "123 Main St",
  "Apt 4B",
  "Cityville",
  "CA",
  "12345"
);
/* ________*comments do not make up for bad code  */
// Check to see if the employee is eligible for full benefits
if (employee.flags & HOURLY_FLAG && employee.age > 65)
  if (employee.isEligibleForFullBenefits()) {
  }
/* *________________legal comments */

/* Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0 */

/* *_____________Informative comments */

// Returns an instance of the Responder being tested.
/* protected abstract Responder responderInstance(); */

/* / format matched kk:mm:ss EEE, MMM dd, yyyy
Pattern timeMatcher = Pattern.compile(
 "\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*"); */

/* ________avoid to do comments */

/* make paid attribute set to true */
/* function markAsPaid(){
  logic to be implemented to change paid atribute to true
}  */

/* ____comments in public Api are good */
moment js library
moment().format("MMMM Do YYYY, h:mm:ss a"); // August 28th 2023, 10:51:38 am
moment().format("dddd"); // Monday
moment().format("MMM Do YY"); // Aug 28th 23
moment().format("YYYY [escaped] YYYY"); // 2023 escaped 2023
moment().format(); // 2023-08-28T10:51:38+01:00

/* ___________redundant comments */
/* comment what does the function do  */
/* this function add two numbers */
const add=(a:number,b:number):number=>a+b

/* fetch users if async operation is sucess or throw an exception if not */ 
const fetchUsers=async()=>{
try {
  return await fetch('httt____')
} catch (error) {
  throw new Error('fetch users is failed')
}
}
/* ___________noise of comments */

class User{
  /** The name. */
private  name:string
/** The version. */
private  version:string;
/** The licenceName. */
private  licenceName:string;
/** The version. */
private  info:string;

}

/* ______________formatting */
    /* ___vertical formatting */


       /*/ file should be small */
       /* between 200 lignes and 500 lignes are good (c'est pas une règle générale)*/
       /* name of file sould be effecien and give us an idea about what is inside this file */

       /* we should use empty line to make seperation between concepts */

class ParentWidget {
  constructor(parent: ParentWidget) {
      // Constructor logic for ParentWidget
  }
  
  addChildWidgets(content: string): void {
      // Logic to add child widgets
  }
  
  childHtml(): string {
      return '';
  }
}

class BoldWidget extends ParentWidget {
  static readonly REGEXP = "'''.+?'''";
  private static readonly pattern = /'''(.+?)'''/s;
  
  constructor(parent: ParentWidget, text: string) {
      super(parent);
      const match = text.match(BoldWidget.pattern);
      if (match) {
          this.addChildWidgets(match[1]);
      }
  }
  
  render(): string {
      const html = `<b>${this.childHtml()}</b>`;
      return html;
  }
}

/* _____variable Declarations. Variables should be declared as close to their usage */

interface User {
  moy: number;
}

const addMoyToUsers = (users: User[]): void => {
  let i=0;
  for ( i = 0; i < users.length; i++) {
      users[i].moy = 0;
  }
};
/* ___________instance variables, on the other hand, should be declared at the top of the class */

class Person {
  private firstName: string;
  private lastName: string;
  private age: number;

  constructor(firstName: string, lastName: string, age: number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
  }

  getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
  }

  getAge(): number {
      return this.age;
  }

  celebrateBirthday(): void {
      this.age++;
  }
}
/* __________________Dependent Functions. If one function calls another, 
they should be vertically close, and the caller should be above the callee
 */
class TaxCalculator {
  calculateTax(income: number): number {
      return income * 0.15;
  }

  calculateNetIncome(grossIncome: number): number {
      const tax = this.calculateTax(grossIncome);
      return grossIncome - tax;
  }
}
/* ___________the concept of conceptual affinity */
/* in one file or one class you should define the method that handle one logic */
   /* github */


   /* ______vertical Ordering
   In general we want function call dependencies to point in the downward direction */
type Product = {
  id: number;
  name: string;
  price: number;
};

function fetchProducts(): Promise<Product[]> {
  return fetch("https://api.example.com/shoppingcart/products")
      .then(response => response.json())
      .then(data => data.products);
}

function calculateTotal(products: Product[]): number {
  let total = 0;
  for (const product of products) {
      total += product.price;
  }
  return total;
}

async function main(): Promise<number> {
  try {
      const productList = await fetchProducts();
      return calculateTotal(productList);
  } catch (error) {
    throw new Error('failed')
  }
}

main();

/* _____horizontal Formatting */



          
