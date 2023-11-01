/* difference between clesses and data structure */
/* classes:contain propreties with behave (method)
data-container:stire and transport data and we do not have concrete meothods */
class Database {
  private url: string;
  private provider: any;

  constructor(uri: string, provider: any) {
    this.url = uri;
    this.provider = provider;
  }
  async connect() {
    await this.provider.connect(this.url);
  }
}

class UserCredential {
  email: string;
  password: string;
}

/*  using polymorphism *to have a clean code and do not duplicate code */

type Purchase = any;

let Logistics: any;

class Delivery {
  purchase: Purchase;

  constructor(purchase: Purchase) {
    this.purchase = purchase;
  }

  deliverProduct() {
    if (this.purchase.deliveryType === "express") {
      Logistics.issueExpressDelivery(this.purchase.product);
    } else if (this.purchase.deliveryType === "insured") {
      Logistics.issueInsuredDelivery(this.purchase.product);
    } else {
      Logistics.issueStandardDelivery(this.purchase.product);
    }
  }

  trackProduct() {
    if (this.purchase.deliveryType === "express") {
      Logistics.trackExpressDelivery(this.purchase.product);
    } else if (this.purchase.deliveryType === "insured") {
      Logistics.trackInsuredDelivery(this.purchase.product);
    } else {
      Logistics.trackStandardDelivery(this.purchase.product);
    }
  }
}

/* refactoring */

interface IDelivery {
  deliverProduct(): void;
  trackProduct(): void;
}
class Delivery {
  purchase: Purchase;

  constructor(purchase: Purchase) {
    this.purchase = purchase;
  }
}

class ExpressDelivery extends Delivery implements IDelivery {
  deliverProduct() {

    Logistics.issueExpressDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackExpressDelivery(this.purchase.product);
  }
}

class InsuredDelevery extends Delivery implements IDelivery {
  deliverProduct() {
    Logistics.issueInsuredDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackInsuredDelivery(this.purchase.product);
  }
}

class StandardDelivery extends Delivery implements IDelivery {
  deliverProduct() {
    Logistics.issueStandardDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackStandardDelivery(this.purchase.product);
  }
}

function createDelivery(purchase) {
  if (purchase.deliveryType === "express") {
    return new ExpressDelivery(purchase);
  } else if (purchase.deliveryType === "insured") {
    return new InsuredDelevery(purchase);
  } else {
    return new StandardDelivery(purchase);
  }
}/* 

/* class should be small and do one thing */

/* ___solid principles */
/* single responsibility */
class User {
  static findOne(arg0: { email: any; }) {
    throw new Error('Method not implemented.');
  }
  sign(email: string, password: string): void { }

  register(email: string, password: string): void { }

  assignRole(id: string): void { }
}
/* ____exapmle of database in the project */

/* OCP open for extension but close for modification */

/* example in the begin gn line 100 */

/* ___liskov principle */

/*___object should be repleaceable with instances of their subsclass without altering the behaviour */

interface UserCredential {
  id: string;
  username: string;
  isBanned: boolean;
}

class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
}

class Admin extends User {
  users: UserCredential[];

  constructor(username: string) {
    super(username);
  }

  banUser(userId: string): void {
    const foundUser = this.users.find((elt) => elt.id === userId);
    if (foundUser) {
      foundUser.isBanned = true;
    }
  }
}

/* interface segregation */
/* a class should not implement method that does not use */
interface Database {
  connect(url: string): Promise<void>;
  storeData(data: any): Promise<void>;
  getData(): Promise<[]>;
}

interface Mysql {
  connect(): void
  storeData(data: any): void
}

interface Inmemory {
  getData(): void
}



class MysqlDatabase implements Mysql {
  connect() {

  }
  storeData() {

  }
}
class InMemoryData implements Mysql, Inmemory {
  connect(url) { }
  storeData(data)
  getData():
}


controller ==> Odm=> database

  => controller => service => interface <= database



/* Dependency Inversion */
/* we should depend on abstraction not concretation  implementation */


interface Product {
  id: string;
  name: string;
  price: number
}

class SQLDatabase {
  data = []
  find() {
    return this.data
  }
}
interface Repository {

}

class ProductService implements Repository {
  database: SQLDatabase;

  constructor(database: SQLDatabase) {
    this.database = database;
  }

  getAllProduct() {
    this.database.find()
  }
}
/* ________________another example of dependency inversion */


interface FetchModuleInterface {
  handleRequest<T>(url: string, method: string, data?: any): Promise<T>;
}

class Handler implements FetchModuleInterface {
  async handleRequest<T>(url: string, method: string, data?: any): Promise<T> {
    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, options);
    const responseData: T = await response.json();
    return responseData;
  }
}

class ProductService {
  private fetchModule: Handler;

  constructor(fetchModule: Handler) {
    this.fetchModule = fetchModule;
  }

  async getProduct(productId: string) {
    return await this.fetchModule.handleRequest(`https://example.com/api/products/${productId}`, "GET");
  }

  async saveProduct(productData: any) {
    return await this.fetchModule.handleRequest(
      "https://example.com/api/products",
      "POST",
      JSON.stringify(productData)
    );
  }
}

class Customer {
  private fetchModule: FetchModuleInterface;

  constructor(fetchModule: FetchModuleInterface) {
    this.fetchModule = fetchModule;
  }

  async getCustomers() {
    return await this.fetchModule.handleRequest(`https://example.com/api/Customers`, "GET");
  }
}


/* ___law of demeter */
/* abstract class  ? interface and classes ?*/
/* The Demeter’s law is known as don’t talk to strangers 
Each unit should have only limited knowledge about other units: only units “closely” related to the current unit.
*/








/* _______expcetion error handling  */
/* Do not return null and do not return status code */
/* throw exceptions if things went wrong */
/* Exception handling is One thing */

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
    redirectUser(user.role, navigate);
  } catch (error) {
    handleLoginError(error, dispatch);
  }
};


/* Exaple2_______________________ */

class CustomError {
  message: string;
  constructor(message: string) {
    this.message = message
  }
}

class BannedCustomerError extends CustomError {
  constructor() {
    super("User is banned");
  }
}

class WrongPasswordError extends CustomError {
  constructor() {
    super("Wrong password");
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super("User not found");
  }
}

class LoginFailedError extends CustomError {
  constructor() {
    super("Login failed");
  }
}

function handleLoginError(error: any, dispatch: any) {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 403:
        throw new BannedUserError();
      case 401:
        throw new WrongPasswordError();
      case 404:
        throw new UserNotFoundError();
      default:
        throw new CustomError(`Unhandled error with status ${status}`);
    }
  } else {
    throw new LoginFailedError();
  }
}
/* ____use try catch block */

function handleSpecificErrors(error) {
  if (error instanceof BannedCustomerError ||
    error instanceof UserNotFoundError ||
    error instanceof WrongPasswordError) {
    return error.message;
  } else {
    throw new LoginFailedError()
  }
}
async function handleRequest() {
  try {
    /* logic of  authentification */
  } catch (error) {
    handleSpecificErrors(error)
  }
}
/* _____________do not return null  */

/* The two classes you've provided, Result<T> and its nested methods success and failure,
 are part of a design pattern commonly known as the Result or Either pattern.
The main idea behind the Result or Either pattern is to provide a structured way
 to represent and handle both success and failure cases of an operation,
  without relying on exceptions or returning null to indicate errors.
   This pattern promotes explicit error handling and makes code more predictable, readable, and maintainable.


  This pattern is used to handle the outcome of operations that might succeed (return a value) or fail
   (return an error). It's a way to encapsulate both success and error cases into a single object, 
making error handling more structured and explicit
 */

class NetworkError extends Error {
  name: string;
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

class ApiError extends Error {
  name: string;
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}


class Result<T> {
  value: T | undefined;
  error: Error | undefined;

  private constructor(result: { value?: T, error?: Error }) {
    this.value = result.value;
    this.error = result.error;
  }

  static success<T>(value: T): Result<T> {
    return new Result({ value });
  }

  static failure<T>(error: Error): Result<T | undefined> {
    return new Result({ error });
  }
}



async function fetchUserData(userId: string): Promise<Result<User | any>> {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new ApiError('API request failed');
    }

    const userData = await response.json();
    return Result.success(userData);
  } catch (error) {
    return Result.failure(new NetworkError('Network error occurred'));
  }
}


/* _____________another exaple of strategy Error  */
class ErrorLogin {
  message: string
  constructor(message: string) {
    this.message = message
  }
}


class WronPasswordError extends ErrorLogin {
  constructor() {
    super("Wrong Password")
  }
}

class UserNotFound extends ErrorLogin {
  constructor() {
    super("User not found")
  }
}

class LogindFailedError extends ErrorLogin {
  constructor() {
    super("Operation is failed trye again")
  }
}

class EmptyField extends ErrorLogin {
  constructor() {
    super("Empty field")
  }
}
/* ___helpers */

function validateField(field: string) {
  if (!field) {
    throw new EmptyField()
  }
}

interface User {
  email: string;
  password: string;
}

async function loginUser(email: string, password: string): Promise<Result<User | undefined>> {
  validateField(email);
  validateField(password);
  try {
    const response = await fetch("https://api.example.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new LoginFailedError();
    }

    const user = await response.json();

    if (!user) {
      return Result.failure(new UserNotFoundError());
    }

    if (user.password !== password) {
      return Result.failure(new WrongPasswordError());
    }

    return Result.success(user);
  } catch (error) {
    return Result.failure(new LogindFailedError());
  }
}

/* ___Error handling do one thing */ /* try-catch */
/* ___Avoid deep nesting */
/* ___________ */

/* prefer postiveCheck :fail fast*/


class DatabaseWrite {
  blogs: any[] = [];

  insertOne(blog: any) {
    this.blogs.push(blog);
  }
}

interface BlogRepository {
  addContent(blogContent: string): void;
}

class InputValidator {
  isEmpty(text: string): boolean {
    return !text.trim()
  }

class Blog implements BlogRepository {
  content: string;
  inputValidator: InputValidator;
  database: DatabaseWrite

  constructor(content: string, inputValidator: InputValidator, database: DatabaseWrite) {
    this.content = content;
    this.inputValidator = inputValidator;
    this.database = database
  }

