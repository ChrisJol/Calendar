export interface iTimeSlot {
  activityName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  numMaxGuests: number;
  id: number;
  overlapId: number;
  position: number;
}

export function uniqueID(): number {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(16)
      .toString()
      .replace(".", "")
  );
}

export function setPositions(timeslots: Array<iTimeSlot>): void {
  timeslots.map((timeslot, index) => {
    timeslot.position = index;
  });
}
