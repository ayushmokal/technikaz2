import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchBlog(id: number) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: {
      revalidate: 0
    }
  };

  try {
    const res = await fetch(
      `http://127.0.0.1:1337/api/blogs/${id}?populate=*`,
      options
    );
    const response = await res.json();
    
    if (!response.data || !response.data.attributes) {
      console.error('No data found for blog:', id);
      return null;
    }

    const attributes = response.data.attributes;
    return {
      ...attributes,
      id: response.data.id,
      Title: attributes.Title,
      Description: attributes.Description,
      img: attributes.img?.data ? {
        url: attributes.img.data.attributes.url
      } : null,
      publishedAt: attributes.publishedAt
    };
  } catch (err) {
    console.error('Error fetching blog:', err);
    return null;
  }
}

const BlogPage = async ({ params }: any) => {
  const blog = await fetchBlog(params.id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const truncateBlogDesc = blog.Description?.[0]?.children?.[0]?.text || "";
  const imageUrl = blog.img?.url
    ? `http://127.0.0.1:1337${blog.img.url}`
    : "";

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link href="/">{"< Back"}</Link>
      {imageUrl && (
        <div className="relative w-full h-96 overflow-hidden rounded-lg mt-5">
          <Image 
            priority 
            layout="fill" 
            src={imageUrl} 
            alt={blog.Title || ""} 
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="mt-4">
        <h1 className="text-3xl font-semibold">{blog.Title}</h1>
        <p className="text-gray-600 mt-2">{truncateBlogDesc}</p>
        <div className="mt-4 flex items-center text-gray-400">
          <span className="text-sm">
            Published on{" "}
            {new Date(blog.publishedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
