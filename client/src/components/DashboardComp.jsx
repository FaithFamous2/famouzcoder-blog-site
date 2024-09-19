import { Button, Table, TableBody, TableCell } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function DashboardComp() {
    const {currentUser} = useSelector((state) => state.user)
    const [users, setUser] = useState([])
    const [comments, setComments] = useState([])
    const [posts, setPost] = useState([])
    const [totalUser, setTotalUser] = useState([0])
    const [totalComments, setTotalComments] = useState([0])
    const [totalPosts, setTotalPosts] = useState([0])
    const [lastMonthUser, setLastMonthUser] = useState([0])
    const [lastMonthComments, setLastMonthComments] = useState([0])
    const [lastMonthPost, setLastMonthPost] = useState([0])

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await fetch('/api/user/getusers?limit=5')
            const data = await res.json()
            if(res.ok){
                setUser(data.users)
                setTotalUser(data.totalUsers)
                setLastMonthUser(data.lastMonthUsers)
            }
            } catch (error) {
                console.log(error.message)
            }
        }
        const fetchPost = async() => {
            try {
                const res = await fetch('/api/post/getposts?limit=5');
            const data = await res.json()
            if(res.ok){
                setPost(data.posts)
                setTotalPosts(data.totalPosts)
                setLastMonthPost(data.lastMonthPosts)
            }

            } catch (error) {
                console.log(error.message)
            }

        }
        const fetchComment = async() => {
            try {
                const res =await fetch('/api/comment/getcomments?limit=5');
                const data = await res.json();
                if(res.ok){
                    setComments(data.comments);
                    setTotalComments(data.totalComment)
                    setLastMonthComments(data.lastMonthComment)
                }

            } catch (error) {
                console.log(error.message)
            }

        }
        if(currentUser.isAdmin){
            fetchUser();
            fetchPost();
            fetchComment();
        }
    }, [currentUser])


  return (
    <div className='p-3 md:mx-auto'>
        <div className='flex-wrap flex gap-4 justify-center'>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className='flex justify-between'>
                <div className=''>
                    <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                    <p className='text-2xl'> {totalUser} </p>
                </div>
                    <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
            </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthUser}
                    </span>
                    <div className='text-gray-500'>Last Month</div>
                </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className='flex justify-between'>
                <div className=''>
                    <h3 className='text-gray-500 text-md uppercase'>Total comments</h3>
                    <p className='text-2xl'> {totalComments} </p>
                </div>
                    <HiAnnotation className='bg-orange-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
            </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthComments}
                    </span>
                    <div className='text-gray-500'>Last Month</div>
                </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className='flex justify-between'>
                <div className=''>
                    <h3 className='text-gray-500 text-md uppercase'>Total posts</h3>
                    <p className='text-2xl'> {totalPosts} </p>
                </div>
                    <HiDocumentText className='bg-purple-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
            </div>
                <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthPost}
                    </span>
                    <div className='text-gray-500'>Last Month</div>
                </div>
        </div>
    </div>

    <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent Users</h1>
                <Button outline gradientDuoTone='pinkToOrange'>
                    <Link to={"/dashboard?tab=users"}>
                    See All
                    </Link>
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>Username </Table.HeadCell>
                </Table.Head>
                {users && users.map((user) => (
                    <TableBody key={user._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell>
                                <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full bg-gray-500' />
                            </TableCell>
                            <TableCell>
                                {user.username}
                            </TableCell>
                        </Table.Row>
                    </TableBody>
                ))}
            </Table>
        </div>


        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent Comments</h1>
                <Button outline gradientDuoTone='greenToBlue'>
                    <Link to={"/dashboard?tab=comments"}>
                    See All
                    </Link>
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Comment Content</Table.HeadCell>
                    <Table.HeadCell>Likes </Table.HeadCell>
                </Table.Head>
                {comments && comments.map((comment) => (
                    <TableBody key={comment._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell className='w-96'>
                               <p className='line-clamp-2'>{comment.content}</p>
                            </TableCell>
                            <TableCell>
                                {comment.numberOfLikes}
                            </TableCell>
                        </Table.Row>
                    </TableBody>
                ))}
            </Table>
        </div>



        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent Post</h1>
                <Button outline gradientDuoTone='tealToLime'>
                    <Link to={"/dashboard?tab=posts"}>
                    See All
                    </Link>
                </Button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post Title </Table.HeadCell>
                    <Table.HeadCell>Category </Table.HeadCell>
                </Table.Head>
                {posts && posts.map((post) => (
                    <TableBody key={post._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell>
                                <img src={post.image} alt={post.slug} className='w-14 h-10 rounded-md bg-gray-500' />
                            </TableCell>
                            <TableCell className='w-96'>
                                {post.title}
                            </TableCell>
                            <TableCell className='w-5'>
                                {post.category}
                            </TableCell>
                        </Table.Row>
                    </TableBody>
                ))}
            </Table>
        </div>
    </div>
    </div>
  )
}

export default DashboardComp
