import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

const Upload = () => {
  const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const {user} = useUserContext();

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const initValues = {title: '', description: ''};
  const {handleInputChange, handleSubmit, inputs} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function doUpload(inputs: Record<string, string>) {
    if (!file || !user) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    setUploading(true);
    try {
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <h1>Upload</h1>
      {uploading && <p>Uploading...</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width={200}
        />
        <button type="submit" disabled={!(file && inputs.title.length > 3)}>
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
