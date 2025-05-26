import styled from 'styled-components';

const InputField = styled.input`
height:100px; 
width: 100%;
  padding: 8px;
  margin: 4px 0;
  border-radius: 4px;
  border:none;
  border-bottom: 1px solid #ddd;
  &:focus {
    outline: none;
    border-color: #4b9cd3;
  }
  &.error {
    border-color: red;
    animation: shake 0.3s ease-in-out;
  }
`;

export default InputField;