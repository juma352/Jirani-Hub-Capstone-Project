import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import useListingStore from '../store/listingStore';
import useOrderStore from '../store/orderStore';
import { formatCurrency, formatDate } from '../lib/utils';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, fetchListings, deleteListing } = useListingStore();

  const getListingById = (id) => {
    return listings.find(listing => listing._id === id);
  };
  const { placeOrder, isLoading, error } = useOrderStore();

  const [listing, setListing] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchListing = async () => {
      const data = await getListingById(id);
      setListing(data);
    };
    fetchListing();
  }, [id, getListingById]);

  const handleOrder = async () => {
    if (!listing) return;
    const totalPrice = listing.price * quantity;
    const result = await placeOrder({ listing: listing._id, quantity, totalPrice });
    if (result.success) {
      alert('Order placed successfully!');
      navigate(`/checkout/${result.order._id}`);
    } else {
      alert('Failed to place order: ' + result.error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    const result = await deleteListing(id);
    if (result.success) {
      alert('Listing deleted successfully');
      navigate('/marketplace');
    } else {
      alert('Failed to delete listing');
    }
  };

  if (!listing) {
    return <div>Loading listing details...</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>{listing.title}</CardTitle>
        <CardDescription className="capitalize">{listing.category}</CardDescription>
      </CardHeader>
      <CardContent>
        {listing.images && listing.images.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-4">
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${image.replace(/\\/g, '/')}`}
                alt={`Listing Image ${index + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            ))}
          </div>
        )}
        <p className="mb-4">{listing.description}</p>
        <p className="text-lg font-bold mb-2">Price: {formatCurrency(listing.price)}</p>
        <p className="mb-2">Posted by: {listing.postedBy?.name}</p>
        <p className="mb-4">Posted on: {formatDate(listing.createdAt)}</p>
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-1 font-medium">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 w-20"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <Button variant="destructive" onClick={() => handleDelete(listing._id)}>
            Delete
          </Button>
          <Button onClick={() => navigate(`/dashboard/edit-listing/${listing._id}`)}>
            Edit
          </Button>
        </div>
        <Button onClick={handleOrder} disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </Button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );

};

export default ListingDetail;