  addContent(blogContent: string): void {
    if (!this.inputValidator.isEmpty(blogContent)) {
      const newBlog = { content: blogContent };
      this.database.insertOne(newBlog);
    }
  }
}

/* _____________system boundaries */
/* what does it mean */
/*  rules interction with different part of systems 
boundaries refer to the separation or distinction between various parts or 
components of your software system
 client -server
  ****database and domain***
  controller and service
   */
/* * */
/* example of system boundrie in angular :dependency injection */



/* ===service========= */
/* 1-third party-library*/
/* can encapsulate and control its usage within your application. */
/* integration of third party */
import { format } from 'date-fns';
const currentDate = new Date();
const formattedDate = format(currentDate, 'MM/dd/yyyy');

class DateFormatter {
  static formatDate(date: Date): string {
    return format(date, 'MM/dd/yyyy');
  }
}
/* ______example2 */
const express = require('express');

class ExpressApp {
  app: any
  constructor() {
    this.app = express();  /* This is a boundary because  */
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    this.app.get('/about', (req, res) => {
      res.send('About Us');
    });
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}


const myApp = new ExpressApp();
myApp.start(3000);

/* Testing: Classes make it easier to write unit tests because you can isolate and test individual components */

/* 2-exploring and secion boundaries 
     not developer role to test the third party library;
     test the api for beign sure it is the good functionality
*/
/* 3-learnin test are better than free :behave of the third party*/
/* test will help us: to help us undrestund the new update or release of the third party */

/* jest */
describe('DateFormatter', () => {
  it('should format a date correctly', () => {
    const testDate = new Date('2023-09-05T12:00:00Z');
    const formattedDate = DateFormatter.formatDate(testDate);
    expect(formattedDate).toBe('09/05/2023');
  });
});

/* 4-clean boundaries */
/* it s better to depend on something you  controle than something you do  not control */
class WeatherService {
  static async fetchWeather(city: string): Promise<any> {
    const response = await fetch(`https://api.weather.com/${city}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }
}
/* changes in weatherService  */

class WeatherApp {
  constructor(private weatherService: typeof WeatherService) { }

  async getWeatherReport(city: string) {
    try {
      return await this.weatherService.fetchWeather(city);
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

/* 5-using code that not exist yet */
// Fake User API 
class UserApi {
  private users: { id: number; name: string }[] = [];

  addUser(user: { name: string }): void {
    const userId = this.users.length + 1;
    this.users.push({ id: userId, name: user.name });
  }

  getUserById(id: number): { id: number; name: string } | undefined {
    return this.users.find((user) => user.id === id);
  }
}

// User Service
class UserService {
  private userApi: UserApi;

  constructor(userApi: UserApi) {
    this.userApi = userApi;
  }

  addUser(name: string): void {
    this.userApi.addUser({ name });
  }

  getUserById(id: number): { id: number; name: string } | undefined {
    return this.userApi.getUserById(id);
  }
}

const fakeUserApi = new UserApi();
const userService = new UserService(fakeUserApi);
userService.addUser("Alice");


/* uncle bob real real case  transmitter */
// Placeholder interface for the Transmitter
interface Transmitter {
  transmit(frequency: number, dataStream: string): void;
}
// Fake Transmitter for testing
class FakeTransmitter implements Transmitter {
  transmit(frequency: number, dataStream: string): void {
    console.log(`Transmitting data on frequency ${frequency}: ${dataStream}`);
  }
}


class TransmitterAdapter implements Transmitter {
  transmit(frequency: number, dataStream: string): void {
    console.log(`Transmitting data (via adapter) on frequency ${frequency}: ${dataStream}`);
  }
}

class CommunicationsController {
  private transmitter: Transmitter;

  constructor(transmitter: Transmitter) {
    this.transmitter = transmitter;
  }

  sendOverRadio(frequency: number, data: string) {
    this.transmitter.transmit(frequency, data);
  }
}




/* _____Unit Test */
/* It checks whether that specific unit of code behaves as expected  */

/* law of test driven design :*/

/* first law :before you start writing the actual code for a new feature or functionality,
 you must first write a unit test that defines the expected behavior or requirements of that code. */

import { authService } from './auth';

test('Registering a new user', () => {
  expect(authService('john.doe@example.com', 'password123')).toBe(true);
});

function authService(email: string, password: string): boolean {
  return true;
}


class ShoppingCart {
  private products: any[] = [];

  addProduct(product: any) {
    this.products.push(product);
  }

  getProductCount(): number {
    return this.products.length;
  }

  calculateTotalPrice(): number {
    return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }
}

/* test suit - test case */

import { ShoppingCart } from './shoppingCart';

test('Adding products and calculating total price', () => {
  const cart = new ShoppingCart();

  cart.addProduct({ id: 1, name: 'Product A', price: 10, quantity: 2 });
  cart.addProduct({ id: 2, name: 'Product B', price: 15, quantity: 1 });

  expect(cart.getProductCount()).toBe(3);

  const totalPrice = cart.calculateTotalPrice();

  expect(totalPrice).toBe(35);
});

/* ______________________________ */


test('Adding products to the cart', () => {
  const cart = new ShoppingCart();

  cart.addProduct({ id: 1, name: 'Product A', price: 10, quantity: 1 });

  expect(cart.getProductCount()).toBe(1);

  cart.addProduct({ id: 2, name: 'Product B', price: 15, quantity: 1 });

  expect(cart.getProductCount()).toBe(2);
});

test('Calculating total price', () => {
  const cart = new ShoppingCart();

  cart.addProduct({ id: 1, name: 'Product A', price: 10, quantity: 2 });
  cart.addProduct({ id: 2, name: 'Product B', price: 15, quantity: 1 });

  const totalPrice = cart.calculateTotalPrice();

  expect(totalPrice).toBe(35);
});


/* ____clean test */
/* Variable names were not well-named. */
/* Test functions were not short and descriptive. */
/* _Write the minimum code to make the test pass.
_Refactor the code as needed while keeping the test passing.
_Write a failing test.*/



/* Step 1:1-Write a Failing Test: */

describe('Discount Calculation', () => {
  it('should apply a 10% discount for Gold users', () => {
    const userLevel = 'Gold';
    const cartTotal = 100;
    const discount = calculateDiscount(userLevel, cartTotal);
    expect(discount).to.equal(10);
  });

  it('should apply a 5% discount for Silver users', () => {
    const userLevel = 'Silver';
    const cartTotal = 100;
    const discount = calculateDiscount(userLevel, cartTotal);
    expect(discount).to.equal(5);
  });
});

/* At this point, the tests are failing because the calculateDiscount function doesn't exist yet */

/* Step 2: Write the Minimum Code to Make the Test Pass: */
function calculateDiscount(userLevel: string, cartTotal: number): number {
  if (userLevel === 'Gold') {
    return cartTotal * 0.1; // 10% discount for Gold users
  } else if (userLevel === 'Silver') {
    return cartTotal * 0.05; // 5% discount for Silver users
  } else {
    return 0; // No discount for other user levels
  }
}
/* With this code, the tests should pass because the discounts are correctly calculated. */

/* Step 3: Refactor the Code While Keeping the Test Passing: */

function calculateDiscount(userLevel: string, cartTotal: number): number {
  const discountRates = {
    'Gold': 0.1,
    'Silver': 0.05
  };

  return discountRates[userLevel] ? cartTotal * discountRates[userLevel] : 0;
}

/* ____________________________________________________________one assert per test */

/* function test should have just one assert
  It means that each individual test case or unit test should focus on verifying 
  one specific behavior or aspect of the code being tested.



  each test should focus on testing a single
*/

interface Product {
  id: string,
  name: string,
  price: number
}

class Company {
  name: string;
  products: Product[]
  constructor(name: string) {
    this.name = name;
    this.products = [];
  }
}

describe('Company', () => {
  it('should have a table of products for typeUser companies', () => {
    const userCompany = new Company('company 1');
    userCompany.products.push({ id: "0", name: "product", price: 500 });
    const otherCompany = new Company('OtherCo');
    expect(userCompany.products).length.toBe(1); /*  assertion */
  });
});


/* _____not good */

describe('Purchase Calculation', () => {
  it('should calculate total price and tax for a purchase', () => {
    const itemPrice = 50;
    const quantity = 2;

    const { totalPrice, tax } = calculatePurchase(itemPrice, quantity);

    expect(totalPrice).toEqual(100);
    expect(tax).toEqual(10);
  });
});
/* test case */


describe('Purchase Calculation', () => {
  it('should calculate total price for a purchase', () => {
    const itemPrice = 50;
    const quantity = 2;
    const { totalPrice } = calculatePurchase(itemPrice, quantity);
    expect(totalPrice).toEqual(100);
  });

  it('should calculate tax for a purchase', () => {
    const itemPrice = 50;
    const quantity = 2;

    const { tax } = calculatePurchase(itemPrice, quantity);

    expect(tax).toEqual(10); // Assertion 1: Check tax
  });
});


/* Single Concept Per Test */

describe('Purchase Calculation - Total Price', () => {
  it('should calculate total price for a purchase', () => {
    const itemPrice = 50;
    const quantity = 2;

    const { totalPrice } = calculatePurchase(itemPrice, quantity);

    expect(totalPrice).toEqual(100);
  });
});

describe('Purchase Calculation - Tax', () => {
  it('should calculate tax for a purchase', () => {
    const itemPrice = 50;
    const quantity = 2;

    const { tax } = calculatePurchase(itemPrice, quantity);

    expect(tax).toEqual(10);
  });
});

/* __________________classes_________  */
/* ==>encaplsulation */
/* ________________ */

class Person {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  // Getter methods
  get name(): string {
    return this._name;
  }

  get age(): number {
    return this._age;
  }

  // Setter methods with validation
  set age(newAge: number) {
    if (newAge >= 0) {
      this._age = newAge;
    } else {
      console.log("Age cannot be negative.");
    }
  }
}
/* setter and getter talk about that wafi */
/* what does it mean encapsulation */



/* ==>class should be small and od one thing  single responsibility*/
/* ===>command query seperation  */




/* __________________________ */

/* ===>cohesive */

class Car {
  private model: string;
  private year: number;
  private mileage: number;

  constructor(model: string, year: number, initialMileage: number) {
    this.model = model;
    this.year = year;
    this.mileage = initialMileage;
  }

  drive(distance: number): void {
    if (distance > 0) {
      this.mileage += distance;
    }
  }

  reportStatus(): void {
    console.log(`Car: ${this.year} ${this.model}`);
    console.log(`Mileage: ${this.mileage} miles`);
  }
}


/* refactor  */

class Car {
  make: string;
  model: string;
  year: number;
  mileage: number;

  constructor(make: string, model: string, year: number, initialMileage: number) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.mileage = initialMileage;
  }

  drive(distance: number): void {
    if (distance > 0) {
      this.mileage += distance;
    }
  }

  getMileage(): number {
    return this.mileage;
  }
}

class CarReport {
  private car: Car;

  constructor(car: Car) {
    this.car = car;
  }

  generateReport(): string {
    return `Car: ${this.car}`;
  }
}

/* ===>Maintaining Cohesion Results in Many Small Classes */
/* -maintaining cohesion  proprety and classes should be related closely */
/* Breaking Large Functions into Smaller Functions: if a class has many responsibilities it should be subdivised*/
/* Proliferation of Classes: When you start breaking down a large function into smaller functions, you might also find the need to create
 new classes to encapsulate related functionality. */
class Library {
  private books: string[] = [];

  addBook(bookTitle: string) {
    this.books.push(bookTitle);
  }
}

/* adding functionality and splitting */
class Book {
  constructor(private title: string) { }

  getTitle(): string {
    return this.title;
  }
}

class LibraryCatalog {
  private books: Book[] = [];

  addBook(book: Book) {
    this.books.push(book);
  }
   
  findBookByTitle(title: string): Book | undefined {
    return this.books.find((book) => book.getTitle() === title);
  }
}

/* ===>organizing for change  */
/* your system should should have o less coupling  */
/* ocp principle solid*/
/* ________ */


/* ====>multiples responsibilities  and how to fix <===*/

interface Column {
  name: string;
  dataType: string;
}

class Sql {
  constructor(private table: string, private columns: Column[]) { }

  create(): string {
    const columnList = this.columnList(this.columns);
    return `CREATE TABLE ${this.table} (${columnList})`;
  }

  insert(fields: Object[]): string {
    const columnList = this.columnList(this.columns);
    const valuesList = this.valuesList(fields, this.columns);
    return `INSERT INTO ${this.table} (${columnList}) VALUES (${valuesList})`;
  }

  selectAll(): string {
    return `SELECT * FROM ${this.table}`;
  }

  private columnList(columns: Column[]): string {
    return columns.map(column => `${column.name} ${column.dataType}`).join(', ');
  }

  private valuesList(fields: Object[], columns: Column[]): string {
    return fields.map(field => `'${field}'`).join(', ');
  }
}


/* refactor ____*/
// Abstract base class representing a generic SQL operation
abstract class Sql {
  constructor(protected table: string, protected columns: Column[]) { }

  abstract generate(): string;
}

// Concrete classes for specific SQL operations

class CreateSql extends Sql {
  generate(): string {
    // Generate SQL CREATE statement
    // ...
  }
}

class InsertSql extends Sql {
  constructor(table: string, columns: Column[], private fields: Object[]) {
    super(table, columns);
  }

  generate(): string {
    // Generate SQL INSERT statement
    // ...
  }
}

class SelectAllSql extends Sql {
  generate(): string {
    // Generate SQL SELECT statement for all rows
    // ...
  }
}

/* change and dependencies  */
/* we  should not depend on concrete implementation ==abstraction*/

import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

class UserController {
  async sendValidationCodeInEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com',
          pass: 'your_email_password',
        },
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
      });

      // Directly using the concrete User model
      const user = User.findOne({ email });
      user.validationCode = code;
      await user.save();

      const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Validation Code',
        html: `<p>Please set this code on the website to be able to activate the operation:</p>
                <p><strong>${code}</strong></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(404).json({ msg: 'Failed to send email' });
        } else {
          res.status(200).json({ msg: 'Check your email; the code was sent.' });
        }
      });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
}






interface EmailService {
  sendMail(mailOptions: any): Promise<void>;
}

interface UserRepository {
  findOneByEmail(email: string): Promise<any>;
}

class UserController {
  private emailService: EmailService;
  private userRepository: UserRepository;

