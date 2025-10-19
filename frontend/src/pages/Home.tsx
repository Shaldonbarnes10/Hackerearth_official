import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Trophy, Calendar, Rocket, ChevronRight,FolderOpen, Quote } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import TypingHero from "../components/TypingHero";
import { Code, Brain, Lightbulb, Puzzle, Calculator, TrendingUp, Menu, Share2, Shuffle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EventCard = ({ event, index }: { event: any; index: number }) => {
  const { isDark } = useTheme();

  return (
    <Link to={`/events/${event.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg cursor-pointer"
      >
        {/* Background Image with Hover Zoom Effect */}
        <img
          src={event.image}
          alt={`${event.title} poster`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Gradient Overlay (hidden by default, appears on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content - truly hidden until hover */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 text-white 
                     opacity-0 invisible translate-y-8 pointer-events-none
                     group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                     transition-all duration-300 ease-in-out bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        >
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
          <p className="text-sm text-gray-300 mb-3">{event.date}</p>
          <p className="text-gray-200 mb-4 leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Details button */}
          <div className="mt-4">
            <div className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
// Events Data
const events = [
  {
    id: 1,
    title: "The Tech Triad",
    date: "March 22, 2025",
    description: "A thrilling 3 rounds of debugging and finding clues, with a prize pool of 15k, open to all participants.",
    tags: ["Hackathon", "Competition", "Prize Pool"],
    image: "/images/techtriad.jpg", 
  },
  {
    id: 2,
    title: "Tech EmpowerHER",
    date: "March 08 | 09, 2024",
    description: "An online MCQ challenge celebrating women in tech. Test your knowledge and solve encrypted clues.",
    tags: ["Online", "MCQ", "Women in Tech"],
    image: "/images/tech.jpg",
  },
  {
    id: 3,
    title: "Maze of Codes",
    date: "November 9, 2023",
    description: "An intense coding challenge in collaboration with ACSA, testing problem-solving skills to the limit.",
    tags: ["Coding", "Beginners", "On-site"],
    image: "/images/mazeofcodes.jpg",
  },
{
    id: 4,
    title : "CodeClash",
    date: "October 05, 2024",
    description : "A coding competition with a 3k prize pool, open to all skill levels.",
    tags: ["Coding", "Beginners"],
    image: "/images/codeclash.jpg",
},
];

// Marquee Component
function Marquee({
  className = "",
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: any) {
  const baseClasses = "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]";
  const directionClasses = vertical ? "flex-col" : "flex-row";

  return (
    <div {...props} className={`${baseClasses} ${directionClasses} ${className}`}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              vertical
                ? `animate-marquee-vertical flex-col ${reverse ? "[animation-direction:reverse]" : ""}`
                : `animate-marquee flex-row ${reverse ? "[animation-direction:reverse]" : ""}`
            } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// Testimonial Card Component
const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`relative w-full max-w-xs overflow-hidden rounded-3xl border p-8 ${
      isDark 
        ? "border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]" 
        : "border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-lg"
    }`}>
      {isDark && (
        <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-blue-500/10 to-transparent blur-md"></div>
      )}
      
      <Quote className={`w-8 h-8 mb-4 ${isDark ? "text-blue-400" : "text-blue-600"} opacity-60`} />
      
      <div className={`leading-relaxed ${isDark ? "text-gray-200" : "text-gray-700"}`}>{body}</div>

      <div className="mt-6 flex items-center gap-3">
        <img 
          src={img} 
          alt={name} 
          height="48" 
          width="48" 
          className="h-12 w-12 rounded-full border-2 border-white/20" 
        />
        <div className="flex flex-col">
          <div className={`leading-5 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{name}</div>
          <div className={`leading-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{username}</div>
        </div>
      </div>
    </div>
  );
};

// Testimonials Data
const testimonials = [
  {
    name: "Arjun Mehta",
    username: "@arjdev",
    body: "HackerEarth completely changed the way I learn coding. The hands-on projects and community support are incredible.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sara Lin",
    username: "@sara.codes",
    body: "The DSA learning path helped me crack my dream company's coding interview. The practice problems are perfectly curated.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Devon Carter",
    username: "@devninja",
    body: "Our team built a full-stack project in 2 weeks using the web development resources. Saved so much learning time.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h-150&fit=crop&crop=face",
  },
  {
    name: "Priya Shah",
    username: "@priyacodes",
    body: "The aptitude training helped me improve my logical thinking and problem-solving skills significantly.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Leo Martin",
    username: "@leobuilds",
    body: "Found my perfect study group here. The community events and hackathons are game changers for networking.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Chloe Winters",
    username: "@chloewinters",
    body: "The leaderboard system keeps me motivated to practice daily. Climbing ranks never felt so rewarding!",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w-150&h=150&fit=crop&crop=face",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
function ServiceUIGraphic({ feature, isDark }: { feature: any; isDark: boolean }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl dark:bg-gray-800/30"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* The graphics are rendered directly for an open, integrated feel */}
      <div className="relative flex items-center justify-center h-full min-h-[340px]">
        {feature.title === "Web Development" && (
          <WebDevelopmentGraphic isDark={isDark} />
        )}
        {feature.title === "Data Structures & Algorithms" && (
          <DSAGraphic isDark={isDark} />
        )}
        {feature.title === "Aptitude & Reasoning" && (
          <AptitudeGraphic isDark={isDark} />
        )}
      </div>
    </div>
  );
}


// --- 1. Web Development Graphic (Aesthetic Overhaul) ---
function WebDevelopmentGraphic({ isDark }: { isDark: boolean }) {
  const codeLines = [
    { text: "import { motion } from 'framer-motion';", color1: "text-purple-400", color2: "text-yellow-400" },
    { text: "", color1: "", color2: "" },
    { text: "const App = () => (", color1: "text-cyan-400", color2: "text-yellow-400" },
    { text: "  <motion.div animate={{ scale: 1.1 }}>", color1: "text-green-400", color2: "text-yellow-400" },
    { text: "   Build the Future", color1: "", color2: "text-blue-400" },
    { text: "  </motion.div>", color1: "text-green-400", color2: "text-green-400" },
    { text: ");", color1: "text-cyan-400", color2: "" },
  ];
  const lineHeight = 22;
  const finalHeight = codeLines.length * lineHeight + 32;

  return (
    <motion.div
      className="w-full max-w-lg mx-auto font-mono text-sm shadow-2xl shadow-blue-500/10 rounded-lg"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="bg-[#1e212b] rounded-t-lg p-3 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <motion.div
        className="bg-[#282c34] rounded-b-lg p-4 overflow-hidden"
        variants={{ initial: { height: 0 }, animate: { height: finalHeight } }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <motion.div variants={{ animate: { transition: { staggerChildren: 0.12 } } }}>
          {codeLines.map((line, index) => (
            <motion.p
              key={index}
              variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
              style={{ height: lineHeight }}
            >
              <span className="text-gray-600 w-6 inline-block select-none">{index + 1}</span>
              <span className={line.color1}>{line.text.split(' ')[0]}</span>
              <span className={line.color2}> {line.text.split(' ').slice(1).join(' ')}</span>
            </motion.p>
          ))}
          <motion.div
            className="w-0.5 h-4 bg-cyan-400 mt-1"
            variants={{ initial: { opacity: 0 }, animate: { opacity: [0, 1, 0] } }}
            transition={{ duration: 1.2, repeat: Infinity, delay: codeLines.length * 0.12 + 0.5 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


// --- 2. DSA Graphic (Carousel with Corrected & Improved Visualizations) ---
function DSAGraphic({ isDark }: { isDark: boolean }) {
  const visualizations = [
    { title: "Pathfinding Algorithm", component: <PathfindingViz isDark={isDark} /> },
    { title: "Sorting Algorithm", component: <SortingViz isDark={isDark} /> },
    { title: "Graph Traversal", component: <GraphTraversalViz isDark={isDark} /> },
  ];
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % visualizations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <AnimatePresence mode="wait">
        <motion.h3
          key={visualizations[index].title}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {visualizations[index].title}
        </motion.h3>
      </AnimatePresence>
      <div className="relative w-full h-48 max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {visualizations[index].component}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center space-x-3">
        {["O(n log n)", "O(n²)", "O(V+E)"].map((complexity) => (
          <div key={complexity} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
            {complexity}
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-components for the DSA Carousel
const PathfindingViz = ({ isDark }: { isDark: boolean }) => {
  const path = "M 20,50 C 60,0, 140,100, 180,50";
  return (
    <svg className="w-full h-full" viewBox="0 0 200 100">
      <path d={path} fill="none" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="2" strokeDasharray="5 5" />
      <motion.circle r="6" fill={isDark ? "#A5B4FC" : "#4F46E5"}
        style={{ offsetPath: `path("${path}")` }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
    </svg>
  );
};
const SortingViz = ({ isDark }: { isDark: boolean }) => (
  <div className="w-full h-full flex items-end justify-center gap-2 px-4">
    {[50, 80, 30, 95, 40, 70, 60, 20].map((height, i) => (
      <motion.div
        key={i} layout className={`w-full rounded-t-full ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`}
        initial={{ height: `${height}%` }}
        animate={{ height: `${i * 9 + 25}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: i * 0.05 }} />
    ))}
  </div>
);
const GraphTraversalViz = ({ isDark }: { isDark: boolean }) => {
  const nodes = [{ x: 50, y: 50 }, { x: 100, y: 20 }, { x: 150, y: 50 }, { x: 100, y: 80 }];
  const edges = [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 }];
  return (
    <svg className="w-full h-full" viewBox="0 0 200 100">
      {edges.map((edge, i) => (
        <line key={i} x1={nodes[edge.from].x} y1={nodes[edge.from].y} x2={nodes[edge.to].x} y2={nodes[edge.to].y} stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="1" />
      ))}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="5" fill={isDark ? "#4B5563" : "#9CA3AF"} />
      ))}
      <motion.circle r="6" fill={isDark ? "#67E8F9" : "#0891B2"}
        animate={{ cx: nodes.map(n => n.x), cy: nodes.map(n => n.y) }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75] }} />
    </svg>
  );
};


