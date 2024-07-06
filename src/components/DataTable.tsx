import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Paper, Box, Typography, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/system';

interface ApodData {
  id: string;
  title: string;
  date: string;
  explanation: string;
  url: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const BackgroundVideoContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  '& iframe': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const ContentContainer = styled(Box)({
  position: 'relative',
  zIndex: 1,
  padding: '40px 20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  animation: `${fadeIn} 1.5s ease-out`,
});

const TransparentPaper = styled(Paper)({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(10px)',
  padding: '30px',
  borderRadius: '20px',
  width: '95%',
  maxWidth: '1400px',
  height: 'auto',
  maxHeight: '85vh',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
    transform: 'translateY(-5px)',
  },
});

const StyledHeader = styled(Typography)({
  color: '#ffffff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  marginBottom: '30px',
  fontWeight: 'bold',
  animation: `${floatAnimation} 3s ease-in-out infinite`,
});

const DataTable: React.FC = () => {
  const [apodData, setApodData] = useState<ApodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?count=10&api_key=CbhdFVbKOW30j7kndK3052VUyhYFbvDVTHuacWqO');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((item: any, index: number) => ({
          id: index.toString(),
          title: item.title,
          date: item.date,
          explanation: item.explanation,
          url: item.url,
        }));
        setApodData(formattedData);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'explanation', headerName: 'Explanation', width: 600 },
    {
      field: 'url',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <Avatar variant="square" src={params.value as string} sx={{ width: 120, height: 90 }} />
      ),
    },
  ];

  return (
    <>
      <BackgroundVideoContainer>
        <iframe
          src="https://www.youtube.com/embed/Ovzx0F9es-g?autoplay=1&mute=1&loop=1&playlist=Ovzx0F9es-g"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Video"
        ></iframe>
      </BackgroundVideoContainer>
      <ContentContainer>
        <StyledHeader variant="h2">Explore Our Dynamic Data Hub</StyledHeader>
        <TransparentPaper elevation={3}>
          
          <DataGrid

            rows={apodData}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            loading={loading}
            checkboxSelection
            disableColumnMenu
            sx={{

              border: 'none',
              '& .MuiDataGrid-root': {
                borderRadius: '20px',
                overflow: 'hidden',
              },
              '& .MuiDataGrid-main': {
                overflow: 'hidden',
              },
              '& .MuiDataGrid-virtualScroller': {
                overflow: 'auto',
              },
              '& .MuiCheckbox-root': {
                color: 'rgba(255, 255, 255, 0.7)', // Black with 70% opacity
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Optional: change hover effect
                },
              },
              '& .MuiCheckbox-root.Mui-checked': {
                color: 'black', // Solid black when checked
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '16px',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'transparent',
                color: '#black',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              },
              '& .MuiDataGrid-columnHeader': {
                padding: '16px',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-iconButtonContainer': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-sortIcon': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-row': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'transparent',
                color: '#ffffff',
              },
              '& .MuiTablePagination-root': {
                color: '#ffffff',
              },
              '& .MuiTablePagination-selectIcon': {
                color: 'black',
              },
              '& .MuiTablePagination-actions': {
                color: 'black',
              },
            }}
          />
        </TransparentPaper>
      </ContentContainer>
    </>
  );
};

export default DataTable;