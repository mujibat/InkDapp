import React from "react";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";

const UserPost = ({ userpost }) => {
    return (
      <div>
        <Link to={userpost.post}>
            </Link>
      </div>  
    )
}