import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import useListingStore from '../store/listingStore'
import { Upload, X, Image as ImageIcon, DollarSign, Tag, FileText, Camera } from 'lucide-react'

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    images: []
  })
  const [imagePreview, setImagePreview] = useState([])
  const [step, setStep] = useState(1)
  const [dragActive, setDragActive] = useState(false)
  
  const { createListing, isLoading, error } = useListingStore()
  const navigate = useNavigate()

  const categories = [
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'clothing', label: 'Clothing & Fashion', icon: '👕' },
    { value: 'furniture', label: 'Furniture & Home', icon: '🪑' },
    { value: 'books', label: 'Books & Media', icon: '📚' },
    { value: 'sports', label: 'Sports & Recreation', icon: '⚽' },
    { value: 'other', label: 'Other', icon: '📦' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formPayload = new FormData()
    formPayload.append('title', formData.title)
    formPayload.append('category', formData.category)
    formPayload.append('description', formData.description)
    formPayload.append('price', parseFloat(formData.price))
    formData.images.forEach((image) => {
      formPayload.append('images', image)
    })

    const result = await createListing(formPayload)
    if (result.success) {
      navigate('/dashboard/listings')
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (validFiles.length + formData.images.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }))

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImagePreview(prev => prev.filter((_, i) => i !== index))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const getStepProgress = () => {
    return (step / 3) * 100
  }

  const canProceedToStep2 = formData.title && formData.category && formData.price
  const canProceedToStep3 = canProceedToStep2 && formData.description

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
        <p className="text-gray-600">Post an item for sale in your neighborhood marketplace</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {step} of 3</span>
          <span className="text-sm text-gray-500">{Math.round(getStepProgress())}% Complete</span>
        </div>
        <Progress value={getStepProgress()} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={step >= 1 ? 'text-primary font-medium' : ''}>Basic Info</span>
          <span className={step >= 2 ? 'text-primary font-medium' : ''}>Description</span>
          <span className={step >= 3 ? 'text-primary font-medium' : ''}>Images & Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Let's start with the essential details about your item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">What are you selling? *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., iPhone 13 Pro Max, Vintage Leather Jacket"
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">Be specific and descriptive</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                      className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                        formData.category === category.value 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-medium text-sm">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (KES) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    className="pl-10 text-lg"
                  />
                </div>
                <p className="text-sm text-gray-500">Set a fair price for your item</p>
              </div>

              <Button 
                type="button" 
                onClick={() => setStep(2)} 
                disabled={!canProceedToStep2}
                className="w-full"
              >
                Continue to Description
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Description & Details
              </CardTitle>
              <CardDescription>
                Help buyers understand what you're selling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item's condition, features, and any other relevant details..."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500">
                  Include condition, age, brand, size, and any defects or special features
                </p>
              </div>

              {/* Preview Card */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium mb-3">Preview</h3>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge variant="secondary" className="mb-2 capitalize">
                        {formData.category || 'Category'}
                      </Badge>
                      <h4 className="font-semibold text-lg">
                        {formData.title || 'Your item title'}
                      </h4>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {formData.price ? `KES ${parseFloat(formData.price).toLocaleString()}` : 'KES 0'}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {formData.description || 'Your description will appear here...'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setStep(3)} 
                  className="flex-1"
                >
                  Continue to Images
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Images & Final Review
              </CardTitle>
              <CardDescription>
                Add photos to showcase your item (optional but recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <Label>Images (up to 5)</Label>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drop images here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 5MB each
                    </p>
                  </label>
                </div>

                {/* Image Preview */}
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Final Review */}
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="font-semibold mb-4">Final Review</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Listing Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Title:</span>
                        <span className="font-medium">{formData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium capitalize">{formData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-primary">
                          KES {parseFloat(formData.price || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Images:</span>
                        <span className="font-medium">{formData.images.length} uploaded</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Description Preview</h4>
                    <p className="text-sm text-gray-600 line-clamp-4">
                      {formData.description || 'No description provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    'Create Listing'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  )
}

export default CreateListing