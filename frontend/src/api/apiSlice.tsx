import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { dataToQueryParameter } from "./APIHelper";
import { baseUrl } from "./config";
import type { RootState } from "../store/store";

interface GenericArg {
  endpoint: string;
  method?: string;
  data?: any;
  params?: any;
  headers?: any;
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    get: builder.query<any, any>({
      query: (arg) => {
        const endpoint = arg?.endpoint || arg;
        const params = arg?.params ? dataToQueryParameter(arg.params) : "";
        return `${endpoint}${params}`;
      },
      transformResponse: (res: any) => res,
    }),

    crud: builder.mutation<any, GenericArg>({
      query: ({ endpoint, method = "POST", data, params, headers }) => ({
        url: params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
        method,
        body: data,
        headers: headers || { "Content-Type": "application/json" },
      }),
      transformResponse: (res: any) => res,
    }),

    upload: builder.mutation<any, GenericArg>({
      query: ({ endpoint, data, method = "POST", params }) => {
        let bodyData = data;
        if (data && !(data instanceof FormData)) {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]: [string, any]) =>
            formData.append(key, value),
          );
          bodyData = formData;
        }
        return {
          url: params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
          method,
          body: bodyData,
        };
      },
      transformResponse: (res: any) => res,
    }),
  }),
});

export const { useLazyGetQuery, useGetQuery, useCrudMutation, useUploadMutation } = apiSlice;
