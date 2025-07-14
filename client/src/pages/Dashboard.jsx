import React, { useEffect } from 'react';
import useListingStore from '../store/listingStore';
import useEventStore from '../store/eventStore';
import useServiceStore from '../store/serviceStore';

const Dashboard = () => {
  const { listings, fetchListings } = useListingStore();
  const { events, fetchEvents } = useEventStore();
  const { services, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchListings();
    fetchEvents();
    fetchServices();
  }, [fetchListings, fetchEvents, fetchServices]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <p className="mb-6 text-lg text-gray-700">
        Welcome to JiraniHub! Here’s an overview of what you can do as a user:
      </p>
      <ul className="list-disc list-inside mb-8 space-y-2 text-gray-600">
        <li><strong>Browse Listings:</strong> Explore and find local products and services offered by your community members.</li>
        <li><strong>Create Listings:</strong> Post your own products or services to reach others in your area.</li>
        <li><strong>Manage Services:</strong> Offer and manage services that you provide to the community.</li>
        <li><strong>Participate in Events:</strong> Discover and join community events or create your own.</li>
        <li><strong>Stay Connected:</strong> Engage with your neighbors and support local initiatives.</li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Listings</h2>
          <p className="text-4xl font-bold text-primary">{listings.length}</p>
          <p className="text-gray-500">Active listings in your marketplace</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-4xl font-bold text-primary">{events.length}</p>
          <p className="text-gray-500">Events scheduled in your community</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Active Services</h2>
          <p className="text-4xl font-bold text-primary">{services.length}</p>
          <p className="text-gray-500">Services currently available</p>
        </div>
      </div>
  
    </div>
  );
};

export default Dashboard;

