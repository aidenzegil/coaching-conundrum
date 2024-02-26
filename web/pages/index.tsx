import React, { useState } from "react";
import { useUserContext } from "../components/providers/userProvider/provider";
import { useBlocksContext } from "../components/providers/blocksProvider/provider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import s from "./index.module.scss";
import DateBox from "../components/common/DateBox/component";
import { Button } from "@mui/material";
import { UserType } from "../common/types/user";

const Home: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const { user } = useUserContext();
  const { blockFunctions, state } = useBlocksContext();
  return (
    <div>
      <h1>Coaching Conundrum</h1>
      <p>Current view: {user?.userType}</p>
      {user?.userType === UserType.COACH && (
        <>
          <h2>Open up availability</h2>

          <DateTimePicker
            value={dayjs(startDate)}
            onChange={(newValue) => setStartDate(newValue.toDate())}
          />
          <Button
            onClick={() =>
              blockFunctions.createBlock(startDate as Date, user.id)
            }
          >
            Create Block
          </Button>
          {state.createdBlocks.length ? <h2>Current availability</h2> : null}
          {state.createdBlocks.map((block) => (
            <DateBox
              key={block.id}
              startTime={block.startTime}
              endTime={block.endTime}
              variant="created"
              rating={block.rating}
              notes={block.notes}
              onUpdate={blockFunctions.updateBlock}
              blockId={block.id}
              creatorNumber={block.creatingUserNumber}
              bookerNumber={block.bookingUserNumber}
            />
          ))}
        </>
      )}
      {state.bookedBlocks.length ? <h2>Booked availability</h2> : null}
      {state.bookedBlocks.map((block) => (
        <DateBox
          blockId={block.id}
          key={block.id}
          startTime={block.startTime}
          endTime={block.endTime}
          variant="booked"
          bookerNumber={block.bookingUserNumber}
          creatorNumber={block.creatingUserNumber}
        />
      ))}
      {user?.userType === UserType.STUDENT && state.openBlocks.length ? (
        <>
          <h2>Available blocks</h2>
          {state.openBlocks.map((block) => (
            <DateBox
              blockId={block.id}
              key={block.id}
              startTime={block.startTime}
              endTime={block.endTime}
              variant="available"
              onBook={() => blockFunctions.bookBlock(block.id, user.id)}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default Home;
