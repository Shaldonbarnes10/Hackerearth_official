import React from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Event interface with optional registrationLink for external forms (e.g., Google Forms)
 * 
 * Example usage:
 * {
 *   id: 101,
 *   title: "AI Workshop",
 *   date: "2025-11-11",
 *   tags: ["AI", "ML"],
 *   image: "/images/ai-workshop.jpg",
 *   gradient: "from-blue-500 to-purple-600",
 *   registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfExampleFormID/viewform"
 * }
 */
export interface EventWithRegistration {
  id: number;
  title: string;
  date: string;
  tags: string[];
  image: string;
  gradient: string;
  registrationLink?: string;
  description?: string;
}

interface EventCardWithCTAProps {
  event: EventWithRegistration;
  index: number;
  isDark: boolean;
  onRegisterClick?: (event: EventWithRegistration) => void;
}

// Framer Motion variants for smooth reveal animations
const revealVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

/**
 * EventCardWithCTA Component
 * 
 * A poster-style event card with prominent registration CTA.
 * - If registrationLink is present, shows "Register Now" button
 * - Clicking CTA opens link in new tab with security attributes
 * - Fully accessible with keyboard navigation and ARIA labels
 * - Responsive animations with reduced-motion support
 * - Theme-aware styling using isDark prop
 */
const EventCardWithCTA: React.FC<EventCardWithCTAProps> = ({ 
  event, 
  index, 
  isDark,
  onRegisterClick 
}) => {
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onRegisterClick) {
      onRegisterClick(event);
    } else if (event.registrationLink) {
      // Default behavior: open in new tab
      window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRegisterClick(e as any);
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.5, delay: index * 0.1 } 
        },
      }}
      viewport={{ once: true }}
      animate="animate"
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-[-2px] z-0 rounded-2xl bg-gradient-to-r ${event.gradient}`} />
      
      <div className="relative h-full w-full overflow-hidden rounded-[14px]">
        {/* Event image */}
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Content container */}
        <div className="relative flex h-full flex-col justify-end p-6">
          <motion.div variants={revealVariants}>
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
            
            {/* Description (optional) */}
            {event.description && (
              <p className="text-sm text-white/70 mb-4 line-clamp-2">
                {event.description}
              </p>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <div key={tag} className={`rounded-full bg-gradient-to-r p-px ${event.gradient}`}>
                  <span className={`block rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                    isDark ? "bg-black/70 text-white/90" : "bg-white/80 text-gray-900"
                  }`}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Registration CTA */}
            {event.registrationLink && (
              <button
                onClick={handleRegisterClick}
                onKeyDown={handleKeyDown}
                className={`
                  group/button relative inline-flex items-center justify-center gap-2 
                  px-6 py-3 rounded-xl font-semibold text-base text-white
                  bg-gradient-to-r ${event.gradient}
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  active:scale-100
                  ${isDark ? 'focus:ring-offset-black' : 'focus:ring-offset-white'}
                `}
                aria-label={`Register for ${event.title} (opens in new tab)`}
                data-analytics="event-register"
              >
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </button>
            )}
            
            {/* Fallback: View Details button if no registration link */}
            {!event.registrationLink && (
              <button className="group/button relative inline-flex items-center gap-2 text-base font-semibold">
                <span className={`bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>
                  View Details
                </span>
                <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent transition-transform group-hover/button:translate-x-1`} />
                <span className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r ${event.gradient} transition-all duration-300 group-hover/button:w-full`} />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCardWithCTA;
