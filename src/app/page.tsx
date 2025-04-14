'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 bg-gray-100">
      {/* Hero Section */}
      <section className="relative w-full h-96 overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080?blur=2" // Hero image
          alt="Restaurant Interior"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to TableTop Reservations!
          </h1>
          <p className="text-lg mb-8">
            Experience exquisite dining with seamless reservations.
          </p>
          <Button onClick={() => router.push('/login')}>
            Reserve Your Table
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Why Choose TableTop Reservations?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image
              src="https://picsum.photos/150/100" // Replace with actual icon
              alt="Easy Booking"
              width={75}
              height={50}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-700">
              Effortlessly book your table in just a few clicks.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image
              src="https://picsum.photos/150/100" // Replace with actual icon
              alt="Customizable Options"
              width={75}
              height={50}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Customizable Options
            </h3>
            <p className="text-gray-700">
              Specify your preferences and customize your dining experience.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image
              src="https://picsum.photos/150/100" // Replace with actual icon
              alt="Exclusive Deals"
              width={75}
              height={50}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
            <p className="text-gray-700">
              Enjoy special offers and discounts for our valued customers.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Culinary Delights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Menu Item 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="https://picsum.photos/400/300" // Replace with actual dish image
              alt="Dish 1"
              width={400}
              height={300}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Delicious Dish 1</h3>
              <p className="text-gray-700">
                A flavorful dish that will tantalize your taste buds.
              </p>
            </div>
          </div>
          {/* Menu Item 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="https://picsum.photos/400/300" // Replace with actual dish image
              alt="Dish 2"
              width={400}
              height={300}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Exquisite Dish 2</h3>
              <p className="text-gray-700">
                Experience the rich flavors of our signature dish.
              </p>
            </div>
          </div>
          {/* Menu Item 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="https://picsum.photos/400/300" // Replace with actual dish image
              alt="Dish 3"
              width={400}
              height={300}
              objectFit="cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                Mouthwatering Dish 3
              </h3>
              <p className="text-gray-700">
                A unique blend of ingredients crafted to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-primary text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Dine?</h2>
          <p className="text-lg mb-8">
            Book your table now and embark on a culinary journey.
          </p>
          <Button onClick={() => router.push('/login')}>
            Make a Reservation
          </Button>
        </div>
      </section>
    </div>
  );
}
