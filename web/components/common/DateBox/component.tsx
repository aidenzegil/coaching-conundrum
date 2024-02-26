import React, { useState } from "react";
import s from "./styles.module.scss";

type DateBoxProps = {
  blockId: string;
  startTime: Date;
  endTime: Date;
  rating?: number;
  notes?: string;
  variant: "booked" | "created" | "available";
  onBook?: () => void;
  onUpdate?: (blockId: string, rating: number, notes: string) => Promise<void>;
  bookerNumber?: string;
  creatorNumber?: string;
};

const ratingButtons = [1, 2, 3, 4, 5];

const DateBox = (props: DateBoxProps) => {
  const { bookerNumber, creatorNumber, variant, blockId } = props;
  const [rating, setRating] = useState<number | undefined>(props.rating);
  const [notes, setNotes] = useState<string | undefined>(props.notes);
  const disableReview = new Date(props.startTime) > new Date();

  return (
    <div className={s[variant]}>
      <span>
        <p>Start time: </p>
        <p>
          {new Date(props.startTime).toDateString()}{" "}
          {new Date(props.startTime).toLocaleTimeString()}
        </p>
      </span>
      <span>
        <p>End time: </p>
        <p>
          {new Date(props.endTime).toDateString()}{" "}
          {new Date(props.endTime).toLocaleTimeString()}
        </p>
      </span>
      {props.variant !== "booked" && bookerNumber && (
        <p>Student's Number: {bookerNumber}</p>
      )}
      {props.variant !== "created" && creatorNumber && (
        <p>Coach's Number: {creatorNumber}</p>
      )}
      {props.variant === "created" && bookerNumber && (
        <>
          <span>
            {ratingButtons.map((n) => (
              <button
                disabled={disableReview}
                className={rating === n && s.selected}
                onClick={() => setRating(n)}
                key={n}
              >
                {n}
              </button>
            ))}
          </span>
          <p>Notes</p>
          <input
            value={notes}
            disabled={disableReview}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            disabled={disableReview}
            onClick={() => props.onUpdate(blockId, rating, notes)}
          >
            Update
          </button>
        </>
      )}
      {props.variant === "available" && (
        <button onClick={props.onBook}>Book</button>
      )}
    </div>
  );
};

export default DateBox;
