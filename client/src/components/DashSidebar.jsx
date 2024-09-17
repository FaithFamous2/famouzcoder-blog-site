import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useSelector } from 'react-redux'

function DashSidebar() {

    const location = useLocation();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [tab, setTab] = useState('');
    useEffect(() => {

      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');

      // console.log(tabFromUrl)
      if (tabFromUrl) {
        setTab(tabFromUrl)
      }
    }, [location.search]);

    const handleSignout = async () => {
      try {
          const res =await fetch('/api/user/signout', {
              method: 'POST',
          });
          const data =await res.json();
          if (!res.ok){
              console.log(data.message);
          }
          else{
            dispatch(signoutSuccess());
          }

      } catch (error) {
          console.log(error.message)

      }
  }

  return (
    <Sidebar className='w-full md:w-56 '>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && (
                <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                    Posts
                </Sidebar.Item>
                </Link>

                )}

                {currentUser.isAdmin && (
                <Link to='/dashboard?tab=users'>
                <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                    users
                </Sidebar.Item>
                </Link>

                )}

                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
