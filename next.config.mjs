/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
        {
          protocol: "https",
          hostname: "linkedinclone.blob.core.windows.net",
        },
        {
          protocol: 'https',
          hostname: "upload.wikimedia.org",
          pathname:"/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/108px-LinkedIn_icon.svg.png"
          
        },
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  