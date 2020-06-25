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
  oepnStatus?: OpenStatus;
  processorCode?: number;
  requestContent?: string;
  title: string;
  username: string;

  constructor(bill: {
    bill_id: number;
    bill_title: string;
    content?: string;
    open_status?: string;
    open_type?: string;
    processor_code?: number;
    request_content?: string;
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
        this.oepnStatus = OpenStatus.existingNoticed;
        break;
      case OpenStatus.existingProcessed:
        this.oepnStatus = OpenStatus.existingProcessed;
        break;
      case OpenStatus.existingProcessing:
        this.oepnStatus = OpenStatus.existingProcessing;
        break;
      case OpenStatus.opened:
        this.oepnStatus = OpenStatus.opened;
        break;
      case OpenStatus.processed:
        this.oepnStatus = OpenStatus.processed;
        break;
      case OpenStatus.processing:
        this.oepnStatus = OpenStatus.processing;
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

    if (bill.request_content) {
      this.requestContent = bill.request_content;
    }
  }
}
