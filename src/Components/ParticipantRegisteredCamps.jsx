/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Loader from "./Shared/Loader";
import { usePagination, useTable } from "react-table";
import Loading from "./Shared/Loading";
import Heading from "./Shared/Heading";
import ConfirmToast from "./Shared/ConfirmToast";
import { axiosSecure } from "../Hooks/useAxios";
import toast from "react-hot-toast";

const ParticipantRegisteredCamps = () => {
  const { user } = useAuth();
  const [camps, setCamps] = useState(null);
  const {
    isLoading,
    data: customData,
    refetch,
  } = Loader(
    `registeredCamp?email=${user?.email}`,
    "registeredCampsForParticipant"
  );
  useEffect(() => {
    refetch().then(() => {
      setCamps(customData?.filter((camp) => camp.email === user.email));
    });
  }, [user, refetch, customData]);
  const columns = useMemo(
    () => [
      { Header: "Camp Name", accessor: "campName" },
      { Header: "Location", accessor: "location" },
      { Header: "Fees", accessor: "fees" },
      {
        Header: "Payment",
        accessor: "payment",
        width: 50,
      },
      {
        Header: "Confirmation",
        accessor: "confirmation",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="grid items-center justify-center gap-2">
            <button
              onClick={() => handlePay(row.original)}
              className="btn btn-sm bg-rose text-white px-2 py-1"
            >
              {row.original.payment === "Unpaid" ? "Pay" : "Paid"}
            </button>
            <button
              onClick={() => handleCancel(row.original)}
              className={
                row.original.payment === "Paid"
                  ? "hidden"
                  : "btn btn-sm bg-rose text-white px-2 py-1"
              }
            >
              Cancel
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const data = useMemo(() => {
    if (!camps) {
      return [];
    }
    return camps.map((camp) => ({
      campName: camp.campName,
      location: camp.location,
      fees: camp.fee,
      payment: camp.payment,
      confirmation: camp.confirmation,
      time: camp.time,
      id: camp._id,
    }));
  }, [camps]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    pageCount,
    prepareRow,
  } = useTable({ columns, data, initialState: { pageSize: 5 } }, usePagination);
  const { pageIndex, pageSize } = state;
  const handlePay = (rowData) => {
    console.log("yes clicked", rowData);
  };
  const handleCancel = (campId) => {
    console.log("Cancel clicked", campId.id);
    const confirmToastId = ConfirmToast({
        message: "Are you sure you want to cancel?",
        onConfirm: () => handleCancelConfirmed(campId.id, confirmToastId),
        onCancel: () => toast.dismiss(confirmToastId),
    })
  };
  const handleCancelConfirmed = (campId, confirmToastId) => {
    console.log("Deleting registration with ID:", campId);
    axiosSecure.delete(`/registeredCamps/${campId}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        refetch();
        toast.success("Registration Cancelled Successfully");
        setTimeout(() => {
          toast.dismiss(confirmToastId);
        }, 2000);
      }
    });
  };
  return (
    <div className="my-6 overflow-x-auto">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="mx-2">
          {camps?.length > 0 ? (
            <div className="my-12 overflow-x-auto">
              <Heading main={"Manage Registered"} sub={"Camps"}></Heading>
              <div className="overflow-x-auto">
                <table
                  {...getTableProps()}
                  className="table table-xs md:table-md overflow-x-auto mt-10"
                >
                  <thead>
                    {headerGroups.map((headerGroup, idx) => (
                      <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, idx) => (
                          <th
                            key={idx}
                            {...column.getHeaderProps({
                              style: { height: "50px", width: "100px" },
                            })}
                            className={
                              column.id === "location"
                                ? "hidden md:table-cell"
                                : ""
                            }
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, idx) => {
                      prepareRow(row);
                      return (
                        <tr key={idx} {...row.getRowProps()}>
                          {row.cells.map((cell, idx) => (
                            <td
                              key={idx}
                              {...cell.getCellProps()}
                              className={
                                cell.column.id === "location"
                                  ? "hidden md:table-cell"
                                  : ""
                              }
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="mt-12 flex flex-col space-y-1 md:flex-row justify-between items-center">
                  <span>
                    Go to Page :{" "}
                    <input
                      type="number"
                      className="w-12 border"
                      defaultValue={pageIndex + 1}
                      onChange={(e) => {
                        const pageNumber = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        gotoPage(pageNumber);
                      }}
                    />
                  </span>
                  <div className="flex flex-col space-y-1 md:flex-row justify-center items-center gap-6">
                    <button
                      className="btn bg-rose text-white"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                      className="text-rose font-bold"
                    >
                      {"<<"}
                    </button>
                    <span>
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{" "}
                    </span>
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                      className="text-rose font-bold"
                    >
                      {">>"}
                    </button>
                    <button
                      className="btn bg-rose text-white"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      Next
                    </button>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-2">
                    <h1>Rows in page</h1>
                    <select
                      className="border"
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      <option value="3">Show 3</option>
                      <option value="5">Show 5</option>
                      <option value="10">Show 10</option>
                      <option value="15">Show 15</option>
                      <option value="20">Show 20</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Heading main={"No Registered Camps"} sub={"Yet"}></Heading>
          )}
        </div>
      )}
    </div>
  );
};

export default ParticipantRegisteredCamps;
