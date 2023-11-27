/* eslint-disable react/prop-types */
import { useMemo, useCallback, useState } from "react";
import { useTable } from "react-table";
import useAuth from "../../../Hooks/useAuth";
import CustomContainer from "../../../Components/Shared/CustomContainer";
import Heading from "../../../Components/Shared/Heading";
import Loading from "../../../Components/Shared/Loading";
import UpdateModal from "../../../Components/UpdateModal";
import toast from "react-hot-toast";
import ConfirmToast from "../../../Components/Shared/ConfirmToast";

const ManageCamps = () => {
  const { user, camps, isLoading } = useAuth();
  const filteredCamps = camps.filter((camp) => camp.hostEmail === user.email);

  const [selectedRowData, setSelectedRowData] = useState(null);

  // Use useCallback for memoizing getTargetAudienceDisplayName
  const getTargetAudienceDisplayName = useCallback((targetAudience) => {
    switch (targetAudience) {
      case "general":
        return "General Health Checkup";
      case "pediatric":
        return "Pediatric Health Camp";
      case "women":
        return "Women's Health Camp";
      case "senior":
        return "Senior Citizens Health Camp";
      case "dental":
        return "Dental Health Camp";
      default:
        return targetAudience;
    }
  }, []);

  // Use useMemo to memoize columns and data
  const columns = useMemo(
    () => [
      { Header: "Camp Name", accessor: "campName" },
      { Header: "Location", accessor: "location" },
      { Header: "Services", accessor: "services" },
      { Header: "Professionals", accessor: "professionals" },
      {
        Header: "Target Audience",
        accessor: "targetAudience",
        Cell: ({ value }) => getTargetAudienceDisplayName(value),
      },
      // Additional columns for update and delete buttons
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleUpdate(row.original)}
              className="btn bg-rose text-white px-2 py-1"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn bg-rose text-white px-2 py-1"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [getTargetAudienceDisplayName]
  );

  const data = useMemo(
    () =>
      filteredCamps.map((camp) => ({
        campName: camp.campName,
        location: camp.location,
        services: camp.services,
        professionals: camp.professionals,
        targetAudience: camp.targetAudience,
        fees: camp.fees,
        time: camp.time,
        description: camp.description,
        imageURL: camp.imageURL,
        id: camp._id, // Assuming you have an identifier for each camp
      })),
    [filteredCamps]
  );

  // Use useBlockLayout for table layout
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Function to handle update button click
  const handleUpdate = (rowData) => {
    setSelectedRowData(rowData);
  };

  // Function to handle delete button click
  const handleDelete = (campId) => {
    // setSelectedRowId(campId);
    // toast tryout
    const confirmToastId = ConfirmToast({
      message: "Are you sure you want to delete this camp?",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => handleDeleteConfirmed(campId),
      onCancel: () => toast.dismiss(confirmToastId),
    });
    // toast(confirmToast, { campId });
  };

  // Function to handle delete confirmation
  const handleDeleteConfirmed = (campId) => {
    // Your logic to delete the camp goes here
    console.log("Deleting camp with ID:", campId);
    // Show a success toast
    toast.success("Camp deleted successfully!");
  };

  return (
    <div className="my-6">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <CustomContainer>
          {filteredCamps.length > 0 ? (
            <div className="my-12">
              <Heading main={"Manage Your"} sub={"Camps"}></Heading>
              <div className="overflow-x-auto">
                <table {...getTableProps()} className="table mt-10">
                  <thead>
                    {headerGroups.map((headerGroup, idx) => (
                      <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, idx) => (
                          <th key={idx} {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
                      prepareRow(row);
                      return (
                        <tr key={idx} {...row.getRowProps()}>
                          {row.cells.map((cell, idx) => (
                            <td key={idx} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Conditionally render UpdateModal */}
              {selectedRowData && (
                <UpdateModal
                  setSelectedRowData={setSelectedRowData}
                  rowData={selectedRowData}
                  open={true}
                ></UpdateModal>
              )}
              {/* Conditionally render DeleteModal */}
            </div>
          ) : (
            <Heading main={"No Camps"} sub={"Yet"}></Heading>
          )}
        </CustomContainer>
      )}
    </div>
  );
};

export default ManageCamps;