  constructor(emailService: EmailService, userRepository: UserRepository) {
    this.emailService = emailService;
    this.userRepository = userRepository;
  }

  async sendValidationCodeViaEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Validation Code',
        html: `<p>Please set this code on the website to be able to activate the operation:</p>
                <p><strong>${code}</strong></p>`,
      };
      await this.emailService.sendMail(mailOptions);
      const user = await this.userRepository.findOneByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      user.validationCode = code;
      await user.save();

      res.status(200).json({ msg: 'Check your email; the code was sent.' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
}

/* ______refacor_____ */

class Error {
  message: string;
  constructor(message: string) {
    this.message = message;
  }

}


class UserNotFoundErro extends Error {
  constructor() {
    super("user not found")
  }
}

class UserGuard {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async isEmailfound(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UserNotFoundErro();
    }
    return true
  }
}




interface EmailService {
  sendValidationCodeViaEmail(mailOptions: any): Promise<void>;
}

interface UserRepository {
  findOneByEmail(email: string): Promise<any>;
  modifyCode(code: number): Promise<void>
}

function generateValidationCode(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

function getContentEmail() {
  return `<p>Please set this code on the website to be able to activate the operation:</p>
    <p><strong>${generateValidationCode()}</strong></p>`
}

function generateMail(email: string) {
  return {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Validation Code',
    html: getContentEmail()
  };
}





class UserController {
  private emailService: EmailService;
  private userRepository: UserRepository;
  private userGuard: UserGuard;

  constructor(emailService: EmailService, userRepository: UserRepository, userGuard: UserGuard) {
    this.emailService = emailService;
    this.userRepository = userRepository;
    this.userGuard = userGuard
  }

  async sendValidationCodeViaEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    try {
      if (await this.userGuard.isEmailfound(email)) {
        await this.userRepository.modifyCode(generateValidationCode())
        await this.emailService.sendValidationCodeViaEmail(generateMail);
      }
      res.status(200).json({ msg: 'Check your email; the code was sent.' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
}








/* ________________________________systems */
/* ==> how build  a city */
/* complexity is too much for one person */
/* Team-Based Management: big picture and details */
/* Big Picture vs. Details :architecture-developpment */
/* Levels of Abstraction :This means they have structured their systems in
 a way that allows people to work effectively on specific parts 
without necessarily needing to understand the entire system at once.*/
/* Modularity: involves breaking down a complex system into smaller, manageable components or modules. */
/* ___________________________________ */
/* ===> Seperating a Constructing   a system from it */
/* separating the startup process in software systems from the runtime logic. */

/* sturtup: This refers to the initial setup and configuration of a software application. During the startup process */
/* runtime:logic */
/* exaple github hazem */

/* ___________________________ */
/* ===>main seperation   */
/* construction for use */
// Book.ts - Define the Book class
class Book {
  constructor(public title: string, public author: string) { }
}

// Library.ts - Define the Library class
class Library {
  private books: Book[] = [];

  addBook(book: Book) {
    this.books.push(book);
  }

  listBooks() {
    this.books.forEach((book, index) => {
      console.log(`#${index + 1}: ${book.title} by ${book.author}`);
    });
  }
}

// main.ts - Main program (main separation)
import { Book } from './Book';
import { Library } from './Library';

function main() {

}

main();



/* ___________________ */
/* dependency injection */
/* _____________________________ */
/* ====>scaling up */
/* Software Growth and Evolution */
/* ___ *//* Separation of Concerns */

/* ________________ Cross-Cutting Concerns*/
/* shared issues */
/* identify the cross cutting concerns:auth error handling  */
/* cross-cutting class */

class Logger {
  logMessage(message: string): void {
    console.log(message)
  }
}

class CreateProduct {
  products: any[]
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger
  }

  async createProduct(product: any) {
    this.products.push(product)
    this.logger.logMessage("creating product is good")
  }
}

class GetProduct {
  products: any[];
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger
  }

  getProduct(id: string) {
    this.logger.logMessage("Get product is good")
    return this.products.find((elt) => elt.id === id)
  }
}

const logger = new Logger();
const createProductInstance = new CreateProduct(logger);
const getProductInstance = new GetProduct(logger);





// AuthService.ts
import * as jwt from 'jsonwebtoken';




class AuthService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(username: string): string {
    return jwt.sign({ username }, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): { username: string } | null {
    try {
      const decodedToken = jwt.verify(token, this.secretKey);
      return decodedToken as { username: string };
    } catch (error) {
      return null;
    }
  }
}

class RoleService {
  async isRH(user: any): Promise<boolean> {
    try {
      if (!user) return false;
      return user.role.includes('RH');
    } catch (error) {
      return false;
    }
  }

  async isAdmin(user: any): Promise<boolean> {
    try {
      if (!user) return false;
      return user.role.includes('ADMIN');
    } catch (error) {
      throw new Error("failed")
    }
  }

  async isCEO(userId: any): Promise<boolean> {
    try {
      if (!userId) return false;
      return userId.role.includes('CEO');
    } catch (error) {
      throw new Error('failed')
    }
  }
}

class Employee {
  employees: []
  private readonly userId: string;
  roleService: RoleService

  constructor(userId: string, roleService: RoleService) {
    this.userId = userId;
    this.roleService = roleService

  }

  async getAllEmployeesForCEO(): Promise<any[]> {
    try {
      const isCEO = await this.roleService.isCEO(this.userId);
      if (!isCEO) {
        throw new Error('User is not a CEO and cannot access employee data.');
      }

      return this.employees;

    } catch (error) {
      throw new Error(error.message)
    }
  }
}


/*    ===>Aop
      Aspect Oriented Programming */
/* it is aspect that is used to handle  logging, security, and transactions for cross-cutting -concerns */
/* manage cross-cutting concerns */

/* Logging: Capturing and recording application events or method calls.
Security: Enforcing security checks or access control.
Transactions: Managing database transactions consistently.
Caching: Implementing caching strategies.
Error Handling: Centralizing error handling and exception logging.
Performance Monitoring: Collecting performance metrics. */

/* le decorator est une fonction */

/* Decorateur:mettre un morceau de code dans une fonction */



function test(msg: string) {
  console.log(msg)
}

@test("is there any error")
class Car {
  color: any;
  brand: string;

  constructor(color: string, brand: string) {
    this.color = color;
    this.brand = brand;
  }

  showDetails() {
    return `Brand: ${this.brand}  Color: ${this.color}`;
  }
}





/* __________________________________________________Test drive the system architecture */

/* separation of layers */

/* Separation of Concerns: Separating architectural concerns from domain (functionnality)*/

/* architectural concerns :Security measures and access control
                        Deployment and infrastructure considerations.
                        Authentication and Authorization:
                        Encryption:
                        Input Validation and Sanitization:
                        Security Headers: */

/* _______________Optimize decision making */

/* modularity and seperation of concerns:division  */
/* Just-in-Time Decisions:take time ;) */
/* elevate level of abstraction */
/* minimize the comminication gap */
/* __________________________________________________ */
/* ____________________________________________________ */
/* ________________________________Emergence */
/* ____**Emmergence is a good software design */

/* ===>rules */
/* Run all tests  */
/* no duplication error code : exaple in the project */
/* expressive :express youreslef in the code good naming  -  */
/* _keep class small :single responsability */

/*       ______________________________
      ______________________________
      ______________________________ */
/* _____________________________________concurrency */

/* what is concurrency */
/* concurrency is the process of executing many operation/ 
Clean" concurrent programs refer to programs that not only work but also adhere to best practices
single thread :node 
 multi thread :java

______why concurrency
        _Concurrency is a strategy for decoupling what tasks get done from when they get done.
    
        _single thread
        -multi thread
        _concurrency is a complex challnge  ;
        _Parallelism  
        _Task Independence and  Prioritization

====>!!!!!!!Threads are an abstract concept used in the execution of 
code and are managed by the operating system and runtime environment.
        They are not directly visible in your code.


        single thread=======multi thread ====concurrency

        single thread concurrency :making progress on more than one task
         at a time from within a single thread 

         When we talk about threads, concurrency,
          and multi-threading, we are indeed discussing how
           a program's execution is managed by
           the runtime environment 
         and how it utilizes the processing power of the CPU  */
/* concurrency ==parallelism */

/* _____single thread */
Time: [Core 1]
  | Task 1 |
        | Task 2 |
        | Task 3 |
        | Task 4 |
        | Task 5 |

  /*______multi thread */
  Time: [Core 1][Core 2][Core 3][Core 4]
        | Task 1 |   | Task 2 |   | Task 3 |   | Task 4 |
        | Task 5 |   | Task 6 |   | Task 7 |   | Task 8 |


  /* _____________programing language and the link of the thread */
  /* ____==>javascript :single thread*/
  function getUser(id: string): void {
    console.log(`user is ${id}`)
  }
function Sum() {
  console.log('function sum')
}



function mainProcess() {
  getUser("uuid");
  Sum();
}

const fetchData = async (url: string) => {
  return fetch(url)
}
const showMsg = () => alert("hello");


function mainProgram() {
  fetchData("http");
  showMsg()
}







/* ====> javascript multi thread */
/* Promise.all */
function function1() {

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Function 1aAA completed");
      resolve("Result from Function 1AA");
    }, 0);

    setTimeout(() => {
      console.log("Function 1BB completed");
      resolve("Result from Function 1BB");
    }, 1000);
  });
}

