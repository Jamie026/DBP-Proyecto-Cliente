import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({ rows, columns, title }) => {
    return (
        <Box sx={{ height: 470, background: "#f3f3f3", borderRadius: 5, paddingTop: 1 }}>
            <h3 className="subtitulo">
                {title}
            </h3>
            <DataGrid getRowHeight={() => "auto"} sx={{ background: "white", border: "2px solid black", textAlign: "center" }} showColumnVerticalBorder showCellVerticalBorder columnHeaderHeight={70} rows={rows} columns={columns} initialState={{ pagination: { paginationModel: { pageSize: 6 } } }} pageSizeOptions={[6]} />
        </Box>
    );
};