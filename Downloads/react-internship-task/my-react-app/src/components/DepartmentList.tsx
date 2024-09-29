import  { useState } from 'react';
import { Box, List, ListItem, ListItemText, Checkbox, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departmentData = [
  {
    department: 'Engineering',
    subDepartments: ['Frontend', 'Backend', 'DevOps']
  },
  {
    department: 'HR',
    subDepartments: ['Recruitment', 'Employee Relations']
  },
  {
    department: 'Sales',
    subDepartments: ['Domestic', 'International']
  }
];

const DepartmentList = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggleExpand = (department: string) => {
    setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelectDepartment = (department: string) => {
    const allSelected = !selected[department];
    setSelected(prev => {
      const newSelected = { ...prev, [department]: allSelected };
      departmentData.find(dep => dep.department === department)?.subDepartments.forEach(sub => {
        newSelected[sub] = allSelected;
      });
      return newSelected;
    });
  };

  const handleSelectSubDepartment = (department: string, subDepartment: string) => {
    const allSelected = !selected[subDepartment];
    setSelected(prev => {
      const newSelected = { ...prev, [subDepartment]: allSelected };
      const subDepartments = departmentData.find(dep => dep.department === department)?.subDepartments;
      const allSubDepartmentsSelected = subDepartments?.every(sub => newSelected[sub]);
      if (allSubDepartmentsSelected) {
        newSelected[department] = true;
      } else {
        newSelected[department] = false;
      }
      return newSelected;
    });
  };

  return (
    <Box mt={3}>
      <List>
        {departmentData.map((dept) => (
          <div key={dept.department}>
            <ListItem>
              <Checkbox
                checked={selected[dept.department] || false}
                onChange={() => handleSelectDepartment(dept.department)}
              />
              <ListItemText primary={dept.department} />
              <IconButton onClick={() => handleToggleExpand(dept.department)}>
                {expanded[dept.department] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={expanded[dept.department]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dept.subDepartments.map((sub) => (
                  <ListItem key={sub} sx={{ pl: 4 }}>
                    <Checkbox
                      checked={selected[sub] || false}
                      onChange={() => handleSelectSubDepartment(dept.department, sub)}
                    />
                    <ListItemText primary={sub} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;
