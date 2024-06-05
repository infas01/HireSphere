import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from '@material-tailwind/react';
import { useState } from 'react';
import UpdateJob from './UpdateJob';
import { useDispatch, useSelector } from 'react-redux';
import { removeJobFromList, setSelectedJob } from '../slices/jobsSlice';

const TABLE_HEAD = ['#', 'Job Title', 'Company', 'Description', 'Actions'];

const JobList = () => {
  const [open, setOpen] = useState(false);
  const { jobsList } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const closeUpdate = () => {
    setOpen(false);
  };

  const updateJob = (job) => {
    //console.log('Update the Job');
    setOpen(true);
    dispatch(setSelectedJob(job));
  };

  const deleteJob = (job) => {
    // console.log('Delete the Job');
    dispatch(removeJobFromList(job))
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Jobs
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {`Currently ${jobsList.length} job(s) available`}
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{' '}
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobsList &&
                jobsList.map((job, index) => {
                  const isLast = index === jobsList.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {job.title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {job.company}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job.description}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Update Job">
                          <IconButton
                            variant="text"
                            onClick={() => updateJob(job)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Job">
                          <IconButton
                            variant="text"
                            onClick={() => deleteJob(job)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}

              {jobsList.length === 0 && (
                <tr>
                  <div>No Jobs Available</div>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
      {open && <UpdateJob onClose={closeUpdate} />}
    </>
  );
};

export default JobList;
