// Array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
  
    // Clear previous content
    quoteDisplay.innerHTML = '';
  
    // Create elements dynamically
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = randomQuote.text;
  
    const quoteCategoryElement = document.createElement('p');
    quoteCategoryElement.innerHTML = `<em>Category: ${randomQuote.category}</em>`;
  
    // Append new elements to the quoteDisplay div
    quoteDisplay.appendChild(quoteTextElement);
    quoteDisplay.appendChild(quoteCategoryElement);
  }
  
  // Add event listener for the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Function to add a new quote
  function createAddQuoteForm() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      
      // Dynamically create a new list item (for example, you can list added quotes)
      const newQuoteDisplay = document.createElement('p');
      newQuoteDisplay.textContent = `New Quote: "${newQuote.text}" - Category: ${newQuote.category}`;
      document.body.appendChild(newQuoteDisplay);
  
      alert("Quote added successfully!");
      
      // Clear input fields after adding the quote
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
    } else {
      alert("Please enter both the quote text and category.");
    }
  }
  