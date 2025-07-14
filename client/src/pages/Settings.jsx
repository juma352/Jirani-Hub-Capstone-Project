import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import useAuthStore from '../providers/useAuthStore'
import { User, Bell, Shield, Palette, Globe } from 'lucide-react'

const Settings = () => {
  const { user } = useAuthStore()
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: '',
    phone: '',
    website: ''
  })

  const [notifications, setNotifications] = useState({
    newListings: true,
    events: true,
    messages: true,
    alerts: true,
    newsletter: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  })

  const handleProfileChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and how others see you in the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell your neighbors about yourself..."
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  value={profileData.website}
                  onChange={handleProfileChange}
                />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Status</CardTitle>
              <CardDescription>Your standing in the JiraniHub community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-sm text-gray-500">January 2024</p>
                </div>
                <Badge variant="success">Verified Member</Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Community Score</span>
                  <span className="font-semibold">850 points</span>
                </div>
                <div className="flex justify-between">
                  <span>Trust Level</span>
                  <Badge variant="info">Trusted Neighbor</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Listings</p>
                    <p className="text-sm text-gray-500">Get notified when new items are posted</p>
                  </div>
                  <Switch
                    checked={notifications.newListings}
                    onCheckedChange={() => handleNotificationChange('newListings')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Events</p>
                    <p className="text-sm text-gray-500">Notifications about community events</p>
                  </div>
                  <Switch
                    checked={notifications.events}
                    onCheckedChange={() => handleNotificationChange('events')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-gray-500">Direct messages from other members</p>
                  </div>
                  <Switch
                    checked={notifications.messages}
                    onCheckedChange={() => handleNotificationChange('messages')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Community Alerts</p>
                    <p className="text-sm text-gray-500">Important community announcements</p>
                  </div>
                  <Switch
                    checked={notifications.alerts}
                    onCheckedChange={() => handleNotificationChange('alerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-gray-500">Weekly community newsletter</p>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={() => handleNotificationChange('newsletter')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control who can see your information and contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-gray-500">Make your profile visible to other members</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={() => handlePrivacyChange('profileVisible')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Email</p>
                    <p className="text-sm text-gray-500">Display your email on your profile</p>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={() => handlePrivacyChange('showEmail')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Phone</p>
                    <p className="text-sm text-gray-500">Display your phone number on your profile</p>
                  </div>
                  <Switch
                    checked={privacy.showPhone}
                    onCheckedChange={() => handlePrivacyChange('showPhone')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Messages</p>
                    <p className="text-sm text-gray-500">Let other members send you direct messages</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={() => handlePrivacyChange('allowMessages')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how JiraniHub looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <div className="w-6 h-6 bg-white border rounded mb-2"></div>
                      Light
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <div className="w-6 h-6 bg-gray-800 rounded mb-2"></div>
                      Dark
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                      System
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Language</Label>
                  <select className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md">
                    <option>English</option>
                    <option>Swahili</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings