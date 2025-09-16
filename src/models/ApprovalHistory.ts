export interface ApprovalHistory {
  id: string;
  fromStatus: string;
  toStatus: string;
  approvedBy: number;
  requestId: string;
}
