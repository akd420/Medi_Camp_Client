/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Shared/Loader";
import Loading from "../../../Components/Shared/Loading";
import Heading from "../../../Components/Shared/Heading";
import ReviewModal from "../../../Components/ReviewModal";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import FilterTable from "../../../Components/Shared/FilterTable";
const Feedback = () => {
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
      setCamps(
        customData?.filter(
          (camp) =>
            camp.email === user.email && camp.confirmation === "Confirmed"
        )
      );
    });
  }, [user, refetch, customData]);

  const [selectedRowData, setSelectedRowData] = useState(null);

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
              onClick={() => handleReview(row.original)}
              className="btn btn-xs md:btn-sm bg-rose text-white px-2 py-1"
            >
              Review
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
      txId: camp.txId,
      id: camp._id,
      review: camp.review,
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
  const handleReview = (row) => {
    if (row?.review) {
      toast.error("You have already reviewed this camp");
      return;
    }
    setSelectedRowData(row);
  };

  return (
    <>
      <Helmet>
        <title>Medicamp | Feedback</title>
      </Helmet>
      <div className="my-6 overflow-x-auto">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="mx-2">
            {camps?.length > 0 ? (
              <div className="my-12 overflow-x-auto">
                <Heading main={"Completed"} sub={"Camps"}></Heading>
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
                              className="overflow-x-auto max-w-[50px]"
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
                                className="border text-center max-w-[50px] md:max-w-[100px] overflow-x-auto whitespace-nowrap"
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
                {/* Conditionally render ReviewModal */}
                {selectedRowData && (
                  <ReviewModal
                    setSelectedRowData={setSelectedRowData}
                    rowData={selectedRowData}
                    open={true}
                    refetch={refetch}
                  ></ReviewModal>
                )}
              </div>
            ) : (
              <Heading main={"No Camps Completed"} sub={"Yet"}></Heading>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Feedback;
