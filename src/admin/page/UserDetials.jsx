import React from "react";
import { useParams } from "react-router-dom";
import { useGetUsers } from "../../hooks/useApi";

const UserDetials = () => {
  const { users } = useGetUsers();

  const params = useParams();
  const user = users?.find((x) => x._id === params.id);

  return <div>{user && <>UserDetials /{user.userName}</>}</div>;
};

export default UserDetials;
