"use client";
import React, { useContext } from "react";
import BlogCard from "./BlogCard";
import { CategoryContext } from "@/context/CategoryContext";

const Blogs = ({ blogs }: any) => {
  const { category } = useContext(CategoryContext);

  if (!blogs?.data) return null;

  const filteredBlogs = blogs.data.filter((blog: any) => {
    return blog.categories?.some(
      (cat: any) => cat.Title === category
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredBlogs?.map((blog: any) => (
        <div key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;