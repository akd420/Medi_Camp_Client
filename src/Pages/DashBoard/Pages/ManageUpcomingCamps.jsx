/* eslint-disable react/prop-types */
import { useCallback, useMemo, useState } from "react";
import Loader from "../../../Components/Shared/Loader";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import Loading from "../../../Components/Shared/Loading";
import Heading from "../../../Components/Shared/Heading";
import FilterTable from "../../../Components/Shared/FilterTable";
import ConfirmToast from "../../../Components/Shared/ConfirmToast";
import toast from "react-hot-toast";
import UpdateModal from "../../../Components/UpdateModal";
import { Helmet } from "react-helmet-async";
import ListModal from "../../../Components/ListModal";

const ManageUpcomingCamps = () => {
  const { user, refetch } = useAuth();
  const hostName = user?.displayName;
  const hostEmail = user?.email;
  const upcoming = true;
  const axiosSecure = useAxios();
  const {
    isLoading,
    data: camps,
    refetch: upFetch,
  } = Loader(`upcomingCampsByEmail?email=${user?.email}`, "upcomingByEmail");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowDataForList, setSelectedRowDataForList] = useState(null);
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
      {
        Header: "Target Audience",
        accessor: "targetAudience",
        Cell: ({ value }) => getTargetAudienceDisplayName(value),
      },
      {
        Header: "Interested Participants",
        accessor: "participants",
        width: 50,
      },
      {
        Header: "Interested Professionals",
        accessor: "intProfessionals",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="grid items-center justify-center gap-2">
            <button
              onClick={() => handleList(row.original)}
              className="btn md:btn-sm bg-rose text-white px-2 py-1"
            >
              Interested
            </button>
            <button
              onClick={() => handlePublish(row.original)}
              className={
                row.original.participants > 2 &&
                row.original.intProfessionals > 0
                  ? "btn md:btn-sm bg-rose text-white px-2 py-1"
                  : "hidden"
              }
            >
              Publish
            </button>
            <button
              onClick={() => handleUpdate(row.original)}
              className="btn md:btn-sm bg-rose text-white px-2 py-1"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn md:btn-sm bg-rose text-white px-2 py-1"
            >
              Delete
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
      targetAudience: camp.targetAudience,
      fees: camp.fees,
      time: camp.time,
      description: camp.description,
      imageURL: camp.imageURL,
      participants: camp.participants,
      intProfessionals: camp.intPro,
      professionals: camp.professionals,
      id: camp._id,
      _id: camp._id,
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
    setGlobalFilter,
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageSize: 5 } },
    useGlobalFilter,
    usePagination
  );
  const { pageIndex, pageSize, globalFilter } = state;
  //  actions section

  //   update action done
  const handleUpdate = (rowData) => {
    setSelectedRowData(rowData);
  };
  //   delete action section done
  const handleDelete = (campId) => {
    const confirmToastId = ConfirmToast({
      message: "Are you sure you want to delete this camp?",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => handleDeleteConfirmed(campId, confirmToastId),
      onCancel: () => toast.dismiss(confirmToastId),
    });
  };
  const handleDeleteConfirmed = (campId, confirmToastId) => {
    axiosSecure
      .delete(`/upcomingCamps/${campId}?email=${user?.email}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          upFetch();
          toast.success("Upcoming Camp deleted successfully!");
          setTimeout(() => {
            toast.dismiss(confirmToastId);
          }, 2000);
        }
      });
  };
  const handleList = (rowData) => {
    setSelectedRowDataForList(rowData);
  };
  const handlePublish = (rowData) => {
    if (!rowData?.professionals) {
      toast.error("Need to accept at least one Professional before publishing");
      return;
    }
    const newCamp = {
      ...rowData,
      hostName,
      hostEmail,
    };
    axiosSecure
      .post(`/camps?email=${user?.email}`, newCamp)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          refetch();
          axiosSecure
            .delete(`/upcomingCamps/${rowData.id}?email=${user?.email}`)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                upFetch();
                setTimeout(() => {}, 2000);
              }
            });
          const added = toast.success("Camp Added to available Successfully");
          setTimeout(() => {
            toast.dismiss(added);
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Medicamp | Manage Upcoming Camps</title>
      </Helmet>
      <div className="my-6 overflow-x-auto">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="mx-2">
            {camps?.length > 0 ? (
              <div className="my-12 overflow-x-auto">
                <Heading main={"Manage Upcoming"} sub={"Camps"}></Heading>
                <div className="overflow-x-auto relative">
                  <FilterTable
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  ></FilterTable>
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
                {/* Conditionally render UpdateModal */}

                {selectedRowData && (
                  <UpdateModal
                    upFetch={upFetch}
                    upcoming={upcoming}
                    setSelectedRowData={setSelectedRowData}
                    rowData={selectedRowData}
                    open={true}
                  ></UpdateModal>
                )}
                {/* Conditionally render listModal */}
                {selectedRowDataForList && (
                  <ListModal
                    setSelectedRowDataForList={setSelectedRowDataForList}
                    rowData={selectedRowDataForList}
                    open={true}
                  ></ListModal>
                )}
              </div>
            ) : (
              <Heading main={"No Upcoming"} sub={"Camps"}></Heading>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUpcomingCamps;
