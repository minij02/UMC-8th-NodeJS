import { validateSignUpDto } from "../dtos/user.dto.js";
import * as userService from "../services/user.service.js";

export const register = async (req, res, next) => {
   /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: { type: "string", example: "홍길동" },
              email: { type: "string", example: "hong@example.com" },
              gender: { type: "string", enum: ["MALE", "FEMALE", "OTHER"], example: "MALE" },
              birth_date: { type: "string", format: "date", example: "1995-04-01" }
            },
            required: ["username", "email", "gender", "birth_date"]
          }
        }
      }
    };
    #swagger.responses[200] = {
  description: "회원 정보 갱신 성공 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          memberId: { type: "number" },
          message: { type: "string", example: "회원 정보 갱신" }
        }
      }
    }
  }
};
    #swagger.responses[201] = {
      description: "회원가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId: { type: "number", example: 123 },
              message: { type: "string", example: "회원가입 성공" }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "입력값 검증 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "모든 필드는 필수입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "INTERNAL_ERROR" },
                  reason: { type: "string", example: "예상치 못한 오류가 발생했습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    };
  */
  try {
    const userData = validateSignUpDto(req.body);
    const { member_id, isNew } = await userService.signUp(userData);
res.status(isNew ? 201 : 200).json({
  message: isNew ? "회원가입 성공" : "회원 정보 갱신",
  memberId: member_id,
});
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
   /*
    #swagger.summary = '회원 정보 조회 API';
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      schema: { type: 'number', example: 1 }
    };
    #swagger.responses[200] = {
      description: "회원 정보 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId: { type: "number", example: 1 },
              username: { type: "string", example: "홍길동" },
              email: { type: "string", example: "hong@example.com" },
              gender: { type: "string", example: "MALE" },
              birth_date: { type: "string", format: "date", example: "1995-04-01" }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "memberId 파라미터 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "INVALID_PARAM" },
                  reason: { type: "string", example: "유효하지 않은 memberId입니다." }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "사용자 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "USER_NOT_FOUND" },
                  reason: { type: "string", example: "해당 사용자를 찾을 수 없습니다." }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    };
  */
  try {
    const memberId = Number(req.params.id);
    const user = await userService.getUser(memberId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};