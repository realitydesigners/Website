'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { jura, staatliches } from '@/fonts';
import { getPostData } from '@/app/api/actions/fetchInternalLink';

import ImageBox from '@/components/shared/ImageBox';
const InternalLink = ({ slug, children }) => {
   const [isDialogOpen, setDialogOpen] = useState(false);
   const [previewPostData, setPreviewPostData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const openDialog = async e => {
      e.preventDefault();
      setIsLoading(true);
      setDialogOpen(true);

      if (!slug) {
         console.error('The slug is undefined.');
         setIsLoading(false);
         return;
      }

      try {
         const data = await getPostData(slug);
         setPreviewPostData(data);
      } catch (error) {
         console.error('Failed to fetch post data:', error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Link href="#popup" onClick={openDialog} className={`${staatliches.className} text-xl text-black underline`}>
            {children}
         </Link>
         {isDialogOpen && (isLoading ? <LoadingIndicator /> : <ArticlePreviewDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} postData={previewPostData} />)}
      </>
   );
};

export const ArticlePreviewDialog = ({ isOpen, onClose, postData }) => {
   if (!isOpen || !postData) return null;

   const firstBlock = postData?.block?.[0];

   return (
      <div id="popup" className="flex flex-col my-5 items-center justify-center ">
         <div className="w-full relative max-w-3xl h-[50vh] overflow-auto p-4 bg-gray-300 shadow-lg rounded-lg flex flex-col">
            {firstBlock && (
               <>
                  {firstBlock.image && (
                     <div className="relative mb-4">
                        <ImageBox image={firstBlock.image} alt={`Cover Image for ${firstBlock.heading}`} classesWrapper="h-[250px] w-full transform rounded-[.5em] object-cover transition-transform duration-300 group-hover:scale-110" />
                     </div>
                  )}

                  <Link href={`/posts/${postData.slug.current}`} className={`${staatliches.className} text-black font-bold text-4xl mb-2`}>
                     {firstBlock.heading}
                  </Link>

                  {firstBlock.subheading && <p className={`${jura.className} text-black text-lg mb-4`}>{firstBlock.subheading}</p>}
               </>
            )}

            <div className="flex justify-between items-center">
               <Link href={`/posts/${postData.slug.current}`} className="w-full lg:w-1/2 flex justify-center items-center px-6 py-2 bg-black text-white font-bold rounded hover:bg-black/75 transition-colors">
                  Read Now
               </Link>
            </div>
         </div>

         <div className="sticky top-0 right-0 pt-4">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={onClose} className="px-4 py-2 text-black font-bold rounded hover:bg-gray-300 transition-colors">
               Close X
            </button>
         </div>
      </div>
   );
};

const LoadingIndicator = () => (
   <div className="flex my-4 items-center justify-center">
      <div className="w-full max-w-3xl h-[50vh] overflow-auto flex justify-center items-center p-4 bg-gray-300 shadow-lg rounded-lg">
         {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
         <svg width="100" height="100" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" stroke="#888888" strokeWidth="5" fill="none" strokeDasharray="31.415, 31.415" strokeDashoffset="0">
               <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
            </circle>
         </svg>
      </div>
   </div>
);

export default InternalLink;
