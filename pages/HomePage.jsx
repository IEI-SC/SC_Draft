import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ieisc-rcciit.onrender.com';

const HomePage = () => {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [isDeptLogoActive, setIsDeptLogoActive] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using reliable image URLs
  const campusImageUrl = "https://rcciit.edu.in/uploads/home_about/1755170374_aboutbg.jpg";
  const logoImageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Regional_Computer_Centre_Institute_Of_Information_Technology.png";
  
  // Using placeholder images instead of potentially missing local files
  const deptlogourl = "https://via.placeholder.com/400x200/1e40af/ffffff?text=IT+Department+Logo";
  const deptpicurl = "https://via.placeholder.com/600x400/1e40af/ffffff?text=IT+Department";

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/events/?past=false`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const events = await response.json();
      setUpcomingEvents(events.slice(0, 3)); // Show only first 3 events
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
      // Set some demo events for UI purposes
      setUpcomingEvents([
        {
          id: 1,
          title: "Tech Workshop on AI",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          event_type: "Workshop"
        },
        {
          id: 2,
          title: "Annual Coding Competition",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          event_type: "Competition"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Format date function with better error handling
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date TBA";
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Date TBA";
    }
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200/374151/ffffff?text=Image+Not+Found";
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <div className="space-y-28 animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/80 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 p-8 flex flex-col items-center">
          <div className="my-6 bg-white p-3 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://www.ieindia.org/Image/iei_Logo.jpg"
              alt="The Institution of Engineers (India) Logo"
              className="h-28 w-auto object-contain"
              onError={handleImageError}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-brand-primary to-cyan-400 bg-clip-text text-transparent">
            The Institution of Engineers (India) 
          </h1>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-brand-primary to-cyan-400 bg-clip-text text-transparent">
            Student Chapter
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-brand-text-muted mt-4 font-light">
            Fostering Engineering Excellence and Innovation at RCCIIT
          </p>
          <p className="max-w-2xl mx-auto text-2xl text-white font-semibold mb-8 mt-2 bg-brand-primary/20 px-6 py-2 rounded-full">
            Department of Information Technology
          </p>
          <Link
            to="/join"
            className="relative inline-block bg-gradient-to-r from-brand-primary to-cyan-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-cyan-600 hover:to-brand-primary transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/30 group"
          >
            <span className="relative z-10">Join Us Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-brand-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
      </section>

      {/* About RCCIIT Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-brand-primary to-white bg-clip-text text-transparent">
              About RCCIIT
            </h2>
            <p className="text-brand-text-muted text-lg leading-relaxed mb-6">
              RCC Institute of Information Technology (RCCIIT) was set up in 1999 by the erstwhile Regional Computer Centre (RCC), Calcutta (in JU) as a unique joint venture of NIC, Ministry of Communication & IT, Govt. of India and Dept. of Higher Education, Govt. of West Bengal. In 2003 the lead role of management of RCCIIT was transferred to the State Govt. from&nbsp;Govt.&nbsp;of&nbsp;India.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="bg-brand-primary/20 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">Est. 1999</span>
              <span className="bg-brand-primary/20 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">NAAC Accredited</span>
              <span className="bg-brand-primary/20 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">AICTE Approved</span>
            </div>
          </div>
          <div 
            className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video bg-brand-secondary group"
            onMouseLeave={() => setIsLogoActive(false)}
          >
            <img 
              src={campusImageUrl} 
              alt="RCCIIT Campus"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                isLogoActive ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'
              } group-hover:scale-105`}
              onError={handleImageError}
            />
            <img 
              src={logoImageUrl} 
              alt="RCCIIT Logo"
              className={`absolute inset-0 w-full h-full object-contain p-8 transition-all duration-700 ease-in-out transform ${
                isLogoActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              } bg-white/90`}
              onError={handleImageError}
            />
            <div 
              className="absolute top-6 right-6 w-16 h-16 p-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl cursor-pointer transition-all duration-500 transform hover:scale-110 hover:rotate-12 z-10"
              onMouseEnter={() => setIsLogoActive(true)}
            >
              <img 
                src={isLogoActive ? campusImageUrl : logoImageUrl}
                alt="RCCIIT Thumbnail"
                className="w-full h-full object-contain transition-all duration-500"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The IT Department Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div 
            className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video bg-brand-secondary group"
            onMouseLeave={() => setIsDeptLogoActive(false)}
          >
            <img 
              src={deptpicurl} 
              alt="Department Photo"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                isDeptLogoActive ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'
              } group-hover:scale-105`}
              onError={handleImageError}
            />
            <img 
              src={deptlogourl} 
              alt="Department Logo"
              className={`absolute inset-0 w-full h-full object-contain p-8 transition-all duration-700 ease-in-out transform ${
                isDeptLogoActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              } bg-white/90`}
              onError={handleImageError}
            />
            <div 
              className="absolute top-6 right-6 w-16 h-16 p-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl cursor-pointer transition-all duration-500 transform hover:scale-110 hover:rotate-12 z-10"
              onMouseEnter={() => setIsDeptLogoActive(true)}
            >
              <img 
                src={isDeptLogoActive ? deptpicurl : deptlogourl}
                alt="Department Thumbnail"
                className="w-full h-full object-contain transition-all duration-500"
                onError={handleImageError}
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-brand-primary to-white bg-clip-text text-transparent">
              The IT Department
            </h2>
            <p className="text-xl text-brand-primary italic mt-2 mb-6 font-light">
              "Legacy of Excellence, Vision for Tomorrow."
            </p>
            <p className="text-brand-text-muted text-lg leading-relaxed mb-6">
              The Information Technology Department of RCCIIT, established in 1999, is one of the institute's oldest departments and continues the legacy of RCC, Calcutta, in delivering quality IT education. It has an excellent record in academics and placements, with alumni excelling in leading MNCs, research, and academia worldwide.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-brand-primary/10 rounded-xl">
                <div className="text-2xl font-bold text-brand-primary">20+</div>
                <div className="text-sm text-brand-text-muted">Years of Excellence</div>
              </div>
              <div className="text-center p-4 bg-brand-primary/10 rounded-xl">
                <div className="text-2xl font-bold text-brand-primary">1000+</div>
                <div className="text-sm text-brand-text-muted">Successful Alumni</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Focus Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-brand-primary to-white bg-clip-text text-transparent">
          MOTIVE OF IE(I) SC TO FOCUS ON
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "💻", title: "Software Development", description: "Learn programming languages, algorithms, and software engineering principles to build innovative applications." },
            { icon: "🔌", title: "Hardware Engineering", description: "Explore electronics, embedded systems, and hardware design to create the technology of tomorrow." },
            { icon: "🚀", title: "Student Projects", description: "Work on real-world projects that solve problems and make a difference in society through technology." },
            { icon: "🎓", title: "Tech Education", description: "Receive world-class education with a focus on practical, hands-on learning in cutting-edge technologies." }
          ].map((area, index) => (
            <div 
              key={index}
              className="bg-brand-secondary/80 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-brand-secondary transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{area.icon}</div>
              <h3 className="text-xl font-semibold text-brand-primary mb-4 group-hover:text-white transition-colors duration-300">{area.title}</h3>
              <p className="text-brand-text-muted group-hover:text-brand-text transition-colors duration-300">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Funding Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <div className="bg-gradient-to-r from-brand-primary/10 to-cyan-600/10 rounded-2xl p-10 border border-brand-primary/30">
          <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-brand-primary to-cyan-400 bg-clip-text text-transparent">
            Project Funding Support
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-brand-text-muted text-lg leading-relaxed mb-6">
                The IE(I) Student Chapter provides financial support and resources for innovative student projects. 
                We believe in nurturing practical implementation of engineering concepts through hands-on projects 
                that solve real-world problems.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-brand-primary/20 p-2 rounded-full mr-4">
                    <span className="text-brand-primary text-xl">💰</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Financial Grants</h4>
                    <p className="text-brand-text-muted text-sm">Get funding for components, materials, and resources for your innovative projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-primary/20 p-2 rounded-full mr-4">
                    <span className="text-brand-primary text-xl">👨‍🏫</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Mentorship</h4>
                    <p className="text-brand-text-muted text-sm">Guidance from faculty experts and industry professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-primary/20 p-2 rounded-full mr-4">
                    <span className="text-brand-primary text-xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Recognition</h4>
                    <p className="text-brand-text-muted text-sm">Showcase your projects at IE(I) events and competitions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-secondary/80 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-brand-primary mb-4 text-center">How to Apply for Funding</h3>
              <ol className="space-y-4 text-brand-text-muted">
                <li className="flex items-start">
                  <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">1</span>
                  <span>Submit a detailed project proposal with objectives, timeline, and budget</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">2</span>
                  <span>Present your idea to the project evaluation committee</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">3</span>
                  <span>Receive approval and funding disbursement upon selection</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">4</span>
                  <span>Implement your project with regular progress reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">5</span>
                  <span>Showcase your completed project at IE(I) events</span>
                </li>
              </ol>
              <div className="text-center mt-6">
                <Link to="/join" className="inline-block bg-gradient-to-r from-brand-primary to-cyan-600 text-white font-bold py-2 px-6 rounded-lg text-sm hover:from-cyan-600 hover:to-brand-primary transition-all duration-300">
                  Before applying become a member by joining us.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-brand-primary to-white bg-clip-text text-transparent">
          Upcoming Events
        </h2>
        
        {error && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-8">
            <p className="text-yellow-200">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="bg-brand-secondary/80 backdrop-blur-sm rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-brand-text-muted">Loading events...</p>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="bg-brand-secondary/80 backdrop-blur-sm rounded-2xl overflow-hidden mb-8">
            {upcomingEvents.map((event, index) => (
              <Link
                key={event.id || index}
                to="/events"
                className="block p-6 border-b border-brand-primary/20 last:border-b-0 hover:bg-brand-primary/10 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-brand-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-brand-text-muted text-sm mt-1">
                      📅 {formatDate(event.date)} • {event.event_type}
                    </p>
                  </div>
                  <div className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-brand-secondary/80 backdrop-blur-sm rounded-2xl p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-brand-text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-medium text-white mb-2">No Upcoming Events</h3>
            <p className="text-brand-text-muted mb-6">Stay tuned for exciting workshops, seminars, and competitions!</p>
          </div>
        )}
        
        <div className="text-center">
          <Link
            to="/events"
            className="inline-block bg-gradient-to-r from-brand-primary to-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-brand-primary transition-all duration-500 transform hover:scale-105 shadow-lg"
          >
            View All Events
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <div className="bg-gradient-to-r from-brand-primary to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Become part of a vibrant community of engineers and innovators shaping the future of technology.
          </p>
          <Link
            to="/join"
            className="inline-block bg-white text-brand-primary font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
