"use client";
import { toUpperCase } from "@/app/_aux/utils";
import { Image } from "@nextui-org/react";
import React from "react";

interface HeroProps {
  alt: string;
  name: string;
  src: string;
}

const HeroCompoent = React.memo(
  (props: HeroProps): React.ReactElement<HeroProps> => {
    return (
      <div className="flex items-center flex-col place-items-center content-center w-full justify-items-center justify-center">
        <Image width={300} height={300} alt={props.alt} src={props.src} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center my-5">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{toUpperCase(props.name)}</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover amazing features and services that will revolutionize
              your experience.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Add to favorite
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
HeroCompoent.displayName = "HeroComponent"

export default HeroCompoent;
