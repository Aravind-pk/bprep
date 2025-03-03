import { AxiosRequestConfig } from "axios"
import userInstance from "./axios"

const InstanceTypeMapping = {
  userInstance,
} as const

interface Header {
  [key: string]: string
}

type InstanceTypes = keyof typeof InstanceTypeMapping
const fetcher = (
  instanceType: InstanceTypes,
  contentType = "application/json"
) => {
  const axios = InstanceTypeMapping[instanceType]

  return {
    get: async (url: string, params = {}) => {
      return axios
        .request({
          url,
          method: "GET",
          params,
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        })
    },

    /**
     * @function post To create a resource
     * @returns Promise
     */
    post: async (url: string, data: any, params = {}, token?: string) => {
      const headers: Header = {
        "Content-Type": contentType,
      }

      if (token) {
        headers["refreshtoken"] = token
      }

      const config: AxiosRequestConfig = {
        headers,
      }

      return axios
        .request({
          url,
          method: "POST",
          data,
          params,
          ...config,
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        })
    },

    /**
     * @function put To update a full data of resource
     * @returns Promise
     */
    put: async (url: string, data: any, params = {}) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": contentType,
        },
      }

      return axios
        .request({
          url,
          method: "PUT",
          data,
          params,
          ...config,
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        })
    },

    /**
     * @function patch To update partial data of a resource
     * @returns Promise
     */
    patch: async (url: string, data: any, params = {}) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": contentType,
        },
      }

      return axios
        .request({
          url,
          method: "PATCH",
          data,
          params,
          ...config,
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        })
    },

    /**
     *@function delete To delete the resource
     * @returns Promise
     */
    delete: async (url: string, params = {}, data = {}) => {
      return axios
        .request({
          url,
          method: "DELETE",
          params: params,
          data,
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        })
    },
  }
}

export default fetcher
