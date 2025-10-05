"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, X } from "lucide-react";

const Filters = ({
  filters,
  onFilterApply,
  pageType,
}: {
  filters: any;
  onFilterApply: (params: string) => void;
  pageType:string
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (selectedCategory !== "All") params.append("category", selectedCategory);
    if (selectedTag) params.append("tags", selectedTag);
    if (sortBy === "date") params.append("ordering", "-created_at");
    if (sortBy === "title") params.append("ordering", "title");

    onFilterApply(params.toString());
  }, [searchTerm, selectedCategory, selectedTag, sortBy]);

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "All" ||
    selectedTag ||
    sortBy !== "date";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTag(null);
    setSortBy("date");
  };

  return (
    <div className="mt-12  max-w-5xl mx-2 md:mx-auto space-y-8">
      {/* Search */}
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 z-10 h-4 w-4" />
        <Input
          placeholder="Search projects, technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-background/60 backdrop-blur-sm  focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-xl border-primary/50"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Categories */}
        <div className="p-5 rounded-xl bg-card shadow-sm border border-primary/50">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              key="All"
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className="rounded-full transition-all duration-300 dark:border-primary/30 dark:hover:border-primary dark:hover:text-white"
            >
              <Filter className="h-3 w-3 mr-1" />
              All
            </Button>
            {filters?.category?.map((cat: any) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.name)}
                className="rounded-full transition-all duration-300 dark:border-primary/30 dark:hover:border-primary dark:hover:text-white"
              >
                {cat.name}
                <span className="ml-1 ">({cat.count})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="p-5 rounded-xl border border-primary/50 bg-card shadow-sm">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground">
            Filter by Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters?.tag?.map((tag: any) => (
              <Badge
                key={tag.name}
                onClick={() =>
                  setSelectedTag(selectedTag === tag.name ? null : tag.name)
                }
                className={`cursor-pointer px-3 py-1 rounded-full border duration-300 dark:border-primary/30 dark:hover:border-primary dark:text-white  transition-colors ${
                  selectedTag === tag.name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted/60 border-border"
                }`}
              >
                {tag.name}
                <span className="ml-1 ">({tag.count})</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="p-5 rounded-xl border border-primary/50 bg-card shadow-sm">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground">
            Sort {pageType === "project" ? "Projects" : "Blogs"}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("date")}
              className="rounded-full transition-all duration-300 dark:border-primary/30 dark:hover:border-primary dark:hover:text-white"
            >
              <Calendar className="h-3 w-3 mr-2" />
              Latest
            </Button>
            <Button
              variant={sortBy === "title" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("title")}
              className="rounded-full transition-all duration-300 dark:border-primary/30 dark:hover:border-primary dark:hover:text-white"
            >
              A-Z
            </Button>
          </div>
        </div>
      </div>

      {/* Clear Button */}
      {hasActiveFilters && (
        <div className="flex justify-center">
          <Button
            variant="default"
            size="sm"
            onClick={clearFilters}
            className="rounded-full text-white bg-destructive/70 hover:bg-destructive/20 transition-all hover:text-destructive "
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Filters;
