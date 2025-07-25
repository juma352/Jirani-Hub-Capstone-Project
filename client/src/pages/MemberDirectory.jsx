import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useMemberStore from '../store/memberStore'
import useAuthStore from '../providers/useAuthStore'

const MemberDirectory = () => {
  const { members, fetchMembers, isLoading, error } = useMemberStore()

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const { user } = useAuthStore()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Member Directory</h1>
      {isLoading && <p>Loading members...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {members.length === 0 && !isLoading && <p>No verified members found.</p>}

      {['admin', 'moderator'].includes(user?.role) && (
        <div className="mb-4">
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Manage Members
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map(member => (
          <Card key={member._id}>
            <CardHeader>
              <CardTitle>{member.user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Location: {member.user.location || 'N/A'}</p>
              <p>Badges: {member.badges.length > 0 ? member.badges.join(', ') : 'None'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MemberDirectory
