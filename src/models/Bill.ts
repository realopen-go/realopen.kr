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
  processorCode?: number;
  processorName?: string;
  processorDepartmentName?: string;
  requestContent?: string;
  requestDate?: string;
  title: string;
  username: string;

  constructor(bill: {
    bill_id: number;
    bill_title: string;
    content?: string;
    open_status?: string;
    open_type?: string;
    processor_code?: number;
    processor_name?: string;
    processor_department_name?: string;
    request_content?: string;
    request_date: string;
    user_id: string;
  }) {
    this.id = bill.bill_id;
    this.title = bill.bill_title;
    this.username = bill.user_id;

    switch (bill.open_type) {
      case OpenType.electronic:
        this.openType = OpenType.electronic;
        break;
      default:
        break;
    }

    switch (bill.open_status) {
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

    if (bill.content) {
      this.content = bill.content;
    }

    if (bill.processor_code) {
      this.processorCode = bill.processor_code;
    }

    if (bill.processor_department_name) {
      this.processorDepartmentName = bill.processor_department_name;
    }

    if (bill.processor_name) {
      this.processorName = bill.processor_name;
    }

    if (bill.request_content) {
      this.requestContent = bill.request_content;
    }

    this.requestDate = bill.request_date;
  }
}
