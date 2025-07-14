import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useListingStore from '../store/listingStore';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, updateListing } = useListingStore();

  const listingToEdit = listings.find(listing => listing._id === id);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (listingToEdit) {
      setTitle(listingToEdit.title || '');
      setCategory(listingToEdit.category || '');
      setPrice(listingToEdit.price || '');
      setDescription(listingToEdit.description || '');
      setImages([]); // New images to upload
    }
  }, [listingToEdit]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const result = await updateListing(id, formData);
    if (result.success) {
      alert('Listing updated successfully');
      navigate(`/listing/${id}`);
    } else {
      alert('Failed to update listing');
    }
  };

  if (!listingToEdit) {
    return <div>Loading listing data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="images">Upload Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <Button type="submit">Update Listing</Button>
      </form>
    </div>
  );
};

export default EditListing;

