import React from "react";
import PropTypes from "prop-types";

const API_ENDPOINT = "http://localhost:3001";

const ProfileAvatar = ({ avatarBlob, avatarPath }) => {
  let avatarImage = null;

  if (avatarBlob) {
    // if `avatarBlob` (i.e. inputting a new file) create url from blob
    avatarImage = (
      <img
        className="profileAvatar"
        src={window.URL.createObjectURL(avatarBlob)}
        alt="Current user's avatar"
      />
    );
  } else if (avatarPath) {
    // else if user has `avatarPath` use that to preview stored image from backend API
    avatarImage = (
      <img
        className="profileAvatar"
        src={`${API_ENDPOINT}${avatarPath}`}
        alt="Current user's avatar"
      />
    );
  }
  // else render nothing
  return <div style={{ textAlign: "center" }}>{avatarImage}</div>;
};

ProfileAvatar.propTypes = {
  avatarBlob: PropTypes.object,
  avatarPath: PropTypes.string
};

export default ProfileAvatar;
