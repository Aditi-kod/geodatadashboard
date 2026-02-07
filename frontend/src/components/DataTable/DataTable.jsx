import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import { Box, MenuItem, Select } from "@mui/material";

const DataTable = ({
                       rows = [],
                       loading = false,
                       selectedId = null,
                       onSelect = () => {},
                       filters = {},
                       setFilters = () => {},
                   }) => {
    return (
        <div style={{ height: "100%", width: "100%" }}>
            {/* Filter */}
            <Box p={1}>
                <Select
                    size="small"
                    value={filters.status || ""}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                    displayEmpty
                >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
            </Box>

            {/* Table */}
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSize={25}
                rowsPerPageOptions={[25, 50, 100]}
                onRowClick={(params) => onSelect(params.id)}
                getRowClassName={(params) =>
                    params.id === selectedId ? "selected-row" : ""
                }
            />

        </div>
    );
};
export default DataTable;
