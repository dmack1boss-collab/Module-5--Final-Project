// API endpoint
const API_URL = 'http://www.omdbapi.com/?s=fast&furious&apikey=YOUR_API_KEY';

// Sample data with fixed image URLs
const sampleMovies = [
    {
        "Title": "The Fast and the Furious",
        "Year": "2001",
        "imdbID": "tt0232500",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMWMzZGU3MWZiN2JkXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "2 Fast 2 Furious",
        "Year": "2003",
        "imdbID": "tt0322259",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMzExYjcyYWMtY2JkOC00NDUwLTg2OTgtMWI3NjVmODY4NTExXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
        "Title": "The Fast and the Furious: Tokyo Drift",
        "Year": "2006",
        "imdbID": "tt0463985",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg"
    },
    {
        "Title": "Fast & Furious",
        "Year": "2009",
        "imdbID": "tt1013752",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    },
    {
        "Title": "Fast Five",
        "Year": "2011",
        "imdbID": "tt1596343",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg"
    },
    {
        "Title": "Fast & Furious 6",
        "Year": "2013",
        "imdbID": "tt1905041",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg"
    },
    
];

// DOM elements
const moviesGrid = document.getElementById('moviesGrid');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const searchInput = document.getElementById('searchInput');
const titleFilter = document.getElementById('titleFilter');
const yearFilter = document.getElementById('yearFilter');
const resetBtn = document.getElementById('resetBtn');

// Store current filters
let currentFilters = {
    title: '',
    year: ''
};

// Render movies
function renderMovies(movies) {
    moviesGrid.innerHTML = '';
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 40px; grid-column: 1/-1;">No movies found matching your filters.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        // Fallback image if poster is not available
        const posterUrl = (movie.Poster && movie.Poster !== 'N/A') 
            ? movie.Poster 
            : 'https://via.placeholder.com/300x450/667eea/ffffff?text=' + encodeURIComponent(movie.Title);
        
        movieCard.innerHTML = `
            <img src="${posterUrl}" 
                 alt="${movie.Title}" 
                 class="movie-image"
                 onerror="this.src='https://via.placeholder.com/300x450/667eea/ffffff?text=${encodeURIComponent(movie.Title)}'">
            <div class="movie-details">
                <div class="movie-year">${movie.Year}</div>
                <h3 class="movie-title">${movie.Title}</h3>
                <div class="movie-info">
                    <div class="info-row">
                        <span class="info-icon">📅</span>
                        <span>${movie.Year}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">🎬</span>
                        <span class="movie-type">${movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">🆔</span>
                        <span>${movie.imdbID}</span>
                    </div>
                </div>
            </div>
        `;
        
        movieCard.addEventListener('click', () => {
            window.open(`https://www.imdb.com/title/${movie.imdbID}/`, '_blank');
        });
        
        moviesGrid.appendChild(movieCard);
    });
}

// Apply filters
function applyFilters() {
    let filteredMovies = [...sampleMovies];
    
    // Filter by title
    if (currentFilters.title) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Title.toLowerCase().includes(currentFilters.title.toLowerCase())
        );
    }
    
    // Filter by year
    if (currentFilters.year) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Year === currentFilters.year
        );
    }
    
    renderMovies(filteredMovies);
    updateResultsCount(filteredMovies.length);
}

// Update results count
function updateResultsCount(count) {
    const resultsText = document.querySelector('.filter-header h2');
    resultsText.textContent = `Search results: ${count} movie${count !== 1 ? 's' : ''} found`;
}

// Fetch movies from API
async function fetchMovies() {
    try {
        loading.style.display = 'block';
        error.style.display = 'none';
        
        // Using sample data instead of API call
        // Uncomment below to use real API
        // const response = await fetch(API_URL);
        // const data = await response.json();
        // if (data.Response === "True") {
        //     sampleMovies = data.Search;
        //     populateYearDropdown();
        //     renderMovies(sampleMovies);
        // } else {
        //     throw new Error(data.Error);
        // }
        
        setTimeout(() => {
            loading.style.display = 'none';
            populateYearDropdown();
            renderMovies(sampleMovies);
            updateResultsCount(sampleMovies.length);
        }, 500);
        
    } catch (err) {
        loading.style.display = 'none';
        error.style.display = 'block';
        console.error('Error fetching movies:', err);
    }
}

// Populate year dropdown with unique years
function populateYearDropdown() {
    const years = [...new Set(sampleMovies.map(movie => movie.Year))].sort((a, b) => b - a);
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Title filter event listener
titleFilter.addEventListener('input', (e) => {
    currentFilters.title = e.target.value;
    applyFilters();
});

// Year filter event listener
yearFilter.addEventListener('change', (e) => {
    currentFilters.year = e.target.value;
    applyFilters();
});

// Reset filters
resetBtn.addEventListener('click', () => {
    currentFilters = {
        title: '',
        year: ''
    };
    titleFilter.value = '';
    yearFilter.value = '';
    applyFilters();
});

// Search functionality (general search)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = sampleMovies.filter(movie => 
        movie.Title.toLowerCase().includes(searchTerm) ||
        movie.Year.includes(searchTerm) ||
        movie.Type.toLowerCase().includes(searchTerm)
    );
    renderMovies(filteredMovies);
    updateResultsCount(filteredMovies.length);
});

// Initialize
fetchMovies();