function function2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Function 2 completed");
      resolve("Result from Function 2");
    }, 1000);
  });
}

async function main() {
  const [result1, result2] = await Promise.all([function1(), function2()]);
}
main()



/* ____________challange example  */

class X {
  private lastIdUsed: number = 0;

  public getNextId(): number {
    return ++this.lastIdUsed;
  }
}

const instanceOfX = new X();

// Simulating two "threads" sharing the instance asynchronously
const simulateConcurrency = async () => {
  const thread1 = async () => {
    const id = instanceOfX.getNextId();
    console.log(`Thread 1: Got ID ${id}`);
  };

  const thread2 = async () => {
    const id = instanceOfX.getNextId();
    console.log(`Thread 2: Got ID ${id}`);
  };

  // Use async/await to run both "threads" concurrently
  await Promise.all([thread1(), thread2()]);
};

// Start simulating concurrency
simulateConcurrency();



/* how really it work  */
/* avoiding problems we should have rules  */




/* _____concurrency Defense  Principles */
/* SRP */
/* each thread do one thing */




/* _________________________ */
/* Limit the Scope of Data :the issue of 
two threads modifying the same field of
 a shared object, 
which can lead to unexpected behavior.:
-one thread can access and modify the shared resource at a time. :synchronized
Avoid Shared Data use copy of data 
*/
/* ===>threads should be independant as possible */
const simulateConcurrency = async () => {
  const thread1 = async () => {
    const instanceOfX = new X();
    const id = instanceOfX.getNextId();
    console.log(`Thread 1: Got ID ${id}`);
  };

  const thread2 = async () => {
    const instanceOfX = new X();
    const id = instanceOfX.getNextId();
    console.log(`Thread 2: Got ID ${id}`);
  };

  // Use async/await to run both "threads" concurrently
  await Promise.all([thread1(), thread2()]);
};





/*    ________________________________________________
   _________________________________________________ */

/* node js bibliotheque for worker for multi threads : CPU-bound tasks that you want to parallelize */



/* Excution models :*/
/* concurrent or parallel tasks are structured, scheduled,
 and executed within a computer program or system.
  These models define how multiple threads, processes, or units of work interact and share resources 
to achieve parallelism and improve the efficiency of a program. */
/* 1-producer-consumer:  */

/* producer (web server ) */
/* consumer (client browser) */
/* tasks :http request*/

/* 2_reader-writer */
/* readers and writers, and they interact with a shared resource. */
/* E-commerce Product Catalog Database */
/* shared data :product catalog database */
/* Readers: Readers are customers who visit the e-commerce website to view product listings */
/* Writers are administrators or content managers responsible for updating the product catalog. They can add new products, change prices, 
update product descriptions, or mark products as out of stock. */
/* tasks:The task of a reader is to query the database to retrieve product  */
/* Writer Task: The task of a writer is to make changes to the database */





/* __________________________________________________
__________________________________________________ */
/* _______________________successive Refinment */

/* ==>whwat is */
/* "Successive refinement" is a software development and design approach where you start with a basic
 or initial implementation and then iteratively improve it in multiple stages or steps */


// TypeScript equivalent for Args class

/* set, get, delete, and has */

/* handle and parse command-line arguments in a specific format. */
/* specefic format will be defined by the schema */

/* marshalers: {
  '-l': instance_of_BooleanArgumentMarshaler,
  '-p': instance_of_IntegerArgumentMarshaler,
  '-d': instance_of_StringArgumentMarshaler
} */
/* _____________________________________ */
/* myProgram -l -p 42 -d "data" */
/*    l,p#,d*   */
/* _________________________________________________
__________________________________________________ */

/* _________________________________________________________________ */
/* myProgram -v --input-file data.txt --output-dir /output -t */
/* const schema = "-v,--input-file*,--output-dir*"; */

/* const schema = "l,p#,d*"; */

/* const argsList = ["-l", "-p", "42", "-d", "data"]; */

/* the schema might specify that -l is a Boolean flag, -p expects an integer, and -d expects a string. */

class Args {
  private marshalers: Map<string, ArgumentMarshaler>;
  private argsFound: Set<string>;
  private currentArgument: IterableIterator<string>;


  constructor() {
    this.marshalers = new Map<string, ArgumentMarshaler>();
    this.argsFound = new Set<string>();
  }

  Args(schema: string, args: string[]) {
    this.parseSchema(schema);
    this.parseArgumentStrings(args);
  }

  parseSchema(schema: string): void {
    const elements = schema.split(',');
    for (const element of elements) {
      if (element.length > 0) {
        this.parseSchemaElement(element.trim());
      }
    }
  }
  l   
p#

  private parseSchemaElement(element: string): void {
    const elementId = element.charAt(0);
    const elementTail = element.substring(1);
    this.validateSchemaElementId(elementId);
    if (elementTail.length === 0) {
      this.marshalers.set(elementId, new BooleanArgumentMarshaler());
    } else if (elementTail === '*') {
      this.marshalers.set(elementId, new StringArgumentMarshaler());
    } else if (elementTail === '#') {
      this.marshalers.set(elementId, new IntegerArgumentMarshaler());
    } else if (elementTail === '##') {
      this.marshalers.set(elementId, new DoubleArgumentMarshaler());
    } else if (elementTail === '[*]') {
      this.marshalers.set(elementId, new StringArrayArgumentMarshaler());
    } else {
      throw new ArgsException(INVALID_ARGUMENT_FORMAT, elementId, elementTail);
    }
  }

  private validateSchemaElementId(elementId: string): void {
    if (!/^[a-zA-Z]$/.test(elementId)) {
      throw new ArgsException(ArgsException.ErrorCode.INVALID_ARGUMENT_NAME, elementId, null);
    }
  }

  /* const argsList = ["-l", "-p", "42", "-d", "data"];
  
  const argsList = ["-l", "-p", "8080", "-d", "/path/to/data"]; */

  private parseArgumentStrings(argsList: string[]): void {
    for (let i = 0; i < argsList.length; i++) {
      const argString = argsList[i];
      if (argString.startsWith("-")) {
        this.parseArgumentCharacters(argString.substring(1));
      } else {
        break;
      }
    }
  }

  private parseArgumentCharacters(argChars: string): void {
    for (let i = 0; i < argChars.length; i++) {
      this.parseArgumentCharacter(argChars.charAt(i));
    }
  }
  /* '-l' ,'-p', '-d' */
  /* ["-l", "-p"] */
  private parseArgumentCharacter(argChar: string): void {
    const m = this.marshalers.get(argChar);
    if (!m) {
      throw new ArgsException(UNEXPECTED_ARGUMENT, argChar, null);
    } else {
      this.argsFound.add(argChar);
      try {
        m.set(this.currentArgument);
      } catch (e) {
        e.setErrorArgumentId(argChar);
        throw e;
      }
    }

  }

  has(arg: string): boolean {
    return this.argsFound.has(arg);
  }
  /* const argsList = ["-l", "-p", "42", "-d", "data"]; */
  /* -l, -p, and -d are flags or identifiers. */
  /* find the next postion of flag */

  public nextArgument(argsList: string[]): number {
    const currentIndex = argsList.indexOf(this.currentArgument as unknown as string);
    return currentIndex !== -1 ? currentIndex + 1 : -1;
  }
  /* will return 1 */

  public getBoolean(arg: string): boolean {
    return BooleanArgumentMarshaler.getValue(this.marshalers.get(arg));
  }

  public getString(arg: string): string {
    return StringArgumentMarshaler.getValue(this.marshalers.get(arg));
  }

  public getInt(arg: string): number {
    return IntegerArgumentMarshaler.getValue(this.marshalers.get(arg));
  }
}




interface ArgumentMarshaler {
  set(currentArgument: IterableIterator<string>): void;
}

class BooleanArgumentMarshaler implements ArgumentMarshaler {
  private booleanValue: boolean = false;

  set(currentArgument: IterableIterator<string>): void {
    this.booleanValue = true;
  }

  static getValue(am: ArgumentMarshaler): boolean {
    if (am instanceof BooleanArgumentMarshaler && am !== null) {
      return am.booleanValue;
    }
    return false;
  }
}

class StringArgumentMarshaler implements ArgumentMarshaler {
  private stringValue: string = "";

  set(currentArgument: IterableIterator<string>): void {
    const result = currentArgument.next();
    if (!result.done) {
      this.stringValue = result.value;
    } else {
      throw new ArgsException(MISSING_STRING);
    }
  }

  static getValue(am: ArgumentMarshaler | null): string {
    if (am instanceof StringArgumentMarshaler) {
      return am.stringValue;
    }
    return "";
  }
}


class IntegerArgumentMarshaler implements ArgumentMarshaler {
  private intValue: number = 0;

  set(currentArgument: IterableIterator<string>): void {
    const result = currentArgument.next();
    if (!result.done) {
      const parameter = result.value;
      const parsedInt = parseInt(parameter, 10);
      if (!isNaN(parsedInt)) {
        this.intValue = parsedInt;
      } else {
        throw new ArgsException(INVALID_INTEGER, parameter);
      }
    } else {
      throw new ArgsException(MISSING_INTEGER);
    }
  }