// --- 3. Aptitude Graphic (Fluid Keyframe-based Orbit) ---
function AptitudeGraphic({ isDark }: { isDark: boolean }) {
  const orbitRadius = 80;
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center space-y-4">
      {/* <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Logical Thinking Network
      </h3> */}
      <div className="relative w-56 h-56">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-48 h-48 rounded-full ${isDark ? "bg-purple-500/5" : "bg-purple-500/10"} blur-xl`}></div>
        </div>

        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="w-9 h-9 text-white" />
          </motion.div>
        </motion.div>

        {[
          { icon: Calculator, duration: 28, delay: 0 },
          { icon: TrendingUp, duration: 22, delay: 1.5 },
          { icon: Lightbulb, duration: 25, delay: 0.5 },
          { icon: Puzzle, duration: 30, delay: 1.0 },
        ].map(({ icon: Icon, duration, delay }, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{ x: -20, y: -20 }} // Center the icon origin
            animate={{
              rotate: 360,
              x: [orbitRadius, 0, -orbitRadius, 0, orbitRadius].map(v => v - 20),
              y: [0, orbitRadius, 0, -orbitRadius, 0].map(v => v - 20),
            }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.25, transition: { type: 'spring', stiffness: 300 } }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium">
        Analytical Reasoning
      </div>
    </div>
  );
}


const features = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    subtitle: "(React, Node.js, Tailwind CSS...)",
    description: "Master modern web technologies and build stunning, responsive applications.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    bgGradient: "from-cyan-500/40 via-blue-800/10 to-cyan-600/20",
    accentColor: "text-blue-400",
    link: "/domains",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Data Structures & Algorithms",
    subtitle: "(Python, Java, C++...)",
    description: "Build a rock-solid foundation in computer science fundamentals.",
    technologies: ["Python", "Java", "C++", "Algorithm Design", "Complexity Analysis"],
    bgGradient: "from-blue-400/20 via-purple-400/10 to-blue-600/20",
    accentColor: "text-blue-400",
    link: "/domains",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Aptitude & Reasoning",
    subtitle: "(Quantitative, Verbal, Logical...)",
    description: "Sharpen your analytical thinking and logical reasoning skills.",
    technologies: ["Quantitative", "Verbal", "Logical", "Analytical", "Critical Thinking"],
    bgGradient: "from-purple-400/20 via-pink-400/10 to-purple-600/20",
    accentColor: "text-purple-400",
    link: "/domains",
  },
];
const StatsSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowScaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative bg-white dark:bg-black py-20 overflow-hidden"
    >
      {/* The expanding purple glow effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-16 pointer-events-none z-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at top center, rgba(139,92,246,0.3) 0%, transparent 70%)`,
          scaleX: glowScaleX,
          transformOrigin: 'center',
        }}
      />

      {/* Existing content wrapped in a div to ensure it's above the glow and has max-width */}
      <div className="max-w-6xl mx-auto px-10 relative z-10 py-20">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-semibold mb-4 text-black dark:text-white">
            Delivering Results
          </h2>
          <p className="text-xl text-gray-900 dark:text-gray-300">
            Our journey in numbers and achievements
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {[
            { icon: <Users className="w-8 h-8" />, number: "400+", title: "Members, every year" },
            { icon: <FolderOpen className="w-8 h-8" />, number: "50+", title: "Projects Completed" },
            { icon: <Calendar className="w-8 h-8" />, number: "25+", title: "Events Organized" },
            { icon: <Trophy className="w-8 h-8" />, number: "15+", title: "Awards Won" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
              className="text-center p-6 rounded-xl bg-white/50 dark:bg-black/70 hover:bg-white/70 dark:hover:bg-black/70 transition-all duration-300 border border-gray-800 dark:border-gray-800"
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-black dark:text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">{stat.number}</h3>
              <p className="text-gray-900 dark:text-gray-300">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

const Home = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveFeature(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );
    featureRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollToFeature = (idx: number) => {
    featureRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleServicesClick = () => {
    if (isAuthenticated) {
      navigate('/domains');
    } else {
      navigate('/login');
    }
  };

  const handleExploreDomainClick = () => {
    if (isAuthenticated) {
      navigate('/domains');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`${isDark ? "bg-black" : "bg-slate-50"} overflow-hidden transition-colors duration-500`}>
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.07) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex flex-col space-y-4">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToFeature(idx)}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${activeFeature === idx ? "bg-white scale-125 shadow-lg" : "bg-white/30 hover:bg-white/60 hover:scale-110"
              }`}
            aria-label={`Go to ${features[idx].title}`}
          >
            <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-white/20">
                {features[idx].title}
              </div>
            </div>
          </button>
        ))}
      </div>

      <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* <div className="inline-flex items-center px-3 py-2 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full text-xs text-gray-300 shadow-[0_0_20px_rgba(52,211,153,0.1)] cursor-default">
            <span className="ml-1 mr-1">powered by Abhuday</span>
          </div> */}
          <TypingHero />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto my-8" />
          <p className="text-muted-foreground max-w-xl mx-auto font-medium relative z-10 text-black-300 dark:text-gray-400">
            We are a community of developers, designers, and innovators focused on hands-on creation. Join us to collaborate on real-world projects, hone your skills, and build a portfolio that stands out.
          </p>
          <div className="pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleServicesClick}
                className="group relative px-6 py-3 bg-gray-800 text-white rounded-lg font-medium text-base hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700"
              >
                <span className="flex items-center space-x-2">
                  <span>Services</span>
                </span>
              </button>
              <Link
                to="/login"
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-base hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(66,153,225,0.3)]"
              >
                <span className="flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5" />
                  <span>Join Our Community</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    <section className="relative overflow-x-clip z-10 max-w-7xl mx-auto px-4 sm:px-6">
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex justify-center">
      <button
        type="button"
        className="group relative z-[60] mx-auto rounded-full border mt-7 px-6 py-1 text-xs backdrop-blur transition-all duration-300 active:scale-100 md:text-sm"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
        }}
      >
        <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
        <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
        <span className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>Learning Paths</span>
      </button>
    </div>

    <h2 className={`mt-5 text-center text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px] ${
      isDark 
        ? "bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent" 
        : "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent"
    }`}>
      Our Different <span className="font-light italic bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Technical Domains</span>
    </h2>

    <p className={`text-xl max-w-3xl mx-auto leading-relaxed mt-6 ${
      isDark ? "text-gray-300" : "text-gray-700"
    }`}>
      Comprehensive learning paths designed to accelerate career growth and technical transformation.
    </p>
  </motion.div>

  <div className="space-y-32 relative">
    {features.map((feature, idx) => (
      <motion.div
        key={feature.title}
        ref={(el) => (featureRefs.current[idx] = el)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: idx * 0.08 }}
        className="min-h-[80vh] flex items-center"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className={`space-y-8 ${idx % 2 === 1 ? "lg:order-2" : ""}`}
            initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* REPLACED: Gradient badge with testimonials-style button */}
                       {/* <div className="flex justify-center">
              <button
                type="button"
                className="group relative z-[60] mx-auto rounded-full border px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                }}
              >
                <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
                <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
                <span className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>Testimonials</span>
              </button>
            </div> */}


            <h3 className="text-4xl sm:text-5xl font-bold text-black mb-4 leading-tight dark:text-white">{feature.title}</h3>
            <p className="text-lg text-gray-900 dark:text-gray-300 leading-relaxed mb-8">{feature.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {feature.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full border font-semibold text-xs bg-gradient-to-r ${feature.bgGradient} ${feature.accentColor} border-white/20`}
                >
                  {tech}
                </span>
              ))}
            </div>
            
     <button
  onClick={handleExploreDomainClick}
  className={`inline-flex items-center font-medium transition-colors group px-4 py-2 rounded-lg border ${
    idx === activeFeature
      ? isDark
        ? "text-white border-white/20 bg-white/10 hover:bg-white/20"
        : "text-gray-900 border-gray-300 bg-gray-50 hover:bg-gray-100"
      : isDark
        ? "text-blue-400 hover:text-blue-300 border-blue-400/30 bg-blue-400/10 hover:bg-blue-400/20"
        : "text-gray-700 hover:text-gray-900 border-gray-400 bg-gray-50 hover:bg-gray-100"
  }`}
