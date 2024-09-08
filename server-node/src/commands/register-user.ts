import { Request, Response } from "express"
import { z, ZodError } from "zod"
import { signToken } from "../middleware/auth"
import { AsyncResult, Result } from "../lib/result"
import { makeUserDto, User } from "../domain/user"
import { Context } from "../middleware/context"

const RegisterUserSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
})

export const handle_registerUser = async (
  req: Request,
  res: Response<{ token: string } | ZodError | { error: string }>
) => {
  const requestBody = req.body
  const parsedBody = RegisterUserSchema.safeParse(requestBody)

  if (!parsedBody.success) {
    return res.status(400).json(parsedBody.error)
  }

  const userResult = await command_RegisterUser(parsedBody.data, req.context)

  if (userResult.success) {
    return res.status(200).json({
      token: signToken(userResult.data),
    })
  }

  return res.status(500).json({ error: userResult.message })
}

export const command_RegisterUser = async (
  args: {
    username: string
    password: string
  },
  { Mutator }: Context
): AsyncResult<User, "FAILED_TO_REGISTER_USER"> => {
  const { username, password } = args
  const userResult = await Mutator.UserMutator.createUser(username, password)

  if (userResult.success) {
    return Result.Success(makeUserDto(userResult.data))
  }

  return Result.Fail("FAILED_TO_REGISTER_USER")
}
