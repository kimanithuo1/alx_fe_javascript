// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" }
  ];
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
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
  
    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
  }
  
  // Add event listener for the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
  
      // Save the updated quotes array to local storage
      saveQuotes();
  
      // Dynamically create a new list item (optional, you can list added quotes)
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
  
  // Load the last viewed quote from session storage on page load
  window.onload = function() {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      const quoteDisplay = document.getElementById("quoteDisplay");
  
      // Create elements dynamically
      const quoteTextElement = document.createElement('p');
      quoteTextElement.textContent = lastQuote.text;
  
      const quoteCategoryElement = document.createElement('p');
      quoteCategoryElement.innerHTML = `<em>Category: ${lastQuote.category}</em>`;
  
      // Append new elements to the quoteDisplay div
      quoteDisplay.appendChild(quoteTextElement);
      quoteDisplay.appendChild(quoteCategoryElement);
    }
  };
  
  // Function to export quotes to a JSON file
  function exportToJsonFile() {
    const jsonString = JSON.stringify(quotes);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  }
  
  // Add event listener to export button
  document.getElementById("exportJson").addEventListener("click", exportToJsonFile);
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
  
      // Save the imported quotes to local storage
      saveQuotes();
  
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  