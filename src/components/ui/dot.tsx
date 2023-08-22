export enum Status {
  TODO = "To-do",
  INPROGRESS = "In progress",
  DONE = "Done",
}

interface DotProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status;
}

export default function Dot({ status }: DotProps) {
  return (
    <div
      className={`w-2 h-2 rounded-full ${
        status === Status.TODO
          ? " bg-red-500"
          : status === Status.INPROGRESS
          ? "bg-yellow-500"
          : "bg-green-500"
      }`}
    />
  );
}
