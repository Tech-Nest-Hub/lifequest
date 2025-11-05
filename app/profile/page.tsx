import { ChartAreaInteractive } from '@/components/profile/AreaChart'
import CharacterDashboard from '@/components/profile/character'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="">
<CharacterDashboard/>
    <div className="grid grid-cols-3">

   <ChartAreaInteractive/>
    </div>
    </div>

  )
}

export default ProfilePage