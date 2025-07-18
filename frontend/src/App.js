import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Hero, ContentRows, VideoPlayer, SearchResults, ProfileModal } from './components';

const TVShowsPage = ({ tvShows, onPlayVideo, imageBaseUrl }) => (
  <div>
    <Hero 
      featuredContent={tvShows[0]}
      onPlayVideo={onPlayVideo}
      imageBaseUrl={imageBaseUrl}
    />
    <ContentRows 
      trending={[]} 
      movies={[]} 
      tvShows={tvShows} 
      onPlayVideo={onPlayVideo} 
      imageBaseUrl={imageBaseUrl} 
    />
  </div>
);
const MoviesPage = ({ movies, onPlayVideo, imageBaseUrl }) => (
  <div>
    <Hero 
      featuredContent={movies[0]}
      onPlayVideo={onPlayVideo}
      imageBaseUrl={imageBaseUrl}
    />
    <ContentRows 
      trending={[]} 
      movies={movies} 
      tvShows={[]} 
      onPlayVideo={onPlayVideo} 
      imageBaseUrl={imageBaseUrl} 
    />
  </div>
);
const LatestPage = ({ trending, onPlayVideo, imageBaseUrl }) => (
  <div>
    <Hero 
      featuredContent={trending[0]}
      onPlayVideo={onPlayVideo}
      imageBaseUrl={imageBaseUrl}
    />
    <ContentRows 
      trending={trending} 
      movies={[]} 
      tvShows={[]} 
      onPlayVideo={onPlayVideo} 
      imageBaseUrl={imageBaseUrl} 
    />
  </div>
);
const MyListPage = () => <div className="pt-32 px-8 text-white text-3xl">My List Page (Coming Soon)</div>;

// TMDB API Configuration
const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function App() {
  const [currentUser, setCurrentUser] = useState('John Doe');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from TMDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, tvRes, trendingRes] = await Promise.all([
          fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
          fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
          fetch(`${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US`)
        ]);

        const [moviesData, tvData, trendingData] = await Promise.all([
          moviesRes.json(),
          tvRes.json(),
          trendingRes.json()
        ]);

        setMovies(moviesData.results || []);
        setTvShows(tvData.results || []);
        setTrending(trendingData.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data if API fails
        setMovies(mockMovies);
        setTvShows(mockTvShows);
        setTrending(mockTrending);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handlePlayVideo = (item) => {
    setSelectedVideo(item);
    setShowVideoPlayer(true);
  };

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false);
    setSelectedVideo(null);
  };

  // Mock data fallback
  const mockMovies = [
    { id: 1, title: "Stranger Things", backdrop_path: "/path1.jpg", overview: "A group of kids face supernatural forces in their small town." },
    { id: 2, title: "The Witcher", backdrop_path: "/path2.jpg", overview: "A monster hunter struggles to find his place in a world where people often prove more wicked than beasts." },
    { id: 3, title: "Ozark", backdrop_path: "/path3.jpg", overview: "A financial advisor drags his family from Chicago to the Missouri Ozarks." }
  ];

  const mockTvShows = [
    { id: 4, name: "The Crown", backdrop_path: "/path4.jpg", overview: "The story of Queen Elizabeth II from the 1940s to modern times." },
    { id: 5, name: "Bridgerton", backdrop_path: "/path5.jpg", overview: "The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society." }
  ];

  const mockTrending = [
    { id: 6, title: "Wednesday", name: "Wednesday", backdrop_path: "/path6.jpg", overview: "Wednesday Addams navigates her years as a student at Nevermore Academy." },
    { id: 7, title: "Glass Onion", backdrop_path: "/path7.jpg", overview: "World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery." }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Netflix...</div>
      </div>
    );
  }

  return (
    <div className="App bg-black min-h-screen text-white">
      <BrowserRouter>
        <Header 
          currentUser={currentUser}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onProfileClick={() => setShowProfile(true)}
        />
        
        <Routes>
          <Route path="/" element={
            <div>
              {isSearching ? (
                <SearchResults 
                  results={searchResults} 
                  onPlayVideo={handlePlayVideo}
                  imageBaseUrl={TMDB_IMAGE_BASE_URL}
                />
              ) : (
                <>
                  <Hero 
                    featuredContent={trending[0] || mockTrending[0]}
                    onPlayVideo={handlePlayVideo}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                  <ContentRows 
                    trending={trending}
                    movies={movies}
                    tvShows={tvShows}
                    onPlayVideo={handlePlayVideo}
                    imageBaseUrl={TMDB_IMAGE_BASE_URL}
                  />
                </>
              )}
            </div>
          } />
          <Route path="/tv-shows" element={<TVShowsPage tvShows={tvShows} onPlayVideo={handlePlayVideo} imageBaseUrl={TMDB_IMAGE_BASE_URL} />} />
          <Route path="/movies" element={<MoviesPage movies={movies} onPlayVideo={handlePlayVideo} imageBaseUrl={TMDB_IMAGE_BASE_URL} />} />
          <Route path="/latest" element={<LatestPage trending={trending} onPlayVideo={handlePlayVideo} imageBaseUrl={TMDB_IMAGE_BASE_URL} />} />
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>

        {showVideoPlayer && selectedVideo && (
          <VideoPlayer 
            video={selectedVideo}
            onClose={handleCloseVideoPlayer}
          />
        )}

        {showProfile && (
          <ProfileModal 
            currentUser={currentUser}
            onClose={() => setShowProfile(false)}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;