>
  <span>Explore Domain</span>
  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
</button>
          </motion.div>
          
          <motion.div
            className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ServiceUIGraphic feature={feature} isDark={isDark} />
          </motion.div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      <StatsSection />
          
          {/* events */}
      <section className={`relative z-10 py-24 ${isDark ? "bg-black" : "bg-slate-50"}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
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
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          }}
        >
          <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
          <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
          <span className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>Community Events</span>
        </button>
      </div>

      <h2 className={`mt-7 text-center text-4xl font-semibold tracking-tighter md:text-[58px] md:leading-[60px] ${
        isDark 
          ? "bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent" 
          : "text-gray-900"
      }`}>
        Explore our Past Events
      </h2> 

      <p className={`text-xl max-w-3xl mx-auto leading-relaxed mt-2 ${
        isDark ? "text-gray-400" : "text-gray-700"
      }`}>
        Discover our past events that brought the community together to learn, collaborate, and innovate.
      </p>
    </motion.div>

    {/* Events Grid - Using the EventCard component */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}

      
    </div>
  </div>
</section>

           {/* Testimonials Section */}
      <section className={`relative z-10 py-24 ${isDark ? "bg-black" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[540px] text-center mb-16">
            <div className="flex justify-center">
              <button
                type="button"
                className="group relative z-[60] mx-auto rounded-full border px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:shadow-xl active:scale-100 md:text-sm"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                }}
              >
                <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
                <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
                <span className={`relative ${isDark ? "text-white" : "text-gray-900"}`}>Testimonials</span>
              </button>
            </div>
           
            <h2 className={`mt-5 text-center text-4xl font-semibold tracking-tighter md:text-[54px] md:leading-[60px] ${
              isDark 
                ? "bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent" 
                : "text-gray-900"
            }`}>
              What our members say
            </h2>

            <p className={`mt-5 text-center text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              From coding skills to career growth, our community has helped students achieve their goals.
            </p>
          </div>

          <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
            <div>
              <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.username} {...testimonial} />
                ))}
              </Marquee>
            </div>

            <div className="hidden md:block">
              <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
                {secondColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.username} {...testimonial} />
                ))}
              </Marquee>
            </div>

            <div className="hidden lg:block">
              <Marquee pauseOnHover vertical className="[--duration:30s]">
                {thirdColumn.map((testimonial) => (
                  <TestimonialCard key={testimonial.username} {...testimonial} />
                ))}
              </Marquee>
            </div>
          </div>

          <div className="-mt-8 flex justify-center">
            <button className={`group relative inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all hover:bg-blue-500/10 active:scale-95 ${
              isDark 
                ? "border-blue-500/30 bg-black/50 text-white hover:border-blue-500/60" 
                : "border-blue-400/30 bg-white text-gray-900 hover:border-blue-400/60"
            }`}>
              <div className="absolute inset-x-0 -top-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
              Share your experience
            </button>
          </div>
        </div>
      </section>

    <section className={`relative z-10 py-24 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}>
        <div className="mx-auto max-w-4xl rounded-[40px] border border-black/5 dark:border-white/20 p-2 shadow-sm">
          <div className={`relative mx-auto overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 p-2 shadow-sm ${
            isDark ? "bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" : "bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500"
          }`}>
            {/* Background effects */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: isDark 
                  ? "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)"
                  : "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)",
              }}
            />

            <div
              className="absolute inset-0 z-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter'%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 p-12">
              <div className="text-center">
                {/* Main heading */}
             <h2 className={`text-4xl font-bold mb-6 tracking-tighter ${
  isDark 
    ? "bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent" 
    : "text-white"
}`}>
  Ready to Begin Your Journey?
