import React, { useState } from 'react';
import { List, ListItemText, Checkbox, Collapse, ListItemButton, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledListItemButton = styled(ListItemButton)({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
  },
  animation: `${fadeIn} 1s ease-in-out`,
});

const DepartmentListContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  animation: `${fadeIn} 1.5s ease-in-out`,
  marginTop: '20px',
  width: '100%',
});

const departmentData = [
  {
    name: 'NASA Missions',
    count: 5,
    subDepartments: [
      { name: 'Apollo' },
      { name: 'Artemis' },
      { name: 'Voyager' },
      { name: 'Hubble Space Telescope' },
      { name: 'Mars Rover' }
    ]
  },
  {
    name: 'Astronomy Topics',
    count: 5,
    subDepartments: [
      { name: 'Black Holes' },
      { name: 'Exoplanets' },
      { name: 'Galaxies' },
      { name: 'Nebulae' },
      { name: 'Stars' }
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleExpand = (dept: string) => {
    setExpanded(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  const handleSelect = (dept: string, subDept?: string) => {
    if (subDept) {
      setSelected(prev => ({
        ...prev,
        [`${dept}-${subDept}`]: !prev[`${dept}-${subDept}`]
      }));
    } else {
      const isSelected = !selected[dept];
      setSelected(prev => ({
        ...prev,
        [dept]: isSelected,
        ...Object.fromEntries(
          departmentData
            .find(d => d.name === dept)?.subDepartments.map(sd => [`${dept}-${sd.name}`, isSelected]) || []
        )
      }));
    }
  };

  return (
    <DepartmentListContainer>
      <List>
        {departmentData.map(department => (
          <React.Fragment key={department.name}>
            <StyledListItemButton onClick={() => handleExpand(department.name)}>
              <Checkbox
                checked={selected[department.name] || department.subDepartments.every(sd => selected[`${department.name}-${sd.name}`])}
                onChange={() => handleSelect(department.name)}
                sx={{ color: 'white' }}
              />
              <ListItemText
                primary={
                  <span style={{ color: 'white' }}>
                    {department.name} <span style={{ color: 'white' }}>({department.count})</span>
                  </span>
                }
              />
              {expanded[department.name] ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </StyledListItemButton>
            <Collapse in={expanded[department.name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.subDepartments.map(subDepartment => (
                  <StyledListItemButton key={subDepartment.name} sx={{ pl: 4 }}>
                    <Checkbox
                      checked={selected[`${department.name}-${subDepartment.name}`]}
                      onChange={() => handleSelect(department.name, subDepartment.name)}
                      sx={{ color: 'white' }}
                    />
                    <ListItemText primary={subDepartment.name} sx={{ color: 'white' }} />
                  </StyledListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </DepartmentListContainer>
  );
};

export default DepartmentList;
