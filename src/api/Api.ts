/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum RoleRole {
  /** 0 */
  Guest = 0,
  /** 1 */
  User = 1,
  /** 2 */
  Admin = 2,
}

export interface DtoAcidCreateRequest {
  /** @min 1 */
  Hplus: number;
  /** @maxLength 500 */
  Info?: string;
  /** @min 0 */
  MolarMass: number;
  /** @maxLength 15 */
  Name: string;
  /** @maxLength 25 */
  NameExt: string;
}

export interface DtoAcidListResponse {
  Acids?: DtoAcidResponse[];
}

export interface DtoAcidResponse {
  Hplus?: number;
  ID?: number;
  Img?: string;
  Info?: string;
  MolarMass?: number;
  Name?: string;
  NameExt?: string;
}

export interface DtoAcidUpdateRequest {
  /** @min 1 */
  Hplus?: number;
  /** @maxLength 500 */
  Info?: string;
  /** @min 0 */
  MolarMass?: number;
  /** @maxLength 15 */
  Name?: string;
  /** @maxLength 25 */
  NameExt?: string;
}

export interface DtoCarbonateAcidResponse {
  acid?: DtoAcidResponse;
  acid_id?: number;
  carbonate_id?: number;
  id?: number;
  mass?: number;
  result?: number;
}

export interface DtoCarbonateDetailResponse {
  acids?: DtoCarbonateAcidResponse[];
  creator?: string;
  date_create?: string;
  date_finish?: string;
  date_update?: string;
  id?: number;
  mass?: number;
  moderator?: string;
  status?: string;
}

export interface DtoCarbonateIconsResponse {
  acid_count?: number;
  carbonate_id?: number;
}

export interface DtoCarbonateListEntry {
  calculated?: number;
  creator?: string;
  date_create?: string;
  date_finish?: string;
  date_update?: string;
  id?: number;
  mass?: number;
  moderator?: string;
  status?: string;
}

export interface DtoCarbonateListResponse {
  carbonates?: DtoCarbonateListEntry[];
}

export interface DtoCarbonateUpdateRequest {
  /** @min 0 */
  mass?: number;
}

export interface DtoLoginResponse {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
}

export interface DtoMessageResponse {
  message?: string;
}

export interface DtoUserLoginRequest {
  login: string;
  password: string;
}

export interface DtoUserRegisterRequest {
  /**
   * @minLength 3
   * @maxLength 25
   */
  login: string;
  /** @minLength 6 */
  password: string;
}

export interface DtoUserResponse {
  id?: string;
  login?: string;
  role?: RoleRole;
}

