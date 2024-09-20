import { Button, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

function Search(){
    const [sidebarData, setSideBarData] = useState({
        searchTerm:  '',
        sort: 'desc',
        category: 'uncategorised',
    });
    console.log(sidebarData);
    const [ posts, setPosts] = useState([])
    const [ loading, setLoading] = useState(false);
    const [ showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();



    useEffect (() => {
        const urlParams  = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
                setSideBarData({
                    ...sidebarData,
                    searchTerm: searchTermFromUrl,
                    sort: sortFromUrl,
                    category: categoryFromUrl,
                });
        }
        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if(!res.ok){
                setLoading(false);
                return;
                // console.log(error.message)
            }
            if(res.ok){
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length === 9){
                    setShowMore(true);
                }
                else{
                    setShowMore(false);
                }
            }
        };
        fetchPosts();
    }, [location.search])

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm') {
            setSideBarData({
                ...sidebarData, searchTerm:e.target.value
            });
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSideBarData({
                ...sidebarData, sort:order
            });
        }
        if(e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSideBarData({
                ...sidebarData, category
            });
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString();
        const res= await fetch (`api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if(data.posts.length === 0){
                setShowMore(true);
            }
            else{
                setShowMore(false)
            }
        }

    }




    // if (loading) return (
    //     <div className='flex justify-center item-center min-h-screen'>
    //         <Spinner size='xl' />
    //     </div>
    // );

  return (
    <div className='flex flex-col md:flex-row'>

    <div className='p-7 border-b md:border-r md: min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='flex items-center gar-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term</label>
                <TextInput placeholder='Search....' id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange}/>

            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort: </label>
                <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                    <option value='desc'>Latest</option>
                    <option value='asc'>Oldest</option>
                </Select>
            </div>

            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Category: </label>
                <Select onChange={handleChange} value={sidebarData.category} id='category'>
                    <option value='uncategorized'>Uncategorized</option>
                    <option value='reactjs'>React.js</option>
                    <option value='nextjs'>Next.js</option>
                    <option value='javascript'>javascript</option>
                    <option value='php'>PHP</option>
                    <option value='python'>Python</option>
                    <option value='nodejs'>Node js</option>
                    <option value='django'>Django</option>
                    <option value='flask'>flask</option>
                    <option value='ruby'>Ruby</option>
                    <option value='rust'>Rust</option>
                    <option value='r'>R</option>
                </Select>

            </div>
            <Button type='submit' outline gradientDuoTone='pinkToOrange'>
                Apply filters
            </Button>
        </form>
    </div>
    <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'> Posts results:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
            {
                !loading && posts.length == 0 && (<p className='text-xl text-gray-500'>
                    No post found.
                </p>
            )}
            {
                loading && (
                    <div className='flex justify-center item-center min-h-screen'>
                    <Spinner size='xl' />
                </div>
                )
            }
            {
                !loading && posts && posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))
            }
            {
                showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>
                    Show more
                </button>
            }
        </div>
    </div>
    </div>
  )
}

export default Search
