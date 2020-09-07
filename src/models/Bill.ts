enum OpenStatus {
  existingNoticed = "정보부존재통지완료",
  existingProcessed = "정보부존재결재완료",
  existingProcessing = "정보부존재결재중",
  opened = "공개완료",
  processing = "처리중",
  processed = "결재완료",
}

enum OpenType {
  electronic = "전자파일",
}

export default class Bill {
  content?: string;
  id: number;
  openType?: OpenType;
  openStatus?: OpenStatus;
  processorCode?: string;
  processorName?: string;
  processorDepartmentName?: string;
  requestDescription?: string;
  requestDate?: string;
  title: string;
  username: string;

  constructor(bill: {
    id: number;
    request_subject: string;
    request_description?: string;
    result_description?: string;
    status?: string;
    // open_type?: string;
    request_proc_registration_number?: number;
    registration_number?: string;
    proc_org_code?: string;
    proc_org_name?: string;
    proc_registration_number?: string;
    request_date: string;
    user_id: string;
  }) {
    this.id = bill.id;
    this.title = bill.request_subject;
    this.username = bill.user_id;

    // switch (bill.open_type) {
    //   case OpenType.electronic:
    //     this.openType = OpenType.electronic;
    //     break;
    //   default:
    //     break;
    // }

    switch (bill.status) {
      case OpenStatus.existingNoticed:
        this.openStatus = OpenStatus.existingNoticed;
        break;
      case OpenStatus.existingProcessed:
        this.openStatus = OpenStatus.existingProcessed;
        break;
      case OpenStatus.existingProcessing:
        this.openStatus = OpenStatus.existingProcessing;
        break;
      case OpenStatus.opened:
        this.openStatus = OpenStatus.opened;
        break;
      case OpenStatus.processed:
        this.openStatus = OpenStatus.processed;
        break;
      case OpenStatus.processing:
        this.openStatus = OpenStatus.processing;
        break;
      default:
        break;
    }

    if (bill.result_description) {
      this.content = bill.result_description;
    }

    if (bill.proc_org_code) {
      this.processorCode = bill.proc_org_code;
    }

    if (bill.proc_org_name) {
      this.processorDepartmentName = bill.proc_org_name;
    }

    if (bill.request_description) {
      this.requestDescription = bill.request_description;
    }

    this.requestDate = bill.request_date;
  }
}
