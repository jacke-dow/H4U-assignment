const express = require("express");
const app = express();

// Function to check if a number is prime
function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// Endpoint to get all prime numbers up to the specified number
app.get("/primes/:number", (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number)) {
    return res.status(400).json({ error: "Invalid number" });
  }

  const primes = [];

  for (let i = 2; i <= number; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  res.json({ primes });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
