import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Announcement from '../layout/Announcement'
import ProfilePage from '../components/ProfilePage'
import { useSelector, useDispatch } from 'react-redux';
function Profile() {

  const UserID = useSelector((store) => store.auth.currentUser._id);

  return (
    <div>

      <ProfilePage UserID={UserID} />

    </div>
  )
}

export default Profile