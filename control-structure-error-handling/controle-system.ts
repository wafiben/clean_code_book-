/* avoid nested control structure */
function processTransactions(transactions) {
  if (transactions && transactions.length > 0) {
    for (const transaction of transactions) {
      if (transaction.type === "PAYMENT") {
        if (transaction.status === "OPEN") {
          if (transaction.method === "CREDIT_CARD") {
            processCreditCardPayment(transaction);
          } else if (transaction.method === "PAYPAL") {
            processPayPalPayment(transaction);
          } else if (transaction.method === "PLAN") {
            processPlanPayment(transaction);
          }
        } else {
          console.log("Invalid transaction type!");
        }
      } else if (transaction.type === "REFUND") {
        if (transaction.status === "OPEN") {
          if (transaction.method === "CREDIT_CARD") {
            processCreditCardRefund(transaction);
          } else if (transaction.method === "PAYPAL") {
            processPayPalRefund(transaction);
          } else if (transaction.method === "PLAN") {
            processPlanRefund(transaction);
          }
        } else {
          console.log("Invalid transaction type!", transaction);
        }
      } else {
        console.log("Invalid transaction type!", transaction);
      }
    }
  } else {
    console.log("No transactions provided!");
  }
}
/* guard and fail fast */
const login = (email: string) => {
  if (email.includes("a")) {
    return; /* fail fast */
  }
  /* do something */
};

const checkUser = (user) => {
  if (user.active) {
    if (user.hasPurchases()) {
      /* do something */
    }
  }
  /* do something */
};

const checkUser = (user) => {
  if (user.active) {
    return;
  }
  if (user.hasPurchases()) {
    return;
  }
  /* do something */
};
