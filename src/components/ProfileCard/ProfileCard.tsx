// ProfileCard.tsx
import React from 'react';
import { Linkedin } from 'lucide-react';
import { Github } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Facebook } from 'lucide-react';
import Link from 'next/link';
const ProfileCard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-5">
      <div className="relative">
        <img
          src="/images/IMG_20240717_220205.jpg"
          alt="Background"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-4 w-24 h-24 border-4 border-white rounded-full overflow-hidden transform translate-y-1/2">
          <img
            src="/images/IMG_20240717_220623.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mostafa Mohamed Batt</h1>
            <p className="text-gray-600">
              Full-Stack || .Net Developer ||
              <br /> Fresh graduated || Math & CS
            </p>
            <p className="text-gray-600">Shebin El Kom, Al Minufiyah, Egypt</p>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-gray-700">Minufiya University</span>
        </div>
        <div className="flex items-center mt-2">
          <a href='https://www.linkedin.com/company/creadev-soft/mycompany/' className="text-gray-700">CREADEV SOFT</a>
        </div>
        <div className="flex justify-end mt-6 space-x-3">
          <Link target='_blank' href={`https://www.linkedin.com/in/mostafa-mohamed-2a1813251/`} className="bg-gray-500 text-white px-4 py-2 rounded-full">
          <Linkedin />
          </Link>
          <Link target='_blank' href={`https://github.com/MoustafaMohammedbatt`} className="bg-gray-500 text-white px-4 py-2 rounded-full">
          <Github />
          </Link>
          <Link target='_blank' href={`https://www.instagram.com/moustafa_m_batt/`} className="bg-gray-500 text-white px-4 py-2 rounded-full">
          <Instagram />
          </Link>
          <Link target='_blank' href={`https://www.facebook.com/zaaf.toot`} className="bg-gray-500 text-white px-4 py-2 rounded-full">
          <Facebook />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
