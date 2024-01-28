// Applications.jsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import { JobCard, Loading } from "../components";

const Application = () => {
  const { user } = useSelector((state) => state.user);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getAppliedJobs = async () => {
      setIsFetching(true);

      // try {
      //   const res = await apiRequest({
      //     url: "/userapplications/",
      //     token: user?.token,
      //     method: "GET",

      //   });
      //   console.log(res);
      //   setAppliedJobs(res?.appliedJobs || []);
      //   setIsFetching(false);
      // } catch (error) {
      //   setIsFetching(false);
      //   console.log(error);
      // }
    };

    getAppliedJobs();
  }, [user?._id]);






  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-semibold mb-6">Your Applications</h1>

      {isFetching ? (
        <Loading />
      ) : (
        <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0'>
        <p className='text-gray-500 font-semibold'> Applied jobs </p>

        <div className='w-full flex flex-wrap gap-4'>
          {appliedJobs?.slice(0, 6).map((job, index) => {
              const data = {
                name: job?.company.name,
                logo: job?.company.profileUrl,
                ...job,
              };
              return <JobCard job={data} key={index} />
          })}
        </div>
      </div>
      )}
    </div>
  );
};

export default Application;
