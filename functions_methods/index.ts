/* keep the number of paramter low */
/* if we have multiple parameters we can to add comment to be clear  and to nkow the place of each arguments*/
/* keep it simlpe */
class User {
  email: string;
  name: string;
  password: string;
  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}

const newUser = new User("oumaima@gmail.com", "oumaima", "aaaaa");

class User {
  email: string;
  name: string;
  password: string;
  constructor(userData) {
    this.email = userData.email;
    this.name = userData.name;
    this.password = userData.password;
  }
}
const newUser = new User({
  name: "oumaima",
  password: "&&&&",
  email: "oumaima@gmail.com",
});

/* function should be small and do one thing */

const userAuth = (userData, operation) => {
  if (operation === "login") {
    const user = { email: userData.email, password: userData.password };
    /* login user */
  } else {
    /* register */
  }
};

const login = (userData) => {
  const user = { email: userData.email, password: userData.password };
};
const register = (userData) => {
  const user = {
    email: userData.email,
    password: userData.password,
    name: userData.name,
  };
};

/* when creating functions and method we are not repeating ourself  DRY */

function fetchData(url: string, useCache: boolean): any {
  if (useCache) {
    // Logic to fetch data from cache
  } else {
    // Logic to fetch data from the server
  }
}

function fetchFromServer(url: string): any {
  // Logic to fetch data from the server
}

function fetchFromCache(): any {
  // Logic to fetch data from cache
}

