import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobInList } from '../slices/jobsSlice';

const UpdateJob = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [id, setId] = useState(0);
  const { selectedJob } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedJob).length !== 0) {
      setTitle(selectedJob.title);
      setCompany(selectedJob.company);
      setDescription(selectedJob.description);
      setId(selectedJob.id);
    }
  }, [selectedJob]);

  const handleUpdate = () => {
    dispatch(updateJobInList({ id, title, company, description }));
    onClose();
  };
  return (
    <Dialog
      open
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Update Job</DialogHeader>
      <DialogBody>
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
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={(e) => handleUpdate(e)}
        >
          <span>Done</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateJob;