  static getValue(am: ArgumentMarshaler | null): number {
    if (am instanceof IntegerArgumentMarshaler) {
      return am.intValue;
    }
    return 0;
  }
}

enum ErrorCode {
  OK,
  INVALID_ARGUMENT_FORMAT,
  UNEXPECTED_ARGUMENT,
  INVALID_ARGUMENT_NAME,
  MISSING_STRING,
  MISSING_INTEGER,
  INVALID_INTEGER,
  MISSING_DOUBLE,
  INVALID_DOUBLE,
}

class ArgsException extends Error {
  private errorArgumentId: string = '\0';
  private errorParameter: string | null = null;
  private errorCode: ErrorCode = ErrorCode.OK;

  constructor(message?: string, errorCode?: ErrorCode, errorArgumentId?: string, errorParameter?: string) {
    super(message);
    if (errorCode !== undefined) {
      this.errorCode = errorCode;
    }
    if (errorArgumentId !== undefined) {
      this.errorArgumentId = errorArgumentId;
    }
    if (errorParameter !== undefined) {
      this.errorParameter = errorParameter;
    }
  }

  getErrorArgumentId(): string {
    return this.errorArgumentId;
  }

  setErrorArgumentId(errorArgumentId: string): void {
    this.errorArgumentId = errorArgumentId;
  }

  getErrorParameter(): string | null {
    return this.errorParameter;
  }

  setErrorParameter(errorParameter: string | null): void {
    this.errorParameter = errorParameter;
  }

  getErrorCode(): ErrorCode {
    return this.errorCode;
  }

  setErrorCode(errorCode: ErrorCode): void {
    this.errorCode = errorCode;
  }

  errorMessage(): string {
    switch (this.errorCode) {
      case ErrorCode.OK:
        return 'TILT: Should not get here.';
      case ErrorCode.UNEXPECTED_ARGUMENT:
        return `Argument -${this.errorArgumentId} unexpected.`;
      case ErrorCode.MISSING_STRING:
        return `Could not find string parameter for -${this.errorArgumentId}.`;
      case ErrorCode.INVALID_INTEGER:
        return `Argument -${this.errorArgumentId} expects an integer but was '${this.errorParameter}'.`;
      case ErrorCode.MISSING_INTEGER:
        return `Could not find integer parameter for -${this.errorArgumentId}.`;
      case ErrorCode.INVALID_DOUBLE:
        return `Argument -${this.errorArgumentId} expects a double but was '${this.errorParameter}'.`;
      case ErrorCode.MISSING_DOUBLE:
        return `Could not find double parameter for -${this.errorArgumentId}.`;
      case ErrorCode.INVALID_ARGUMENT_NAME:
        return `'${this.errorArgumentId}' is not a valid argument name.`;
      case ErrorCode.INVALID_ARGUMENT_FORMAT:
        return `'${this.errorParameter}' is not a valid argument format.`;
    }
  }
}

export { ArgsException, ErrorCode };


/* ___________refactoring 11_______________ */

class Args {
  private schema: string;
  private args: string[];
  private valid: boolean = true;
  private unexpectedArguments: Set<string> = new Set<string>();
  private marshalers: Map<string, ArgumentMarshaler> = new Map<string, ArgumentMarshaler>();
  private argsFound: Set<string> = new Set<string>();
  private currentArgument: number = 0;
  private errorArgumentId: string = '\0';
  private errorParameter: string = 'TILT';
  private errorCode: ErrorCode = ErrorCode.OK;

  constructor(schema: string, args: string[]) {
    this.schema = schema;
    this.args = args;
    this.valid = this.parse();
  }

  private parse(): boolean {
    if (this.schema.length === 0 && this.args.length === 0) {
      return true;
    }
    this.parseSchema();
    try {
      this.parseArguments();
    } catch (e) {
      // Handle ArgsException
    }
    return this.valid;
  }

  private parseSchema(): void {
    for (const element of this.schema.split(',')) {
      if (element.length > 0) {
        const trimmedElement = element.trim();
        this.parseSchemaElement(trimmedElement);
      }
    }
  }

  private parseSchemaElement(element: string): void {
    const elementId = element.charAt(0);
    const elementTail = element.substring(1);
    this.validateSchemaElementId(elementId);
    if (this.isBooleanSchemaElement(elementTail)) {
      this.marshalers.set(elementId, new BooleanArgumentMarshaler());
    } else if (this.isStringSchemaElement(elementTail)) {
      this.marshalers.set(elementId, new StringArgumentMarshaler());
    } else if (this.isIntegerSchemaElement(elementTail)) {
      this.marshalers.set(elementId, new IntegerArgumentMarshaler());
    } else {
      throw new Error(`Argument: ${elementId} has an invalid format: ${elementTail}`);
    }
  }

  private validateSchemaElementId(elementId: string): void {
    if (!/^[a-zA-Z]$/.test(elementId)) {
      throw new Error(`Bad character: ${elementId} in Args format: ${this.schema}`);
    }
  }

  private isStringSchemaElement(elementTail: string): boolean {
    return elementTail === '*';
  }

  private isBooleanSchemaElement(elementTail: string): boolean {
    return elementTail.length === 0;
  }

  private isIntegerSchemaElement(elementTail: string): boolean {
    return elementTail === '#';
  }

  private parseArguments(): void {
    while (this.currentArgument < this.args.length) {
      const arg = this.args[this.currentArgument];
      this.parseArgument(arg);
    }
  }

  private parseArgument(arg: string): void {
    if (arg.startsWith('-')) {
      this.parseElements(arg.substring(1));
    }
  }

  private parseElements(argChars: string): void {
    for (let i = 0; i < argChars.length; i++) {
      this.parseElement(argChars.charAt(i));
    }
  }

  private parseElement(argChar: string): void {
    if (this.setArgument(argChar)) {
      this.argsFound.add(argChar);
    } else {
      this.unexpectedArguments.add(argChar);
      this.errorCode = ErrorCode.UNEXPECTED_ARGUMENT;
      this.valid = false;
    }
  }

  private setArgument(argChar: string): boolean {
    const m = this.marshalers.get(argChar);
    try {
      if (m instanceof BooleanArgumentMarshaler) {
        this.setBooleanArg(m);
      } else if (m instanceof StringArgumentMarshaler) {
        this.setStringArg(m);
      } else if (m instanceof IntegerArgumentMarshaler) {
        this.setIntArg(m);
      } else {
        return false;
      }
    } catch (e) {
      this.valid = false;
      this.errorArgumentId = argChar;
      throw e;
    }
    return true;
  }

  private setIntArg(m: ArgumentMarshaler): void {
    this.currentArgument++;
    let parameter: string | null = null;
    try {
      parameter = this.args[this.currentArgument];
      m.set(parameter);
    } catch (e) {
      this.errorCode = ErrorCode.MISSING_INTEGER;
      throw new Error();
    }
  }

  private setStringArg(m: ArgumentMarshaler): void {
    this.currentArgument++;
    try {
      m.set(this.args[this.currentArgument]);
    } catch (e) {
      this.errorCode = ErrorCode.MISSING_STRING;
      throw new Error();
    }
  }

  private setBooleanArg(m: ArgumentMarshaler): void {
    try {
      m.set('true');
    } catch (e) {
      // Handle ArgsException
    }
  }

  public cardinality(): number {
    return this.argsFound.size;
  }

  public usage(): string {
    return this.schema.length > 0 ? `-[${this.schema}]` : '';
  }

  public errorMessage(): string {
    switch (this.errorCode) {
      case ErrorCode.OK:
        throw new Error('TILT: Should not get here.');
      case ErrorCode.UNEXPECTED_ARGUMENT:
        return this.unexpectedArgumentMessage();
      case ErrorCode.MISSING_STRING:
        return `Could not find a string parameter for -${this.errorArgumentId}.`;
      case ErrorCode.INVALID_INTEGER:
        return `Argument -${this.errorArgumentId} expects an integer but was '${this.errorParameter}'.`;
      case ErrorCode.MISSING_INTEGER:
        return `Could not find an integer parameter for -${this.errorArgumentId}.`;
    }
    return '';
  }

  private unexpectedArgumentMessage(): string {
    let message = `Argument(s) -`;
    for (const arg of this.unexpectedArguments) {
      message += arg;
    }
    message += ' unexpected.';
    return message;
  }

  public getBoolean(arg: string): boolean {
    const am = this.marshalers.get(arg);
    let b = false;
    try {
      b = am !== undefined && (am as BooleanArgumentMarshaler).get();
    } catch (e) {
      b = false;
    }
    return b;
  }

  public getString(arg: string): string {
    const am = this.marshalers.get(arg);
    try {
      return am === undefined ? '' : (am as StringArgumentMarshaler).get();
    } catch (e) {
      return '';
    }
  }

  public getInt(arg: string): number {
    const am = this.marshalers.get(arg);
    try {
      return am === undefined ? 0 : (am as IntegerArgumentMarshaler).get();
    } catch (e) {
      return 0;
    }
  }

  public has(arg: string): boolean {
    return this.argsFound.has(arg);
  }

  public isValid(): boolean {
    return this.valid;
  }

  private class ArgsException extends Error { }
private abstract class ArgumentMarshaler {
  public abstract set(s: string): void;
  public abstract get(): any;
}

private class BooleanArgumentMarshaler extends ArgumentMarshaler {
  private booleanValue: boolean = false;
  public set(s: string): void {
    this.booleanValue = true;
  }
  public get(): any {
    return this.booleanValue;
  }
}

private class StringArgumentMarshaler extends ArgumentMarshaler {
  private stringValue: string = "";
  public set(s: string): void {
    this.stringValue = s;
  }
  public get(): any {
    return this.stringValue;
  }
}

private class IntegerArgumentMarshaler extends ArgumentMarshaler {
  private intValue: number = 0;
  public set(s: string): void {
    const parsedInt = parseInt(s, 10);
    if (!isNaN(parsedInt)) {
      this.intValue = parsedInt;
    } else {
      throw new Error();
    }
  }
  public get(): any {
    return this.intValue;
  }
}
}

enum ErrorCode {
  OK,
  INVALID_ARGUMENT_FORMAT,
  UNEXPECTED_ARGUMENT,
  INVALID_ARGUMENT_NAME,
  MISSING_STRING,
  MISSING_INTEGER,
  INVALID_INTEGER,
  MISSING_DOUBLE,
  INVALID_DOUBLE,
}

