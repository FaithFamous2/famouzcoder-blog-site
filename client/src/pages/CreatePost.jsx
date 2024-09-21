import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import 'highlight.js/styles/github.css'; // Import the highlight.js styles
import hljs from 'highlight.js'; // Import highlight.js

hljs.configure({
    languages: ['javascript', 'html', 'css', 'python'], // Add languages as needed
  });

function CreatePost() {
    const [file, setFile] = useState(null);
    const [ imageUploadProgress, setImageUploadProgress] = useState(null);
    const [publishError, setPublishError] = useState(null);
    const[ImageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({content: ''});
    const navigate = useNavigate()

    const modules = {
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,  // Syntax highlighting
        },
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ script: 'sub' }, { script: 'super' }],
          ['code-block'],  // Add the code block option
          ['link', 'image'],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
        ],
      };

      const formats = [
        'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'strike',
        'code-block', 'link', 'image', 'align', 'color', 'background',
      ];

    // console.log(formData)
    const handleUploadImage = async () => {
        try {
            if(!file){
                setImageUploadError('Please select an Image')
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData, image:downloadURL});
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload Failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }
const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await fetch('api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
        });
        const data = await res.json();
        if(!res.ok){
            setPublishError(data.message)
            return
        }
        // if(data.success == false){
        //     setPublishError(data.message)
        //     return;
        // }
        if(res.ok){
            setPublishError(null)
            navigate(`/post/${data.slug}`)
        }

    } catch (error) {
        // console.log(error);
        setPublishError('Something went wrong');
    }
};


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'> Create a post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setFormData({...formData, title:e.target.value})}/>
                <Select onChange={(e) => setFormData({...formData, category:e.target.value})}>
                    <option value="uncategorized">Selet a category</option>
                    <option value='reactjs'>React.js</option>
                    <option value='nextjs'>Next.js</option>
                    <option value='javascript'>javascript</option>
                    <option value='php'>PHP</option>
                    <option value='python'>Python</option>
                    <option value='nodejs'>Node.js</option>
                    <option value='django'>Django</option>
                    <option value='flask'>flask</option>
                    <option value='ruby'>Ruby</option>
                    <option value='rust'>Rust</option>
                    <option value='r'>R</option>
                </Select>

            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
                <Button type='button' gradientDuoTone='pinkToOrange' size='sm' outline onClick={handleUploadImage}
                disabled={imageUploadProgress}>
                    {
                        imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar
                            value={imageUploadProgress}
                            text={`${imageUploadProgress || 0} %`}
                             />
                        </div>

                    ) : (
                        'Upload Image'
                    )

                    }
                </Button>
            </div>
            {
                ImageUploadError && (
                    <Alert color='failure'>
                        {ImageUploadError}
                    </Alert>)}
                    {formData.image && (
                        <img src={formData.image} alt='upload' className='w-full h-72 object-cover border border-teal-400' />
                    )}

                <ReactQuill theme='snow' modules={modules} formats={formats} placeholder='write something....' className='h-72 mb-12' required onChange={(value) => {
                    setFormData({...formData, content: value});
                }} />
            <Button type='submit' gradientDuoTone='pinkToOrange'>Publish</Button>
            {
                publishError && (
                    <Alert className='mt-5' color='failure'>
                        {publishError}
                    </Alert>
                )
            }

        </form>
    </div>
  )
}

export default CreatePost