export interface DtoUserUpdateRequest {
  /**
   * @minLength 3
   * @maxLength 25
   */
  login?: string;
  /**
   * @minLength 6
   * @maxLength 100
   */
  password?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Carb_Calc
 * @version 1.0
 * @license AS IS (NO WARRANTY)
 * @baseUrl https://localhost:8080
 * @contact API Support <kovalyovea@student.bmstu.ru> (https://github.com/nylox23/DIA)
 *
 * Calculates the volume of gas emitted in a reaction
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Возвращает список кислот, отфильтрованный по названию
     *
     * @tags acids
     * @name AcidsList
     * @summary Получить список кислот
     * @request GET:/api/acids
     * @response `200` `DtoAcidListResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsList: (params: RequestParams = {}) =>
      this.request<DtoAcidListResponse, Record<string, string>>({
        path: `/api/acids`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Создает новую кислоту без изображения
     *
     * @tags acids
     * @name AcidsCreate
     * @summary Создать кислоту
     * @request POST:/api/acids
     * @secure
     * @response `201` `DtoAcidResponse` Created
     * @response `400` `Record<string,string>` Bad Request
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsCreate: (request: DtoAcidCreateRequest, params: RequestParams = {}) =>
      this.request<DtoAcidResponse, Record<string, string>>({
        path: `/api/acids`,
        method: "POST",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Проводит "удаление" кислоты, устанавливая флаг is_delete в true
     *
     * @tags acids
     * @name AcidsDelete
     * @summary Удалить кислоту
     * @request DELETE:/api/acids/{id}
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsDelete: (id: number, params: RequestParams = {}) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/acids/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает данные кислоты по ID
     *
     * @tags acids
     * @name AcidsDetail
     * @summary Получить кислоту по ID
     * @request GET:/api/acids/{id}
     * @response `200` `DtoAcidResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsDetail: (id: number, params: RequestParams = {}) =>
      this.request<DtoAcidResponse, Record<string, string>>({
        path: `/api/acids/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет данные существующей кислоты
     *
     * @tags acids
     * @name AcidsUpdate
     * @summary Обновить кислоту
     * @request PUT:/api/acids/{id}
     * @secure
     * @response `200` `DtoAcidResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsUpdate: (
      id: number,
      request: DtoAcidUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<DtoAcidResponse, Record<string, string>>({
        path: `/api/acids/${id}`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Загружает изображение для кислоты, замещая предыдущее, если есть
     *
     * @tags acids
     * @name AcidsImageCreate
     * @summary Добавить изображение кислоты
     * @request POST:/api/acids/{id}/image
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsImageCreate: (
      id: number,
      data: {
        /** Файл с изображением */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/acids/${id}/image`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет кислоту в текущую заявку-черновик пользователя
     *
     * @tags acids
     * @name AcidsToCarbonateCreate
     * @summary Добавить кислоту в заявку
     * @request POST:/api/acids/{id}/toCarbonate
     * @secure
     * @response `201` `DtoMessageResponse` Created
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    acidsToCarbonateCreate: (id: number, params: RequestParams = {}) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/acids/${id}/toCarbonate`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет кислоту из текущей заявки-черновика пользователя
     *
     * @tags carbonate-acids
     * @name CarbonateAcidsDelete
     * @summary Удалить кислоту из заявки
     * @request DELETE:/api/carbonate-acids/{id}
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `403` `Record<string,string>` Forbidden
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonateAcidsDelete: (id: number, params: RequestParams = {}) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/carbonate-acids/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет массу кислоты в текущей заявке-черновике пользователя
     *
     * @tags carbonate-acids
     * @name CarbonateAcidsUpdate
     * @summary Обновить количество кислоты
     * @request PUT:/api/carbonate-acids/{id}
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `403` `Record<string,string>` Forbidden
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonateAcidsUpdate: (
      id: number,
      request: object,
      params: RequestParams = {},
    ) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/carbonate-acids/${id}`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список заявок, отфильтрованный по статусу и дате
     *
     * @tags carbonates
     * @name CarbonatesList
     * @summary Получить список заявок
     * @request GET:/api/carbonates
     * @secure
     * @response `200` `DtoCarbonateListResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonatesList: (
      query?: {
        /** Фильтр по статусу */
        status?: string;
        /** Фильтр даты от */
        date_from?: string;
        /** Фильтр даты до */
        date_to?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DtoCarbonateListResponse, Record<string, string>>({
        path: `/api/carbonates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет поле "масса карбоната" в текущей заявке-черновика пользователя
     *
     * @tags carbonates
     * @name CarbonatesUpdate
     * @summary Обновить заявку
     * @request PUT:/api/carbonates
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonatesUpdate: (
      request: DtoCarbonateUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/carbonates`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет заявку (создателем - только черновики или отклоненные заявки)
     *
     * @tags carbonates
     * @name CarbonatesDelete
     * @summary Удалить заявку
     * @request DELETE:/api/carbonates/{id}
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `403` `Record<string,string>` Forbidden
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonatesDelete: (id: number, params: RequestParams = {}) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/carbonates/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает заявку со списком добавленных в нее кислот
     *
     * @tags carbonates
     * @name CarbonatesDetail
     * @summary Получить заявку по ID
     * @request GET:/api/carbonates/{id}
     * @secure
     * @response `200` `DtoCarbonateDetailResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonatesDetail: (id: number, params: RequestParams = {}) =>
      this.request<DtoCarbonateDetailResponse, Record<string, string>>({
        path: `/api/carbonates/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Устанавливает статус заявки на "завершен" или "отклонен"
     *
     * @tags carbonates
     * @name CarbonatesStatusUpdate
     * @summary Установить статус заявки
     * @request PUT:/api/carbonates/{id}/status
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonatesStatusUpdate: (
      id: number,
      request: object,
      params: RequestParams = {},
    ) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/carbonates/${id}/status`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает данные по текущей заявке-черновику пользователя для кнопки перехода
     *
     * @tags carbonates
     * @name CarbonatesCurrentList
     * @summary Получить данные текущей заявки
     * @request GET:/api/carbonates/current
     * @secure
     * @response `200` `DtoCarbonateIconsResponse` OK
     */
    carbonatesCurrentList: (params: RequestParams = {}) =>
      this.request<DtoCarbonateIconsResponse, any>({
        path: `/api/carbonates/current`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Меняет статус текущей заявки-черновика пользователя на "сформирован"
     *
     * @tags carbonates
     * @name CarbonatesFormUpdate
     * @summary Сформировать заявку
     * @request PUT:/api/carbonates/form
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `500` `Record<string,string>` Internal Server Error
     */
    carbonatesFormUpdate: (params: RequestParams = {}) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/carbonates/form`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Аутентифицирует пользователя с помощью логина и пароля, возвращает JWT токен
     *
     * @tags users
     * @name UsersLoginCreate
     * @summary Aутентификация пользователя
     * @request POST:/api/users/login
     * @response `200` `DtoLoginResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `403` `Record<string,string>` Forbidden
     * @response `500` `Record<string,string>` Internal Server Error
     */
    usersLoginCreate: (
      request: DtoUserLoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<DtoLoginResponse, Record<string, string>>({
        path: `/api/users/login`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет JWT токен в блеклист, деактивируя его
     *
     * @tags users
     * @name UsersLogoutCreate
     * @summary Разлогинить пользователя
     * @request POST:/api/users/logout
     * @secure
     * @response `200` `DtoMessageResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `500` `Record<string,string>` Internal Server Error
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<DtoMessageResponse, Record<string, string>>({
        path: `/api/users/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает информацию из профиля пользователя
     *
     * @tags users
     * @name UsersProfileList
     * @summary Получить данные пользователя
     * @request GET:/api/users/profile
     * @secure
     * @response `200` `DtoUserResponse` OK
     * @response `404` `Record<string,string>` Not Found
     * @response `500` `Record<string,string>` Internal Server Error
     */
    usersProfileList: (params: RequestParams = {}) =>
      this.request<DtoUserResponse, Record<string, string>>({
        path: `/api/users/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет информацию в профиле пользователя (логин и/или пароль)
     *
     * @tags users
     * @name UsersProfileUpdate
     * @summary Обновить данные пользователя
     * @request PUT:/api/users/profile
     * @secure
     * @response `200` `DtoUserResponse` OK
     * @response `400` `Record<string,string>` Bad Request
     * @response `404` `Record<string,string>` Not Found
     * @response `409` `Record<string,string>` Conflict
     * @response `500` `Record<string,string>` Internal Server Error
     */
    usersProfileUpdate: (
      request: DtoUserUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<DtoUserResponse, Record<string, string>>({
        path: `/api/users/profile`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создает нового пользователя с предоставленными логином и паролем
     *
     * @tags users
     * @name UsersRegisterCreate
     * @summary Зарегистрировать пользователя
     * @request POST:/api/users/register
     * @response `201` `DtoUserResponse` Created
     * @response `400` `Record<string,string>` Bad Request
     * @response `409` `Record<string,string>` Conflict
     * @response `500` `Record<string,string>` Internal Server Error
     */
    usersRegisterCreate: (
      request: DtoUserRegisterRequest,
      params: RequestParams = {},
    ) =>
      this.request<DtoUserResponse, Record<string, string>>({
        path: `/api/users/register`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