class ArgsException extends Error {
  private errorArgumentId: string = '\0';
  private errorParameter: string | null = null;
  private errorCode: ErrorCode = ErrorCode.OK;
  constructor(
    message: string | undefined,
    errorCode?: ErrorCode,
    errorArgumentId?: string,
    errorParameter?: string
  ) {
    super(message);
    if (errorCode !== undefined) {
      this.errorCode = errorCode;
    }
    if (errorArgumentId !== undefined) {
      this.errorArgumentId = errorArgumentId;
    }
    if (errorParameter !== undefined) {
      this.errorParameter = errorParameter;
    }
  }
  public getErrorArgumentId(): string {
    return this.errorArgumentId;
  }
  public setErrorArgumentId(errorArgumentId: string): void {
    this.errorArgumentId = errorArgumentId;
  }
  public getErrorParameter(): string | null {
    return this.errorParameter;
  }
  public setErrorParameter(errorParameter: string | null): void {
    this.errorParameter = errorParameter;
  }
  public getErrorCode(): ErrorCode {
    return this.errorCode;
  }
  public setErrorCode(errorCode: ErrorCode): void {
    this.errorCode = errorCode;
  }
  public errorMessage(): string {
    switch (this.errorCode) {
      case ErrorCode.OK:
        return 'TILT: Should not get here.';
      case ErrorCode.UNEXPECTED_ARGUMENT:
        return `Argument -${this.errorArgumentId} unexpected.`;
      case ErrorCode.MISSING_STRING:
        return `Could not find string parameter for -${this.errorArgumentId}.`;
      case ErrorCode.INVALID_INTEGER:
        return `Argument -${this.errorArgumentId} expects an integer but was '${this.errorParameter}'.`;
      case ErrorCode.MISSING_INTEGER:
        return `Could not find integer parameter for -${this.errorArgumentId}.`;
    }
    return '';
  }
}

export { ArgsException, ErrorCode };

/* ________________JUINIT_________ */
/* ----------_____________Introduction to Junit___------ */
/* what is :
     framework for unit test fro java application */
/* Kent Beck and Eric Gamma  during a journey on the plane tey decid to make junit  */
/* -----__________ComparisonCompactor________----- */




class ComparisonCompactor {
  static readonly ELLIPSIS: string = '...';
  static readonly DELTA_END: string = ']';
  static readonly DELTA_START: string = '[';
  contextLength: number;
  expected: string;
  actual: string;
  prefixLength: number;
  suffixLength: number;

  constructor(contextLength: number, expected: string, actual: string) {
    this.contextLength = contextLength;
    this.expected = expected;
    this.actual = actual;
  }

  formatCompactedComparison(message: string): string {
    let compactExpected: string = this.expected;
    let compactActual: string = this.actual;

    if (this.shouldBeCompacted()) {
      this.findCommonPrefixAndSuffix();
      compactExpected = this.compact(this.expected);
      compactActual = this.compact(this.actual);
    }

    return this.format(message, compactExpected, compactActual);
  }

  private shouldBeCompacted(): boolean {
    return !this.shouldNotBeCompacted();
  }

  private shouldNotBeCompacted(): boolean {
    return this.expected == null || this.actual == null || this.expected === this.actual;
  }

  private findCommonPrefixAndSuffix(): void {
    this.findCommonPrefix();
    this.suffixLength = 0;

    while (!this.suffixOverlapsPrefix()) {
      if (this.charFromEnd(this.expected, this.suffixLength) !== this.charFromEnd(this.actual, this.suffixLength)) {
        break;
      }
      this.suffixLength++;
    }
  }

  private charFromEnd(s: string, i: number): string {
    return s.charAt(s.length - i - 1);
  }

  private suffixOverlapsPrefix(): boolean {
    return this.actual.length - this.suffixLength <= this.prefixLength || this.expected.length - this.suffixLength <= this.prefixLength;
  }

  findCommonPrefix(): void {
    this.prefixLength = 0;
    const end: number = Math.min(this.expected.length, this.actual.length);

    while (this.prefixLength < end) {
      if (this.expected.charAt(this.prefixLength) !== this.actual.charAt(this.prefixLength)) {
        break;
      }
      this.prefixLength++;
    }
  }

  compact(s: string): string {
    return (
      this.startingEllipsis() +
      this.startingContext() +
      ComparisonCompactor.DELTA_START +
      this.delta(s) +
      ComparisonCompactor.DELTA_END +
      this.endingContext() +
      this.endingEllipsis()
    );
  }

  startingEllipsis(): string {
    return this.prefixLength > this.contextLength ? ComparisonCompactor.ELLIPSIS : '';
  }

  startingContext(): string {
    const contextStart: number = Math.max(0, this.prefixLength - this.contextLength);
    const contextEnd: number = this.prefixLength;
    return this.expected.substring(contextStart, contextEnd);
  }

  delta(s: string): string {
    const deltaStart: number = this.prefixLength;
    const deltaEnd: number = s.length - this.suffixLength;
    return s.substring(deltaStart, deltaEnd);
  }

  endingContext(): string {
    const contextStart: number = this.expected.length - this.suffixLength;
    const contextEnd: number = Math.min(contextStart + this.contextLength, this.expected.length);
    return this.expected.substring(contextStart, contextEnd);
  }

  endingEllipsis(): string {
    return this.suffixLength > this.contextLength ? ComparisonCompactor.ELLIPSIS : '';
  }

  format(message: string, expected: string, actual: string): string {
    return message.replace('{expected}', expected).replace('{actual}', actual);
  }
}

const compactor = new ComparisonCompactor(2, "apple", "apricot");
const message = "Expected: '{expected}'\nActual: '{actual}'";
const formattedMessage = compactor.format(message, compactor.expected, compactor.actual);
/*  Expected: 'apricot'
Actual: 'apple' */
compactor.findCommonPrefix()
console.log(compactor.prefixLength); /* 2 */
const startingContext = compactor.startingContext();  /* ap */
const delta = compactor.delta("apple");  /* ple */
const endingContext = compactor.endingContext()  /* ""  */ /* empty string */
const startingEllipsis = compactor.startingEllipsis() /* ==>"" */
const endingEllipsis = compactor.endingEllipsis()  /* ==>"" */
compactor.compact("apple")  /* ===>"...[ple] <=> [ricot]... */








describe('ComparisonCompactor', () => {
  let compactor: ComparisonCompactor

  beforeEach(() => {
    compactor = new ComparisonCompactor(2, 'apple', 'apricot');
  });

  it('should return the  common prefix ', () => {
    const result = compactor.startingContext();
    expect(result).toBe('ap');
  });

  it('should return the length of common prefix ', () => {
    const prefixLength = compactor.findCommonPrefix();
    expect(prefixLength).toBe(2);
  });
});


/* ______________________________________________
_______________________________________________ */
/* ________________refactoring serialDate_________ */

/* =====introduction */
/* -serialDate  is a class that is developped by David Gilbert */
/* -making this class open-source to use */
/* purpose of the class of serial Date :
    ==>Calculating the Number of Days in a Month*
    ==>Checking Day of the Week
    ==>Finding the Next Occurrence of a Specific Day     
    ==>Date Formatting
    ==>Comparing Dates              */


/* problem on the serialDate :
algorithms errors 
test failure 
test coverage */
// Day enumeration



// DateInterval enumeration
/* enum DateInterval {
  OPEN,
  CLOSED_LEFT,
  CLOSED_RIGHT,
  CLOSED,
} */


/* class DateUtil {
  static dateFormatSymbols: any;
  static getMonthNames(): string[] {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  static lastDayOfMonth(month: Month, year: number): number {
    switch (month) {
      case Month.JANUARY:
      case Month.MARCH:
      case Month.MAY:
      case Month.JULY:
      case Month.AUGUST:
      case Month.OCTOBER:
      case Month.DECEMBER:
        return 31;
      case Month.APRIL:
      case Month.JUNE:
      case Month.SEPTEMBER:
      case Month.NOVEMBER:
        return 30;
      case Month.FEBRUARY:
        return DateUtil.isLeapYear(year) ? 29 : 28;
      default:
        return 0; 
    }
  }
} */



/* ____________________________________smells and heuristics */
/* ====>why the name is like that :smells and heuristics */
/* ==>means the intution of refactoring things */
/* 1-comments: sould not be redundent and shoul not explain what code do */
/* 2-Environment:building the project should be simplified to a single command.
                 running test should be simple and in a single action */
/*  3-funtions:  function should have a small number a arguments
               do not use flag arguments  */
/* 4-General : one source file 
                unexpected behaviour :return type that is mentionned 
                  do  not repyt youreself :duplication
                  abstraction : interface or abstract classes 
                  variables should be declared close to where we want to use them
                  High level module should not depend on low level module
                  encapsulation
                  the code should be where it should folders and design pattern
                  names of function should say what they do 

                  */


/* instead of if else use polymorphisem */

class Shape {
  constructor(public type: string) { }

  calculateArea(): void {
    if (this.type === 'circle') {

    } else if (this.type === 'rectangle') {

    } else if (this.type === 'triangle') {

    } else {
      throw new Error('Invalid shape type');
    }
  }
}

abstract class Shape {
  constructor(public type: string) { }

  abstract calculateArea(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super('circle');
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super('rectangle');
  }

  calculateArea(): void {

  }

}

/* avoid negative condition */
if (!user) {

}
use enum

/* do not inherit constant  */










/* class SerialDate {
  private date: Date;

  constructor(year: number, month: number, day: number) {
    this.date = new Date(year, month - 1, day); // Months are zero-based in JavaScript
  }

  public isInRange(d1: SerialDate, d2: SerialDate): boolean {
    return this.date >= d1.date && this.date <= d2.date;
  }

  public isInRangeInclude(d1: SerialDate, d2: SerialDate, include: number): boolean {
    if (include === 0) {
      return this.date > d1.date && this.date < d2.date;
    } else if (include === 1) {
      return this.date >= d1.date && this.date <= d2.date;
    } else if (include === 2) {
      return this.date >= d1.date && this.date < d2.date;
    } else if (include === 3) {
      return this.date > d1.date && this.date <= d2.date;
    }
    return false; 
  }

  public getPreviousDayOfWeek(targetDOW: number): SerialDate {
    const prevDate = new Date(this.date);
    prevDate.setDate(prevDate.getDate() - 1);
    while (prevDate.getDay() !== targetDOW) {
      prevDate.setDate(prevDate.getDate() - 1);
    }
    return new SerialDate(prevDate.getFullYear(), prevDate.getMonth() + 1, prevDate.getDate());
  }

  public getFollowingDayOfWeek(targetDOW: number): SerialDate {
    const nextDate = new Date(this.date);
    nextDate.setDate(nextDate.getDate() + 1);
    while (nextDate.getDay() !== targetDOW) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    return new SerialDate(nextDate.getFullYear(), nextDate.getMonth() + 1, nextDate.getDate());
  }

  public getNearestDayOfWeek(targetDOW: number): SerialDate {
    const prev = this.getPreviousDayOfWeek(targetDOW);
    const next = this.getFollowingDayOfWeek(targetDOW);

    if (Math.abs(this.date.getTime() - prev.date.getTime()) <= Math.abs(this.date.getTime() - next.date.getTime())) {
      return prev;
    } else {
      return next;
    }
  }

  // Get the current year
  public getYear(): number {
    return this.date.getFullYear();
  }

  
  public getMonth(): number {
    return this.date.getMonth() + 1;
  }


  public getDay(): number {
    return this.date.getDate();
  }
} */

