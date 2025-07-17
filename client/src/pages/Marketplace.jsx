import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Plus, Search, Filter, Grid, List, SlidersHorizontal, Heart, MapPin } from 'lucide-react'
import useListingStore from '../store/listingStore'
import { formatCurrency, formatDate } from '../lib/utils'

const Marketplace = () => {
  const { listings, fetchListings, isLoading } = useListingStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const categories = [
    { value: '', label: 'All Categories', count: listings.length },
    { value: 'electronics', label: 'Electronics', count: listings.filter(l => l.category === 'electronics').length },
    { value: 'clothing', label: 'Clothing', count: listings.filter(l => l.category === 'clothing').length },
    { value: 'furniture', label: 'Furniture', count: listings.filter(l => l.category === 'furniture').length },
    { value: 'books', label: 'Books', count: listings.filter(l => l.category === 'books').length },
    { value: 'sports', label: 'Sports', count: listings.filter(l => l.category === 'sports').length },
    { value: 'other', label: 'Other', count: listings.filter(l => l.category === 'other').length }
  ]

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || listing.category === selectedCategory
    const matchesPriceRange = (!priceRange.min || listing.price >= parseFloat(priceRange.min)) &&
                             (!priceRange.max || listing.price <= parseFloat(priceRange.max))
    return matchesSearch && matchesCategory && matchesPriceRange
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      default: // newest
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    if (imagePath.startsWith('http')) return imagePath
    return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listings...</p>
        </div>
      </div>
    )
  }

  const ListingCard = ({ listing, isListView = false }) => (
    <Card className={`hover:shadow-lg transition-all duration-300 group ${isListView ? 'flex' : ''}`}>
      <div className={`${isListView ? 'w-48 flex-shrink-0' : 'aspect-video'} overflow-hidden ${isListView ? 'rounded-l-lg' : 'rounded-t-lg'} bg-gray-100 relative`}>
        <img
          src={getImageUrl(listing.images?.[0])}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
          }}
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {listing.images && listing.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            +{listing.images.length - 1} more
          </div>
        )}
      </div>
      
      <div className={`${isListView ? 'flex-1' : ''} p-4`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2 capitalize text-xs">
              {listing.category}
            </Badge>
            <CardTitle className={`${isListView ? 'text-lg' : 'text-lg'} line-clamp-2 group-hover:text-primary transition-colors`}>
              {listing.title}
            </CardTitle>
          </div>
        </div>
        
        <p className={`text-gray-600 mb-3 ${isListView ? 'line-clamp-2' : 'line-clamp-3'} text-sm`}>
          {listing.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(listing.price)}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={listing.postedBy?.avatar} />
              <AvatarFallback className="text-xs">
                {listing.postedBy?.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span>{listing.postedBy?.name}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{listing.postedBy?.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>{formatDate(listing.createdAt)}</span>
          <span>ID: {listing._id.slice(-6)}</span>
        </div>
        
        <Button className="w-full" asChild>
          <Link to={`/marketplace/${listing._id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600">Buy and sell with your neighbors</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/create-listing">
            <Plus className="h-4 w-4 mr-2" />
            Post Listing
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Price Range:</span>
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            className="w-24"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            className="w-24"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPriceRange({ min: '', max: '' })}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredListings.length} of {listings.length} listings
          {selectedCategory && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
        </span>
      </div>

      {/* Listings Grid/List */}
      {filteredListings.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No listings found</h3>
              <p>Try adjusting your search or filters, or be the first to post a listing!</p>
              <Button className="mt-4" asChild>
                <Link to="/dashboard/create-listing">Post First Listing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredListings.map((listing) => (
            <ListingCard 
              key={listing._id} 
              listing={listing} 
              isListView={viewMode === 'list'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Marketplace