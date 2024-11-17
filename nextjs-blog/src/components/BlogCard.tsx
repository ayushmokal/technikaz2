import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }: any) => {
  const truncateBlogDesc =
    blog.Description?.[0]?.children?.[0]?.text?.length > 80
      ? blog.Description[0].children[0].text.substring(0, 80) + "..."
      : blog.Description?.[0]?.children?.[0]?.text || "";

  const imageUrl = blog.img?.url
    ? `http://127.0.0.1:1337${blog.img.url}`
    : "";

  return (
    <div className="rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-gray-600 cursor-pointer">
      <Link href={`/blog/${blog.id}`}>
        <div className="relative w-full h-1" style={{ paddingBottom: "100%" }}>
          {imageUrl && (
            <Image
              priority
              layout="fill"
              src={imageUrl}
              alt={blog.Title || ""}
              className="rounded-t-lg"
            />
          )}
        </div>
        <div className="p-2">
          <h2 className="text-xl font-semibold mb-2 overflow-ellipsis">
            {blog.Title}
          </h2>
          <p className="text-gray-600">{truncateBlogDesc}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;