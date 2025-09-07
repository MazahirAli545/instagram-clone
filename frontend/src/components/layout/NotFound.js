import React from "react";
import styled from "styled-components";

function NotFound() {
  return (
    <Container>
      <span>
        go on to other version to access this feature:{" "}
        <a href="https://social-by-azam-ali.onrender.com" target="_blank">
          https://social-by-azam.onrender.com
        </a>
      </span>
      <span>Loading might take couple of minutes to load for the first time</span>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  text-align: center;
  span {
    margin: auto;
    font-weight: 500;
  }
`;
