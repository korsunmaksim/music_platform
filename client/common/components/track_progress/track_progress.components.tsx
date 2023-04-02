import React from "react";

interface ITrackProgressProps {
  left: number;
  right: number;
  onChange: (e: any) => void;
  type: string;
}

export const getMinutes = (seconds: number): string => {
  if (seconds < 10) {
    return `0:0${seconds}`;
  }
  let minutes = Math.floor(seconds / 60);
  let leftSeconds = seconds - minutes * 60;
  if (leftSeconds < 10) {
    return `${minutes}:0${leftSeconds}`;
  }
  return `${minutes}:${leftSeconds}`;
};

export const TrackProgress = ({
  left,
  right,
  onChange,
  type,
}: ITrackProgressProps) => {
  return (
    <div
      style={{
        display: "flex",
        width: `${type === "duration" ? "64%" : "20%"}`,
      }}
    >
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        style={{ width: "85%" }}
      />
      {type === "volume" ? (
        <div>
          {left}/{right}
        </div>
      ) : (
        <div>
          {getMinutes(left)} / {getMinutes(right)}
        </div>
      )}
    </div>
  );
};
