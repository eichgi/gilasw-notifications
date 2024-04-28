export interface Log {
  time: string;
  msg: string;
}

export interface LogResponse {
  message: string;
  logs: Log[];
}