import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageGallery } from '@/components/ui/image-gallery';
import useListingStore from '../store/listingStore';
import useOrderStore from '../store/orderStore';
import useAuthStore from '../providers/useAuthStore';
import { formatCurrency, formatDate } from '../lib/utils';
import { 
  ShoppingCart, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  User, 
  Edit, 
  Trash2,
  ArrowLeft,
  Heart,
  Share2,
  Flag
} from 'lucide-react';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { listings, fetchListings, deleteListing } = useListingStore();
  const { placeOrder, isLoading, error } = useOrderStore();

  const [listing, setListing] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const getListingById = (id) => {
    return listings.find(listing => listing._id === id);
  };

  useEffect(() => {
    const fetchListing = async () => {
      if (listings.length === 0) {
        await fetchListings();
      }
      const data = getListingById(id);
      setListing(data);
    };
    fetchListing();
  }, [id, listings, fetchListings]);

  const handleOrder = async () => {
    if (!listing) return;
    const totalPrice = listing.price * quantity;
    const result = await placeOrder({ listing: listing._id, quantity, totalPrice });
    if (result.success) {
      navigate(`/checkout/${result.order._id}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    const result = await deleteListing(id);
    if (result.success) {
      navigate('/dashboard/listings');
    }
  };

  const handleContactSeller = () => {
    if (listing?.postedBy?._id) {
      navigate(`/chat/${listing.postedBy._id}`);
    }
  };

  const isOwner = user?._id === listing?.postedBy?._id;

  if (!listing) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    const baseURL = import.meta.env.VITE_API_URL?.replace('/api', '') || 
                   (import.meta.env.PROD 
                     ? 'https://your-render-app-name.onrender.com'
                     : 'http://localhost:5000')
    return `${baseURL}/${imagePath.replace(/\\/g, '/')}`
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <ImageGallery 
            images={listing.images} 
            title={listing.title}
          />
        </div>

        {/* Listing Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2 capitalize">
                  {listing.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {listing.title}
                </h1>
                <p className="text-4xl font-bold text-primary mb-4">
                  {formatCurrency(listing.price)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500' : 'text-gray-500'}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {listing.description || 'No description provided.'}
              </p>
            </div>

            {/* Seller Info */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={listing.postedBy?.avatar} />
                    <AvatarFallback>
                      {listing.postedBy?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{listing.postedBy?.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.postedBy?.location || 'Location not specified'}
                    </div>
                  </div>
                  {!isOwner && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleContactSeller}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Listing Meta */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Posted {formatDate(listing.createdAt)}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                ID: {listing._id.slice(-6)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isOwner ? (
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/dashboard/edit-listing/${listing._id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Listing
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(listing._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <label htmlFor="quantity" className="font-medium">Quantity:</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="ml-auto">
                      <p className="text-sm text-gray-500">Total:</p>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(listing.price * quantity)}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleOrder} 
                      disabled={isLoading}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isLoading ? 'Processing...' : 'Buy Now'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleContactSeller}
                      className="flex-1"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>
                  </div>
                </>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mt-4">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Listings */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More from this seller</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings
            .filter(l => l.postedBy?._id === listing.postedBy?._id && l._id !== listing._id)
            .slice(0, 3)
            .map((relatedListing) => (
              <Card key={relatedListing._id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    {relatedListing.images && relatedListing.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000/${relatedListing.images[0].replace(/\\/g, '/')}`}
                        alt={relatedListing.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{relatedListing.title}</h3>
                  <p className="text-primary font-bold">{formatCurrency(relatedListing.price)}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate(`/marketplace/${relatedListing._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;