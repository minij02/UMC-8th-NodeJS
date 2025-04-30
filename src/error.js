export class CustomError extends Error {
    constructor({ errorCode = "unknown", reason, data = null, statusCode = 400 }) {
      super(reason);
      this.errorCode = errorCode;
      this.reason = reason;
      this.data = data;
      this.statusCode = statusCode;
    }
  }
  
  export class AlreadyChallengedError extends CustomError {
    constructor(data) {
      super({
        errorCode: "M001",
        reason: "이미 도전 중인 미션입니다.",
        data,
        statusCode: 400,
      });
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(entity = "요청한 항목") {
      super({
        errorCode: "N404",
        reason: `${entity}을(를) 찾을 수 없습니다.`,
        statusCode: 404,
      });
    }
  }  