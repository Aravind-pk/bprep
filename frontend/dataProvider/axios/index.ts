import axios, { AxiosError } from "axios"

type PromiseHandlers = {
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}


const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

const failedAdminQueue: any = []



export default userInstance
