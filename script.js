document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sortMarketCapButton = document.getElementById('sortMarketCap');
    const sortPercentageChangeButton = document.getElementById('sortPercentageChange');
    const cryptoTableBody = document.getElementById('cryptoTableBody');
    let cryptoData = [];
  
    // Fetch data from API
    function fetchData() {
      const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
      return fetch(apiUrl)
        .then(response => response.json());
    }
  
    // Render crypto table
    function renderCryptoTable(data) {
      cryptoTableBody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.symbol}</td>
          <td>${item.current_price}</td>
          <td>${item.total_volume}</td>
          <td>${item.price_change_percentage_24h}</td>
          <td>mkt cap: ${item.market_cap}</td>
        `;
        cryptoTableBody.appendChild(row);
      });
    }
  
    // Event listener for search button
    searchButton.addEventListener('click', function() {
      const searchValue = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(item => item.name.toLowerCase().includes(searchValue) || item.symbol.toLowerCase().includes(searchValue));
      renderCryptoTable(filteredData);
    });
  
    // Event listener for sort by market cap button
    sortMarketCapButton.addEventListener('click', function() {
      const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
      renderCryptoTable(sortedData);
    });
  
    // Event listener for sort by percentage change button
    sortPercentageChangeButton.addEventListener('click', function() {
      const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderCryptoTable(sortedData);
    });
  
    // Fetch data and render table
    fetchData()
      .then(data => {
        cryptoData = data;
        renderCryptoTable(cryptoData);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  