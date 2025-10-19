// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { blogPosts } from '../lib/resourcesData';
// import { useTheme } from '../context/ThemeContext';

// const BlogPostPage: React.FC = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const { isDark } = useTheme();

//   const post = blogPosts.find(p => p.slug === slug);

//   if (!post) {
//     return (
//       <div className={`min-h-screen transition-colors duration-500 ${
//         isDark ? "bg-black" : "bg-white"
//       }`}>
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 py-16">
//           <h1 className={`text-2xl font-bold ${
//             isDark ? "text-white" : "text-gray-900"
//           }`}>
//             Post not found
//           </h1>
//           <Link to="/domains" className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
//             &larr; Back to resources
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-500 ${
//       isDark ? "bg-black" : "bg-white"
//     }`}>
//       <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
//         {/* Back to blog */}
//         <div className="pt-6 pb-8 space-y-2 md:space-y-5">
//           <Link 
//             to="/domains"
//             className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
//           >
//             &larr; Back to blog
//           </Link>
//         </div>

//         <article>
//           <div className={`xl:divide-y ${
//             isDark ? "xl:divide-gray-800" : "xl:divide-gray-200"
//           }`}>
//             <header className="pt-6 xl:pb-6">
//               <div className="space-y-1 text-center">
//                 <dl className="space-y-10">
//                   <div>
//                     <dt className="sr-only">Published on</dt>
//                     <dd className={`text-base font-medium leading-6 ${
//                       isDark ? "text-gray-400" : "text-gray-500"
//                     }`}>
//                       <time dateTime={post.date}>
//                         {new Date(post.date).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </time>
//                     </dd>
//                   </div>
//                 </dl>
//                 <div>
//                   <h1 className={`pb-2 text-center text-4xl font-semibold tracking-tighter md:text-[54px] md:leading-[60px] ${
//                     isDark 
//                       ? "bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent" 
//                       : "text-gray-900"
//                   }`}>
//                     {post.title}
//                   </h1>
//                 </div>
//               </div>
//             </header>

//             <div className={`grid-rows-[auto_1fr] divide-y pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 ${
//               isDark ? "divide-gray-800" : "divide-gray-200"
//             }`}>
//               {/* Author sidebar */}
//               <dl className={`pb-10 pt-6 xl:border-b xl:pt-11 ${
//                 isDark ? "xl:border-gray-800" : "xl:border-gray-200"
//               }`}>
//                 <dt className="sr-only">Authors</dt>
//                 <dd>
//                   <ul className="flex flex-wrap justify-center gap-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
//                     <li className="flex items-center space-x-2">
//                       <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
//                         {post.author.name.charAt(0)}
//                       </div>
//                       <dl className="whitespace-nowrap text-sm font-medium leading-5">
//                         <dt className="sr-only">Name</dt>
//                         <dd className={isDark ? "text-white" : "text-gray-900"}>{post.author.name}</dd>
//                         <dt className="sr-only">Source</dt>
//                         <dd>
//                           <a
//                             href={post.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
//                           >
//                             {post.source}
//                           </a>
//                         </dd>
//                       </dl>
//                     </li>
//                   </ul>
//                 </dd>
//               </dl>

//               {/* Main content */}
//               <div className={`divide-y xl:col-span-3 xl:row-span-2 xl:pb-0 ${
//                 isDark ? "divide-gray-800" : "divide-gray-200"
//               }`}>
//                 <div className={`prose max-w-none pb-8 pt-10 prose-lg ${
//                   isDark ? "prose-invert" : ""
//                 }`}>
//                   {/* Add more spacing between sections */}
//                   <div className="mb-8">
//                     <h2 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Introduction</h2>
//                     <p className={`text-lg font-medium leading-relaxed ${
//                       isDark ? "text-gray-300" : "text-gray-600"
//                     }`}>
//                       {post.description}
//                     </p>
//                   </div>

//                   <div className="mb-8">
//                     <h3 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>What You'll Learn</h3>
//                     <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
//                       <li>Core concepts and fundamentals in {post.category}</li>
//                       <li>Practical implementation with real examples</li>
//                       <li>Best practices and industry standards</li>
//                       <li>Performance optimization techniques</li>
//                     </ul>
//                   </div>

//                   <div className="mb-8">
//                     <h3 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Key Features</h3>
//                     <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
//                       This comprehensive guide covers everything from basic concepts to advanced techniques in {post.category}. 
//                       Whether you're a {post.level} looking to strengthen your foundation or advance your skills, this resource has you covered.
//                     </p>
//                   </div>

//                   <div className="mb-8">
//                     <blockquote className={`border-l-4 border-primary-500 pl-4 italic my-6 ${
//                       isDark ? "text-gray-300" : "text-gray-600"
//                     }`}>
//                       <p className="leading-relaxed">
//                         "This is one of the most comprehensive resources available for learning {post.category}. 
//                         The practical examples and clear explanations make complex concepts easy to understand."
//                       </p>
//                     </blockquote>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Getting Started</h2>
//                     <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
//                       To get the most out of this resource, follow along with the examples and practice regularly. 
//                       The material is structured to build upon previous concepts, so it's recommended to go through it sequentially.
//                     </p>
//                   </div>

//                   <div className="mb-8">
//                     <h3 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Code Example</h3>
//                     <pre className={`rounded-lg p-6 overflow-x-auto border ${
//                       isDark 
//                         ? "bg-gray-900 border-gray-700" 
//                         : "bg-gray-100 border-gray-200"
//                     }`}>
//                       <code className={`text-sm ${
//                         isDark ? "text-gray-200" : "text-gray-800"
//                       }`}>
// {`// Example code snippet
// function welcome() {
//   console.log("Welcome to ${post.title}");
//   return "Ready to learn!";
// }`}
//                       </code>
//                     </pre>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>External Resource</h2>
//                     <p className={`leading-relaxed mb-4 ${
//                       isDark ? "text-gray-300" : "text-gray-700"
//                     }`}>
//                       This content is curated from {post.author.name}. For the complete learning experience with interactive examples and additional resources, visit:
//                     </p>
                    
//                     <a 
//                       href={post.link} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors shadow-lg"
//                     >
//                       View on {post.source}
//                       <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div className="pt-6 pb-6">
//                   <h2 className={`text-xs uppercase tracking-wide mb-3 ${
//                     isDark ? "text-gray-400" : "text-gray-500"
//                   }`}>
//                     Tags
//                   </h2>
//                   <div className="flex flex-wrap gap-2">
//                     {post.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className={`px-3 py-1 text-sm font-medium uppercase rounded-full ${
//                           isDark 
//                             ? "text-primary-400 bg-primary-900/30" 
//                             : "text-primary-600 bg-primary-100"
//                         }`}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// };

// export default BlogPostPage;