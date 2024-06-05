import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJobToList } from '../slices/jobsSlice';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(addJobToList({ title, company, description }));
    setTitle('');
    setDescription('');
    setCompany('');
  };

  return (
    <div className="flex items-center justify-center my-5 ">
      <Card
        className="p-10 rounded-lg border-2"
        color="transparent"
        shadow={true}
      >
        <Typography
          className="flex items-center justify-center"
          variant="h4"
          color="blue-gray"
        >
          Add a Job
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleCreate}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Job Title
            </Typography>
            <Input
              size="lg"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Company
            </Typography>
            <Input
              size="lg"
              value={company}
              name="company"
              onChange={(e) => setCompany(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Job Description
            </Typography>
            <Textarea
              size="lg"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write about job"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddJob;
