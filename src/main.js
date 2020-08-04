const express = require("express");
const {uuid, isUuid} = require("uuidv4");

const app = express();

app.use(express.json());


function logRequest(request, response, next) {
  const { method, url } = response;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next(); // proximo middleware

  console.timeEnd(logLabel);
}


function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response
      .status(400)
      .json({ error: `Param sent isn't a valid UUID` });
  }
  next();
}

const receiveTransactions = {
    "transactions": [],
    "balance": {
        "income": 0,
        "outcome": 0,
        "total": 0
    }
}

// function createBalance(request, response,next) {
//     const {type, value} = request.body;
    
//     if (type === "income") {
//         receiveTransactions.balance.total += value;
//     }
//     else if (type === "outcome") {
//         receiveTransactions.balance.total -= value;
//     }
//     next();
// }

app.get('/transactions', (request, response) => {
    //QUERY PARAMS
    const {title} = request.query;
    
    // estrutura condicional ternária
    const results = title ? receiveTransactions.transactions.filter(transaction => transaction.title.includes(title)) : receiveTransactions.transactions;
    
    return response.json(results); 
});

app.post('/transactions', (request, response) => {
    // REQUEST BODY
    const {type, value, title} = request.body;
    
    const transaction = {id: uuid(), title, type, value};
    
    receiveTransactions.transactions.push(transaction);

    return response.json(transaction);
});

    app.put("/transactions/:id",validateProjectId, (request, response) => {
        const { id } = request.params;
        const { type, value, title } = request.body;

        const transactionsIndex = transactions.findIndex(
          (transation) => transaction.id === id
        );
            if (transactionIndex < 0) {
      return response.status(400).json({ error: "transaction not find." });
    }
    const transactions ={
        id,
        title,
        value,
        type,
    };

    transaction[transactionIndex] = transaction;
    return response.json(transaction);
        
});



app.delete("/transactions/:id", (request, response) => {
    const { id } = request.params;
    const { type, value, title } = request.body;
    const transactionsIndex = transactions.findIndex((transation) => transaction.id === id);
  
    if (transactionIndex < 0) {
      return response.status(400).json({ error: "transaction not find." });
    }
  
    transactions.splice(scrapIndex, 1);
    return response.status(204).send();
  });

const port = 3333;
app.listen(3333, () => {
    console.log(`Server up and running on PORT ${port}`);
});



