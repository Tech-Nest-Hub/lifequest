import { NavbarLoggedIn } from '@/components/loggedin/NavbarLoggedIn'
import CharacterDashboard from '@/components/profile/character'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-full'>
      <NavbarLoggedIn user={{
             id: "123",
             username: "ghost",
             email: "mail",
             level: 3,
             health: 100,
             energy: 100,
             money: 100,
             race: "human",
             class: "warrior",
           }} />
           <CharacterDashboard/>
    </div>
  )
}

export default Profile