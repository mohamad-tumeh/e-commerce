import React, { useCallback, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CategoryForm from './CategoryForm';
import UnifiedTable from '../UnifiedTable';
import { useCategoryContext } from '../../context/CategoryContext ';

const CategoryList: React.FC = () => {
    const { categories, editCategory, deleteCategory, addCategory } = useCategoryContext();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState<{ id?: string; name: string; image?: string } | null>(null);

    const handleOpenAddDialog = useCallback(() => {
        setDialogData(null);
        setOpenDialog(true);
    }, []);
    
    const handleOpenEditDialog = useCallback((category: { id: string; name: string; image: string }) => {
        setDialogData(category);
        setOpenDialog(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false);
    }, []);

    const handleSubmit = useCallback((category: { id?: string; name: string; image: string }) => {
        if (category.id) {
            editCategory(category.id, { name: category.name, image: category.image });
        } else {
            addCategory({ id: Math.random().toString(), name: category.name, image: category.image });
        }
        handleCloseDialog();
    }, [editCategory, addCategory, handleCloseDialog]);

    const categoryColumns = useMemo(() => [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'image', label: 'Image', render: (row: any) => <img src={row.image} alt={row.name} style={{ width: 50, height: 50 }} /> },
        {
            id: 'actions',
            label: 'Actions',
            render: (row: any) => (
                <>
                    <IconButton color="primary" onClick={() => handleOpenEditDialog(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => deleteCategory(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ], [handleOpenEditDialog, deleteCategory]);
    

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">Categories</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
                Add Category
            </Button>

            <UnifiedTable
                data={categories}
                columns={categoryColumns}
                totalCount={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(event, newPage) => setPage(newPage)}
                onChangeRowsPerPage={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                onRowClick={handleOpenEditDialog}
            />

            <CategoryForm
                open={openDialog}
                onClose={handleCloseDialog}
                onSubmit={handleSubmit}
                initialData={dialogData}
            />
        </Box>
    );
};

export default CategoryList;