// Usage example:
/* _____________________________________
_____________________________________________________ */


class SerialDate {
  private description: string;
  static createInstance: any;

  constructor(private day: number, private month: number, private year: number) { }

  static isValidWeekdayCode(code: number): boolean {
    switch (code) {
      case SerialDate.SUNDAY:
      case SerialDate.MONDAY:
      case SerialDate.TUESDAY:
      case SerialDate.WEDNESDAY:
      case SerialDate.THURSDAY:
      case SerialDate.FRIDAY:
      case SerialDate.SATURDAY:
        return true;
      default:
        return false;
    }
  }

  static stringToWeekdayCode(s: string): number {
    return -1;
  }


  static SUNDAY = 0;
  static MONDAY = 1;
  static TUESDAY = 2;
  static WEDNESDAY = 3;
  static THURSDAY = 4;
  static FRIDAY = 5;
  static SATURDAY = 6;

  static JANUARY = 1;
  static FEBRUARY = 2;
  static MARCH = 3;
  static APRIL = 4;
  static MAY = 5;
  static JUNE = 6;
  static JULY = 7;
  static AUGUST = 8;
  static SEPTEMBER = 9;
  static OCTOBER = 10;
  static NOVEMBER = 11;
  static DECEMBER = 12;

  static FIRST_WEEK_IN_MONTH = 1;
  static SECOND_WEEK_IN_MONTH = 2;
  static THIRD_WEEK_IN_MONTH = 3;
  static FOURTH_WEEK_IN_MONTH = 4;
  static LAST_WEEK_IN_MONTH = 0;

  static INCLUDE_NONE = 0;
  static INCLUDE_FIRST = 1;
  static INCLUDE_SECOND = 2;
  static INCLUDE_BOTH = 3;

  static PRECEDING = -1;
  static NEAREST = 0;
  static FOLLOWING = 1;

  static LAST_DAY_OF_MONTH = [
    0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];

  static AGGREGATE_DAYS_TO_END_OF_MONTH = [
    0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];

  // Add other static arrays...

  static isLeapYear(yyyy: number): boolean {
    if ((yyyy % 4) !== 0) {
      return false;
    } else if ((yyyy % 400) === 0) {
      return true;
    } else if ((yyyy % 100) === 0) {
      return false;
    } else {
      return true;
    }
  }

  static leapYearCount(yyyy: number): number {
    const leap4 = (yyyy - 1896) / 4;
    const leap100 = (yyyy - 1800) / 100;
    const leap400 = (yyyy - 1600) / 400;
    return leap4 - leap100 + leap400;
  }

  static lastDayOfMonth(month: number, yyyy: number): number {
    const result = SerialDate.LAST_DAY_OF_MONTH[month];
    if (month !== SerialDate.FEBRUARY) {
      return result;
    } else if (SerialDate.isLeapYear(yyyy)) {
      return result + 1;
    } else {
      return result;
    }
  }

  static addDays(days: number, base: SerialDate): SerialDate {
    const serialDayNumber = base.toSerial() + days;
    return SerialDate.createInstance(serialDayNumber);
  }

  // Add other static methods...

  toSerial(): number {
    // Implement your toSerial logic here.
    return -1; // Placeholder, replace with actual code.
  }

