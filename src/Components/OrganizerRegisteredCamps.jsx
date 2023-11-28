/* eslint-disable react/prop-types */
import { useCallback, useMemo } from "react";
import { usePagination, useTable } from "react-table";
import Loader from "./Shared/Loader";
import useAuth from "../Hooks/useAuth";
import Loading from "./Shared/Loading";
import Heading from "./Shared/Heading";
import ConfirmToast from "./Shared/ConfirmToast";
import toast from "react-hot-toast";
import { axiosSecure } from "../Hooks/useAxios";
const OrganizerRegisteredCamps = () => {
  const { user } = useAuth();
  const {
    isLoading,
    data: camps,
    refetch,
  } = Loader(`registeredCamps?email=${user?.email}`, "registeredCampsByEmail");
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
      {
        Header: "Payment Status",
        accessor: "payment",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="grid items-center justify-center gap-2">
            <button
              onClick={() => handleConfirm(row.original)}
              className="btn btn-xs md:btn-sm bg-rose text-white px-2 py-1"
            >
              {row.original.confirmation}
            </button>
            <button
              onClick={() => handleCancel(row.original)}
              className={
                row.original.payment === "Unpaid"
                  ? "hidden"
                  : "btn btn-xs md:btn-sm bg-rose text-white px-2 py-1"
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
      services: camp.services,
      professionals: camp.professionals,
      targetAudience: camp.targetAudience,
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

  const handleConfirm = (rowData) => {
    if (rowData.payment === "Unpaid") {
      return toast.error("Payment is not done yet");
    } else if (rowData.confirmation === "Confirmed") {
      return toast.error("Already Confirmed");
    }
    const confirmToastId = ConfirmToast({
      message: "Are you sure you want to confirm this registration?",
      onConfirm: () => handleConfirmConfirmed(rowData.id, confirmToastId),
      onCancel: () => toast.dismiss(confirmToastId),
    });
  };

  const handleCancel = (campId) => {
    const confirmToastId = ConfirmToast({
      message: "Are you sure you want to cancel this registration?",
      onConfirm: () => handleCancelConfirmed(campId.id, confirmToastId),
      onCancel: () => toast.dismiss(confirmToastId),
    });
  };

  const handleConfirmConfirmed = (campId, confirmToastId) => {
    console.log("Confirming registration with ID:", campId);
    axiosSecure
      .put(`/registeredCamp/${campId}`, {
        confirmation: "Confirmed",
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          refetch();
          toast.success("Registration Confirmed Successfully");
          setTimeout(() => {
            toast.dismiss(confirmToastId);
          }, 2000);
        }
      });
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
        <div className="px-2">
          {camps.length > 0 ? (
            <div className="my-12 overflow-x-auto">
              <Heading main={"Manage Organized"} sub={"Camps"}></Heading>
              <div className="overflow-x-auto relative">
                <table
                  {...getTableProps()}
                  className="table table-xs md:table-md overflow-x-auto mt-10"
                >
                  <thead>
                    {headerGroups.map((headerGroup, idx) => (
                      <tr
                        key={idx}
                        {...headerGroup.getHeaderGroupProps()}
                        className="overflow-x-auto max-w-[50px]"
                      >
                        {headerGroup.headers.map((column, idx) => (
                          <th
                            key={idx}
                            {...column.getHeaderProps()}
                            className={
                              " md:table-cell overflow-x-auto max-w-[50px]"
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
                        <tr
                          key={idx}
                          {...row.getRowProps()}
                          className="max-w-[100px] overflow-x-auto whitespace-nowrap"
                        >
                          {row.cells.map((cell, idx) => (
                            <td
                              key={idx}
                              {...cell.getCellProps()}
                              className={
                                " md:table-cell border text-center max-w-[50px] md:max-w-[100px] overflow-x-auto whitespace-nowrap"
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

export default OrganizerRegisteredCamps;
