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
              username: { type: "string" },
              email: { type: "string" },
              gender: { type: "string", enum: ["MALE", "FEMALE", "OTHER"] },
              birth_date: { type: "string", format: "date" }
            },
            required: ["username", "email", "gender", "birth_date"]
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
              memberId: { type: "number" },
              message: { type: "string" }
            }
          }
        }
      }
    };
  */
  try {
    const userData = validateSignUpDto(req.body);
    const memberId = await userService.signUp(userData);
    res.status(201).json({ message: "회원가입 성공", memberId });
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  /*
    #swagger.summary = '회원 정보 조회 API';
    #swagger.parameters['id'] = { in: 'path', type: 'number', required: true };
    #swagger.responses[200] = {
      description: "회원 정보 응답",
      content: {
        "application/json": {
          schema: {
            type: "object"
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