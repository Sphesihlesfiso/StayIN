import { LoginForm } from "@/components/auth/login-form"
import { type loginUserSchema } from "../../../shared/schema/auth.schema"
import { z } from "zod"

const loginInput = z.infer<typeof loginUserSchema>

export default function LoginPage() {
  async function handleLogin(data: loginUserSchema) {
    console.log("Login credentials:", data)
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
