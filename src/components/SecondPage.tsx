import React from 'react';
import { Container } from '@mui/material';
import DataTable from './DataTable';
import DepartmentList from './DepartmentList';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  marginTop: '20px',
  animation: 'fadeIn 1s ease-in-out',
});

const SecondPage: React.FC = () => {
  return (
    <StyledContainer maxWidth="lg">
      <DataTable />
      <DepartmentList />
    </StyledContainer>
  );
};

export default SecondPage;
