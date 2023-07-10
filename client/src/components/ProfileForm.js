import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import axios from "axios";
import { gql } from "graphql-tag";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Fetch profile data from the backend API and set it to state
    const query = gql`
      query Profile {
        profile {
          name
          email
          bio
        }
      }
    `;
    axios.get("/api/graphql", {
      params: {
        query,
      },
    }).then((response) => {
      setProfileData(response.data.data.profile);
    });
  }, []);

  const updateProfileData = async (formData) => {
    try {
      const query = gql`
        mutation UpdateProfile($name: String!, $email: String!, $bio: String!) {
          updateProfile(name: $name, email: $email, bio: $bio) {
            name
            email
            bio
          }
        }
      `;
      const response = await axios.post("/api/graphql", {
        params: {
          query,
          variables: {
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
          },
        },
      });
      setProfileData(response.data.data.updateProfile);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <ProfileForm onSubmit={updateProfileData} profileData={profileData} />
    </div>
  );
};

export default ProfilePage;

