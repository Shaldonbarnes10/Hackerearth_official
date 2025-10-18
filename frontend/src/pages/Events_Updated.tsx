import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import EventCardWithCTA, { EventWithRegistration } from '../components/EventCardWithCTA';

/**
 * Default registration link for generic event registration
 * Update this constant to point to your public Google Form or registration page
 */
const DEFAULT_REGISTRATION_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSfExampleFormID/viewform";

// --- Data for Past Events ---
const pastEvents: EventWithRegistration[] = [
  {
    id: 1,
    title: "Git & Github Workshop",
    date: "2025-09-06",
    tags: ['Git', 'Github'],
    image: "/images/workshop1.jpg",
    gradient: "from-purple-200 to-purple-500",
  },
];

/**
 * Upcoming Events Data
 * Add registrationLink property to enable registration CTA on event cards
 * 
 * Example:
 * {
 *   id: 101,
 *   title: "AI Workshop",
 *   date: "2025-11-11",
 *   tags: ["AI", "ML"],
 *   image: "/images/ai-workshop.jpg",
 *   gradient: "from-blue-500 to-purple-600",
 *   description: "Learn the fundamentals of AI and machine learning",
 *   registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfYourFormID/viewform"
 * }
 */
const upcomingEvents: EventWithRegistration[] = [
  // Add your upcoming events here with registrationLink
  // Example:
  // {
  //   id: 101,
  //   title: "AI & Machine Learning Workshop",
  //   date: "2025-11-15",
  //   tags: ["AI", "ML", "Python"],
  //   image: "/images/ai-workshop.jpg",
  //   gradient: "from-blue-500 to-purple-600",
  //   description: "Dive deep into AI fundamentals and build your first ML model",
  //   registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfExampleFormID/viewform"
  // },
];

// --- Framer Motion Variants for the card reveal animation ---
const revealVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

// --- Reusable Poster-Style Event Card Component ---
const EventCard = ({ event, index, isDark }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
      }}
      viewport={{ once: true }}
      animate="animate"
    >
      <div className={`absolute inset-[-2px] z-0 rounded-2xl bg-gradient-to-r ${event.gradient}`} />
      <div className="relative h-full w-full overflow-hidden rounded-[14px]">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-full flex-col justify-end p-6">
          <motion.div variants={revealVariants}>
            <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <div key={tag} className={`rounded-full bg-gradient-to-r p-px ${event.gradient}`}>
                  <span className={`block rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${isDark ? "bg-black/70 text-white/90" : "bg-white/80 text-gray-900"}`}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
            <button className="group/button relative inline-flex items-center gap-2 text-base font-semibold">
              <span className={`bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>
                View Highlights
              </span>
              <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent transition-transform group-hover/button:translate-x-1`} />
              <span className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r ${event.gradient} transition-all duration-300 group-hover/button:w-full`} />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Events Page Component ---
const Events = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handler for registration clicks - can be customized to open modal instead
  const handleRegisterClick = (event: EventWithRegistration) => {
    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-screen ${isDark ? "bg-black text-white" : "bg-slate-50 text-gray-900"}`}>
        <Loader size={80} />
        <p className="mt-4 text-lg font-medium">Loading Events...</p>
      </div>
    );
  }

  const events = upcomingEvents;

  return (
    <div className={`transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* SECTION: Past Events */}
        <section className="relative z-10">
            <motion.div
              className="text-center mb-16" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">
                <button
                  type="button"
                  className="group relative z-[60] mx-auto rounded-full border px-7 py-2 text-xl backdrop-blur transition-all duration-300 hover:shadow-xl active:scale-100 md:text-sm"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                >
                  <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
                  <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
                  <span className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>Past Events</span>
                </button>
              </div>
              <h2 className={`mt-7 text-center text-4xl font-semibold tracking-tighter md:text-[58px] md:leading-[60px] ${ isDark ? "bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent" : "text-gray-900" }`}>
                Recent Events
              </h2> 
              <p className={`text-xl max-w-3xl mx-auto leading-relaxed mt-2 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                Discover our past events that brought the community together to learn, collaborate, and innovate.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} isDark={isDark} />
              ))}
            </div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
            </motion.div>
        </section>
        
        {/* Divider */}
        <hr className={`my-24 border-dashed ${isDark ? 'border-slate-700/50' : 'border-gray-200'}`} />

        {/* SECTION: Upcoming Events */}
        <section className="relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center">
              <button
                type="button"
                className="group relative z-[60] mx-auto rounded-full border px-7 py-2 text-xl backdrop-blur transition-all duration-300 hover:shadow-xl active:scale-100 md:text-sm"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
              >
                <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
                <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
                <span className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>Upcoming Events</span>
              </button>
            </div>
            <h2 className={`mt-7 text-center text-4xl font-semibold tracking-tighter md:text-[58px] md:leading-[60px] ${isDark ? "bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent" : "text-gray-900"}`}>
              Join Our Community Events
            </h2> 
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed mt-2 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Discover our upcoming events that bring the community together to learn, collaborate, and innovate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length === 0 ? (
              <>
                {/* Empty state: Stay Tuned card */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <motion.div 
                    className={`group relative overflow-hidden rounded-2xl backdrop-blur-lg border p-8 text-center shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl ${
                      isDark 
                      ? "bg-black/30 border-slate-700/50 text-white" 
                      : "bg-white/30 border-gray-200/50 text-gray-900"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                          isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                      }`}>
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">Stay Tuned!</h3>
                      <p className={`text-lg ${isDark ? 'opacity-80' : 'opacity-70'}`}>Exciting events coming soon 🚀</p>
                    </div>
                  </motion.div>
                </div>

                {/* Persistent CTA card for registration */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-8">
                  <motion.div
                    className={`group relative overflow-hidden rounded-2xl backdrop-blur-lg border p-10 text-center shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl cursor-pointer ${
                      isDark 
                      ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30" 
                      : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300/50"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <h3 className={`text-3xl font-bold mb-3 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Register For Upcoming Events
                      </h3>
                      <p className={`text-lg mb-6 max-w-2xl mx-auto ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Be the first to know about our upcoming workshops, hackathons, and community events. Click below to register using our public Google Form.
                      </p>
                      <button
                        onClick={() => window.open(DEFAULT_REGISTRATION_LINK, '_blank', 'noopener,noreferrer')}
                        className={`
                          inline-flex items-center justify-center gap-2 
                          px-8 py-4 rounded-xl font-semibold text-lg text-white
                          bg-gradient-to-r from-blue-500 to-purple-600
                          transition-all duration-300 ease-out
                          hover:scale-105 hover:shadow-2xl
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                          active:scale-100
                          ${isDark ? 'focus:ring-offset-black' : 'focus:ring-offset-white'}
                        `}
                        aria-label="Register for upcoming events (opens in new tab)"
                        data-analytics="event-register-general"
                      >
                        <span>Register Now</span>
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              // Render event cards with registration CTAs
              events.map((event, index) => (
                <EventCardWithCTA
                  key={event.id}
                  event={event}
                  index={index}
                  isDark={isDark}
                  onRegisterClick={handleRegisterClick}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