</h2>
                
                {/* Subtitle */}
                <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                  isDark ? "text-blue-200" : "text-blue-100"
                }`}>
                  Join a community of innovators, builders, and leaders. Start your path to technical excellence today.
                </p>

                {/* Animated CTA button */}
                <div className="flex items-center justify-center mt-10">
                  <Link to="/login">
                    <div className="group border-white/30 bg-white/20 flex h-[64px] cursor-pointer items-center gap-2 rounded-full border p-[11px] backdrop-blur-sm transition-all hover:bg-white/30">
                      <div className="border-white/30 bg-white flex h-[43px] items-center justify-center rounded-full border">
                        <p className="mr-3 ml-2 flex items-center justify-center gap-2 font-medium tracking-tight text-blue-900">
                          <Rocket className="w-5 h-5" />
                          Get Started
                        </p>
                      </div>
                      <div className="border-white/30 flex size-[26px] items-center justify-center rounded-full border-2 transition-all ease-in-out group-hover:ml-2">
                        <ArrowRight className="w-4 h-4 text-white transition-all ease-in-out group-hover:rotate-45" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Background text effect */}
                <h1
                  className="absolute inset-x-0 -bottom-20 text-center text-[80px] font-semibold text-transparent sm:text-[120px] pointer-events-none"
                  style={{
                    WebkitTextStroke: isDark ? "1px rgba(255,255,255,0.1)" : "1px rgba(255,255,255,0.2)",
                    color: "transparent",
                  }}
                  aria-hidden="true"
                >
                  HackerEarth
                </h1>
                <h1
                  className="absolute inset-x-0 -bottom-20 text-center text-[80px] font-semibold pointer-events-none opacity-10 sm:text-[120px]"
                  style={{
                    color: isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)",
                  }}
                  aria-hidden="true"
                >
                  HackerEarth
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;