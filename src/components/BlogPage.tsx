"use client";

import { BlogProps } from "@/interfaces/page";
import Image from "next/image";
import {
  Calendar,
  Tag,
  User,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlogPage: React.FC<BlogProps> = ({ blog }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!blog) return <p className="text-center py-10">Loading blog...</p>;

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsSliderOpen(true);
  };

  const closeSlider = () => setIsSliderOpen(false);
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? blog.images.length - 1 : prev - 1
    );
  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === blog.images.length - 1 ? 0 : prev + 1
    );

  // Allow keyboard navigation inside modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isSliderOpen) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeSlider();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSliderOpen]);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* ---- Cover Image ---- */}
      <motion.div
        className="relative w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-xl mb-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 p-8 md:p-12">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {blog.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* ---- Meta Info ---- */}
      <motion.div
        className="flex flex-wrap items-center gap-4 mb-10 text-gray-600 dark:text-gray-300 text-sm border-b border-border pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <User size={16} className="text-primary" />
          <span className="font-medium">
            {blog.auther.first_name} {blog.auther.last_name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <span>
            {new Date(blog.created_at || Date.now()).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-primary" />
          <span className="capitalize">{blog.category}</span>
        </div>
      </motion.div>

      {/* ---- Cover Description ---- */}
      <motion.p
        className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-10 leading-relaxed font-light"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {blog.cover_description}
      </motion.p>

      {/* ---- Blog Description ---- */}
      <motion.article
        className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      {/* ---- Extra Images ---- */}
      {blog.images && blog.images.length > 0 && (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {blog.images.map((img: any, index: number) => (
            <motion.div
              key={img.id}
              className="relative w-full h-64 rounded-xl overflow-hidden group shadow-md cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={img.image}
                alt={`Blog image ${img.id}`}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-wide">
                  View Image
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ---- Tags ---- */}
      {blog.tags && (
        <motion.div
          className="flex flex-wrap gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {blog.tags.map((tag: any, index: number) => (
            <span
              key={index}
              className="bg-primary/20 text-primary dark:bg-primary dark:text-primary-foreground text-sm px-4 py-1.5 rounded-full font-medium hover:bg-primary/30 dark:hover:bg-primary/80 transition-all cursor-default"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}

      {/* ---- Image Slider Modal ---- */}
      <AnimatePresence>
        {isSliderOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={closeSlider}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Image Display */}
            <div className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center">
              <Image
                src={blog.images[currentImageIndex].image}
                alt={`Slider image ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-8 text-white/70 hover:text-white transition text-4xl"
              aria-label="Previous Image"
            >
              <ChevronLeft size={42} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-8 text-white/70 hover:text-white transition text-4xl"
              aria-label="Next Image"
            >
              <ChevronRight size={42} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogPage;
