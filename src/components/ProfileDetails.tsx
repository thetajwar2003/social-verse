import Image from 'next/image';

const ProfileDetails = () => {
  return (
    <section className="max-container padding-container flex flex-col lg:flex-row gap-20 py-10 pb-32 items-start">
      {/* Profile Picture */}
      <div className='profile-picture relative w-60 h-60 lg:w-60 lg:h-60'>
        <Image
          src="/pfp.png"
          alt="profile"
          
          objectFit="cover"
          height={300}
          width={300}

          objectPosition="top left"
        />
      </div>

      {/* Content */}
      <div className='relative z-20'>
        <div className='ml-0 lg:mt-6'>
        <div className="flex items-center"> {/* Flex container */}
          <h1 className='bold-52 lg:mt-0'>John Doe</h1>
            {/* Image */}
            <img
             src="\edit-icon-vector-illustration.jpg"
             alt="Following Image"
            className="w-6 h-6 ml-30 lg:ml-10" // Adjust size and margins as needed
        />
        </div>
          <p className="regular-16 mt-2 text-gray-30 lg:max-w-[520px]">Let's explore the outdoors together, one snapshot at a time. My passion is photography and would love to collab! #CityEcplorer #PhotographyEnthusiast</p>
        </div>

        {/* Following Count */}
        <div className="flex items-center mt-10 text-gray-30 lg:mt-4">
          <h3 className="bold-12 mr-4">50</h3>
          <h6 className="bold-5">Followers</h6>
          <h3 className="bold-12 ml-8 mr-4">99</h3>
          <h6 className="bold-5">Following</h6>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
