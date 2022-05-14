export interface iTimeSlot {
  activityName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  numMaxGuests: number;
  id: number;
}

export function uniqueID(): number {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(16)
      .toString()
      .replace(".", "")
  );
}
