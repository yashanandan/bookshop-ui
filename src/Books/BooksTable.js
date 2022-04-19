import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./BookTable.css";
import { debounce } from "lodash";
import BookModel from "./BookModel";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Book Name",
    disableSorting: true,
  },
  {
    id: "authorName",
    numeric: false,
    disablePadding: true,
    label: "Author Name",
    disableSorting: true,
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
    disableSorting: true,
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "",
    disableSorting: true,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function BooksTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [isErrorOccured, setIsErrorOccured] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("amount");
  const [emptyRows, setEmptyRows] = React.useState(0);
  const [, setSearchBookOrAuthorName] = useState("");
  const [tableRows, setTableRows] = useState(props.books);

  const searchInputRef = useRef();

  useEffect(() => {
    // initialize debounce function to search once user has stopped typing every half second
    searchInputRef.current = debounce(searchFromDB, 500);
    setTableRows(props.books)
  }, [props]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  function handleChange(event) {
    setSearchBookOrAuthorName(event.target.value);
    searchInputRef.current(event.target.value);
  }

  const searchFromDB = async (searchText) => {
    try {
      const response = await BookModel.fetchAll(searchText);
      setIsErrorOccured(false);
      if (!response?.length) {
        setEmptyRows(1);
        return;
      }
      setTableRows(response);
      setEmptyRows(0);
    } catch (error) {
      setIsErrorOccured(true);
      setEmptyRows(1);
    }
  };


  return (
    <div>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={[]}
        onInputChange={handleChange}
        renderInput={(params) => (
          <TextField
            onChange={handleChange}
            {...params}
            label="Search by Book Name / Author Name"
          />
        )}
      />

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={tableRows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {emptyRows === 0 && (stableSort(tableRows, getComparator(order, orderBy))
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell
                          component="th"
                          id={index}
                          scope="row"
                          align="center"
                          padding="none"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell align="center">{row.authorName}</TableCell>
                        <TableCell align="center">
                          {row.price}
                        </TableCell>
                      </TableRow>
                    );
                  }))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={headCells.length} align="center">
                       { isErrorOccured ? 'Error Occurred! Please try again later'  : 'No Record Found'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* To Do once we get the feature */}
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Box>
    </div>
  );
}
