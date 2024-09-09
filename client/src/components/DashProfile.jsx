import { Button, TextInput, Alert } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const {currentUser} = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadingError, setImageFileUploadError] = useState(null);
    //  console.log(imageFileUploadingProgress, imageFileUploadingError);
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        // setImageFile(e.target.files[0]);
        if(file){
            if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
                setImageFileUploadError('Image file must be less than 2 MB');
                return;
            }
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
            setImageFileUploadError(null);
        }
    };
    // console.log(imageFile, imageFileURL)
    useEffect(() => {
        if (imageFile) {
          uploadImage();
        }
        return () => {
            if (imageFileURL) {
                URL.revokeObjectURL(imageFileURL);
            }
        };
    }, [imageFile]);

    const uploadImage = async() => {
        // console.log('uploading image...')
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('could not upload image file. (Image file must be less than 2 mb)'

                );
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileURL(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setImageFileURL(downloadURL);
                });
            }

        );
    };


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>

            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
            {imageFileUploadingProgress && (
                <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                    root:{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                    },
                    path: {
                        stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100 })`,
                    },
                }}
                />
            )}
            <img src={imageFileURL || currentUser.profilePicture} alt="user-profilepic" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${setImageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}/>
            </div>
            {imageFileUploadingError &&
            <Alert color='failure'>
                {imageFileUploadingError}
            </Alert>
            }

            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
            <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} />
            <TextInput type='password' id='password' placeholder='password'/>
            <Button type='submit' gradientDuoTone='pinkToOrange' outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account </span>
            <span className='cursor-pointer'>Sign out</span>
        </div>
    </div>
  )
}

export default DashProfile
