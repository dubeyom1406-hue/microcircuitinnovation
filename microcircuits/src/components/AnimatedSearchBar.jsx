import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const searchData = [
  { title: "Engineering DFT Design Principles", category: "CaseStudy", pageId: "casestudy" },
  { title: "Voltus AI Insights", category: "CaseStudy", pageId: "casestudy" },
  { title: "China against US EDA Policies", category: "CaseStudy", pageId: "casestudy" },
  { title: "Power, Performance, and PPA", category: "CaseStudy", pageId: "casestudy" },
  { title: "About Us", category: "Page", pageId: "about" },
  { title: "Our Mission & Vision", category: "About", pageId: "about" },
  { title: "Spec To Silicon", category: "About", pageId: "about" },
  { title: "Our Expertise", category: "Page", pageId: "expertise" },
  { title: "Careers & Jobs", category: "Page", pageId: "careers" },
  { title: "Contact Us", category: "Page", pageId: "contact" },
  { title: "Design & Verification", category: "Expertise", pageId: "expertise" },
  { title: "Physical Design", category: "Expertise", pageId: "expertise" },
  { title: "Design For Testability", category: "Expertise", pageId: "expertise" }
];

export default function AnimatedSearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const filteredData = searchData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleResultClick = (pageId) => {
    navigate(`/${pageId}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredData.length - 1 ? prev + 1 : prev
      );
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      handleResultClick(filteredData[activeIndex].pageId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div className="w-full max-w-2xl">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'relative' }}
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#00c2ff]" size={24} />

          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search anything..."
            className="w-full rounded-2xl bg-zinc-900 text-white pl-14 pr-4 py-5
            outline-none border border-zinc-800 focus:border-[#00c2ff]
            transition-all duration-300 shadow-2xl text-lg"
            style={{ fontWeight: 400 }}
          />
        </motion.div>

        {/* Suggestions */}
        <AnimatePresence>
          {query && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 rounded-2xl bg-[#0a0a0a] border border-zinc-800 overflow-hidden shadow-2xl"
              style={{ listStyle: 'none', padding: 0, maxHeight: '60vh', overflowY: 'auto' }}
            >
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ backgroundColor: "rgba(0, 194, 255, 0.05)" }}
                    className={`px-6 py-4 cursor-pointer border-b border-zinc-900 last:border-0
                        ${activeIndex === index ? "bg-zinc-800" : ""}`}
                    onClick={() => handleResultClick(item.pageId)}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#00c2ff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: '1.1rem', color: '#fff' }}>
                      {item.title}
                    </div>
                  </motion.li>
                ))
              ) : (
                <li style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No results found</div>
                  <div style={{ fontSize: '0.9rem' }}>Try searching for "DFT", "Careers", or "Case Studies"</div>
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}