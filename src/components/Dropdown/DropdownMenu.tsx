import React, { useState } from 'react';
import { List, ListItem, Checkbox, Typography, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subdepartments: Subdepartment[];
}

interface Subdepartment {
  id: number;
  name: string;
  departmentId: number;
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Department 1',
    subdepartments: [
      { id: 11, name: 'Subdepartment 1.1', departmentId: 1 },
      { id: 12, name: 'Subdepartment 1.2', departmentId: 1 },
      { id: 13, name: 'Subdepartment 1.3', departmentId: 1 },
    ],
  },
  {
    id: 2,
    name: 'Department 2',
    subdepartments: [
      { id: 21, name: 'Subdepartment 2.1', departmentId: 2 },
      { id: 22, name: 'Subdepartment 2.2', departmentId: 2 },
    ],
  },
];

const DepartmentTree: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedSubdepartments, setSelectedSubdepartments] = useState<number[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);

  const selectDepartment = (departmentId: number) => {
    const department = departments.find((dept) => dept.id === departmentId);
    if (department) {
      department.subdepartments.forEach((subdept) => {
        setSelectedSubdepartments((prev) => [...prev, subdept.id]);
      });
      setSelectedDepartments((prev) => [...prev, departmentId]);
    }
  };

  const deselectDepartment = (departmentId: number) => {
    const department = departments.find((dept) => dept.id === departmentId);
    if (department) {
      department.subdepartments.forEach((subdept) => {
        setSelectedSubdepartments((prev) => prev.filter((id) => id!== subdept.id));
      });
      setSelectedDepartments((prev) => prev.filter((id) => id!== departmentId));
    }
  };

  const selectSubdepartment = (subdepartmentId: number) => {
    const subdepartment = departments.flatMap((dept) => dept.subdepartments).find((subdept) => subdept.id === subdepartmentId);
    if (subdepartment) {
      const department = departments.find((dept) => dept.id === subdepartment.departmentId);
      if (department) {
        const allSubdepartmentsSelected = department.subdepartments.every((subdept) => selectedSubdepartments.includes(subdept.id));
        if (allSubdepartmentsSelected) {
          setSelectedDepartments((prev) => [...prev, department.id]);
        }
      }
      setSelectedSubdepartments((prev) => [...prev, subdepartmentId]);
    }
  };

  const deselectSubdepartment = (subdepartmentId: number) => {
    const subdepartment = departments.flatMap((dept) => dept.subdepartments).find((subdept) => subdept.id === subdepartmentId);
    if (subdepartment) {
      const department = departments.find((dept) => dept.id === subdepartment.departmentId);
      if (department) {
        setSelectedDepartments((prev) => prev.filter((id) => id!== department.id));
      }
      setSelectedSubdepartments((prev) => prev.filter((id) => id!== subdepartmentId));
    }
  };

  const handleDepartmentChange = (departmentId: number) => {
    if (selectedDepartments.includes(departmentId)) {
      deselectDepartment(departmentId);
    } else {
      selectDepartment(departmentId);
    }
  };

  const handleSubdepartmentChange = (subdepartmentId: number) => {
    if (selectedSubdepartments.includes(subdepartmentId)) {
      deselectSubdepartment(subdepartmentId);
    } else {
      selectSubdepartment(subdepartmentId);
    }
  };

  const handleExpandDepartment = (departmentId: number) => {
    if (expandedDepartments.includes(departmentId)) {
      setExpandedDepartments((prev) => prev.filter((id) => id!== departmentId));
    } else {
      setExpandedDepartments((prev) => [...prev, departmentId]);
    }
  };

  const renderDepartment = (department: Department) => {
    return (
      <ListItem key={department.id}>
        <Checkbox
          checked={selectedDepartments.includes(department.id)}
          onChange={() => handleDepartmentChange(department.id)}
        />
        <Typography>{department.name}</Typography>
        <ExpandMore onClick={() => handleExpandDepartment(department.id)} />

        {expandedDepartments.includes(department.id) && (
          <Collapse in={expandedDepartments.includes(department.id)}>
            <List>
              {department.subdepartments.map((subdepartment) => (
                <ListItem key={subdepartment.id}>
                  <Checkbox
                    checked={selectedSubdepartments.includes(subdepartment.id)}
                    onChange={() => handleSubdepartmentChange(subdepartment.id)}
                  />
                  <Typography>{subdepartment.name}</Typography>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </ListItem>
    );
  };

  return (
        <List>
          {departments.map((department) => renderDepartment(department))}
        </List>
      );
    };
    
    export default DepartmentTree;