import { validateSignUpDto } from "../dtos/user.dto.js";
import * as userService from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const userData = validateSignUpDto(req.body);
    const memberId = await userService.signUp(userData);
    res.status(201).json({ message: "회원가입 성공", memberId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const memberId = Number(req.params.id);
    const user = await userService.getUser(memberId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};