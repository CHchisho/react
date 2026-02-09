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

  const inputClasses =
    'w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50';
  const labelClasses = 'block mb-2 text-text-muted font-medium';
  const buttonClasses =
    'rounded-lg border border-accent py-2 px-4 font-medium font-[inherit] bg-transparent text-accent cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-text-primary focus:outline-2 focus:outline-accent-hover focus:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <>
      <h1 className="text-text-primary">Upload</h1>
      {uploading && <p className="text-text-muted">Uploading...</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-bg-secondary p-8 rounded-lg max-w-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-8"
      >
        <div className="mb-4">
          <label htmlFor="title" className={labelClasses}>
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className={labelClasses}>
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className={labelClasses}>
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-accent file:bg-transparent file:text-accent file:font-medium file:cursor-pointer hover:file:bg-accent hover:file:text-text-primary"
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
          className="rounded border-2 border-border my-2"
        />
        <button
          type="submit"
          disabled={!(file && inputs.title.length > 3)}
          className={buttonClasses}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
