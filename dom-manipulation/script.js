// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do what you can, with what you have, where you are.", category: "Action" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "It always seems impossible until it's done.", category: "Determination" }
];

// Save quotes to local storage
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

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);

        // Save the updated quotes array to local storage
        saveQuotes();

        // Repopulate categories if a new category was added
        populateCategories();

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

    // Start syncing with the server
    syncWithServer();
};

// Mock server API endpoint (replace with a real API if needed)
const mockApiUrl = "https://jsonplaceholder.typicode.com/posts";

// Simulate fetching quotes from server
function fetchQuotesFromServer() {
    return fetch(mockApiUrl)
        .then(response => response.json())
        .then(data => {
            // Transform data to match quote format
            return data.map(item => ({
                text: item.title, // Example transformation
                category: "General" // Assign a default category
            }));
        });
}

// Simulate posting updated quotes to server
function syncQuotesToServer(updatedQuotes) {
    return fetch(mockApiUrl, {
        method: 'POST',
        body: JSON.stringify(updatedQuotes),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
}

// Sync data with server and resolve conflicts
function syncWithServer() {
    fetchQuotesFromServer().then(serverData => {
        const localData = JSON.parse(localStorage.getItem('quotes')) || [];
        
        const mergedData = mergeQuotes(localData, serverData);
        
        // Update local storage
        localStorage.setItem('quotes', JSON.stringify(mergedData));
        saveQuotes();

        // Notify user of updates
        alert("Quotes synced with server!");
        
        // Sync the updated quotes back to the server
        syncQuotesToServer(mergedData).then((message) => {
            console.log("Data posted to server:", message);
        });
    });
}

// Merge local and server quotes
function mergeQuotes(localQuotes, serverQuotes) {
    const localMap = new Map(localQuotes.map(quote => [quote.text, quote]));
    const serverMap = new Map(serverQuotes.map(quote => [quote.text, quote]));

    const mergedQuotes = [...serverQuotes];

    localMap.forEach((localQuote, text) => {
        if (!serverMap.has(text)) {
            mergedQuotes.push(localQuote);
        }
    });

    return mergedQuotes;
}

// Populate categories dynamically in the filter dropdown
function populateCategories() {
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    const categoryFilter = document.getElementById("categoryFilter");

    // Clear existing options (except "All Categories")
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add unique categories to the dropdown
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore the last selected category filter from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
        filterQuotes(); // Apply the filter on page load
    }
}

// Display filtered quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = '';  // Clear previous content

    // Display the filtered quotes
    filteredQuotes.forEach(quote => {
        const quoteTextElement = document.createElement('p');
        quoteTextElement.textContent = quote.text;

        const quoteCategoryElement = document.createElement('p');
        quoteCategoryElement.innerHTML = `<em>Category: ${quote.category}</em>`;

        quoteDisplay.appendChild(quoteTextElement);
        quoteDisplay.appendChild(quoteCategoryElement);
    });

    // Save the selected category filter to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
}

// Periodically sync with server every 5 minutes
setInterval(syncWithServer, 5 * 60 * 1000);

// Initial setup
populateCategories();
filterQuotes();
