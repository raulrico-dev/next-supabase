// import SignOutButton from '@/components/common/signout-button'
import ProfileForm from '@/components/user/profile-form'
import { createClient } from '@/utils/supabase/server'
import { Suspense } from 'react'


export default async function PrivatePage() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()
  const user = data.user.id

  return (
    <>
      <Suspense fallback={<div className='w-full max-w-screen-sm h-full rounded-2xl bg-neutral-900 animate-pulse' />}>
        <ProfileForm user={user}  />
      </Suspense>
    </>
  )
}