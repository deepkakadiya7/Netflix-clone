import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Header Component
export const Header = ({ currentUser, onSearch, searchQuery, setSearchQuery, onProfileClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      onSearch(query);
    } else {
      onSearch('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-red-600 text-2xl font-bold">NETFLIX</div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/tv-shows" className="text-white hover:text-gray-300 transition-colors">TV Shows</Link>
            <Link to="/movies" className="text-white hover:text-gray-300 transition-colors">Movies</Link>
            <Link to="/latest" className="text-white hover:text-gray-300 transition-colors">Latest</Link>
            <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors">My List</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="bg-black border border-gray-600 rounded px-3 py-1 text-white focus:outline-none focus:border-white"
                  autoFocus
                />
                <button 
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                🔍
              </button>
            )}
          </div>
          
          <div className="text-white hover:text-gray-300 cursor-pointer">🔔</div>
          
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
            onClick={onProfileClick}
          >
            <img 
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXJzfGVufDB8fHxibGFja3wxNzUyMzc1NTI5fDA&ixlib=rb-4.1.0&q=85"
              alt="Profile"
              className="w-8 h-8 rounded object-cover"
            />
            <span className="text-white">{currentUser}</span>
            <span className="text-white">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
export const Hero = ({ featuredContent, onPlayVideo, imageBaseUrl }) => {
  if (!featuredContent) return null;

  const backgroundImage = featuredContent.backdrop_path 
    ? `${imageBaseUrl}${featuredContent.backdrop_path}`
    : 'https://images.unsplash.com/photo-1698984299212-0ab8cd7bf72b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBiYWNrZ3JvdW5kfGVufDB8fHxibGFja3wxNzUyNDY2MDIzfDA&ixlib=rb-4.1.0&q=85';

  return (
    <div className="relative h-screen flex items-center justify-start pt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-lg px-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          {featuredContent.title || featuredContent.name}
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-3">
          {featuredContent.overview}
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={() => onPlayVideo(featuredContent)}
            className="bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors font-semibold flex items-center space-x-2"
          >
            <span>▶</span>
            <span>Play</span>
          </button>
          <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded hover:bg-gray-500 transition-colors font-semibold flex items-center space-x-2">
            <span>ℹ</span>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Content Rows Component
export const ContentRows = ({ trending, movies, tvShows, onPlayVideo, imageBaseUrl }) => {
  return (
    <div className="relative z-10 -mt-32 space-y-12 px-8">
      <ContentRow 
        title="Trending Now" 
        items={trending} 
        onPlayVideo={onPlayVideo}
        imageBaseUrl={imageBaseUrl}
      />
      <ContentRow 
        title="Popular Movies" 
        items={movies} 
        onPlayVideo={onPlayVideo}
        imageBaseUrl={imageBaseUrl}
      />
      <ContentRow 
        title="Popular TV Shows" 
        items={tvShows} 
        onPlayVideo={onPlayVideo}
        imageBaseUrl={imageBaseUrl}
      />
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, items, onPlayVideo, imageBaseUrl }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.getElementById(`row-${title}`);
    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  return (
    <div className="relative group">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
        >
          ←
        </button>
        <div 
          id={`row-${title}`}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <ContentCard 
              key={item.id}
              item={item}
              onPlayVideo={onPlayVideo}
              imageBaseUrl={imageBaseUrl}
            />
          ))}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
        >
          →
        </button>
      </div>
    </div>
  );
};

// Content Card Component
export const ContentCard = ({ item, onPlayVideo, imageBaseUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = item.backdrop_path || item.poster_path
    ? `${imageBaseUrl}${item.backdrop_path || item.poster_path}`
    : 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHx8YmxhY2t8MTc1MjQzNTM5M3ww&ixlib=rb-4.1.0&q=85';

  return (
    <div 
      className="relative flex-shrink-0 w-64 cursor-pointer transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlayVideo(item)}
    >
      <div className="relative">
        <img 
          src={imageSrc}
          alt={item.title || item.name}
          className="w-full h-36 object-cover rounded"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <span>▶</span>
              <span>Play</span>
            </button>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-white font-semibold truncate">{item.title || item.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{item.overview}</p>
      </div>
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ video, onClose }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const type = video.title ? 'movie' : 'tv';
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${video.id}/videos?api_key=c8dea14dc917687ac631a52620e4f7ad`
        );
        const data = await response.json();
        
        const trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
          setVideoUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
        } else {
          // Fallback to a sample trailer
          setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [video]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          ✕
        </button>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading trailer...</div>
          </div>
        ) : (
          <div className="relative pt-[56.25%]">
            <iframe 
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
              title={video.title || video.name}
            />
          </div>
        )}
        
        <div className="mt-4 text-white">
          <h2 className="text-2xl font-bold">{video.title || video.name}</h2>
          <p className="text-gray-300 mt-2">{video.overview}</p>
        </div>
      </div>
    </div>
  );
};

// Search Results Component
export const SearchResults = ({ results, onPlayVideo, imageBaseUrl }) => {
  return (
    <div className="pt-32 px-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((item) => (
          <ContentCard 
            key={item.id}
            item={item}
            onPlayVideo={onPlayVideo}
            imageBaseUrl={imageBaseUrl}
          />
        ))}
      </div>
    </div>
  );
};

// Profile Modal Component
export const ProfileModal = ({ currentUser, onClose }) => {
  const profiles = [
    {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXJzfGVufDB8fHxibGFja3wxNzUyMzc1NTI5fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1633957897986-70e83293f3ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxhdmF0YXJzfGVufDB8fHxibGFja3wxNzUyMzc1NTI5fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      name: 'Kids',
      avatar: 'https://images.unsplash.com/photo-1661747675288-814df576be9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxhdmF0YXJzfGVufDB8fHxibGFja3wxNzUyMzc1NTI5fDA&ixlib=rb-4.1.0&q=85'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Who's watching?</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {profiles.map((profile, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded cursor-pointer"
            >
              <img 
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded object-cover"
              />
              <span className="text-white font-medium">{profile.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button className="text-gray-400 hover:text-white">Manage Profiles</button>
        </div>
      </div>
    </div>
  );
};

export const TVShowsPage = () => <div className="pt-32 px-8 text-white text-3xl">TV Shows Page (Coming Soon)</div>;
export const MoviesPage = () => <div className="pt-32 px-8 text-white text-3xl">Movies Page (Coming Soon)</div>;
export const LatestPage = () => <div className="pt-32 px-8 text-white text-3xl">Latest Page (Coming Soon)</div>;
export const MyListPage = () => <div className="pt-32 px-8 text-white text-3xl">My List Page (Coming Soon)</div>;