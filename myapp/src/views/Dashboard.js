import React from "react";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const Dashboard = (props) => {
  const columns = [
    {
      label: "#",
      field: "id",
      sort: "asc",
    },
    {
      label: "First",
      field: "first",
      sort: "asc",
    },
    {
      label: "Last",
      field: "last",
      sort: "asc",
    },
    {
      label: "Handle",
      field: "handle",
      sort: "asc",
    },
    {
      label: "Actions",
      field: "action",
      sort: "asc",
    },
  ];

  const rows_regular_btn = [
    {
      id: 1,
      first: "Man",
      last: "Otto",
      handle: "@mdo",
      action: (
        <MDBBtn color="purple" size="sm">
          Button
        </MDBBtn>
      ),
    },
    {
      id: 2,
      first: "Jacob",
      last: "Last",
      handle: "@fat",
      action: (
        <MDBBtn color="purple" size="sm">
          Button
        </MDBBtn>
      ),
    },
    {
      id: 3,
      first: "Larry",
      last: "the Bird",
      handle: "@bird",
      action: (
        <MDBBtn color="purple" size="sm">
          Button
        </MDBBtn>
      ),
    },
  ];

  return (
    <MDBTable btn fixed bordered>
      <MDBTableHead color="light" textWhite columns={columns} />
      <MDBTableBody rows={rows_regular_btn} />
    </MDBTable>
  );
};

export default Dashboard;
