import React from "react";
import { Form, Button } from "react-bootstrap";

const ProfileForm = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Control type="text" placeholder="Name" />
    <Form.Control type="email" placeholder="Email" />
    <Form.Control as="textarea" placeholder="Bio" />
    <Button type="submit">Save</Button>
  </Form>
);

export default ProfileForm;

