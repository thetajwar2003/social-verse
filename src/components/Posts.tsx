import React from 'react';

function Posts() {
    const boxes = new Array(10).fill(null);
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row border-2 border-green-500">
      <div className='All-Posts'/>

      {/* LEFT */}
      <div className='relative z-100 flex flex-1 flex-col py-20'>

      <h1 className='bold-40 lg:bold-30 absolute top-[-50px] left-[-110px]'>All Posts</h1>

        {/* Posts Boxes */}
        <div className='flex items-start flex-wrap gap-4'>
        {boxes.map((_, index) => (
            <div key={index} className='relative h-80 w-60 border border-gray-500 rounded-lg p-4'>
            {/* Small rectangle for caption */}
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gray-200">
                <p className="text-sm text-gray-600">Caption</p>
            </div>
             {/* Content */}
            <p>bordered rectangle</p>
            </div>
        ))}
            </div>
        </div>
    </section>
  );
}

export default Posts;



