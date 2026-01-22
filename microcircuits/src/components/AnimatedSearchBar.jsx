import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Search } from "lucide-react";



const data = [

  "React Animation",

  "Framer Motion",

  "Professional UI Design",

  "Search Bar UX",

  "Next.js Website",

  "AI Dashboard",

  "Admin Panel",

  "Startup Landing Page",

  "Portfolio Website",

  "SaaS UI Design",

];



export default function AnimatedSearchBar() {

  const [query, setQuery] = useState("");

  const [activeIndex, setActiveIndex] = useState(-1);



  const filteredData = data.filter((item) =>

    item.toLowerCase().includes(query.toLowerCase())

  );



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

      setQuery(filteredData[activeIndex]);

      setActiveIndex(-1);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">

      <div className="w-full max-w-xl px-4">

        

        {/* Search Box */}

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

          className="relative"

        >

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />



          <input

            type="text"

            value={query}

            onChange={(e) => {

              setQuery(e.target.value);

              setActiveIndex(-1);

            }}

            onKeyDown={handleKeyDown}

            placeholder="Search anything..."

            className="w-full rounded-2xl bg-zinc-900 text-white pl-12 pr-4 py-4

            outline-none border border-zinc-800 focus:border-indigo-500

            transition-all duration-300 shadow-xl"

          />

        </motion.div>



        {/* Suggestions */}

        <AnimatePresence>

          {query && filteredData.length > 0 && (

            <motion.ul

              initial={{ opacity: 0, y: 10 }}

              animate={{ opacity: 1, y: 0 }}

              exit={{ opacity: 0, y: 10 }}

              className="mt-3 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl"

            >

              {filteredData.map((item, index) => (

                <motion.li

                  key={item}

                  whileHover={{ backgroundColor: "#27272a" }}

                  className={`px-5 py-3 cursor-pointer text-zinc-300

                  ${

                    activeIndex === index

                      ? "bg-zinc-800 text-white"

                      : ""

                  }`}

                  onClick={() => setQuery(item)}

                >

                  {item}

                </motion.li>

              ))}

            </motion.ul>

          )}

        </AnimatePresence>

      </div>

    </div>

  );

}