  toDate(): Date {
    // Implement your toDate logic here.
    return new Date(); // Placeholder, replace with actual code.
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  toString(): string {
    return `${this.getDayOfMonth()}-${SerialDate.monthCodeToString(this.getMonth())}-${this.getYYYY()}`;
  }

  getYYYY(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  getDayOfMonth(): number {
    return this.day;
  }

  getDayOfWeek(): number {
    // Implement your getDayOfWeek logic here.
    return -1; // Placeholder, replace with actual code.
  }

  compare(other: SerialDate): number {
    // Implement your compare logic here.
    return -1; // Placeholder, replace with actual code.
  }

  isOn(other: SerialDate): boolean {
    // Implement your isOn logic here.
    return false; // Placeholder, replace with actual code.
  }

  isBefore(other: SerialDate): boolean {
    // Implement your isBefore logic here.
    return false; // Placeholder, replace with actual code.
  }

  isOnOrBefore(other: SerialDate): boolean {
    // Implement your isOnOrBefore logic here.
    return false; // Placeholder, replace with actual code.
  }

  isAfter(other: SerialDate): boolean {
    // Implement your isAfter logic here.
    return false; // Placeholder, replace with actual code.
  }

  isOnOrAfter(other: SerialDate): boolean {
    // Implement your isOnOrAfter logic here.
    return false; // Placeholder, replace with actual code.
  }

  isInRange(d1: SerialDate, d2: SerialDate, include?: number): boolean {
    // Implement your isInRange logic here.
    return false; // Placeholder, replace with actual code.
  }

  getPreviousDayOfWeek(targetDOW: number): SerialDate {
    return SerialDate.getPreviousDayOfWeek(targetDOW, this);
  }

  getFollowingDayOfWeek(targetDOW: number): SerialDate {
    return SerialDate.getFollowingDayOfWeek(targetDOW, this);
  }

  getNearestDayOfWeek(targetDOW: number): SerialDate {
    return SerialDate.getNearestDayOfWeek(targetDOW, this);
  }

  // Add other methods...
}

/* __________________________________________________refactoring */

enum Day {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

enum Month {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
}

class MonthUtils {
  static lastDayOfMonth(month: Month, year: number): number {
    switch (month) {
      case Month.APRIL:
      case Month.JUNE:
      case Month.SEPTEMBER:
      case Month.NOVEMBER:
        return 30;

      case Month.FEBRUARY:
        return DayDate.isLeapYear(year) ? 29 : 28;

      default:
        return 31;
    }
  }
}



/* DayDate : Represents a date with day, month, and year. */
/* DayDate Class
Represents a date with day, month, and year.
It has methods to check if a year is a leap year,
 validate the year, validate the day, calculate the ordinal, and more. */

class DayDate {
  private ordinalDay: number;
  private day: number;
  private month: Month;
  private year: number;

  constructor(day: number, month: Month, year: number) {
    this.validateYear(year);
    this.validateDay(day, month, year);

    this.year = year;
    this.month = month;
    this.day = day;
  }

  static isLeapYear(year: number): boolean {
    const fourth = year % 4 === 0;
    const fourHundredth = year % 400 === 0;
    return (fourth && fourHundredth);
  }

  leapYearCount(year: number): number {
    const leap4 = Math.floor((year - 1896) / 4);
    const leap100 = Math.floor((year - 1800) / 100);
    const leap400 = Math.floor((year - 1600) / 400);
    return leap4 - leap100 + leap400;
  }

  private validateYear(year: number): void {
    const MINIMUM_YEAR_SUPPORTED = 1900;
    const MAXIMUM_YEAR_SUPPORTED = 9999;
    if (year < MINIMUM_YEAR_SUPPORTED || year > MAXIMUM_YEAR_SUPPORTED) {
      throw new Error(`The 'year' argument must be in the range ${MINIMUM_YEAR_SUPPORTED} to ${MAXIMUM_YEAR_SUPPORTED}.`);
    }
  }

  private lastDayOfMonth(month: Month, year: number): number {
    return MonthUtils.lastDayOfMonth(month, year)
  }

  private validateDay(day: number, month: Month, year: number): void {
    const lastDayOfMonth = this.lastDayOfMonth(month, year);
    if (day < 1 || day > lastDayOfMonth) {
      throw new Error('Invalid day argument.');
    }
  }
}


/* In simpler terms, the ordinal day is a way to express the day's
 position within the year. For example,
  January 1st would typically have an ordinal day of 1, and December 31st would have an 
ordinal day near the total number of days in the year (365 or 366 for a leap year).
 */


const myDate = new DayDate(15, Month.AUGUST, 2023);

/* 2024 is a leap year because it's divisible by 4.
1900 is not a leap year because it's divisible by 100 but not by 400. */

myDate.leapYearCount(2023)
DayDate.isLeapYear(2023)



/* utilit class from java */
class DateFormatSymbols {
  getMonthNames(): string[] {
    return ["January",
      "February", "March", "April", "May", "June", "July",
       "August", "September", "October", "November", "December"]
  }
}

/* DayDateFactory (Abstract Class):

Role: An abstract factory for creating instances of DayDate.
Methods: Defines factory methods for creating DayDate instances and getting minimum and maximum supported years. */


abstract class DayDateFactory {
  protected abstract _makeOrdinalDate(ordinal: number): DayDate;
  protected abstract _makeDateWithMonth(ordinal: number, month: Month, year: number): DayDate;
  protected abstract _makeDateWithNumbers(ordinal: number, month: number, year: number): DayDate;
  protected abstract _getMinimumYear(): number;
  protected abstract _getMaximumYear(): number;
}

/* SpreadsheetDateFactory */
/* The class SpreadsheetDateFactory is a concrete implementation of the abstract class DayDateFactory *//* 
implements methods to create instances of DayDate using the SpreadsheetDate class. */



/* For example:

January 1st would have an ordinal day of 1.
January 2nd would have an ordinal day of 2.
December 31st would have an ordinal day of 365 (or 366 in a leap year) */


class SpreadsheetDateFactory extends DayDateFactory {
  private spreadsheetDate: typeof SpreadsheetDate;

  constructor(spreadsheetDate: typeof SpreadsheetDate) {
    super();
    this.spreadsheetDate = spreadsheetDate;
  }

  _makeOrdinalDate(ordinal: number): any {
    return new this.spreadsheetDate(ordinal);
  }

  _makeDateWithMonth(ordinal: number, month: Month, year: number): any {
    return new this.spreadsheetDate(ordinal, month, year);
  }

  _makeDateWithNumbers(ordinal: number, month: number, year: number): any {
    return new this.spreadsheetDate(ordinal, month, year);
  }

  _getMinimumYear(): number {
    return this.spreadsheetDate.MINIMUM_YEAR_SUPPORTED;
  }

  _getMaximumYear(): number {
    return this.spreadsheetDate.MAXIMUM_YEAR_SUPPORTED;
  }
}









class SpreadsheetDate  {
  public static readonly EARLIEST_DATE_ORDINAL = 2;
  public static readonly LATEST_DATE_ORDINAL = 2958465;
  public static readonly MINIMUM_YEAR_SUPPORTED = 1900;
  public static readonly MAXIMUM_YEAR_SUPPORTED = 9999;
  private static readonly AGGREGATE_DAYS_TO_END_OF_PRECEDING_MONTH = [
    0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  private static readonly LEAP_YEAR_AGGREGATE_DAYS_TO_END_OF_PRECEDING_MONTH = [
    0, 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366
  ];

  private ordinalDay: number;
  private day: number;
  private month: Month;
  private year: number;

  constructor(day?: number, month?: Month, year?: number) {



  }

  static fromInt(serial: number): SpreadsheetDate {
    if (serial < SpreadsheetDate.EARLIEST_DATE_ORDINAL || serial > SpreadsheetDate.LATEST_DATE_ORDINAL)
      throw new Error("SpreadsheetDate: Serial must be in range 2 to 2958465.");

    const date = new SpreadsheetDate(1, Month.JANUARY, 1900); // Initialize to the earliest date
    date.ordinalDay = serial;
    date.calcDayMonthYear();
    return date;
  }

  equals(object: DayDate): boolean {
    if (!(object instanceof DayDate))
      return false;

    const date = object as SpreadsheetDate;
    return date.getOrdinalDay() === this.getOrdinalDay();
  }

  hashCode(): number {
    return this.getOrdinalDay();
  }

  compareTo(other: DayDate): number {
    return this.daysSince(other);
  }

  private calcOrdinal(day: number, month: Month, year: number): number {
    const leapDaysForYear = this.leapYearCount(year - 1);
    const daysUpToYear = (year - SpreadsheetDate.MINIMUM_YEAR_SUPPORTED) * 365 + leapDaysForYear;
    const daysUpToMonth = SpreadsheetDate.AGGREGATE_DAYS_TO_END_OF_PRECEDING_MONTH[month - 1];
    if (DayDate.isLeapYear(year) && month > Month.FEBRUARY)
      daysUpToMonth++;
    const daysInMonth = day - 1;
    return daysUpToYear + daysUpToMonth + daysInMonth + SpreadsheetDate.EARLIEST_DATE_ORDINAL;
  }

  private calcDayMonthYear(): void {
    let days = this.ordinalDay - SpreadsheetDate.EARLIEST_DATE_ORDINAL;
    let overestimatedYear = SpreadsheetDate.MINIMUM_YEAR_SUPPORTED + Math.floor(days / 365);
    let nonleapdays = days - this.leapYearCount(overestimatedYear);
    let underestimatedYear = SpreadsheetDate.MINIMUM_YEAR_SUPPORTED + Math.floor(nonleapdays / 365);

    this.year = this.huntForYearContaining(this.ordinalDay, underestimatedYear);
    let firstOrdinalOfYear = this.firstOrdinalOfYear(this.year);
    this.month = this.huntForMonthContaining(this.ordinalDay, firstOrdinalOfYear);
    this.day = this.ordinalDay - firstOrdinalOfYear - this.daysBeforeThisMonth(this.month);
  }

  private huntForMonthContaining(anOrdinal: number, firstOrdinalOfYear: number): Month {
    let daysIntoThisYear = anOrdinal - firstOrdinalOfYear;
    let aMonth = 1;
    while (this.daysBeforeThisMonth(aMonth) < daysIntoThisYear)
      aMonth++;

    return aMonth - 1;
  }

  private daysBeforeThisMonth(aMonth: number): number {
    if (DayDate.isLeapYear(this.year))
      return SpreadsheetDate.LEAP_YEAR_AGGREGATE_DAYS_TO_END_OF_PRECEDING_MONTH[aMonth] - 1;
    else
      return SpreadsheetDate.AGGREGATE_DAYS_TO_END_OF_PRECEDING_MONTH[aMonth] - 1;
  }

  



}



/* ______concurrency  */

/* ___client server socket and multi thread  */

/* class ServerSocket {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  accept(): Socket {
    return new Socket();
  }
}


class Socket {
  private isConnected: boolean;

  constructor() {
    this.isConnected = true;
  }

  send(message: string): void {
    console.log(`Sending: ${message}`);
  }

  receive(): string {
    const message = "Hello from the server!";
    console.log(`Received: ${message}`);
    return message;
  }

  close(): void {
    this.isConnected = false;
    console.log("Socket closed.");
  }
}

class Server {
  private serverSocket: ServerSocket;
  private keepProcessing: boolean;

  constructor(port: number) {
    this.serverSocket = new ServerSocket(port);
    this.keepProcessing = true;
  }

  startServer() {
    while (this.keepProcessing) {
      try {
        const socket: Socket = this.serverSocket.accept();
        this.process(socket);
      } catch (e) {
        console.log(e)
      }
    }
  }

  process(socket: Socket) {
    if (!socket) return;
    const clientHandler = () => {
      try {
     
      } catch (e) {
        console.error(e);
      }
    };

    const clientConnection: Thread = new Thread(clientHandler);
    clientConnection.start();
  }
} */


class Socket {
  private isConnected: boolean;

  constructor() {
    this.isConnected = true;
  }

  send(message: string): void {
    console.log(`Sending: ${message}`);
  }

  receive(): string {
    const message = "Hello from the server!";
    console.log(`Received: ${message}`);
    return message;
  }

  close(): void {
    this.isConnected = false;
    console.log("Socket closed.");
  }
}

class Server {
  private clients: Socket[];
  private keepProcessing: boolean;

  constructor() {
    this.clients = [];
    this.keepProcessing = true;
  }

  startServer() {
    while (this.keepProcessing) {
      try {
        const socket: Socket = this.acceptConnection();
        this.clients.push(socket);
        this.process(socket);
      } catch (e) {
        console.log(e);
      }
    }
  }

  acceptConnection(): Socket {
    return new Socket();
  }

  process(socket: Socket) {
    if (!socket) return;
    const clientHandler = () => {
      try {
        // Simulate some processing with the socket
        for (let i = 0; i < 5; i++) {
          socket.send(`Message ${i + 1} from client`);
          const receivedMessage = socket.receive();
          console.log(`Server received: ${receivedMessage}`);
        }

        socket.close();
      
      } catch (e) {
        console.error(e);
      }
    };

    const clientConnection = new Thread(clientHandler);
    clientConnection.start();
  }
}

class Thread {
  private task: () => void;

  constructor(task: () => void) {
    this.task = task;
  }

  start() {
    setTimeout(this.task, 0);
  }
}

/* _______adding multi threads to the socket  */


class Socket {
  // Simulate asynchronous operations
  async send(message: string): Promise<void> {
    console.log(`Sending: ${message}`);
  }

  async receive(): Promise<string> {
    const message = "Hello from the server!";
    console.log(`Received: ${message}`);
    return message;
  }

  async close(): Promise<void> {
    console.log("Socket closed.");
  }
}

class Server {
  private clients: Socket[] = [];

  async startServer(): Promise<void> {
    // Simulate incoming connections
    for (let i = 0; i < 5; i++) {
      const socket = new Socket();
      this.clients.push(socket);
      this.process(socket);
    }

    // Simulate processing all clients concurrently
    await this.processAll();
  }

  async process(socket: Socket): Promise<void> {
    if (!socket) return;
    const clientHandler = async (): Promise<void> => {
      try {
        const message = await socket.receive();
        await socket.send(`Processed: ${message}`);
        await socket.close();
      } catch (e) {
        console.error(e);
      }
    };

    clientHandler();
  }

  async processAll(): Promise<void> {
    const promises = this.clients.map((socket) => this.process(socket));
    await Promise.all(promises);
  }
}

/* ___multi threads exuctors */
/* async and await===Java 5 Executor Framework */
/* AtomicBoolean, AtomicInteger, and AtomicReference  in java  */

/* __non blocking code  */

/* the event loop is a mechanism that allows
the runtime to perform non-blocking I/O operations 
and handle concurrent requests without creating multiple threads. */



function readFileSyncExample(filePath: string): void {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(`Content of ${filePath} (Sync):`, data);
  } catch (error) {
    console.error(`Error reading ${filePath} (Sync):`, error);
  }
}


function readFileAsyncExample(filePath: string): void {
  fs.readFile(filePath, 'utf8', (err: any, data: any) => {
    if (err) {
      console.error(`Error reading ${filePath} (Async):`, err);
    } else {
      console.log(`Content of ${filePath} (Async):`, data);
    }
  });
}

/* _____________ Locking  */
/* Locking Mechanism: modify shared data */
class X {
  private lastIdUsed: number = 0;

  public getNextId(): number {
    return ++this.lastIdUsed;
  }
}

const instanceOfX = new X();

const simulateConcurrency = async () => {
  const thread1 = async () => {
    const id = instanceOfX.getNextId();
    console.log(`Thread 1: Got ID ${id}`);
  };

  const thread2 = async () => {
    const id = instanceOfX.getNextId();
    console.log(`Thread 2: Got ID ${id}`);
  };

  await Promise.all([thread1(), thread2()]);
};


simulateConcurrency();

/* _______________deadLock  */
/* Deadlock is a situation in concurrent programming where two or more threads are 
unable to proceed because each is waiting for the other to release a resource */
class Friend {
  private toy1InUse: boolean = false;
  private toy2InUse: boolean = false;

  playWithToy1(): void {
    this.toy1InUse = true;
  }

  playWithToy2(): void {
    this.toy2InUse = true;
  }

  stopPlayingWithToy1(): void {
    this.toy1InUse = false;
  }

  stopPlayingWithToy2(): void {
    this.toy2InUse = false;
  }


}

// Friends playing with toys
const alice = new Friend();
const bob = new Friend();


new Thread(() => {
  alice.playWithToy1();
  alice.stopPlayingWithToy1();
}).start();

new Thread(() => {
  bob.playWithToy2();
  bob.stopPlayingWithToy2();
}).start();



/* ==========>deadlock */
new Thread(() => {
  alice.playWithToy1();
}).start();

new Thread(() => {
  bob.playWithToy1();
  bob.stopPlayingWithToy2();
}).start();




/* ____problem with solution */

class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  getBalance() {
    return this.balance;
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }

  transferTo(account: BankAccount, amount: number) {

    this.withdraw(amount); /* retrait from the emieeur  */
    account.deposit(amount); /* deposer to the destinataire */
  }
}

const account1 = new BankAccount(200);
const account2 = new BankAccount(100);

// Thread A (representing Account Holder 1)
new Thread(() => {
  account1.transferTo(account2, 200);
}).start();

// Thread B (representing Account Holder 2)
new Thread(() => {
  account2.transferTo(account1, 300);
}).start();



/* circular wait */
/* lock wait  */

































new Thread(() => {
  alice.playWithToy1();
}).start();

// Thread B (representing Bob)
new Thread(() => {
  bob.playWithToy1();
  bob.stopPlayingWithToy2();
}).start();












































































































































