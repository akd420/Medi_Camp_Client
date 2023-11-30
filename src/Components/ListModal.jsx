/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Heading from "./Shared/Heading";
import Loader from "./Shared/Loader";
import ParticipantCard from "./ParticipantCard";
import ProCard from "./ProCard";
import Loading from "./Shared/Loading";

const ListModal = ({ rowData, open, setSelectedRowDataForList }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch} = Loader(
    `/growingList/${rowData.id}?email=${user?.email}`,
    "growingListById"
  );
  const filterParticipant = data?.filter((camp) => camp.role === "participant");
  const filterPro = data?.filter((camp) => camp.role === "professional");
  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowDataForList("");
  };
  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <dialog
          id="my_modal_3"
          className="modal"
          open={isModalOpen}
          onClick={closeModal}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <div className="my-12">
              {/* participant list  */}
              <div>
                {filterParticipant?.length > 0 ? (
                  <>
                    <Heading main={"Participants"} sub={"List"}></Heading>
                    <div>
                      {filterParticipant?.map((camp) => (
                        <ParticipantCard
                          key={camp._id}
                          camp={camp}
                          refetch={refetch}
                        ></ParticipantCard>
                      ))}
                    </div>
                  </>
                ) : (
                  <Heading main={"No Participants"} sub={"Yet"}></Heading>
                )}
              </div>
              {/* professionals list  */}
              <div className="my-12">
                {filterPro?.length > 0 ? (
                  <>
                    <Heading main={"Professionals"} sub={"List"}></Heading>
                    <div>
                      {filterPro?.map((camp) => (
                        <ProCard key={camp._id} camp={camp} refetch={refetch}></ProCard>
                      ))}
                    </div>
                  </>
                ) : (
                  <Heading main={"No Professionals"} sub={"Yet"}></Heading>
                )}
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ListModal;
